---
eleventyNavigation:
  parent: Configuration
  key: Shortcodes
  order: 4
relatedKey: shortcodes
relatedTitle: Template Shortcodes
tags:
  - related-filters
  - related-custom-tags
  - related-nunjucks
  - related-liquid
  - related-handlebars
  - related-javascript
---
# Shortcodes {% addedin "0.5.0" %}

Various template engines can be extended with shortcodes for easy reusable content. This is sugar around Template Language [Custom Tags](/docs/custom-tags/). Here’s a few examples:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
{% user firstName, lastName %}
```
{% endraw %}

The comma between arguments is **required** in Nunjucks but is **optional** in Liquid templates.

{% codetitle "Handlebars", "Syntax" %}

{% raw %}
```html
<!-- Note the three opening and closing curly brackets (the triple-stash) -->
{{{ user firstName lastName }}}
```
{% endraw %}

{% callout "info" %}Note that if you return HTML in your Handlebars shortcode, you need to use the Handlebars triple-stash syntax (three opening and three closing curly brackets, e.g. <code>{% raw %}{{{ shortcodeName }}}{% endraw %}</code>) to avoid double-escaped HTML. If it’s double-escaped a paragraph tag may render as <code>&amp;lt;p&amp;gt;</code>{% endcallout %}

{% codetitle "JavaScript", "Syntax" %}
{% addedin "0.7.0" %}

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

  // JavaScript Template Function (New in 0.7.0)
  eleventyConfig.addJavaScriptFunction("user", function(firstName, lastName) { … });

  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript (New in 0.7.0)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });
};
```

A shortcode returns content (a JavaScript string or template literal) that is injected into the template. You can use these however you’d like—you could even think of them as reusable components.

Read more about using shortcodes on the individual Template Language documentation pages:

* [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
* [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
* [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)
* [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes)

## Paired Shortcodes

The shortcodes we saw above were nice, I suppose. But really, they are not all that different from a filter. The real ultimate power of Shortcodes comes when they are Paired. Paired Shortcodes have a start and end tag—and allow you to nest other template content inside!

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
{% user firstName, lastName %}
  Hello {{ someOtherVariable }}.
  
  Hello {% anotherShortcode %}.
{% enduser %}
```
{% endraw %}

The comma between arguments is **required** in Nunjucks but is **optional** in Liquid templates.

{% codetitle "Handlebars", "Syntax" %}

{% raw %}
```html
{{# user firstName lastName }}
  Hello {{ someOtherVariable }}.
  
  Hello {{ anotherShortcode }}.
{{/ user }}
```
{% endraw %}


{% codetitle "JavaScript", "Syntax" %}
{% addedin "0.7.0" %}

```js
module.exports = function(data) {
  let userContent = `Hello ${data.someOtherVariable}

Hello ${this.anotherShortCode()}`;

  return `<h1>${this.user(userContent, data.firstName, data.lastName)}</h1>`;
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

  // JavaScript Template Function (New in 0.7.0)
  eleventyConfig.addJavaScriptFunction("user", function(content, firstName, lastName) { … });

  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript (New in 0.7.0)
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```

Read more about using paired shortcodes on the individual Template Language documentation pages:

* [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
* [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
* [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)
* [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes)

## Universal Shortcodes

Universal shortcodes are added in a single place and subsequently available to multiple template engines, simultaneously. This is currently supported in JavaScript (New in 0.7.0), Nunjucks, Liquid, and Handlebars template types.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript (New in 0.7.0)
  
  // Single Universal Shortcode
  eleventyConfig.addShortcode("myShortcode", function(firstName, lastName) { … });

  // Paired Universal Shortcode
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```
