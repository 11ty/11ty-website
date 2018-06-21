---
tipindex: "002"
tiptitle: "Inline Minified JavaScript"
date: 2018-06-08
tags: ["quicktips", "docs-quicktips", "related-filters"]
relatedTitle: "Quick Tip #002—Inline Minified JavaScript"
---

## Installation

`npm install uglify-js` to make the Uglify JS minifier available in your project.

## Configuration

Add the following `jsmin` filter to your Eleventy Config file:

```js
const UglifyJS = require("uglify-js");
eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if( minified.error ) {
        console.log("UglifyJS error: ", minified.error);
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
{% set js %}{% include "sample.js" %}{% endset %}
<!-- feed it through our jsmin filter to minify -->
<style>{{ js | jsmin | safe }}</style>
```
{% endraw %}

_Originally posted on [The Simplest Web Site That Could Possible Work Well on zachleat.com](https://www.zachleat.com/web/that-could-possibly-work/)_
