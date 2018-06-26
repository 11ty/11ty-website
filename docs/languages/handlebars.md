---
subtitle: Handlebars
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `hbs`               | `.hbs`         | [`handlebars.js`](https://github.com/wycats/handlebars.js) |

You can override a `.hbs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).

## Set your own Library instance

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
