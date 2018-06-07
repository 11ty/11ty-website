---
tipindex: "001"
tiptitle: "Inline Minified CSS"
---
* **Related**: [Quick Tip #002—Inline Minified JavaScript](/docs/quicktips/inline-js/)

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
{% set css %}{% include "sample.css" %}{% endset %}
<!-- feed it through our cssmin filter to minify -->
<style>{{ css | cssmin | safe }}</style>
```
{% endraw %}

_Originally posted on [The Simplest Web Site That Could Possible Work Well on zachleat.com](https://www.zachleat.com/web/that-could-possibly-work/)_