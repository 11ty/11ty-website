---
eleventyNavigation:
  parent: Template Languages
  key: Handlebars
  order: 7
relatedKey: handlebars
relatedTitle: Template Language—Handlebars
tags:
  - related-shortcodes
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `hbs`               | `.hbs`         | [`handlebars.js`](https://github.com/wycats/handlebars.js) |

You can override a `.hbs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).

## Installation

The `haml` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)

```sh
npm install @11ty/eleventy-plugin-handlebars
```

Add to your configuration file (ESM version shown):

{% set codeContent %}
import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(handlebarsPlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}


Use more options:

{% set codeContent %}
import handlebars from "handlebars";
import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(handlebarsPlugin, {
		// Override the `ejs` library instance
		eleventyLibraryOverride: handlebars,
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                                           | Syntax                                                                                                                                                                                                    |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Partials                                                       | `{% raw %}{{> user}}{% endraw %}` looks for `_includes/user.hbs`. Does not process front matter in the include file.                                                                                      |
| 🚫 Partials (Relative Path)                                       | **Not yet supported**: `{% raw %}{{> ./user}}{% endraw %}` looks for `user.hbs` in the template’s current directory.                                                                                      |
| ✅ Helpers (Custom Tags)                                          | `{% raw %}{{ helperName myObject }}{% endraw %}` Handlebars calls them Helpers, but Eleventy calls them Shortcodes. Read more about [Shortcodes](/docs/shortcodes/) or [Custom Tags](/docs/custom-tags/). |
| ✅ [Filters](/docs/filters/) | `{% raw %}{{ filterName myObject }}{% endraw %}` Read more about [Filters](/docs/filters/).                                                                                                               |
| ✅ [Shortcodes](/docs/shortcodes/)                                | `{% raw %}{{{ uppercase name }}}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0" %}                                                                                      |

## Helpers

Helpers are used to transform or modify content.

Both Eleventy [Universal Filters](/docs/filters/) and [Universal shortcodes](/docs/shortcodes/) are exposed as Helpers in Handlebars templates.

Read more about [Handlebars Helpers syntax](https://handlebarsjs.com/#helpers)

## Filters

{% callout "warn", "md" %}Asynchronous filters are not supported by Handlebars. Read more at [this Handlebars issue](https://github.com/wycats/handlebars.js/issues/717).{% endcallout %}

### A note about Universal Filters

Universal filters have always been funneled into Handlebars helpers. However, shortcodes (Paired/Single) match better with the semantic footprint of Handlebars Helpers.

Moving forward for Handlebars content, using Universal Shortcodes are preferred to Universal Filters. We will continue to support funneling Universal filters to Handlebars helpers. This will not affect your template content as the syntax for Handlebars filters/helpers/shortcodes will continue to be the same. They’re all just helpers.

## Shortcodes

Shortcodes are basically reusable bits of content. Handlebars makes use of existing synchronous [Universal shortcodes](/docs/shortcodes/).

{% callout "warn", "md" %}Asynchronous shortcodes are not supported by Handlebars. Read more at [this Handlebars issue](https://github.com/wycats/handlebars.js/issues/717).{% endcallout %}

{% set codeContent %}
export default function(eleventyConfig) {
  eleventyConfig.addShortcode("user", function(name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
</div>`;
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Usage

{% raw %}

```html
{{{ user "Zach Leatherman" "zachleat" }}}
```

{% endraw %}

{% callout "info" %}Note that if you return HTML in your Handlebars shortcode, you need to use the Handlebars triple-stash syntax (three opening and three closing curly brackets) to avoid double-escaped HTML.{% endcallout %}

##### Outputs

```html
<div class="user">
	<div class="user_name">Zach Leatherman</div>
	<div class="user_twitter">@zachleat</div>
</div>
```

### Paired Shortcode

{% callout "warn", "md" %}Asynchronous shortcodes are not supported by Handlebars. Read more at [this Handlebars issue](https://github.com/wycats/handlebars.js/issues/717).{% endcallout %}

{% set codeContent %}
export default function(eleventyConfig) {
  eleventyConfig.addPairedShortcode("user", function(bioContent, name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
<div class="user_bio">${bioContent}</div>
</div>`;
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Usage

Note that you can put any Handlebars tags or content inside the `{% raw %}{{ user }}{% endraw %}` shortcode! Yes, even other shortcodes!

{% raw %}

```html
{{# user "Zach Leatherman" "zachleat" }}Zach likes to take long walks on Nebraska beaches.{{/ user }}
```

{% endraw %}

{% callout "info" %}While unpaired shortcodes and helpers required that you use the Handlebars triple-stash syntax (three opening and three closing curly brackets) to avoid double-escaped HTML, paired Handlebars shortcodes do not have this requirement.{% endcallout %}

##### Outputs

```html
<div class="user">
	<div class="user_name">Zach Leatherman</div>
	<div class="user_twitter">@zachleat</div>
	<div class="user_bio">Zach likes to take long walks on Nebraska beaches.</div>
</div>
```