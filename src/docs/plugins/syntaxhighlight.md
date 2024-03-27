---
eleventyNavigation:
  key: Syntax Highlighting
  order: 2
  excerpt: Code syntax highlighting using PrismJS without client-side JavaScript.
---

# Syntax Highlighting Plugin

{% tableofcontents %}

A pack of Eleventy plugins for PrismJS syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time. Supports individual line highlighting.

- This documentation applies to `eleventy-plugin-syntaxhighlight` `v3.2.0` and newer.
- [GitHub](https://github.com/11ty/eleventy-plugin-syntaxhighlight).

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-syntaxhighlight).

```
npm install @11ty/eleventy-plugin-syntaxhighlight --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin pack.

<details>
  <summary>Expand to see Advanced Options</summary>

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {

    // Line separator for line breaks
    lineSeparator: "\n",

    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ["*"], // default

    // Use only a subset of template types (11ty.js added in v4.0.0)
    // templateFormats: ["liquid", "njk", "md", "11ty.js"],

    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = /* */;
    },

    // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
    preAttributes: {
      tabindex: 0,

      // Added in 4.1.0 you can use callback functions too
      "data-language": function({ language, content, options }) {
        return language;
      }
    },
    codeAttributes: {},

    // Added in 5.0.0, throw errors on invalid language names
    errorOnInvalidLanguage: false,
  });
};
```

</details>

You are responsible for including your favorite PrismJS theme CSS and there are many ways to do that. The default themes are provided by [several CDNs](https://prismjs.com/#basic-usage-cdn) and could be easily included in a base layout, like in the example below:

```html
<html lang="en">
	<head>
		<!-- Some html boilerplate omitted -->
		<link
			href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
			rel="stylesheet"
		/>
	</head>
</html>
```

You could also download the css file or paste its content inside a style tag. This approach allows the use of [other themes](https://github.com/PrismJS/prism-themes) from a Prism extension repository.

## Usage

This plugin provides the following syntax highlighters using PrismJS, all of which currently support individual line highlighting.

- Markdown Highlighter (triple backtick <code>```</code>)
- Liquid Custom Tag {% raw %}`{% highlight %}`{% endraw %}
- Nunjucks Paired Shortcode {% raw %}`{% highlight %}`{% endraw %}
- JavaScript Function {% raw %}`this.highlight()`{% endraw %} {% addedin "Syntax Highlighter v4.0.0" %}
- WebC component {% raw %}`<syntax-highlight>`{% endraw %} {% addedin "Syntax Highlighter v4.2.0" %}

### Syntax Highlight Source Code

- [Review the list of supported PrismJS languages](http://prismjs.com/#languages-list)

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "highlight", additions: "md,webc", subtractions: "hbs"} %}
  <div id="highlight-md" role="tabpanel">

{% codetitle "Markdown", "Syntax" %}

````markdown
```js
function myFunction() {
	return true;
}
```
````

    Optionally specify a language after the start of the markdown fenced code block.

  </div>
  <div id="highlight-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% highlight js %}
function myFunction() {
  return true;
}
{% endhighlight %}
```

{% endraw %}

  </div>
  <div id="highlight-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% highlight "js" %}
function myFunction() {
  return true;
}
{% endhighlight %}
```

{% endraw %}

  </div>
  <div id="highlight-js" role="tabpanel">

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = function (data) {
	let code = `
function myFunction() {
  return true;
}`;

	return this.highlight("js", code);
};
```

{% endraw %}

The `highlight` JavaScript function was {% addedin "Syntax Highlighter v4.0.0" %}.

  </div>
  <div id="highlight-webc" role="tabpanel">

{% codetitle "webc", "Syntax" %}

{% raw %}

```html
<!-- Requires WebC v0.6.2+ -->
<!-- Requires Syntax Highlighter v4.2.0+ -->

<syntax-highlight
	language="js"
	webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight"
>
	function myFunction() { return true; }
</syntax-highlight>
```

{% endraw %}

<details>
<summary>Expand to see an example of importing this as a global component in your configuration file.</summary>

{% codetitle ".eleventy.js" %}

```js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Array `components` requires Eleventy WebC v0.9.2+
		components: [
			"_components/**/*.webc",
			"npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
		],
	});
};
```

{% codetitle "page.webc" %}

```html
<syntax-highlight language="js">
	function myFunction() { return true; }
</syntax-highlight>
```

</details>

<details>
<summary>Expand to see an example of importing for use anywhere on the page via front matter.</summary>

{% codetitle "page.webc" %}

```html
---
webc:
  components: ./node_modules/@11ty/eleventy-plugin-syntaxhighlight/syntax-highlight.webc
---

<syntax-highlight language="js">
	function myFunction() { return true; }
</syntax-highlight>
```

</details>

  </div>
</seven-minute-tabs>
</is-land>

Will render like this in the browser:

{% callout "demo" %}

{% highlight "js" %}
function myFunction() {
return true;
}
{% endhighlight %}

{% endcallout %}

### Show changes using `diff-` syntax

{% addedin "Syntax Highlighter v3.2.2" %}

Add the `diff-` prefix to the language name on the previous examples to show code changes. Use a `+` or `-` at the beginning of the line to denote the addition or removal of that line.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "highlightdiff", additions: "md,webc", subtractions: "hbs"} %}
  <div id="highlightdiff-md" role="tabpanel">

{% codetitle "Markdown", "Syntax" %}

````
```diff-js
+function myFunction() {
   // …
-  return true;
 }
```
````

  </div>
  <div id="highlightdiff-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```markdown
{% highlight diff-js %}
+function myFunction() {
// …

- return true;
  }
  {% endhighlight %}
```

{% endraw %}

  </div>
  <div id="highlightdiff-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```markdown
{% highlight "diff-js" %}
+function myFunction() {
// …

- return true;
  }
  {% endhighlight %}
```

{% endraw %}

  </div>
  <div id="highlightdiff-js" role="tabpanel">

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = function (data) {
	let code = `
+function myFunction() {
   // …
-  return true;
 }`;

	return this.highlight("diff-js", code);
};
```

{% endraw %}

The `highlight` JavaScript function was {% addedin "Syntax Highlighter v4.0.0" %}.

  </div>
  <div id="highlightdiff-webc" role="tabpanel">

{% codetitle "webc", "Syntax" %}

{% raw %}

```html
<!-- Requires WebC v0.6.2+ -->
<!-- Requires Syntax Highlighter v4.2.0+ -->

<syntax-highlight
	language="diff-js"
	webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight"
>
	+function myFunction() { // … - return true; }
</syntax-highlight>
```

  </div>
</seven-minute-tabs>
</is-land>

Will render like this in the browser:

{% callout "demo" %}

{% highlight "diff-js" %}
+function myFunction() {
// …

- return true;
  }
  {% endhighlight %}

{% endcallout %}

Alternatively, you can use `diff` _without_ another language name to enable plaintext line highlighting.

<details>
  <summary>Don’t forget to add styles too! Here’s a sample <code>diff-</code> CSS</summary>

{% codetitle "CSS", "Syntax" %}

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

</details>

{% callout "info", "md" %}Starting with `v3.2` of this plugin, this plugin now bundles the official [Prism `diff-highlight` plugin](https://prismjs.com/plugins/diff-highlight/). The previous line highlighting feature is considered deprecated but still available. Check out [the old documentation if you want to learn how to use the deprecated line-highlighting feature](https://v0-12-1.11ty.dev/docs/plugins/syntaxhighlight/).{% endcallout %}
