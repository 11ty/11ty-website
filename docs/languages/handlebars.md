---
subtitle: Handlebars
relatedKey: handlebars
relatedTitle: Template Language—Handlebars
tags:
  - docs-languages
  - related-filters
  - related-shortcodes
  - related-custom-tags
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `hbs`               | `.hbs`         | [`handlebars.js`](https://github.com/wycats/handlebars.js) |

You can override a `.hbs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).

## Handlebars Options

### Optional: Set your own Library instance {% addedin "0.3.0", "span" %}

As an escape mechanism for advanced usage, pass in your own instance of the Handlebars library using the Configuration API.

```js
module.exports = function(eleventyConfig) {
  let handlebars = require("handlebars");
  eleventyConfig.setLibrary("hbs", handlebars);
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                                                                                  |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Partials                                                                  | `{% raw %}{{> user}}{% endraw %}` looks for `_includes/user.hbs` (does not process front matter)                                                                                             |
| ✅ Helpers (Custom Tags)                                                                   | `{% raw %}{{ helperName myObject }}{% endraw %}` Handlebars calls them Helpers, but Eleventy calls them Shortcodes. Read more about [Shortcodes](/docs/shortcodes/) or [Custom Tags](/docs/custom-tags/).                                |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{{ filterName myObject }}{% endraw %}` Read more about [Filters](/docs/filters/). |
| ✅ [Shortcodes](/docs/shortcodes/) | `{% raw %}{{ uppercase name }}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0", "span" %}|


<span id="filters"></span><span id="shortcodes"></span>

## Helpers

Helpers are used to transform or modify content. You can add Handlebars specific helpers, but you probably want to add a [Universal shortcode](/docs/filters/) instead.

Read more about [Handlebars Helpers syntax](http://handlebarsjs.com/#helpers)

```js
module.exports = function(eleventyConfig) {
  // Handlebars Helper
  eleventyConfig.addHandlebarsHelper("myHandlebarsHelper", function(value) { … });
  
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  // Read the note about Universal Filters below: Use a shortcode instead!
  eleventyConfig.addFilter("myFilter", function(value) { … });
};
```

### Usage:

{% raw %}
```html
<h1>{{ myHandlebarsHelper myVariable }}</h1>
```
{% endraw %}

### A note about Universal Filters

Universal filters have always been funneled into Handlebars helpers. In v0.5.0, Shortcode support was added to Eleventy. Shortcodes (Paired/Single) match better with the semantic footprint of Handlebars Helpers.

```js
module.exports = function(eleventyConfig) {  
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(value) { … });
};
```

Moving forward for Handlebars content, using Universal Shortcodes are preferred to Universal Filters. We will continue to support funneling Universal filters to Handlebars helpers. This will not affect your template content as the syntax for Handlebars filters/helpers/shortcodes will continue to be the same. They’re all just helpers.

## Shortcodes

Shortcodes are basically reusable bits of content. You can add Handlebars specific shortcodes, but you probably want to add a [Universal shortcode](/docs/shortcodes/) instead.

### Single Shortcode

```js
module.exports = function(eleventyConfig) {
  // Handlebars Shortcode
  eleventyConfig.addHandlebarsShortcode("user", function(name, twitterUsername) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks, Handlebars)
  eleventyConfig.addShortcode("user", function(name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
</div>`;
  });
};
```

#### Usage

{% raw %}
```html
{{ user "Zach Leatherman" "zachleat" }}
```
{% endraw %}

##### Outputs

```html
<div class="user">
  <div class="user_name">Zach Leatherman</div>
  <div class="user_twitter">@zachleat</div>
</div>
```

### Paired Shortcode

```js
module.exports = function(eleventyConfig) {
  // Handlebars Shortcode
  eleventyConfig.addPairedHandlebarsShortcode("user", function(bioContent, name, twitterUsername) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks, Handlebars)
  eleventyConfig.addPairedShortcode("user", function(bioContent, name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
<div class="user_bio">${bioContent}</div>
</div>`;
  });
};
```

#### Usage

Note that you can put any Handlebars tags or content inside the `{% raw %}{{ user }}{% endraw %}` shortcode! Yes, even other shortcodes!

{% raw %}
```html
{{# user "Zach Leatherman" "zachleat" }}
  Zach likes to take long walks on Nebraska beaches.
{{/ user }}
```
{% endraw %}

##### Outputs

```html
<div class="user">
  <div class="user_name">Zach Leatherman</div>
  <div class="user_twitter">@zachleat</div>
  <div class="user_bio">Zach likes to take long walks on Nebraska beaches.</div>
</div>
```