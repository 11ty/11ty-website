---
eleventyNavigation:
  parent: Template Languages
  key: EJS
  order: 9
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                |
| ------------------- | -------------- | ------------------------------------------ |
| `ejs`               | `.ejs`         | [`ejs`](https://www.npmjs.com/package/ejs) |

You can override a `.ejs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Installation

The `ejs` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

Add to your configuration file:

{% set codeContent %}
import ejsPlugin from "@11ty/eleventy-plugin-ejs";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(ejsPlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}


Use more `ejs` options ([full options list](https://github.com/mde/ejs#options)):

{% set codeContent %}
import ejs from "ejs";
import ejsPlugin from "@11ty/eleventy-plugin-ejs";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(ejsPlugin, {
		async: false, // default

		// use <? ?> instead of <% %>
		delimiter: "?",

		// Override the `ejs` library instance
		eleventyLibraryOverride: ejs,
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                             | Syntax                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include (Preprocessor Directive)                 | `<% include /user/show %>` looks for `_includes/user/show.ejs` (the leading slash is important). Does not process front matter in the include file.                                                                                                                                                                                                                           |
| ✅ Includes (Relative Path, Preprocessor Directive) | Relative paths in `ejs` can leave off the leading slash `/` or use `./` to use the template’s directory or `../` for the template’s parent directory:<br>`<% include 'user/show' %>` or `<% include './user/show' %>` looks for `./user/show.ejs` from the template’s current directory. Does not process front matter in the include file.                                   |
| ✅ Include (pass in Data)                           | `<%- include('/user/show', {user: 'Ava'}) %>` looks for `_includes/user/show.ejs`. Does not process front matter in the include file.                                                                                                                                                                                                                                         |
| ✅ Include (Relative Path, pass in Data)            | Relative paths in `ejs` can leave off the leading slash `/` or use `./` to use the template’s directory or `../` for the template’s parent directory:<br>`<%- include('user/show', {user: 'Ava'}) %>` or `<%- include('./user/show', {user: 'Ava'}) %>` looks for `./user/show.ejs` from the template’s current directory. Does not process front matter in the include file. |
