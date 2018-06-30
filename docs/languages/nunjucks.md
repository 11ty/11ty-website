---
subtitle: Nunjucks
relatedKey: nunjucks
relatedTitle: Template Language—Nunjucks
tags:
  - related-filters
  - related-shortcodes
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `njk`               | `.njk`         | [`nunjucks`](https://mozilla.github.io/nunjucks/) |

You can override a `.njk` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Nunjucks Options

### Optional: Use your Nunjucks Environment

{% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of a [Nunjucks Environment](https://mozilla.github.io/nunjucks/api.html#environment) using the Configuration API.

```js
module.exports = function(eleventyConfig) {
  let Nunjucks = require("nunjucks");
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("_includes")
  );

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ✅ Includes                                                                  | `{% raw %}{% include 'included.njk' %}{% endraw %}` looks in `_includes/included.njk`          |
| ✅ Extends                                                                   | `{% raw %}{% extends 'base.njk' %}{% endraw %}` looks in `_includes/base.njk`                  |
| ✅ Imports                                                                   | `{% raw %}{% import 'macros.njk' %}{% endraw %}` looks in `_includes/macros.njk`               |
| ✅ Filters                                                                   | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/).                                |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/). |
| ✅ [Custom Tags](/docs/custom-tags/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Custom Tags](/docs/custom-tags/). {% addedin "0.5.0", "span" %}|
| ✅ [Shortcodes](/docs/shortcodes/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0", "span" %}|

## Filters

Filters are used to transform or modify content. You can add Nunjucks specific filters, but you probably want to add a [Universal filter](/docs/filters/) instead.

Read more about [Nunjucks Filter syntax](https://mozilla.github.io/nunjucks/templating.html#filters).

```js
module.exports = function(eleventyConfig) {
  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("myNjkFilter", function(value) { … });
  
  // Nunjucks Asynchronous Filter (read on below)
  eleventyConfig.addNunjucksAsyncFilter("myAsyncNjkFilter", function(value, callback) { … });
  
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

### Asynchronous Nunjucks Filters

{% addedin "0.2.13" %}

By default, almost all templating engines are synchronous. Nunjucks supports some asynchronous behavior, like filters. Here’s how that works:

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncFilter("myAsyncFilter", function(value, callback) {
    window.setTimeout(function() {
      callback(null, "My Result");
    }, 100);
  });
};
```

The last argument here is the callback function, the first argument of which is the error object and the second is the result data. Use this filter like you would any other: `{% raw %}{{ myValue | myAsyncFilter }}{% endraw %}`.

Here’s a Nunjucks example with 2 arguments:

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncFilter("myAsyncFilter", function(value1, value2, callback) {
    window.setTimeout(function() {
      callback(null, "My Result");
    }, 100);
  });
};
```

Multi-argument filters in Nunjucks are called like this: `{% raw %}{{ myValue1 | myAsyncFilter(myValue2) }}{% endraw %}`.

## Shortcodes

Shortcodes are basically reusable bits of content. You can add Nunjucks specific shortcodes, but you probably want to add a [Universal shortcode](/docs/shortcodes/) instead.

### Single Shortcode

```js
module.exports = function(eleventyConfig) {
  // Nunjucks Shortcode
  eleventyConfig.addNunjucksShortcode("user", function(firstName, lastName) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });
};
```

#### Usage

{% raw %}
```html
<h1>{% user "Zach", "Leatherman" %}</h1>
```
{% endraw %}

### Paired Shortcode

```js
module.exports = function(eleventyConfig) {
  // Nunjucks Shortcode
  eleventyConfig.addPairedNunjucksShortcode("user", function(content, firstName, lastName) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks)
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```

#### Usage

{% raw %}
```html
{% user "Zach", "Leatherman" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser %}
```
{% endraw %}
