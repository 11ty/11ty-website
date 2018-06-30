---
subtitle: Liquid
relatedKey: liquid
relatedTitle: Template Language—Liquid
tags:
  - related-filters
  - related-shortcodes
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                          |
| ------------------- | -------------- | ---------------------------------------------------- |
| `liquid`            | `.liquid`      | [`liquidjs`](https://www.npmjs.com/package/liquidjs) |

You can override a `.liquid` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Liquid Options

### Default Options

Rather than constantly fixing outdated documentation, [find `getLiquidOptions` in `Liquid.js`](https://github.com/11ty/eleventy/blob/master/src/Engines/Liquid.js). These options are different than the [default `liquidjs` options](https://github.com/harttle/liquidjs#options).

### Optional: Use your own options

{% addedin "0.2.15" %}

It’s recommended to use the Configuration API to set override the default options above.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });
};
```

### Optional: Set your own Library instance

{% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of the Liquid library using the Configuration API. See [all `liquidjs` options](https://github.com/harttle/liquidjs#options).

<div class="elv-info elv-info-warn">Not compatible with <code>setLiquidOptions</code> above—this method will ignore any configuration set there.</div>

```js
module.exports = function(eleventyConfig) {
  let liquidJs = require("liquidjs");
  let options = {
    extname: ".liquid",
    dynamicPartials: true,
    root: ["_includes"]
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                                                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include                                                                   | `{% raw %}{% include user %}{% endraw %}` looks for `_includes/user.liquid`                                                                             |
| ✅ Include                                                                   | `{% raw %}{% include 'user' %}{% endraw %}` looks for `_includes/user.liquid` (quotes around includes require `dynamicPartials: true`—read more at #72) |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user' with 'Ava' %}{% endraw %}`                                                                                                  |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user', user1: 'Ava', user2: 'Bill' %}{% endraw %}`                                                                                |
| ✅ Custom Filters                                                            | `{% raw %}{{ name | upper }}{% endraw %}`  Read more about [Filters](/docs/filters/)                                                         |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/)                                                          |
| ✅ [Custom Tags](/docs/custom-tags/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Custom Tags](/docs/custom-tags/). {% addedin "0.5.0", "span" %}|
| ✅ [Shortcodes](/docs/shortcodes/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0", "span" %}|

## Filters

Filters are used to transform or modify content. You can add Liquid specific filters, but you probably want to add a [Universal filter](/docs/filters/) instead.

Read more about [LiquidJS Filter syntax](https://github.com/harttle/liquidjs#register-filters)

```js
module.exports = function(eleventyConfig) {
  // Liquid Filter
  eleventyConfig.addLiquidFilter("myLiquidFilter", function(value) { … });
  
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(value) { … });
};
```

### Usage

{% raw %}
```html
<h1>{{ myVariable | myFilter }}</h1>
```
{% endraw %}

## Shortcodes

Shortcodes are basically reusable bits of content. You can add Liquid specific shortcodes, but you probably want to add a [Universal shortcode](/docs/shortcodes/) instead.

### Single Shortcode

```js
module.exports = function(eleventyConfig) {
  // Liquid Shortcode
  eleventyConfig.addLiquidShortcode("user", function(firstName, lastName) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });
};
```

#### Usage

{% raw %}
```html
<h1>{% user "Zach" "Leatherman" %}</h1>
```
{% endraw %}

### Paired Shortcode

```js
module.exports = function(eleventyConfig) {
  // Liquid Shortcode
  eleventyConfig.addPairedLiquidShortcode("user", function(content, firstName, lastName) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks)
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```

#### Usage

{% raw %}
```html
{% user "Zach" "Leatherman" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser %}
```
{% endraw %}
