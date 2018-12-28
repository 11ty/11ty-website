---
subtitle: Shortcodes
relatedKey: shortcodes
relatedTitle: Template Shortcodes
tags:
  - docs-config
  - related-filters
  - related-custom-tags
  - related-nunjucks
  - related-liquid
  - related-handlebars
  - related-javascript
---
# Shortcodes

{% addedin "0.5.0" %}

Various template engines can be extended with shortcodes for easy reusable content. This is sugar around Template Language [Custom Tags](/docs/custom-tags/). Here’s a few examples:

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```html
{% user firstName lastName %}
```
{% endraw %}

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<!-- Note the comma between arguments -->
{% user firstName, lastName %}
```
{% endraw %}

{% codetitle "Handlebars", "Syntax" %}

{% raw %}
```html
{{ user firstName lastName }}
```
{% endraw %}

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = function({ firstName, lastName }) {
  return `<h1>${this.user(firstName, lastName)}</h1>`;
};
```



Supported in JavaScript, Liquid, Nunjucks, Handlebars templates.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Liquid Shortcode
  eleventyConfig.addLiquidShortcode("user", function(firstName, lastName) { … });
  
  // Nunjucks Shortcode
  eleventyConfig.addNunjucksShortcode("user", function(firstName, lastName) { … });
  
  // Handlebars Shortcode
  eleventyConfig.addHandlebarsShortcode("user", function(firstName, lastName) { … });

  // JavaScript Template Function
  eleventyConfig.addJavaScriptFunction("user", function(firstName, lastName) { … });

  // Universal Shortcodes (Adds to JavaScript, Liquid, Nunjucks, Handlebars)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });
};
```

A shortcode returns content (a JavaScript string or template literal) that is injected into the template. You can use these however you’d like—you could even think of them as reusable components.

Read more about using shortcodes on the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["11ty.js", "njk", "liquid", "hbs"], "#shortcodes" %}

## Paired Shortcodes

The shortcodes we saw above were nice, I suppose. But really, they are not all that different from a filter. The real ultimate power of Shortcodes comes when they are Paired. Paired Shortcodes have a start and end tag—and allow you to nest other template content inside!

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<!-- Note the comma between arguments -->
{% user firstName, lastName %}
  Hello {{ someOtherVariable }}.
  
  Hello {% anotherShortcode %}.
{% enduser %}
```
{% endraw %}

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```html
<!-- Liquid -->
{% user firstName lastName %}
  Hello {{ someOtherVariable }}.
  
  Hello {% anotherShortcode %}.
{% enduser %}
```
{% endraw %}

{% codetitle "Handlebars", "Syntax" %}

{% raw %}
```html
<!-- Handlebars -->
{{# user firstName lastName }}
  Hello {{ someOtherVariable }}.
  
  Hello {{ anotherShortcode }}.
{{/ user }}
```
{% endraw %}

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = function(data) {
  return `<h1>${this.user(`Hello ${data.someOtherVariable}

Hello ${this.anotherShortCode()}`, data.firstName, data.lastName)}</h1>`;
};
```


When adding paired shortcodes using the Configuration API, the first argument to your shortcode callback is the nested content.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Liquid Shortcode
  eleventyConfig.addPairedLiquidShortcode("user", function(content, firstName, lastName) { … });
  
  // Nunjucks Shortcode
  eleventyConfig.addPairedNunjucksShortcode("user", function(content, firstName, lastName) { … });
  
  // Handlebars Shortcode
  eleventyConfig.addPairedHandlebarsShortcode("user", function(content, firstName, lastName) { … });

  // JavaScript Template Function
  eleventyConfig.addJavaScriptFunction("user", function(content, firstName, lastName) { … });
  
  // Universal Shortcodes (Adds to Liquid, Nunjucks, Handlebars)
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```

Read more about using paired shortcodes on the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["11ty.js", "njk", "liquid", "hbs"], "#shortcodes" %}

## Universal Shortcodes

Universal shortcodes are added in a single place and subsequently available to multiple template engines, simultaneously. This is currently supported in JavaScript, Nunjucks, Liquid, and Handlebars template types.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Universal Shortcodes (Adds to JavaScript, Liquid, Nunjucks, Handlebars)
  
  // Single Universal Shortcode
  eleventyConfig.addShortcode("myShortcode", function(firstName, lastName) { … });
  
  // Paired Universal Shortcode
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```
