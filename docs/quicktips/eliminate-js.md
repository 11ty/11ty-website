---
tipindex: "007"
tiptitle: "Fetch GitHub Stargazers Count (and More) at Build Time"
date: 2019-01-31
---

Older iterations of this website used a third party JavaScript widget to show the number of GitHub Stars the project currently had. You can see it in action on the [versioned docs for 0.7.1](https://v0-7-1.11ty.dev/docs/) (scroll to the bottom).

This was in fact the only `<script>` tag on the entire [11ty.dev](https://www.11ty.dev/) web site and it was from a third party. Naturally, it needed to be annihilated.

Let’s change up our architecture to ruthlessly eliminate this client-side JavaScript.

## Get the Stargazers Count from the GitHub API

Read more at the [GitHub API documentation](https://developer.github.com/v3/repos/#get).

This is a bit different from our client-side implementation because this data is only as updated as often as your build runs. This is implemented using a global [JavaScript data file](/docs/data-js/) at `_data/github.js`.

* Install new dependencies: `npm install node-fetch --save-dev`
* Read more about [`node-fetch`](https://www.npmjs.com/package/node-fetch)

{% codetitle "_data/github.js" %}

```js
const fetch = require("node-fetch");

module.exports = async function() {
  console.log( "Fetching new github stargazers count…" );

  // GitHub API: https://developer.github.com/v3/repos/#get
  return fetch("https://api.github.com/repos/11ty/eleventy")
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      // prune the data to return only what we want
      return {
        stargazers: json.stargazers_count
      };
    });
};
```

Now in your templates you can output the stargazers count with:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
{{ github.stargazers }} GitHub Stars
```
{% endraw %}

which outputs

```
1515 GitHub Stars
```

Bonus: I created a [`humanReadableNum` filter](https://github.com/11ty/11ty-website/blob/ac3579909078f860f4af1185c8f7353d56833c22/.eleventy.js#L82)) using the [`human-readable-numbers`](https://www.npmjs.com/package/human-readable-numbers) package to format the number.

## More Examples

You can look in the footer of this page to see examples of this in use on this very web site. I used it for:

* [NPM Download Count](https://github.com/11ty/11ty-website/blob/ac3579909078f860f4af1185c8f7353d56833c22/_data/npm.js)
* [GitHub Stargazers Count](https://github.com/11ty/11ty-website/blob/ac3579909078f860f4af1185c8f7353d56833c22/_data/github.js)
* [Twitter Followers Count](https://github.com/11ty/11ty-website/blob/ac3579909078f860f4af1185c8f7353d56833c22/_data/twitter.js) (careful here, this one is super brittle but Twitter’s API is historically anti-developer so 😇)

These all use the recommended caching mechanism described in the next section.

## Recommended: Cache the Data to the File System

If I’m working on my site locally, I probably don’t want every Eleventy run to hit this external API call. I’d hit my rate limit pretty quickly (on GitHub, 60 per hour). Instead, let’s use an npm package called [`flat-cache`](https://www.npmjs.com/package/flat-cache) to save our results locally to the file system and only run it once per day.

* Install dependencies: `npm install node-fetch flat-cache --save-dev`
* Read more about [`node-fetch`](https://www.npmjs.com/package/node-fetch) and [`flat-cache`](https://www.npmjs.com/package/flat-cache).

### Highlights:

* A `_datacache/github-stargazers` file is created that saves the results of the service call.
* The data is keyed off the current UTC date.
* If the data already exists in the cache (for the current UTC date), it uses the cached value instead of fetching new data.

{% codetitle "_data/github.js" %}

```js
const fetch = require("node-fetch");
const flatcache = require("flat-cache");
const path = require("path");

function getCacheKey() {
  let date = new Date();
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

module.exports = async function() {
  let cache = flatcache.load("github-stargazers", path.resolve("./_datacache"));
  let key = getCacheKey();
  let cachedData = cache.getKey(key);
  if(!cachedData) {
    console.log( "Fetching new github stargazers count…" );

    // GitHub API: https://developer.github.com/v3/repos/#get
    let newData = await fetch("https://api.github.com/repos/11ty/eleventy")
      .then(res => res.json())
      .then(json => {
        return {
          stargazers: json.stargazers_count
        };
      });

    cache.setKey(key, newData);
    cache.save();
    return newData;
  }

  return cachedData;
};
```

If you want to fetch data more frequently than once per day, modify `getCacheKey` to return more a specific date. Add an hour to the key to run every hour, for example:

```js
function getCacheKey() {
  let date = new Date();
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}`;
}
```

{% callout "info" %}Take note that if you’re using this on a Netlify build, it will not maintain updates to the cache (as it resets the cache to the files that are checked into git) and will likely re-run every time.
<ul>
  <li>Current <a href="https://developer.github.com/v3/#rate-limiting">GitHub rate limits</a> are limited to 60 requests per hour, so this will only be a problem if you do more than 60 Netlify builds in an hour.</li>
  <li>The <a href="https://blog.npmjs.org/post/164799520460/api-rate-limiting-rolling-out">npm API doesn’t seem to have a hard limit</a>.</li>
</ul>{% endcallout %}

## Update Counts Daily

If you want to update these counts automatically every day, read [Quick Tip #008—Trigger a Netlify Build Every Day with IFTTT](/docs/quicktips/netlify-ifttt/).
