---
eleventyNavigation:
  key: Syntax Highlighting
  order: 2
  excerpt: Code syntax highlighting using PrismJS without client-side JavaScript.
---
# Syntax Highlighting Plugin

A pack of Eleventy plugins for syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time. Supports individual line highlighting.

* [GitHub](https://github.com/11ty/eleventy-plugin-syntaxhighlight).

## Template Compatibility

* Nunjucks
* Liquid
* Markdown

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-syntaxhighlight).

```
npm install @11ty/eleventy-plugin-syntaxhighlight --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
};
```

You are responsible for including [your favorite PrismJS theme CSS](https://github.com/PrismJS/prism-themes)!

### Options

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin pack.

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {

    // Change which syntax highlighters are installed
    templateFormats: ["*"], // default

    // Or, just njk and md syntax highlighters (do not install liquid)
    // templateFormats: ["njk", "md"],

    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = /* */;
    }
  });
};
```

## Usage

### This plugin provides the following syntax highlighters using PrismJS:

* Markdown Highlighter (triple backtick <code>```</code>) Supports individual line highlighting.
* Liquid Custom Tag {% raw %}`{% highlight %}`{% endraw %}
* Nunjucks Paired Shortcode {% raw %}`{% highlight %}`{% endraw %}

### Markdown Highlighter

Optionally specify a language after the start of the markdown fenced code block.

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

````markdown
<!-- Markdown Template -->
``` js
function myFunction() {
  return true;
}
```
````

````
<!--
  Line highlighting classes (single highlight)
  Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
-->

<!-- Markdown Template -->
``` js/1,3-5
function myFunction() {
  // …
  return true;
}
```
````

````
<!--
  Line highlighting classes (add and remove mode)
  Adds `highlight-line-add` class to lines 1,3
  Adds `highlight-line-remove` class to lines 5,6,7,8
-->

<!-- Markdown Template -->
``` js/1,3/5-8
function myFunction() {
  // …
  return true;
}
```
````

#### Plain text

Use `text` to use the line highlighting features without PrismJS.

````
``` text/1-2
function myFunction() {
  let highlighted = true;
  return highlighted;
}
```
````

### Liquid Tag: Prism Syntax Highlighter

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

{% raw %}
```
<!-- Liquid Template -->
{% highlight js %}
function myFunction() {
  return true;
}
{% endhighlight %}
```
{% endraw %}

{% raw %}
```
<!--
  Line highlighting classes (single highlight)
  Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
-->

<!-- Liquid Template -->
{% highlight js 1,3-5 %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```
{% endraw %}

{% raw %}
```
<!--
  Line highlighting classes (add and remove)
  Adds `highlight-line-add` class to lines 1,3
  Adds `highlight-line-remove` class to lines 5,6,7,8
-->

<!-- Liquid Template -->
{% highlight js 1,3 5-8 %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```
{% endraw %}

#### Plain text

Use `text` to use the line highlighting features without PrismJS.

{% raw %}
```
<!-- Liquid Template -->
{% highlight text 1-2 %}
function myFunction() {
  let highlighted = true;
  return highlighted;
}
{% endhighlight %}
```
{% endraw %}

### Nunjucks Paired Shortcode: Prism Syntax Highlighter

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

{% raw %}
```
<!-- Nunjucks Template -->
{% highlight "js" %}
function myFunction() {
  return true;
}
{% endhighlight %}
```
{% endraw %}

{% raw %}
```
<!--
  Line highlighting classes (single highlight)
  Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
-->

<!-- Nunjucks Template -->
{% highlight "js 1,3-5" %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```
{% endraw %}

{% raw %}
```
<!--
  Line highlighting classes (add and remove)
  Adds `highlight-line-add` class to lines 1,3
  Adds `highlight-line-remove` class to lines 5,6,7,8
-->

<!-- Nunjucks Template -->
{% highlight "js 1,3 5-8" %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```
{% endraw %}

#### Plain text

Use `text` to use the line highlighting features without PrismJS.

{% raw %}
```
<!-- Nunjucks Template -->
{% highlight "text 1-2" %}
function myFunction() {
  let highlighted = true;
  return highlighted;
}
{% endhighlight %}
```
{% endraw %}

### Sample Line Highlighting CSS

```css
.highlight-line {
  display: inline-block;

  /* del, ins, mark default styles */
  text-decoration: none;
  color: inherit;
}

/* allow highlighting empty lines */
.highlight-line:empty:before {
  content: " ";
}

.highlight-line:not(:last-child) {
  min-width: 100%;
}
.highlight-line .highlight-line:not(:last-child) {
  min-width: 0;
}


/*
 * Dark theme
 */

.highlight-line-isdir {
  color: #b0b0b0;
  background-color: #222;
}
.highlight-line-active {
  background-color: #444;
  background-color: hsla(0, 0%, 27%, .8);
}
.highlight-line-add {
  background-color: #45844b;
}
.highlight-line-remove {
  background-color: #902f2f;
}
```
