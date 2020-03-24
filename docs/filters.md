---
eleventyNavigation:
  parent: Configuration
  key: Filters
  order: 3
relatedKey: filters
relatedTitle: Template Filters
tags:
  - related-shortcodes
  - related-nunjucks
  - related-liquid
  - related-handlebars
  - related-javascript
---
# Filters

Various template engines can be extended with custom filters to modify content. Here’s an example:

{% codetitle "Nunjucks or Liquid", "Syntax" %}

{% raw %}
```html
<h1>{{ name | makeUppercase }}</h1>
```
{% endraw %}

{% codetitle "Handlebars", "Syntax" %}

{% raw %}
```html
<h1>{{ makeUppercase name }}</h1>
```
{% endraw %}

{% codetitle "JavaScript", "Syntax" %}
{% addedin "0.7.0" %}

```js
module.exports = function({name}) {
  return `<h1>${this.makeUppercase(name)}</h1>`;
};
```

These can be added using the [Configuration API](/docs/config/#using-the-configuration-api). Here are a few examples:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Liquid Filter
  eleventyConfig.addLiquidFilter("makeUppercase", function(value) { … });
  
  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("makeUppercase", function(value) { … });
  
  // Handlebars Filter
  eleventyConfig.addHandlebarsHelper("makeUppercase", function(value) { … });

  // JavaScript Template Function (New in 0.7.0)
  eleventyConfig.addJavaScriptFunction("makeUppercase", function(value) { … });
  
  // or, use a Universal filter (an alias for all of the above)
  eleventyConfig.addFilter("makeUppercase", function(value) { … });
};
```

Read more about filters on the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["njk", "liquid", "hbs", "11ty.js"], "#filters" %}

## Universal Filters

Universal filters can be added in a single place and are available to multiple template engines, simultaneously. This is currently supported in JavaScript (New in 0.7.0), Nunjucks, Liquid, and Handlebars.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Universal filters add to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript (New in 0.7.0)

  eleventyConfig.addFilter("myFilter", function(value) {
    return value;
  });
};
```

### Eleventy Provided Universal Filters

We also provide a few universal filters, built-in:

{{ collections.all | eleventyNavigation("Filters") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}

