---
eleventyNavigation:
  key: InputPath to URL
  order: 3
  excerpt: Maps an Eleventy input file path to its output URL.
---
# InputPath to URL {% addedin "3.0.0-alpha.5" %}

{% tableofcontents %}

This plugin allows you to use file system paths in your HTML and they will be automatically transformed to their output URLs. Very useful for robust hyperlinking allowing you to change your output URLs without breaking content links! Works out of the box with [`permalink` remapping](/docs/permalinks/), the [HTML `<base>` plugin](/docs/plugins/html-base/), etc.

This plugin is an implicit alternative to the [`inputPathToUrl` filter](/docs/filters/inputpath-to-url/). The filter is faster but a bit more verbose.

### Usage

You can link to `inputPath` in any `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/posthtml/posthtml-urls/blob/307c91342a211b3f9fb22bc57264bbb31f235fbb/lib/defaultOptions.js) (via [posthtml-urls](https://github.com/posthtml/posthtml-urls)) and this plugin will render the correct URL for the template in your output directory.

```html
<a href="my-template.md">Home</a>

<!-- renders as -->
<a href="/my-template/">Home</a>
```

The paths used here should be [relative to the input directory](/docs/config/#input-directory) though they _can_ be relative to the project root (the former is simpler and preferred).

### Installation

{% addedin "3.0.0-alpha.5" %} This plugin is bundled with Eleventy 3.0 and does not require you to install anything from `npm`. However, the plugin is _opt-in_ (requires you to use `addPlugin`). It is compatible with _all_ template languages via an Eleventy Transform.

Note that the [`inputPathToUrl` filter](/docs/filters/inputpath-to-url/) is available by default and does not require use of `addPlugin`.

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "configfile", only: "jsesm,jscjs" } %}
  <div id="configfile-jsesm" role="tabpanel">

{% codetitle ".eleventy.js (ESM)" %}

```js
import { PathToUrlTransformPlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(PathToUrlTransformPlugin);
};
```
_You’re only allowed one `export default` in your configuration file, so make sure you only copy the `import` and the `addPlugin` lines above!_

<details>
<summary>Expand for full options list</summary>

{% codetitle ".eleventy.js (ESM)" %}

```js
import { PathToUrlTransformPlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(PathToUrlTransformPlugin, {
		// Comma separated list of outputPath file extensions to apply the transform
		extensions: "html",
	});
};
```

* Read more about [Transform outputPaths](/docs/config/#transforms).

</details>

  </div>
  <div id="configfile-jscjs" role="tabpanel">

{% codetitle ".eleventy.js (CommonJS)" %}

```js
module.exports = async function(eleventyConfig) {
	const { PathToUrlTransformPlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPlugin(PathToUrlTransformPlugin);
};
```
_You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `import` and the `addPlugin` lines above!_

<details>
<summary>Expand for full options list</summary>

{% codetitle ".eleventy.js (CommonJS)" %}

```js
module.exports = async function(eleventyConfig) {
	const { PathToUrlTransformPlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPlugin(PathToUrlTransformPlugin, {
		// Comma separated list of outputPath file extensions to apply the transform
		extensions: "html",
	});
};
```

* Read more about [Transform outputPaths](/docs/config/#transforms).

</details>

  </div>
</seven-minute-tabs>
</is-land>
