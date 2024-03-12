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

{% tableofcontents %}

Various template engines can be extended with shortcodes for easy reusable content. This is sugar around Template Language [Custom Tags](/docs/custom-tags/). Shortcodes are supported in JavaScript, Liquid, Nunjucks, and Handlebars templates.

Here are a few examples:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "shortcode"} %}
  <div id="shortcode-liquid" role="tabpanel">
    {% codetitle "sample.liquid" %}
{%- highlight "liquid" %}{% raw %}
{% user firstName, lastName %}
{% endraw %}{% endhighlight %}
    <p>The comma between arguments is <strong>optional</strong> in Liquid templates.</p>
    {% codetitle "sample.liquid" %}
{%- highlight "liquid" %}{% raw %}
{% user firstName lastName %}
{% endraw %}{% endhighlight %}
  </div>
  <div id="shortcode-njk" role="tabpanel">
    {% codetitle "sample.njk" %}
{%- highlight "jinja2" %}{% raw %}
{% user firstName, lastName %}
{% endraw %}{% endhighlight %}
    <p>The comma between arguments is <strong>required</strong> in Nunjucks templates.</p>
  </div>
  <div id="shortcode-js" role="tabpanel">
    {% codetitle "sample.11ty.js" %}
{%- highlight "js" %}{% raw %}
module.exports = function({ firstName, lastName }) {
  return `<h1>${this.user(firstName, lastName)}</h1>`;
};
{% endraw %}{% endhighlight %}
  </div>
  <div id="shortcode-hbs" role="tabpanel">
    {% codetitle "sample.hbs" %}
{%- highlight "handlebars" %}{% raw %}
<!-- Note the three opening and closing curly brackets (the triple-stash) -->
{{{ user firstName lastName }}}
{% endraw %}{%- endhighlight %}
    {% callout "info" %}Note that if you return HTML in your Handlebars shortcode, you need to use the Handlebars triple-stash syntax (three opening and three closing curly brackets, e.g. <code>{% raw %}{{{ shortcodeName }}}{% endraw %}</code>) to avoid double-escaped HTML. If it’s double-escaped a paragraph tag may render as <code>&amp;lt;p&amp;gt;</code>{% endcallout %}
  </div>
</seven-minute-tabs>
</is-land>

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Shortcodes added in this way are available in:
  // * Markdown
  // * Liquid
  // * Nunjucks
  // * Handlebars (not async)
  // * JavaScript

  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });

  // Async support for `addShortcode` is new in Eleventy {{ "2.0.0-canary.24" | coerceVersion }}
  eleventyConfig.addShortcode("user", async function(myName) { /* … */ });

  // Async method available
  eleventyConfig.addAsyncShortcode("user", async function(myName) { /* … */ });
};
```

A shortcode returns content (a JavaScript string or template literal) that is used in the template. You can use these however you’d like—you could even think of them as reusable components.

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about using shortcodes on the individual Template Language documentation pages:

- [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
- [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
- [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)
- [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes) (no async support)

## Paired Shortcodes

The shortcodes we saw above were nice, I suppose. But really, they are not all that different from a filter. The real ultimate power of Shortcodes comes when they are paired. Paired Shortcodes have a start and end tag—and allow you to nest other template content inside!

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "pairedshortcodes"} %}
  <div id="pairedshortcodes-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% user firstName, lastName %}
  Hello {{ someOtherVariable }}.

  Hello {% anotherShortcode %}.
{% enduser %}
```

{% endraw %}

