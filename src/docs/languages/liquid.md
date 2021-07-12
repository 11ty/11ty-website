---
eleventyNavigation:
  parent: Template Languages
  key: Liquid
  order: 6
relatedKey: liquid
relatedTitle: Template Language—Liquid
tags:
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

Rather than constantly fixing outdated documentation, [find `getLiquidOptions` in `Liquid.js`](https://github.com/11ty/eleventy/blob/master/src/Engines/Liquid.js). These options are different than the [default `liquidjs` options](https://liquidjs.com/tutorials/options.html).

### Optional: Use your own options {% addedin "0.2.15" %}

It’s recommended to use the Configuration API to override the default options above.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });
};
```

### Optional: Set your own Library instance {% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of the Liquid library using the Configuration API. See [all `liquidjs` options](https://github.com/harttle/liquidjs#options).

<div class="elv-callout elv-callout-warn">Not compatible with <code>setLiquidOptions</code> above—this method will override any configuration set there.</div>

```js
module.exports = function(eleventyConfig) {
  let liquidJs = require("liquidjs");
  let options = {
    extname: ".liquid",
    dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
    root: ["_includes"]
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                                                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include                                                                   | `{% raw %}{% include user %}{% endraw %}` looks for `_includes/user.liquid`. Does not process front matter in the include file.                                                                             |
| ✅ Includes (Relative Path) {% addedin "0.9.0" %}                                                                   | Relative paths use `./` (template’s directory) or `../` (template’s parent directory): `{% raw %}{% include ./included %}{% endraw %}` looks for `included.liquid` in the template’s current directory. Does not process front matter.<br><br>{% callout "warn" %}If `_includes/included.liquid` also exists, Liquid will use this file instead.{% endcallout %}        |
| ✅ Include (Quoted)                                                                   |{% callout "info" %}Starting in Eleventy 1.0, Liquid includes without quotation marks require `dynamicPartials: false`—Read more at [Quoted Include Paths](#quoted-include-paths).{% endcallout %}`{% raw %}{% include 'user' %}{% endraw %}` looks for `_includes/user.liquid`. Does not process front matter in the include file. |
| ✅ Include (Relative Path, Quoted) {% addedin "0.9.0" %}                                                                   |{% callout "info" %}Starting in Eleventy 1.0, Liquid includes without quotation marks require `dynamicPartials: false`—Read more at [Quoted Include Paths](#quoted-include-paths).{% endcallout %}Relative paths use `./` (template’s directory) or `../` (template’s parent directory): `{% raw %}{% include './dir/user' %}{% endraw %}` looks for `./dir/user.liquid` from the template’s current directory. Does not process front matter in the include file.<br><br>{% callout "warn" %}If `_includes/dir/user.liquid` also exists, Liquid will use this file instead.{% endcallout %} |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user' with 'Ava' %}{% endraw %}`. Does not process front matter in the include file.                                                                                                  |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user', user1: 'Ava', user2: 'Bill' %}{% endraw %}`. Does not process front matter in the include file.                                                                                |
| ✅ Custom Filters                                                            | `{% raw %}{{ name | upper }}{% endraw %}`  Read more about [Filters](/docs/filters/)                                                         |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/)                                                          |
| ✅ [Custom Tags](/docs/custom-tags/) {% addedin "0.5.0" %} | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Custom Tags](/docs/custom-tags/).|
| ✅ [Shortcodes](/docs/shortcodes/) {% addedin "0.5.0" %} | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/).|

### Quoted Include Paths

<div class="elv-callout elv-callout-warn">This is a common pitfall if you’re using Liquid templates.</div>

If you’d like to use include paths without quotation marks, you must enable `dynamicPartials: false` in your Liquid options. The [default in Eleventy 1.0 (and `liquidjs`) swapped from `false` to `true`](https://github.com/11ty/eleventy/issues/240). Read more about this limitation at [Issue #72](https://github.com/11ty/eleventy/issues/72).

#### Default behavior, `dynamicPartials: true`

`{% raw %}{% include 'user' %}{% endraw %}` looks for `_includes/user.liquid`

#### Non-quoted includes with `dynamicPartials: false`

`{% raw %}{% include user %}{% endraw %}` looks for `_includes/user.liquid`

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

### Shortcode

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Liquid Shortcode
  // These can be async functions too
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

`liquidjs` is already `Promise`-based internally, so an `async function` for a shortcode function works out of the box here.

#### Usage

{% raw %}
```html
{% user "Zach Leatherman", "zachleat" %}

<!-- The comma between arguments is optional in Liquid templates -->
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
  // These can be async functions too
  eleventyConfig.addPairedLiquidShortcode("user2", function(bioContent, name, twitterUsername) { … });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, Handlebars)
  eleventyConfig.addPairedShortcode("user2", function(bioContent, name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
<div class="user_bio">${bioContent}</div>
</div>`;
  });
};
```

`liquidjs` is already `Promise`-based internally, so an `async function` for a shortcode function works out of the box here.

#### Usage

Note that you can put any Liquid tags or content inside the `{% raw %}{% user %}{% endraw %}` shortcode! Yes, even other shortcodes!

{% raw %}
```html
{% user2 "Zach Leatherman" "zachleat" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser2 %}
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

### Asynchronous Shortcodes

Liquid is already promise-based internally so `async` functions with `await` work fine out of the box.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addLiquidShortcode("user", async function(name, twitterUsername) {
    return await fetchAThing();
  });

  eleventyConfig.addPairedShortcode("user2", async function(content, name, twitterUsername) {
    return await fetchAThing();
  });
};
```

#### Usage

(It’s the same.)

{% raw %}
```html
{% user "Zach Leatherman" "zachleat" %}

{% user2 "Zach Leatherman" "zachleat" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser2 %}
```
{% endraw %}

### Access to `page` data values {% addedin "0.11.0" %}

If you aren’t using an arrow function, Liquid Shortcodes (and Nunjucks, Handlebars, and 11ty.js JavaScript Functions) will have access to Eleventy [`page` data values](/docs/data-eleventy-supplied/#page-variable-contents) without needing to pass them in as arguments.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addLiquidShortcode("myShortcode", function() {
    // Available in 0.11.0 and above
    console.log( this.page );

    // For example:
    console.log( this.page.url );
    console.log( this.page.inputPath );
    console.log( this.page.fileSlug );
  });
};
```
