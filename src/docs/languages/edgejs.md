---
eleventyNavigation:
  parent: JavaScript
  key: Edge.js
addedInVersion: 3.0.0
relatedTitle: Template Language—Edge.js
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `edge` | `.edge` | [`eleventy-plugin-edgejs`]({{ externalLinks.edgeJsPlugin }}) |

- Related languages: [JavaScript](/docs/languages/javascript/), [JSX](/docs/languages/jsx/), [Custom](/docs/languages/custom/)

{% callout "info", "md" %}Edge.js requires Eleventy v3.0.0+, ESM (`"type": "module"` in your `package.json`), and Node.js >= 22.{% endcallout %}

## Installation

{%- set codeBlock %}
npm install eleventy-plugin-edgejs
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

## Configuration

{% addedin "3.0.0" %}Add the plugin to your Eleventy configuration file:

{% codetitle "eleventy.config.js" %}
{%- set codeBlock %}
import edgeJsPlugin from "eleventy-plugin-edgejs";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(edgeJsPlugin);
}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### Plugin Options

{% codetitle "eleventy.config.js" %}
{%- set codeBlock %}
import edgeJsPlugin from "eleventy-plugin-edgejs";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(edgeJsPlugin, {
		// Enable template caching (default: false)
		cache: false,

		// Add custom global variables/functions
		globals: {},

		// Provide your own Edge.js instance
		eleventyLibraryOverride: undefined,
	});
}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## Usage

Edge.js templates use `{{ "{{" }} }}` for HTML-escaped output and `{{ "{{{" }} }}}` for raw (unescaped) output:

{%- set codeBlock %}
---
title: Hello World
---
<h1>{{ "{{" }} title }}</h1>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Conditionals

{%- set codeBlock %}
@if(featured)
  <span>Featured Post</span>
@elseif(pinned)
  <span>Pinned</span>
@else
  <span>Regular Post</span>
@end
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Loops

{%- set codeBlock %}
@each(post in collections.posts)
  <li>{{ "{{" }} post.data.title }}</li>
@end
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Includes

Place partial templates in your `_includes` directory and reference them with `@include`:

{%- set codeBlock %}
@include("header")
<main>Page content</main>
@include("footer")
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Components and Slots

{%- set codeBlock %}
{{ "{{--" }} _includes/card.edge {{ "--" }}}}
<div class="card">
  <h2>{{ "{{" }} title }}</h2>
  {{ "{{{" }} $slots.main() }}}
</div>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

{%- set codeBlock %}
@component("card", { title: "My Card" })
  <p>Card content goes here.</p>
@end
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Comments

{%- set codeBlock %}
{{ "{{--" }} This is a comment and won't appear in the output {{ "--" }}}}
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

## Eleventy Integration

The plugin automatically bridges Eleventy filters, shortcodes, and paired shortcodes as Edge.js global functions.

### Filters

Eleventy filters are available as globals. Call them as functions in your templates:

{%- set codeBlock %}
{{ "{{" }} url("/my-page/") }}
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Shortcodes

Eleventy shortcodes are also available as globals:

{%- set codeBlock %}
{{ "{{" }} year() }}
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Paired Shortcodes

For paired shortcodes, the content is passed as the first argument:

{%- set codeBlock %}
{{ "{{" }} callout("This is the content", "warning") }}
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

## Community Contributions

- {% indieweblink "eleventy-plugin-edgejs", externalLinks.edgeJsPlugin %}
- {% indieweblink "Edge.js documentation", externalLinks.edgeJsDocs %}
