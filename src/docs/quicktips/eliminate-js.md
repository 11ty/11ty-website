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

This is a bit different from our client-side implementation because this data is only updated as often as your build runs. This is implemented using a global [JavaScript data file](/docs/data-js/) at `_data/github.js`.

* Install new dependencies: `npm install node-fetch@cjs --save-dev`
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

{% callout "info" %}It is highly <strong>recommended</strong> to cache your API call data to the file system so that you aren’t making a ton of requests to an API with every build. Luckily, we have a <a href="/docs/quicktips/cache-api-requests/">Quick Tip on how to Cache your Data Requests</a>!{% endcallout %}

## Update Counts Daily

If you want to update these counts automatically every day, read [Quick Tip #008—Trigger a Netlify Build Every Day with IFTTT](/docs/quicktips/netlify-ifttt/).
