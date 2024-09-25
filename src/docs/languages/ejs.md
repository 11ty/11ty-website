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

## EJS Options

### Optional: Compile/Render Options {% addedin "0.3.0" %}

See “Options” on the [EJS home page](https://ejs.co/).

{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.setEjsOptions({
		// use <? ?> instead of <% %>
		delimiter: "?",
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Optional: Set your own Library instance {% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of the EJS library using the Configuration API.

{% set codeContent %}
import ejs from "ejs";

export default function (eleventyConfig) {
	eleventyConfig.setLibrary("ejs", ejs);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                             | Syntax                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include (Preprocessor Directive)                 | `<% include /user/show %>` looks for `_includes/user/show.ejs` (the leading slash is important). Does not process front matter in the include file.                                                                                                                                                                                                                           |
| ✅ Includes (Relative Path, Preprocessor Directive) | Relative paths in `ejs` can leave off the leading slash `/` or use `./` to use the template’s directory or `../` for the template’s parent directory:<br>`<% include 'user/show' %>` or `<% include './user/show' %>` looks for `./user/show.ejs` from the template’s current directory. Does not process front matter in the include file.                                   |
| ✅ Include (pass in Data)                           | `<%- include('/user/show', {user: 'Ava'}) %>` looks for `_includes/user/show.ejs`. Does not process front matter in the include file.                                                                                                                                                                                                                                         |
| ✅ Include (Relative Path, pass in Data)            | Relative paths in `ejs` can leave off the leading slash `/` or use `./` to use the template’s directory or `../` for the template’s parent directory:<br>`<%- include('user/show', {user: 'Ava'}) %>` or `<%- include('./user/show', {user: 'Ava'}) %>` looks for `./user/show.ejs` from the template’s current directory. Does not process front matter in the include file. |
