---
subtitle: Liquid
relatedKey: liquid
relatedTitle: Template Language—Liquid
tags:
  - docs-languages
  - related-filters
  - related-shortcodes
  - related-custom-tags
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                          |
| ------------------- | -------------- | ---------------------------------------------------- |
| `liquid`            | `.liquid`      | [`liquidjs`](https://www.npmjs.com/package/liquidjs) |

You can override a `.liquid` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Liquid Options

### Default Options

Rather than constantly fixing outdated documentation, [find `getLiquidOptions` in `Liquid.js`](https://github.com/11ty/eleventy/blob/master/src/Engines/Liquid.js). These options are different than the [default `liquidjs` options](https://github.com/harttle/liquidjs#options).

### Optional: Use your own options {% addedin "0.2.15", "span" %}

It’s recommended to use the Configuration API to set override the default options above.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });
};
```

### Optional: Set your own Library instance {% addedin "0.3.0", "span" %}

As an escape mechanism for advanced usage, pass in your own instance of the Liquid library using the Configuration API. See [all `liquidjs` options](https://github.com/harttle/liquidjs#options).

<div class="elv-callout elv-callout-warn">Not compatible with <code>setLiquidOptions</code> above—this method will override any configuration set there.</div>

```js
module.exports = function(eleventyConfig) {
  let liquidJs = require("liquidjs");
  let options = {
    extname: ".liquid",
    dynamicPartials: true,
    strict_filters: true,
    root: ["_includes"]
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                                                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include                                                                   | `{% raw %}{% include user %}{% endraw %}` looks for `_includes/user.liquid`                                                                             |
| ✅ Include                                                                   | `{% raw %}{% include 'user' %}{% endraw %}` looks for `_includes/user.liquid` (quotes around includes require `dynamicPartials: true`—Read more at [Quoted Include Paths](#quoted-include-paths)) (does not process front matter in the include file) |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user' with 'Ava' %}{% endraw %}` (does not process front matter in the include file)                                                                                                  |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user', user1: 'Ava', user2: 'Bill' %}{% endraw %}` (does not process front matter in the include file)                                                                                |
| ✅ Custom Filters                                                            | `{% raw %}{{ name | upper }}{% endraw %}`  Read more about [Filters](/docs/filters/)                                                         |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/)                                                          |
| ✅ [Custom Tags](/docs/custom-tags/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Custom Tags](/docs/custom-tags/). {% addedin "0.5.0", "span" %}|
| ✅ [Shortcodes](/docs/shortcodes/) | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0", "span" %}|

### Quoted Include Paths

<div class="elv-callout elv-callout-warn">This is a common pitfall if you’re using Liquid templates.</div>

If you’d like to use quoted include paths, you must enable `dynamicPartials: true` in your Liquid options. This [default may change in a future major version](https://github.com/11ty/eleventy/issues/240). Read more about this limitation at [Issue #72](https://github.com/11ty/eleventy/issues/72).

#### Default behavior, `dynamicPartials: false`

`{% raw %}{% include user %}{% endraw %}` looks for `_includes/user.liquid`

#### Quoted includes with `dynamicPartials: true`

`{% raw %}{% include 'user' %}{% endraw %}` looks for `_includes/user.liquid`

## Filters

Filters are used to transform or modify content. You can add Liquid specific filters, but you probably want to add a [Universal filter](/docs/filters/) instead.

Read more about [LiquidJS Filter syntax](https://github.com/harttle/liquidjs#register-filters)

```js
module.exports = function(eleventyConfig) {
  // Liquid Filter
  eleventyConfig.addLiquidFilter("myLiquidFilter", function(myVariable) { … });
  
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(myVariable) { … });
};
```

### Usage

{% raw %}
```html
<h1>{{ myVariable | myFilter }}</h1>
```
{% endraw %}

### Multiple Filter Arguments

```js
module.exports = function(eleventyConfig) {
  // Liquid Filter
  eleventyConfig.addLiquidFilter("concatThreeStrings", function(arg1, arg2, arg3) {
    return arg1 + arg2 + arg3;
  });
};
```

{% raw %}
```html
<h1>{{ "first" | concatThreeThings: "second", "third" }}</h1>
```
{% endraw %}

## Shortcodes

Shortcodes are basically reusable bits of content. You can add Liquid specific shortcodes, but you probably want to add a [Universal shortcode](/docs/shortcodes/) instead.

### Single Shortcode

```js
module.exports = function(eleventyConfig) {
  // Liquid Shortcode
  eleventyConfig.addLiquidShortcode("user", function(name, twitterUsername) { … });
  
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
{% user "Zach Leatherman" "zachleat" %}
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
  // Liquid Shortcode
  eleventyConfig.addPairedLiquidShortcode("user", function(bioContent, name, twitterUsername) { … });
  
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

Note that you can put any Liquid tags or content inside the `{% raw %}{% user %}{% endraw %}` shortcode! Yes, even other shortcodes!

{% raw %}
```html
{% user "Zach Leatherman" "zachleat" %}
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