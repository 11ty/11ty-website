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

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "filter"} %}
  <div id="filter-njk" role="tabpanel">
    {% codetitle "sample.njk" %}
{%- highlight "html" %}{% raw %}
<h1>{{ name | makeUppercase }}</h1>
{% endraw %}{% endhighlight %}
  </div>
  <div id="filter-liquid" role="tabpanel">
    {% codetitle "sample.liquid" %}
{%- highlight "html" %}{% raw %}
<h1>{{ name | makeUppercase }}</h1>
{% endraw %}{% endhighlight %}
  </div>
  <div id="filter-js" role="tabpanel">
    {% codetitle "sample.11ty.js" %}
{%- highlight "js" %}{% raw %}
module.exports = function({name}) {
  return `<h1>${this.makeUppercase(name)}</h1>`;
};
{% endraw %}{% endhighlight %}
  </div>
  <div id="filter-hbs" role="tabpanel">
    {% codetitle "sample.hbs" %}
{%- highlight "html" %}{% raw %}
<h1>{{ makeUppercase name }}</h1>
{% endraw %}{%- endhighlight %}
  </div>
</seven-minute-tabs>
</is-land>

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

  // JavaScript Template Function
  eleventyConfig.addJavaScriptFunction("makeUppercase", function(value) { … });

  // or, use a Universal filter (an alias for all of the above)
  eleventyConfig.addFilter("makeUppercase", function(value) { … });

  // New in 2.0.0-canary.15
  eleventyConfig.addAsyncFilter("makeUppercase", async function(value) { … });
};
```

Read more about filters on the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["njk", "liquid", "hbs", "11ty.js"], "#filters" %}

## Universal Filters

Universal filters can be added in a single place and are available to multiple template engines, simultaneously. This is currently supported in JavaScript, Nunjucks, Liquid, Handlebars, and WebC.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Universal filters add to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript

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

### Asynchronous Universal Filters {% addedin "2.0.0" %}

Eleventy has added a new universal filter API for asynchronous filters and extended the currently available `addFilter` method to be async-friendly. _Note that even though Handlebars is used for synchronous filters in `addFilter`, it is excluded from asynchronous filters because Handlebars is not async-friendly._

If you are not yet on Eleventy 2.0, you can still add asynchronous filters to each async-friendly template language individually: [Liquid `addLiquidFilter`](/docs/languages/liquid/#filters), [Nunjucks `addNunjucksAsyncFilter`](/docs/languages/nunjucks/#asynchronous-nunjucks-filters), and [JavaScript `addJavaScriptFunction`](/docs/languages/javascript/#asynchronous-javascript-template-functions).

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Async universal filters add to:
  // * Liquid
  // * Nunjucks
  // * JavaScript

  eleventyConfig.addFilter("myFilter", async function(value) {
    // do some Async work
    return value;
  });

  eleventyConfig.addAsyncFilter("myFilter", async function(value) {
    // do some Async work
    return value;
  });
};
```

<div class="youtube-related">
  {%- youtubeEmbed "hJAtWQ9nmKU", "Universal Asynchronous Filters (Nunjucks improvement) (Changelog №17)", "774" -%}
</div>

## Scoped Data in Filters

A few Eleventy-specific data properties are available to filter callbacks.

* `this.page` {% addedin "2.0.0-canary.19" %}
* `this.eleventy` {% addedin "2.0.0-canary.19" %}

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Make sure you’re not using an arrow function here: () => {}
  eleventyConfig.addFilter("myFilter", function() {
    // this.page
    // this.eleventy
  });
};
```