---
eleventyNavigation:
  parent: Template Languages
  key: HAML
  order: 7
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                |
| ------------------- | -------------- | ------------------------------------------ |
| `haml`              | `.haml`        | [`hamljs`](https://github.com/tj/haml.js) |

| Eleventy or Plugin version | `hamljs` version |
| --- | --- |
| `@11ty/eleventy@0.x` | `hamljs@0.6.x` |
| `@11ty/eleventy@1.x` | `hamljs@0.6.x` |
| `@11ty/eleventy@2.x` | `hamljs@0.6.x` |
| `@11ty/eleventy@3.x` and newer | N/A |
| `@11ty/eleventy-plugin-haml@1.x` | `hamljs@0.6.x` |

You can override a `.haml` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/template-overrides/).

## Installation

The `haml` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)

{%- set codeBlock %}
npm install @11ty/eleventy-plugin-haml
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

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
| 🚫 [Universal Filters](/docs/filters/) | **Not yet supported** `:filterName some text` Read more about [Filters](/docs/filters/). |
