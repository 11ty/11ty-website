---
eleventyNavigation:
  key: InputPath to URL
  order: 3
  excerpt: Maps an Eleventy input file path to its output URL.
---

# InputPath to URL {% addedin "v3.0.0-alpha.5" %}

{% tableofcontents %}

This plugin allows you to use file system paths in your HTML and they will be automatically transformed to their output URLs. Very useful for robust hyperlinking allowing you to change your output URLs without breaking content links! Works out of the box with [`permalink` remapping](/docs/permalinks/), the [HTML `<base>` plugin](/docs/plugins/html-base/), etc.

{% callout "info", "md" -%}
This plugin is an implicit alternative to the [`inputPathToUrl` filter](/docs/filters/inputpath-to-url/). The filter is faster but a bit more verbose.
{%- endcallout %}

_Inspired by [GitHub issue #84](https://github.com/11ty/eleventy/issues/84)._

### Usage

You can link to `inputPath` in any `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/posthtml/posthtml-urls/blob/307c91342a211b3f9fb22bc57264bbb31f235fbb/lib/defaultOptions.js) (via [posthtml-urls](https://github.com/posthtml/posthtml-urls)) and this plugin will render the correct URL for the template in your output directory.

This uses an [Eleventy Transform](/docs/config/#transforms) to modify the output of all template syntaxes that output an `.html` file.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "inputpathtourl", additions: "html,md"} %}
  <div id="inputpathtourl-html" role="tabpanel">

{% codetitle "HTML", "Syntax" %}

```html
<a href="my-template.md">Home</a>
```

  </div>
  <div id="inputpathtourl-md" role="tabpanel">

{% codetitle "Markdown", "Syntax" %}

```md
[Home](my-template.md)
```

  </div>
  <div id="inputpathtourl-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
<a href="my-template.md">Home</a>
```

{% endraw %}

  </div>
  <div id="inputpathtourl-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
<a href="my-template.md">Home</a>
```

{% endraw %}

  </div>
  <div id="inputpathtourl-js" role="tabpanel">

{% codetitle "JavaScript (CommonJS)", "Syntax" %}

{% raw %}

```js
module.exports = function (data) {
	return `<a href="my-template.md">Home</a>`;
};
```

{% endraw %}

{% codetitle "JavaScript (ESM)", "Syntax" %}

{% raw %}

```js
export default function (data) {
	return `<a href="my-template.md">Home</a>`;
}
```

{% endraw %}

  </div>
  <div id="inputpathtourl-hbs" role="tabpanel">

{% codetitle "Handlebars", "Syntax" %}

{% raw %}

```hbs
<a href="my-template.md">Home</a>
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>

The above all render as the following in your output:

```html
<a href="/my-template/">Home</a>
```

- The paths used here should be [relative to the input directory](/docs/config/#input-directory) though they _can_ be relative to the project root (the former is simpler and more robust).
- As this transform is implicit it _does not_ error when an inputPath match is not found—it only returns the original URL string.
- When pointing to a [**Pagination template**](/docs/pagination/), the first URL in the pagination set is returned.

### Installation

{% addedin "v3.0.0-alpha.5" %} This plugin is bundled with Eleventy 3.0 and does not require you to install anything from `npm`. However, the plugin is _opt-in_ (requires you to use `addPlugin`). It is compatible with _all_ template languages via an Eleventy Transform.

Note that the [`inputPathToUrl` filter](/docs/filters/inputpath-to-url/) is available by default and does not require use of `addPlugin`.

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs><!-- persist someday but not yet -->
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "configfile", only: "jsesm,jscjs" } %}
  <div id="configfile-jsesm" role="tabpanel">

{% codetitle ".eleventy.js (ESM)" %}

```js
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
}
```

_You’re only allowed one `export default` in your configuration file, so make sure you only copy the `import` and the `addPlugin` lines above!_

<details class="details-expand-bg">
<summary>Expand for full options list</summary>

{% codetitle ".eleventy.js (ESM)" %}

```js
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin, {
		// Comma separated list of outputPath file extensions to apply the transform
		extensions: "html",
	});
}
```

- Read more about [Transform outputPaths](/docs/config/#transforms).

</details>

  </div>
  <div id="configfile-jscjs" role="tabpanel">

{% codetitle ".eleventy.js (CommonJS)" %}

```js
module.exports = async function (eleventyConfig) {
	const { InputPathToUrlTransformPlugin } = await import("@11ty/eleventy");

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
};
```

_You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `import` and the `addPlugin` lines above!_

<details class="details-expand-bg">
<summary>Expand for full options list</summary>

{% codetitle ".eleventy.js (CommonJS)" %}

```js
module.exports = async function (eleventyConfig) {
	const { InputPathToUrlTransformPlugin } = await import("@11ty/eleventy");

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin, {
		// Comma separated list of outputPath file extensions to apply the transform
		extensions: "html",
	});
};
```

- Read more about [Transform outputPaths](/docs/config/#transforms).

</details>

  </div>
</seven-minute-tabs>
</is-land>
