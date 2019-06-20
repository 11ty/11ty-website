---
tipindex: "002"
tiptitle: "Inline Minified JavaScript"
date: 2018-06-08
tags: ["related-filters"]
relatedTitle: "Quick Tip #002—Inline Minified JavaScript"
---

_Originally posted on [The Simplest Web Site That Could Possible Work Well on zachleat.com](https://www.zachleat.com/web/that-could-possibly-work/)_

This tip works great if you have small JS utilities that you’d like to have in your `<head>`. For example, this works great with the Filament Group [`loadJS`](https://github.com/filamentgroup/loadJS) or [`loadCSS`](https://github.com/filamentgroup/loadCSS) utilities.

## Installation

`npm install terser` to make the terser minifier available in your project.

## Configuration

Add the following `jsmin` filter to your Eleventy Config file:

```js
const Terser = require("terser");
eleventyConfig.addFilter("jsmin", function(code) {
    let minified = Terser.minify(code);
    if( minified.error ) {
        console.log("Terser error: ", minified.error);
        return code;
    }

    return minified.code;
});
```

## Create your JavaScript File

Add a sample JavaScript file to your `_includes` directory. Let’s call it `sample.js`.

```js
// Hi
console.log("Hi");
```

## Capture and Minify

Capture the JavaScript into a variable and run it through the filter (this sample is using Nunjucks syntax)

{% raw -%}
```html
<!-- capture the JS content as a Nunjucks variable -->
{% set js %}
  {% include "sample.js" %}
{% endset %}
<!-- feed it through our jsmin filter to minify -->
<script>
  {{ js | jsmin | safe }}
</script>
```
{% endraw %}
