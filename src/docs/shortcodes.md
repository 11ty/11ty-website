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

Various template engines can be extended with shortcodes for easy reusable content. This is sugar around Template Language [Custom Tags](/docs/custom-tags/). Shortcodes are supported in JavaScript, Liquid, Nunjucks, Handlebars templates. Here are a few examples:

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#shortcode-njk" role="tab">Nunjucks</a>
    <a href="#shortcode-liquid" role="tab">Liquid</a>
    <a href="#shortcode-hbs" role="tab">Handlebars</a>
    <a href="#shortcode-11tyjs" role="tab">11ty.js</a>
  </div>
  <div id="shortcode-njk" role="tabpanel">
    {% codetitle "sample.njk" %}
{%- highlight "html" %}{% raw %}
{% user firstName, lastName %}
{% endraw %}{% endhighlight %}
    <p>The comma between arguments is <strong>required</strong> in Nunjucks templates.</p>
  </div>
  <div id="shortcode-liquid" role="tabpanel">
    {% codetitle "sample.liquid" %}
{%- highlight "html" %}{% raw %}
{% user firstName, lastName %}
{% endraw %}{% endhighlight %}
    <p>The comma between arguments is <strong>optional</strong> in Liquid templates.</p>
    {% codetitle "sample.liquid" %}
{%- highlight "html" %}{% raw %}
{% user firstName lastName %}
{% endraw %}{% endhighlight %}
  </div>
  <div id="shortcode-hbs" role="tabpanel">
    {% codetitle "sample.hbs" %}
{%- highlight "html" %}{% raw %}
<!-- Note the three opening and closing curly brackets (the triple-stash) -->
{{{ user firstName lastName }}}
{% endraw %}{%- endhighlight %}
    {% callout "info" %}Note that if you return HTML in your Handlebars shortcode, you need to use the Handlebars triple-stash syntax (three opening and three closing curly brackets, e.g. <code>{% raw %}{{{ shortcodeName }}}{% endraw %}</code>) to avoid double-escaped HTML. If it’s double-escaped a paragraph tag may render as <code>&amp;lt;p&amp;gt;</code>{% endcallout %}
  </div>
  <div id="shortcode-11tyjs" role="tabpanel">
    {% codetitle "sample.11ty.js" %}
{%- highlight "js" %}{% raw %}
module.exports = function({ firstName, lastName }) {
  return `<h1>${this.user(firstName, lastName)}</h1>`;
};
{% endraw %}{% endhighlight %}
  </div>
</seven-minute-tabs>

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default. This means that shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

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

  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript
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

The shortcodes we saw above were nice, I suppose. But really, they are not all that different from a filter. The real ultimate power of Shortcodes comes when they are paired. Paired Shortcodes have a start and end tag—and allow you to nest other template content inside!

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

  // JavaScript Template Function
  eleventyConfig.addJavaScriptFunction("user", function(content, firstName, lastName) { … });

  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```

Read more about using paired shortcodes on the individual Template Language documentation pages:

* [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
* [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
* [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)
* [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes)

## Universal Shortcodes

Universal shortcodes are added in a single place and subsequently available to multiple template engines, simultaneously. This is currently supported in JavaScript, Nunjucks, Liquid, and Handlebars template types.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript

  // Single Universal Shortcode
  eleventyConfig.addShortcode("myShortcode", function(firstName, lastName) { … });

  // Paired Universal Shortcode
  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });
};
```
