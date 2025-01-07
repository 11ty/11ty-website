---
eleventyNavigation:
  parent: Template Languages
  key: HAML
  order: 10
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                |
| ------------------- | -------------- | ------------------------------------------ |
| `haml`              | `.haml`        | [`haml.js`](https://github.com/tj/haml.js) |

You can override a `.haml` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Installation

The `haml` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)

```sh
npm install @11ty/eleventy-plugin-haml
```

Add to your configuration file:

{% set codeContent %}
import hamlPlugin from "@11ty/eleventy-plugin-haml";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(hamlPlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

Use more options:

{% set codeContent %}
import haml from "hamljs";
import hamlPlugin from "@11ty/eleventy-plugin-haml";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(hamlPlugin, {
		// Override the `haml` library instance
		eleventyLibraryOverride: haml,
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                                           | Syntax                                                                                   |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 🚫 Filters                                                        | **Not yet supported** `:filterName some text` Read more about [Filters](/docs/filters/). |
| 🚫 [Universal Filters](/docs/filters/#universal-filters) | **Not yet supported** `:filterName some text` Read more about [Filters](/docs/filters/). |
