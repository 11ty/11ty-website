---
eleventyNavigation:
  key: Syntax Highlighting
  order: 2
  excerpt: Code syntax highlighting using PrismJS without client-side JavaScript.
---
# Syntax Highlighting Plugin

A pack of Eleventy plugins for PrismJS syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time. Supports individual line highlighting.

* This is the documentation for `eleventy-plugin-syntaxhighlight` `v3.2` and newer.
* [GitHub](https://github.com/11ty/eleventy-plugin-syntaxhighlight).

## Contents

[[toc]]

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

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

You are responsible for including your favorite PrismJS theme CSS and there are many ways to do that. The default themes are provided by [several CDNs](https://prismjs.com/#basic-usage-cdn) and could be easily included in a base layout, like in the example below;

```html
<html lang="en">
  <head>
    <!-- Some html boilerplate omitted -->
    <link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">
  </head>
````

You could also download the css file or paste its content inside a style tag. This approach allows the use of [other themes](https://github.com/PrismJS/prism-themes) from a Prism extension repository.

## Usage

This plugin provides the following syntax highlighters using PrismJS, all of which currently support individual line highlighting.

* Markdown Highlighter (triple backtick <code>```</code>)
* Liquid Custom Tag {% raw %}`{% highlight %}`{% endraw %}
* Nunjucks Paired Shortcode {% raw %}`{% highlight %}`{% endraw %}

### Markdown Highlighter

Optionally specify a language after the start of the markdown fenced code block.

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

{% codetitle "Markdown", "Syntax" %}

````markdown
```js
function myFunction() {
  return true;
}
```
````

#### `diff-` syntax

{% addedin "Syntax Highlighter v3.2.2" %}

Use a `+` or `-` at the beginning of the line to denote the addition or removal of that line. Alternatively, you can use `diff` without another syntax for plaintext line highlighting.

{% codetitle "Markdown", "Syntax" %}

````markdown
```diff-js
+function myFunction() {
   // …
-  return true;
 }
```
````

{% codetitle "Markdown Output", "Rendered" %}

{% highlight "diff-js" %}
+function myFunction() {
   // …
-  return true;
 }
{% endhighlight %}

### Liquid Shortcode

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```markdown
{% highlight js %}
function myFunction() {
  return true;
}
{% endhighlight %}
```
{% endraw %}

#### `diff-` syntax

{% addedin "Syntax Highlighter v3.2.2" %}

Use a `+` or `-` at the beginning of the line to denote the addition or removal of that line. Alternatively, you can use `diff` without another syntax for plaintext line highlighting.

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```markdown
{% highlight diff-js %}
+function myFunction() {
   // …
-  return true;
 }
{% endhighlight %}
```
{% endraw %}

{% codetitle "Liquid Output", "Rendered" %}

{% highlight "diff-js" %}
+function myFunction() {
   // …
-  return true;
 }
{% endhighlight %}

### Nunjucks Shortcode

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```markdown
{% highlight "js" %}
function myFunction() {
  return true;
}
{% endhighlight %}
```
{% endraw %}

#### `diff-` syntax

{% addedin "Syntax Highlighter v3.2.2" %}

Use a `+` or `-` at the beginning of the line to denote the addition or removal of that line. Alternatively, you can use `diff` without another syntax for plaintext line highlighting.

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```markdown
{% highlight "diff-js" %}
+function myFunction() {
   // …
-  return true;
}
{% endhighlight %}
```
{% endraw %}

{% codetitle "Nunjucks Output", "Rendered" %}

{% highlight "diff-js" %}
+function myFunction() {
   // …
-  return true;
 }
{% endhighlight %}

### Sample Diff CSS

```css
.token.deleted {
  background-color: hsl(350deg 100% 88% / 47%);
}
.token.inserted {
  background-color: hsl(120deg 73% 75% / 35%);
}

/* Make the + and - characters unselectable for copy/paste */
.token.prefix.unchanged,
.token.prefix.inserted,
.token.prefix.deleted {
	-webkit-user-select: none;
	user-select: none;
}

/* Optional: full-width background color */
.token.inserted:not(.prefix),
.token.deleted:not(.prefix) {
	display: block;
}
```

## Advanced Options

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin pack.

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {

    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ["*"], // default

    // e.g. Use syntax highlighters in njk and md Eleventy templates (not liquid)
    // templateFormats: ["njk", "md"],

    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = /* */;
    },

    // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
    preAttributes: {
      tabindex: 0
    },
    codeAttributes: {},
  });
};
```

{% callout "info", "md" %}Starting with `v3.2` of this plugin, this plugin now bundles the official [Prism `diff-highlight` plugin](https://prismjs.com/plugins/diff-highlight/). The previous line highlighting feature is considered deprecated but still available. Check out [the old documentation if you want to learn how to use the deprecated line-highlighting feature](https://v0-12-1.11ty.dev/docs/plugins/syntaxhighlight/).{% endcallout %}