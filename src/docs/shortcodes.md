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
  - related-javascript
---

# Shortcodes {% addedin "0.5.0" %}

{% tableofcontents %}

Various template engines can be extended with shortcodes for easy reusable content. This is sugar around Template Language [Custom Tags](/docs/custom-tags/). Shortcodes are supported in JavaScript, Liquid, Nunjucks templates.

Here are a few examples:

{% include "snippets/shortcodes/intro.njk" %}

{% include "snippets/shortcodes/config.njk" %}

A shortcode returns content (a JavaScript string or template literal) that is used in the template. You can use these however you’d like—you could even think of them as reusable components.

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about using shortcodes on the individual Template Language documentation pages:

- [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
- [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
- [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)

## Paired Shortcodes

The shortcodes we saw above were nice, I suppose. But really, they are not all that different from a filter. The real ultimate power of Shortcodes comes when they are paired. Paired Shortcodes have a start and end tag—and allow you to nest other template content inside!

{% include "snippets/shortcodes/paired.njk" %}

When adding paired shortcodes using the Configuration API, the first argument to your shortcode callback is the nested content.

{% include "snippets/shortcodes/config-paired.njk" %}

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about using paired shortcodes on the individual Template Language documentation pages:

- [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (with async support)
- [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (with async support)
- [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (with async support)

## Asynchronous Shortcodes

`addShortcode`, `addPairedShortcode` both accept `async` function callbacks as of Eleventy `{{ "2.0.0-canary.24" | coerceVersion }}`. `addAsyncShortcode` and `addPairedAsyncShortcode` also accept `async` function callbacks and have been available since Eleventy `v0.10.0`.

## Scoped Data in Shortcodes

A few Eleventy-specific data properties are available to shortcode callbacks.

- `this.page` {% addedin "0.11.0" %}
- `this.eleventy` {% addedin "2.0.0-canary.5" %}

{% include "snippets/shortcodes/scoped.njk" %}

## Per-Engine Shortcodes

You can also specify different functionality for shortcodes in each engine, if you’d like. Using the `addShortcode` or `addPairedShortcode` function is equivalent to adding the shortcode to every supported template engine.

{% include "snippets/shortcodes/perengine.njk" %}

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

### Async Friendly Per-Engine Shortcodes

Learn more about these on the individual template engine pages for [Nunjucks](/docs/languages/nunjucks/#asynchronous-shortcodes), [Liquid](/docs/languages/liquid/#asynchronous-shortcodes), and [`11ty.js` JavaScript](/docs/languages/javascript/#asynchronous-javascript-template-functions).

{% include "snippets/shortcodes/perengine-async.njk" %}