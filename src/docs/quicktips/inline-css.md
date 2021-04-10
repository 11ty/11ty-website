---
tipindex: "001"
tiptitle: "Inline Minified CSS"
date: 2018-06-07
tags: ["related-filters"]
relatedTitle: "Quick Tip #001—Inline Minified CSS"
---

_Originally posted on [The Simplest Web Site That Could Possible Work Well on zachleat.com](https://www.zachleat.com/web/that-could-possibly-work/)_

This tip works well on small sites that don’t have a lot of CSS. Inlining your CSS removes an external request from your critical path and speeds up page rendering times! If your CSS file is small enough, this is a simplification/end-around for [Critical CSS approaches](https://www.smashingmagazine.com/2015/08/understanding-critical-css/).

## Installation

`npm install clean-css` to make the CSS minifier available in your project.

## Configuration

Add the following `cssmin` filter to your Eleventy Config file:

```js
const CleanCSS = require("clean-css");
module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
```

## Create your CSS File

Add a sample CSS file to your `_includes` directory. Let’s call it `sample.css`.

```css
body {
    font-family: fantasy;
}
```

## Capture and Minify

Capture the CSS into a variable and run it through the filter (this sample is using Nunjucks syntax)

{% raw -%}
```html
<!-- capture the CSS content as a Nunjucks variable -->
{% set css %}
  {% include "sample.css" %}
{% endset %}
<!-- feed it through our cssmin filter to minify -->
<style>
  {{ css | cssmin | safe }}
</style>
```
{% endraw %}

### Warning about Content Security Policy

{% callout "warn" %}
If you are using a Content Security Policy on your website, make sure the <code>style-src</code> directive allows <code>'unsafe-inline'</code>. Otherwise, your inline CSS will not load.
{% endcallout %}
