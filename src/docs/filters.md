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

{% tableofcontents %}

A <dfn>filter</dfn> is a function which can be used within templating syntax to transform data into a more presentable format. Filters are typically designed to be chained, so that the value returned from one filter is piped into the next filter.

Various template engines can be extended with custom filters to modify content. Here are a few examples:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
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

Filters can be added using the [Configuration API](/docs/config/#using-the-configuration-api) and are available to multiple template engines, simultaneously. They are currently supported in JavaScript {% addedin "0.7.0" %}, Markdown, Nunjucks, Liquid, Handlebars, and WebC.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("makeUppercase", function(value) { … });

  // New in {{ "2.0.0-canary.15" | coerceVersion }}
  eleventyConfig.addAsyncFilter("makeUppercase", async function(value) { … });
};
```

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any filters available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the filters available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about filters on the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["njk", "liquid", "hbs", "11ty.js"], "#filters" %}

## Eleventy Provided Filters

We also provide a few universal filters, built-in:

{{ collections.all | eleventyNavigation("Filters") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}

### Access existing filters in your Configuration File {% addedin "0.11.0" %}

If you’d like to reuse existing filters, you can use the Configuration API’s `getFilter` method. When called with a valid filter name, it will return that filter’s callback function. It can be helpful when aliasing a filter to a different name, using a filter inside of your own filter, or using a filter inside of a shortcode.

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("myCustomImage", function (url, alt) {
		return `<img src="${eleventyConfig.getFilter("url")(url)}" alt="${alt}">`;
	});
};
```

## Asynchronous Filters {% addedin "2.0.0" %}

Eleventy has added a new universal filter API for asynchronous filters and extended the currently available `addFilter` method to be async-friendly. _Note that even though Handlebars is used for synchronous filters in `addFilter`, it is excluded from asynchronous filters because Handlebars is not async-friendly._

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Async universal filters add to:
	// * Liquid
	// * Nunjucks
	// * JavaScript

	eleventyConfig.addFilter("myFilter", async function (value) {
		// do some Async work
		return value;
	});

	eleventyConfig.addAsyncFilter("myFilter", async function (value) {
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

- `this.page` {% addedin "2.0.0-canary.19" %}
- `this.eleventy` {% addedin "2.0.0-canary.19" %}

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Make sure you’re not using an arrow function here: () => {}
	eleventyConfig.addFilter("myFilter", function () {
		// this.page
		// this.eleventy
	});
};
```

## Per-Engine filters

Filters can also be specified individually for one or more template engines. (The `addFilter` function is actually an alias for calling all of these functions.)

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Liquid Filter (async-friendly)
  eleventyConfig.addLiquidFilter("myFilter", async function(value) { … });

  // Nunjucks Filter
  eleventyConfig.addNunjucksFilter("myFilter", function(value) { … });

  // Nunjucks Async Filter
  // Read the Nunjucks docs before using this (link below)
  eleventyConfig.addNunjucksAsyncFilter("myFilter", function() { … });

  // Handlebars Filter (no async support)
  eleventyConfig.addHandlebarsHelper("myFilter", function(value) { … });

  // JavaScript Template Function (async-friendly)
  eleventyConfig.addJavaScriptFunction("myFilter", async function(value) { … });
};
```

Note that [Nunjucks `addNunjucksAsyncFilter`](/docs/languages/nunjucks/#asynchronous-nunjucks-filters) requires the use of callbacks for async behavior. Make sure you read up on it!

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any filters available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the filters available for that templating language will also be available in Markdown files.
{% endcallout %}

## From the Community

{% include "11tybundle.njk" %}
