---
eleventyNavigation:
  parent: Using Data
  key: Cache API Data
  order: 4
relatedLinks:
  /docs/quicktips/cache-api-requests/: "Quick Tip #009—Cache Data Requests"
---
# eleventy-cache-assets

Don’t do a network request to your data source on every build! Do it once every minute, or every hour, or every day!

This can save any kind of asset—JSON, HTML, images, videos, etc.

* Requires **Node 10+**

* Fetch a remote URL and saves it to a local cache.
* Control concurrency so we don’t make too many network requests at the same time.
* If cache expires and the network connection fails, it will still use the cached request.

## Installation

```
npm install @11ty/eleventy-cache-assets
```

### Important Security and Privacy Notice

This plugin caches complete network responses. Unless you’re willing to perform a full review of everything this plugin caches to disk for privacy and security exposure, it is _strongly_ recommended that you add the `.cache` folder to your `.gitignore` file so that it doesn’t get checked in to your git repository.

Are you 100% sure that private e-mail addresses aren’t being returned from a cached API? I’m guessing no—just add `.cache` to your `.gitignore`. Right now. Do it.

## Usage

### Cache a JSON file from an API

```js
let url = "https://api.github.com/repos/11ty/eleventy";
let json = await CacheAsset(url, {
	duration: "1d",
	type: "json"
});
```

### Options

#### Change the Cache Duration

The `duration` option currently supports the following shorthand values:

* `s` is seconds (e.g. `duration: "43s"`)
* `m` is minutes (e.g. `duration: "2m"`)
* `h` is hours (e.g. `duration: "99h"`)
* `d` is days
* `w` is weeks (7 days)
* `y` is 365 days (about 1 year)

#### Type

* `type: "json"`
* `type: "text"`
* `type: "buffer"` (default: use this for non-text things)

#### Cache Directory

The `directory` option let’s you change where the cache is stored. It is strongly recommended that you add this folder to your `.gitignore` file (per the Security and Privacy Notice above).

```js
let json = await CacheAsset("https://…", {
	directory: ".cache"
});
```


### Handle failure gracefully

Note that this will only apply if the first request fails (and no cache exists). If a failure happens and a cached entry already exists (even if it’s expired), it will use the cached entry.

```js
async function fetchData() {
	try {
		let url = "https://api.github.com/repos/11ty/eleventy";
		/* promise */
		return CacheAsset(url, {
			duration: "1d",
			type: "json"
		});
	} catch(e) {
		return {
			// my failure fallback data
		}
	}
}
```

### Cache a Remote Image

This is what [`eleventy-img`](https://github.com/11ty/eleventy-img/) uses internally.

```js
const CacheAsset = require("@11ty/eleventy-cache-assets");
let url = "https://www.zachleat.com/img/avatar-2017-big.png";
let imageBuffer = await CacheAsset(url, {
	duration: "1d",
	type: "buffer"
});
// Use imageBuffer as an input to the `sharp` plugin, for example
```

### Remove query params from cache identifier

(Version 2.0.3 and newer) If your fetched URL contains some query parameters that aren’t relevant to the identifier used in the cache, remove them using the `removeUrlQueryParams` option.

```js
const CacheAsset = require("@11ty/eleventy-cache-assets");
let url = "https://www.zachleat.com/img/avatar-2017-big.png?Get=rid&of=these";
let imageBuffer = await CacheAsset(url, {
	removeUrlQueryParams: true
});
```

### Fetch Google Fonts CSS

Also a good example of using `fetchOptions` to pass in a custom user agent. Full option list is available on the [`node-fetch` documentation](https://www.npmjs.com/package/node-fetch#options).

```js
const CacheAsset = require("@11ty/eleventy-cache-assets");
let url = "https://fonts.googleapis.com/css?family=Roboto+Mono:400&display=swap";
let fontCss = await CacheAsset(url, {
	duration: "1d",
	type: "text",
	fetchOptions: {
		headers: {
			// lol
			"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
		}
	}
});
```

### Change Global Plugin Concurrency

```js
const CacheAsset = require("@11ty/eleventy-cache-assets");
CacheAsset.concurrency = 4; // default is 10
```

### Command line debug output

```js
DEBUG=EleventyCacheAssets* node your-node-script.js
DEBUG=EleventyCacheAssets* npx @11ty/eleventy
```