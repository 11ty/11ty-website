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
<seven-minute-tabs persist sync class="tabs-flush">
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "inputpathtourl", additions: "html,md"} %}
  <div id="inputpathtourl-html" role="tabpanel">

```html
<a href="my-template.md">Home</a>
```

  </div>
  <div id="inputpathtourl-md" role="tabpanel">

```md
[Home](my-template.md)
```

  </div>
  <div id="inputpathtourl-liquid" role="tabpanel">

{% raw %}
```liquid
<a href="my-template.md">Home</a>
```
{% endraw %}

  </div>
  <div id="inputpathtourl-njk" role="tabpanel">

{% raw %}

```jinja2
<a href="my-template.md">Home</a>
```

{% endraw %}

  </div>
  <div id="inputpathtourl-js" role="tabpanel">

{% raw %}
```js
export default function (data) {
	return `<a href="my-template.md">Home</a>`;
};
```
{% endraw %}

  </div>
  <div id="inputpathtourl-cjs" role="tabpanel">

{% raw %}
```js
module.exports = function (data) {
  return `<a href="my-template.md">Home</a>`;
};
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

Open up your Eleventy config file (probably `eleventy.config.js`) and use `addPlugin`:

{% include "snippets/plugins/inputpath.njk" %}

<details class="details-expand-bg">
<summary>Expand for full options list</summary>

{% include "snippets/plugins/inputpath-options.njk" %}

- Read more about [Transform outputPaths](/docs/transforms/).

</details>
