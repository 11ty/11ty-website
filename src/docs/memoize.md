---
eleventyNavigation:
  parent: Configuration
  key: Memoize
  order: 12
---

# Memoize

> Memoize functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input

There are many popular libraries to cache or memoize functions (filters, shortcodes, etc): [`memoize`](https://www.npmjs.com/package/memoize) (ESM-only) is one such package. You can use `memoize` (or any [other memoization library](https://www.npmjs.com/search?q=memoize)) to cache things in your Eleventy Configuration file.

Note that Eleventy 3.0 <!-- 3.0.0-alpha.15 --> ships with a memoization layer around the built-in [`slug`](/docs/filters/slug/), [`slugify`](/docs/filters/slugify/), and [`inputPathToUrl`](/docs/filters/inputpath-to-url/) filters.

<div class="codetitle">eleventy.config.js</div>

```js
import memoize from "memoize";

export default function(eleventyConfig) {
	eleventyConfig.addLiquidFilter("htmlEntities", memoize(str => {
		return encode(str);
	}));
};
```