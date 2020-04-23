---
tipindex: "009"
tiptitle: "Cache Data Requests"
date: 2020-04-23
---
In [Quick Tip #007](/docs/quicktips/eliminate-js/), we described a method to fetch data from an API at build time (in this example it was GitHub Stargazers) to display on your site.

However, if you’re working on your site locally, you probably don’t want every Eleventy build to make a request to an external API call. You’d hit the rate limit pretty quickly (on GitHub, 60 per hour) and each request would slow down your build times!

Now there is an easier way. You can use the [`eleventy-cache-assets`](https://github.com/11ty/eleventy-cache-assets) utility to cache these requests to save on both API limits and build performance!

```
npm install @11ty/eleventy-cache-assets
```

## Features

* Makes at most one network request in the `duration` time span—save on both your API limit count and your build time!
* Easy graceful handling of bad network requests to an API.
* If your cache expires and it makes another request, and that request fails—it automatically falls back to the expired cache entry! This is especially useful if you’re developing without a network connection (airplane-driven-development)—your site will work the same as it did with the network connection—no changes required to your local development environment.

## Example

This code is currently in use on the Eleventy web site to display GitHub stars in the footer. Check out the [full source code](https://github.com/11ty/11ty-website/blob/bbf133489b09b2a99857228aa11b7578fdbae44e/_data/github.js).

{% codetitle "_data/github.js" %}

```js
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  // https://developer.github.com/v3/repos/#get
  let json = await Cache("https://api.github.com/repos/11ty/eleventy", {
    duration: "1d", // 1 day
    type: "json" // also supports "text" or "buffer"
  });

  return {
    stargazers: json.stargazers_count
  };
};
```

{% callout "info" %}Take note that if you’re using this on a Netlify build, it will not maintain updates to the cache (as it resets the cache to the files that are checked into git) and will likely re-run every time.

<ul>
  <li>Current <a href="https://developer.github.com/v3/#rate-limiting">GitHub rate limits</a> are limited to 60 requests per hour, so this will only be a problem if you do more than 60 Netlify builds in an hour.</li>
  <li>The <a href="https://blog.npmjs.org/post/164799520460/api-rate-limiting-rolling-out">npm API doesn’t seem to have a hard limit</a>.</li>
</ul>{% endcallout %}

### Failing Even More Gracefully

Wrap the above code in a nice `try catch` allows you to return a fake data set if the very first request fails (no expired cache entry is available). <strong>Note that if there is already an expired cache entry available, we use that instead.</strong>

```js
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  try {
    // https://developer.github.com/v3/repos/#get
    let json = await Cache("https://api.github.com/repos/11ty/eleventy", {
      duration: "1d", // 1 day
      type: "json" // also supports "text" or "buffer"
    });

    return {
      stargazers: json.stargazers_count
    };
  } catch(e) {
    console.log( "Failed getting GitHub stargazers count, returning 0" );
    return {
      stargazers: 0
    };
  }
};
```

## Read More

[Read more at the `eleventy-cache-assets` Documentation](https://github.com/11ty/eleventy-cache-assets)