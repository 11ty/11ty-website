---
subtitle: Handlebars
relatedKey: nunjucks
relatedTitle: Template Language—Handlebars
tags:
  - docs-languages
  - related-filters
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `hbs`               | `.hbs`         | [`handlebars.js`](https://github.com/wycats/handlebars.js) |

You can override a `.hbs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).

## Handlebars Options

### Optional: Set your own Library instance

{% addedin "0.3.0" %}

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
| ✅ Partials                                                                  | `{% raw %}{{> user}}{% endraw %}` looks for `_includes/user.hbs`                                                                                             |
| ✅ Helpers                                                                   | `{% raw %}{{ filterName myObject }}{% endraw %}` Handlebars calls them Helpers, but Eleventy calls them filters. Read more about [Filters](/docs/filters/).                                |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{{ filterName myObject }}{% endraw %}` Read more about [Filters](/docs/filters/). |

## Filters

Filters are used to transform or modify content. You can add Liquid specific filters, but you probably want to add a [Universal filter](/docs/filters/) instead.

Read more about [Handlebars Helpers syntax](http://handlebarsjs.com/#helpers)

```js
module.exports = function(eleventyConfig) {
  // Handlebars Filter
  eleventyConfig.addHandlebarsHelper("myHandlebarsFilter", function(value) { … });
  
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(value) { … });
};
```

### Usage:

{% raw %}
```html
<h1>{{ myFilter myVariable }}</h1>
```
{% endraw %}