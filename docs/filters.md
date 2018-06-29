---
subtitle: Filters
menuSectionName: docs-filters
relatedKey: filters
relatedTitle: Template Engine Filters
tags:
  - docs-config
  - related-custom-tags
  - related-shortcodes
---
# Filters

Various template engines can be extended with custom filters or helpers.

This can be customized using the [Configuration API](/docs/config/#using-the-configuration-api). Here are a few examples:

```js
module.exports = function(eleventyConfig) {
  // Liquid Filter
  eleventyConfig.addLiquidFilter("myLiquidFilter", function(value) { … });
  
  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("myNjkFilter", function(value) { … });
  
  // Handlebars Filter
  eleventyConfig.addHandlebarsHelper("myNjkFilter", function(value) { … });
  
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(value) { … });
};
```

Read more about filters at the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["njk", "liquid", "hbs"], "#filters" %}

### Template Example Usage

{% raw %}
```html
<!-- Nunjucks and Liquid use the same syntax -->
<h1>{{ name | myFilter }}</h1>
```
{% endraw %}

{% raw %}
```html
<!-- Handlebars -->
<h1>{{ myFilter name }}</h1>
```
{% endraw %}

## Universal Filters

Universal filters can be added in a single place and are available to multiple template engines, simultaneously. This is currently supported in Nunjucks, Liquid, and Handlebars.

```js
module.exports = function(eleventyConfig) {
  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(value) {
    return value;
  });
};
```

### Eleventy Provided Universal Filters

We also provide a few universal filters, built-in:

* [`url`](/docs/filters/url/): normalize absolute paths in your content, allows easily changing deploy subdirectories for your project. [Read more →](/docs/filters/url/)
* [`slug`](/docs/filters/slug/): `"My string"` to `"my-string"` for permalinks. [Read more →](/docs/filters/slug/)

