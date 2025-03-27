---
eleventyNavigation:
  parent: Template Languages
  key: Pug
  order: 8
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                           |
| ------------------- | -------------- | ------------------------------------- |
| `pug`               | `.pug`         | [`pug`](https://github.com/pugjs/pug) |

Pug templates used to be called Jade templates and the project was renamed.

You can override a `.pug` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Installation

The `pug` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)

```sh
npm install @11ty/eleventy-plugin-pug
```

Add to your configuration file:

{% set codeContent %}
import pugPlugin from "@11ty/eleventy-plugin-pug";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pugPlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Pug Options

### Add Compile/Render Options

Set compile/render options using the Configuration API. See all [Pug options](https://pugjs.org/api/reference.html#options).

{% set codeContent %}
import pugPlugin from "@11ty/eleventy-plugin-pug";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pugPlugin, {
		debug: true
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                            | Syntax                                                                                                                                                                                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Includes (Absolute Path)                        | `include /includedvar.pug` looks in `_includes/includedvar.pug`. Does not process front matter in the include file.                                                                                                                                                         |
| ✅ Includes (Relative Path) | Relative paths use `./` (template’s directory) or `../` (template’s parent directory).<br><br>Example: `{% raw %}{% include ./included.pug %}{% endraw %}` looks for `included.pug` in the template’s current directory. Does not process front matter in the include file. |
| ✅ Extends (Absolute Path)                         | `extends /layout.pug` looks in `_includes/layout.pug`. Does not process front matter in the include file.                                                                                                                                                                   |
| ✅ Extends (Relative Path) | Relative paths use `./` (template’s directory) or `../` (template’s parent directory).<br><br>Example: `{% raw %}{% extends ./layout.pug %}{% endraw %}` looks for `layout.pug` in the template’s current directory. Does not process front matter in the extends file.     |
