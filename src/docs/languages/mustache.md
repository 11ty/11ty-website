---
eleventyNavigation:
  parent: Template Languages
  key: Mustache
  order: 5
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                           |
| ------------------- | -------------- | ----------------------------------------------------- |
| `mustache`          | `.mustache`    | [`mustache.js`](https://github.com/janl/mustache.js/) |

You can override a `.mustache` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/template-overrides/).

## Installation

The `ejs` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)


{%- set codeBlock %}
npm install @11ty/eleventy-plugin-mustache
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Add to your configuration file:

{% set codeContent %}
import mustachePlugin from "@11ty/eleventy-plugin-mustache";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(mustachePlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

Use more options:

{% set codeContent %}
import mustache from "mustache";
import mustachePlugin from "@11ty/eleventy-plugin-mustache";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(mustachePlugin, {
		// Override the `mustache` library instance
		eleventyLibraryOverride: mustache,
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                     | Syntax                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ✅ Partials                 | `{% raw %}{{> user}}{% endraw %}` looks for `_includes/user.mustache`. Does not process front matter in the include file. |
| 🚫 Partials (Relative Path) | **Not yet supported**: `{% raw %}{{> ./user}}{% endraw %}` looks for `user.mustache` in the template’s current directory. |