The comma between arguments is **optional** in Liquid templates.

  </div>
  <div id="pairedshortcodes-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% user firstName, lastName %}
  Hello {{ someOtherVariable }}.

  Hello {% anotherShortcode %}.
{% enduser %}
```

{% endraw %}

The comma between arguments is **required** in Nunjucks.

  </div>
  <div id="pairedshortcodes-hbs" role="tabpanel">

{% codetitle "Handlebars", "Syntax" %}

{% raw %}

```handlebars
{{#user firstName lastName}}
	Hello
	{{someOtherVariable}}. Hello
	{{anotherShortcode}}.
{{/user}}
```

{% endraw %}

  </div>
  <div id="pairedshortcodes-js" role="tabpanel">

```js
module.exports = function (data) {
	let userContent = `Hello ${data.someOtherVariable}

Hello ${this.anotherShortCode()}`;

	// pass the content as the first parameter.
	return `<h1>${this.user(userContent, data.firstName, data.lastName)}</h1>`;
};
```

  </div>
</seven-minute-tabs>
</is-land>

When adding paired shortcodes using the Configuration API, the first argument to your shortcode callback is the nested content.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Shortcodes added in this way are available in:
  // * Markdown
  // * Liquid
  // * Nunjucks
  // * Handlebars (not async)
  // * JavaScript

  eleventyConfig.addPairedShortcode("user", function(content, firstName, lastName) { … });

  // Async support for `addPairedShortcode` is new in Eleventy {{ "2.0.0-canary.24" | coerceVersion }}
  eleventyConfig.addPairedShortcode("user", async function(content, myName) { /* … */ });

  // Async method available
  eleventyConfig.addPairedAsyncShortcode("user", async function(content, myName) { /* … */ });
};
```

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about using paired shortcodes on the individual Template Language documentation pages:

- [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
- [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
- [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)
- [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes) (no async support)

## Asynchronous Shortcodes

This is supported by Liquid, Nunjucks, and JavaScript template types (Handlebars is not async-friendly).

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Async support for `addShortcode` and `addPairedShortcode` is new in Eleventy {{ "2.0.0-canary.24" | coerceVersion }}
	eleventyConfig.addShortcode("single", async function (myName) {
		/* … */
	});
	eleventyConfig.addPairedShortcode("paired", async function (content, myName) {
		/* … */
	});

	// Async methods available in Eleventy v0.10.0+
	eleventyConfig.addAsyncShortcode("single", async function (myName) {
		/* … */
	});
	eleventyConfig.addPairedAsyncShortcode(
		"paired",
		async function (content, myName) {
			/* … */
		}
	);
};
```

## Scoped Data in Shortcodes

A few Eleventy-specific data properties are available to shortcode callbacks.

- `this.page` {% addedin "0.11.0" %}
- `this.eleventy` {% addedin "2.0.0-canary.5" %}

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Make sure you’re not using an arrow function here: () => {}
	eleventyConfig.addShortcode("myShortcode", function () {
		// this.page
		// this.eleventy
	});
};
```

## Per-Engine Shortcodes

You can also specify different functionality for shortcodes in each engine, if you’d like. Using the `addShortcode` or `addPairedShortcode` function is equivalent to adding the shortcode to every supported template engine.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Liquid
  eleventyConfig.addLiquidShortcode("user", function(firstName, lastName) {});
  eleventyConfig.addPairedLiquidShortcode("user", function(content, firstName, lastName) {});

  // Nunjucks
  eleventyConfig.addNunjucksShortcode("user", function(firstName, lastName) {});
  eleventyConfig.addPairedNunjucksShortcode("user", function(content, firstName, lastName) {});

  // Handlebars
  eleventyConfig.addHandlebarsShortcode("user", function(firstName, lastName) {});
  eleventyConfig.addPairedHandlebarsShortcode("user", function(content, firstName, lastName) {});

  // JavaScript Template Function (New in 0.7.0)
  eleventyConfig.addJavaScriptFunction("user", function(firstName, lastName) {});
  eleventyConfig.addJavaScriptFunction("user", function(content, firstName, lastName) {}); // Faux-paired shortcode
```

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

### Async Friendly Per-Engine Shortcodes

Learn more about these on the individual template engine pages for [Nunjucks](/docs/languages/nunjucks/#asynchronous-shortcodes), [Liquid](/docs/languages/liquid/#asynchronous-shortcodes), and [`11ty.js` JavaScript](/docs/languages/javascript/#asynchronous-javascript-template-functions).

{% codetitle ".eleventy.js" %}

```js
  // Async-friendly
  // Liquid is already async-friendly
  eleventyConfig.addLiquidShortcode("user", async function() {});
	eleventyConfig.addPairedLiquidShortcode("user", async function(content) {});

  // Nunjucks Async
  eleventyConfig.addNunjucksAsyncShortcode("user", async function() {});
  eleventyConfig.addPairedNunjucksAsyncShortcode("user", async function(content) {});

	 // JavaScript Template Function (make sure you `await` these!)
  eleventyConfig.addJavaScriptFunction("user", async function() {});
  eleventyConfig.addJavaScriptFunction("user", async function(content) {}); // Faux-paired shortcode
};
```
