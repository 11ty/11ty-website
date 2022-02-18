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

A <dfn>filter</dfn> is a function which can be used within templating syntax to transform data into a more presentable format. Filters are typically designed to be chained, so that the value returned from one filter is piped into the next filter.

Various template engines can be extended with custom filters to modify content. Here are a few examples:


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#filter-njk" id="filter-njk-btn" role="tab" aria-controls="filter-njk" aria-selected="true">Nunjucks</a>
    <a href="#filter-liquid" id="filter-liquid-btn" role="tab" aria-controls="filter-liquid" aria-selected="false">Liquid</a>
    <a href="#filter-hbs" id="filter-hbs-btn" role="tab" aria-controls="filter-hbs" aria-selected="false">Handlebars</a>
    <a href="#filter-11tyjs" id="filter-11tyjs-btn" role="tab" aria-controls="filter-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="filter-njk" role="tabpanel" aria-labelledby="filter-njk-btn">
    {% codetitle "sample.njk" %}
{%- highlight "html" %}{% raw %}
<h1>{{ name | makeUppercase }}</h1>
{% endraw %}{% endhighlight %}
  </div>
  <div id="filter-liquid" role="tabpanel" aria-labelledby="filter-liquid-btn">
    {% codetitle "sample.liquid" %}
{%- highlight "html" %}{% raw %}
<h1>{{ name | makeUppercase }}</h1>
{% endraw %}{% endhighlight %}
  </div>
  <div id="filter-hbs" role="tabpanel" aria-labelledby="filter-hbs-btn">
    {% codetitle "sample.hbs" %}
{%- highlight "html" %}{% raw %}
<h1>{{ makeUppercase name }}</h1>
{% endraw %}{%- endhighlight %}
  </div>
  <div id="filter-11tyjs" role="tabpanel" aria-labelledby="filter-11tyjs-btn">
    {% codetitle "sample.11ty.js" %}
{%- highlight "js" %}{% raw %}
module.exports = function({name}) {
  return `<h1>${this.makeUppercase(name)}</h1>`;
};
{% endraw %}{% endhighlight %}
    <p>This feature was {% addedin "0.7.0" %}.</p>
  </div>
</seven-minute-tabs>

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

#### Access existing filters {% addedin "0.11.0" %}

If you’d like to reuse existing filters in a different way, consider using the new Configuration API `getFilter` method. You can use this to alias a filter to a different name. You can use this to use a filter inside of your own filter. You can use this to use a filter inside of a shortcode.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("myCustomImage", function(url, alt) {
    return `<img src="${eleventyConfig.getFilter("url")(url)}" alt="${alt}">`;
  });
};
```
