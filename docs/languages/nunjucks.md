---
subtitle: Nunjucks
relatedKey: nunjucks
relatedTitle: Template Language—Nunjucks
tags:
  - docs-languages
  - related-filters
  - related-shortcodes
  - related-custom-tags
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `njk`               | `.njk`         | [`nunjucks`](https://mozilla.github.io/nunjucks/) |

You can override a `.njk` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Nunjucks Options

### Optional: Use your Nunjucks Environment {% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of a [Nunjucks Environment](https://mozilla.github.io/nunjucks/api.html#environment) using the Configuration API.

```js
let Nunjucks = require("nunjucks");

module.exports = function(eleventyConfig) {
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("_includes")
  );

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ✅ Includes                                                                  | `{% raw %}{% include 'included.njk' %}{% endraw %}` looks in `_includes/included.njk`. Does not process front matter.         |
| ✅ Relative Includes                                                                   | Relative paths use `./` (template’s directory) or `../` (template’s parent directory):<br>`{% raw %}{% include './included.njk' %}{% endraw %}` looks for `included.njk` in the template’s current directory. Does not process front matter. {% addedin "0.8.4" %}         |
| ✅ Extends                                                                   | `{% raw %}{% extends 'base.njk' %}{% endraw %}` looks in `_includes/base.njk`. Does not process front matter.                  |
| ✅ Relative Extends                                                                   | Relative paths use `./` (template’s directory) or `../` (template’s parent directory):<br>`{% raw %}{% extends './base.njk' %}{% endraw %}` looks for `base.njk` in the template’s current directory. Does not process front matter. {% addedin "0.8.4" %}                  |
| ✅ Imports                                                                   | `{% raw %}{% import 'macros.njk' %}{% endraw %}` looks in `_includes/macros.njk`. Does not process front matter.               |
| ✅ Relative Imports                                                                   | Relative paths use `./` (template’s directory) or `../` (template’s parent directory):<br>`{% raw %}{% import './macros.njk' %}{% endraw %}` looks for `macros.njk` in the template’s current directory. Does not process front matter. {% addedin "0.8.4" %}               |
| ✅ Filters                                                                   | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/).                                |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/). |
| ✅ [Custom Tags](/docs/custom-tags/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Custom Tags](/docs/custom-tags/). {% addedin "0.5.0" %}|
| ✅ [Shortcodes](/docs/shortcodes/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0" %}|

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

### Asynchronous Nunjucks Filters {% addedin "0.2.13" %}

By default, almost all templating engines are synchronous. Nunjucks supports some asynchronous behavior, like filters. Here’s how that works:

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncFilter("myAsyncFilter", function(value, callback) {
    setTimeout(function() {
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
    setTimeout(function() {
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
  eleventyConfig.addNunjucksShortcode("user", function(name, twitterUsername) { … });
  
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
{% user "Zach Leatherman", "zachleat" %}
```
{% endraw %}

#### Outputs

```html
<div class="user">
  <div class="user_name">Zach Leatherman</div>
  <div class="user_twitter">@zachleat</div>>
</div>
```

### Paired Shortcode

```js
module.exports = function(eleventyConfig) {
  // Nunjucks Shortcode
  eleventyConfig.addPairedNunjucksShortcode("user", function(bioContent, name, twitterUsername) { … });
  
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

Note that you can put any Nunjucks tags or content inside the `{% raw %}{% user %}{% endraw %}` shortcode! Yes, even other shortcodes!

{% raw %}
```html
{% user "Zach Leatherman", "zachleat" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser %}
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

### Shortcode Named Argument Syntax (Nunjucks-only)

Creates a single argument object to pass to the shortcode.

```js
module.exports = function(eleventyConfig) {
  // Nunjucks Shortcode
  eleventyConfig.addNunjucksShortcode("user", function(user) {
    return `<div class="user">
<div class="user_name">${user.name}</div>
${user.twitter ? `<div class="user_twitter">@${user.twitter}</div>` : ''}
</div>`;
  });
};
```

#### Usage

The order of the arguments doesn’t matter.

{% raw %}
```html
{% user name="Zach Leatherman", twitter="zachleat" %}
{% user twitter="zachleat", name="Zach Leatherman" %}
```
{% endraw %}

##### Outputs

```html
<div class="user">
  <div class="user_name">Zach Leatherman</div>
  <div class="user_twitter">@zachleat</div>
</div>
```

#### Usage

Importantly, this syntax means that any of the arguments can be optional (without having to pass in a bunch of `null, null, null` to maintain order).

{% raw %}
```html
{% user name="Zach Leatherman" %}
```
{% endraw %}

##### Outputs

```html
<div class="user">
  <div class="user_name">Zach Leatherman</div>
</div>
```