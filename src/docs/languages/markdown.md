---
eleventyNavigation:
  parent: Template Languages
  key: Markdown
  order: 2
layout: layouts/langs.njk
logoImage: "./src/img/logos/markdown.svg"
relatedLinks:
  /docs/config/#default-template-engine-for-markdown-files: Default Template Engine for Markdown Files
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `md`                | `.md`          | [`markdown-it`](https://www.npmjs.com/package/markdown-it) |

{% callout "info" %}
Markdown files are by default pre-processed as Liquid templates. <a href="/docs/config/#default-template-engine-for-markdown-files">You can change this default in your configuration file</a> (or disable it altogether). To change this for a single template and not globally, read <a href="/docs/languages/">Changing a Template’s Rendering Engine</a>.
{% endcallout %}

## Markdown Options

### Default Options

- `html: true` (`markdown-it` default is `false`)

The only listed options here are the ones that differ from the default `markdown-it` options. See [all `markdown-it` options and defaults](https://github.com/markdown-it/markdown-it#init-with-presets-and-options).

Starting in Eleventy 2.0, we’ve disabled the [Indented Code Blocks](#indented-code-blocks) feature by default.

### Optional: Set your own library instance {% addedin "0.3.0" %}

Pass in your own instance of the Markdown library using the Configuration API. See [all `markdown-it` options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options).

```js
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
	let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	eleventyConfig.setLibrary("md", markdownIt(options));
};
```

### Optional: Amend the Library instance {% addedin "2.0.0" %}

Run your own callback on the provided Library instance (the default _or_ any provided by `setLibrary` above).

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));
};
```

## Add your own plugins {% addedin "0.3.0" %}

Pass in your own `markdown-it` plugins using the `amendLibrary` (Eleventy &gt;= 2.0) or `setLibrary` (Eleventy &lt;= 1.0) Configuration API methods (building on the method described in “Options” above).

1. Find your [own `markdown-it` plugin on NPM](https://www.npmjs.com/search?q=keywords:markdown-it-plugin)
2. `npm install` the plugin.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs>
  <div role="tablist" aria-label="Choose a template language">
    Eleventy version:
    <a href="#plugins-two" role="tab">&gt;= 2.0</a>
    <a href="#plugins-one" role="tab">&lt;= 1.0</a>
  </div>
  <div id="plugins-two" role="tabpanel">

```js
const markdownItEmoji = require("markdown-it-emoji");

module.exports = function (eleventyConfig) {
	// New in 2.0
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItEmoji));
};
```

  </div>
  <div id="plugins-one" role="tabpanel">

```js
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = function (eleventyConfig) {
	let options = {
		html: true,
	};
	let markdownLibrary = markdownIt(options).use(markdownItEmoji);

	eleventyConfig.setLibrary("md", markdownLibrary);
};
```

  </div>
</seven-minute-tabs>
</is-land>

## Indented Code Blocks

Markdown has a lesser known feature called [Indented Code Blocks](https://spec.commonmark.org/0.28/#indented-code-blocks), which means any content that is indented by four or more spaces (and has a preceding line break) will be transformed into a code block.

```markdown
    a simple
      indented code block
```

is transformed into:

```html
<pre><code>a simple
  indented code block
</code></pre>
```

_(Example borrowed from the [CommonMark Specification](https://spec.commonmark.org/0.28/#indented-code-blocks))_

After [listening to community feedback](https://github.com/11ty/eleventy/issues/2438), starting with Eleventy 2.0.0 <strong>Indented Code Blocks</strong> are disabled for both the default Markdown library instance _and_ any set via `setLibrary`.

<details>
  <summary>Want to <strong>re-enable</strong> Indented Code Blocks?</summary>

{% callout "warn" %}<strong>Careful!</strong> This feature is <a href="https://github.com/11ty/eleventy/issues/2438">(almost) universally disliked</a>.{% endcallout %}

To re-enable Indented Code Blocks in Eleventy 2.0 (or newer), use the [`amendLibrary` approach](#optional-amend-the-library-instance). Make sure you read through the warning documented below to understand the ramifications.

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));
};
```

<div id="there-are-extra-and-in-my-output"><!-- Backwards compat --></div>
<div id="there-are-extra-pre-and-code-tags-in-my-output"><!-- Backwards compat --></div>

When using [Indented Code Blocks](#indented-code-blocks), any content that follows this four (or more) space indent may be subject to transformation. If you pre-process your markdown using Nunjucks or Liquid or another templating engine, that means the content retrieved from an `include` or a shortcode may also fit this formatting. Careful when you include extra whitespace in your includes or shortcodes!

{% codetitle ".eleventy.js" %}

```js
// 🛑 Bad, don’t do this
eleventyConfig.addShortcode("badShortcode", function () {
	return `
    This is a code block in a markdown file!
`;
});
```

{% codetitle ".eleventy.js" %}

```js
// ✅ This will return expected output
eleventyConfig.addShortcode("goodShortcode", function () {
	return `
This will not be a code block in a markdown file.
`;
});
```

If you still wish to indent your template literals, you can use [outdent](https://www.npmjs.com/package/outdent) to strip each line of indentation before handing it off to the renderer.

```js
// ✅ This is also acceptable
eleventyConfig.addShortcode("alsoGoodShortcode", function () {
	return outdent`
    This will not be a code block in a markdown file.
`;
});
```

</details>

<details>
  <summary>Want to <strong>disable</strong> Indented Code Blocks on Eleventy v1 or older?</summary>

```js
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
	let options = {
		// … truncated for brevity
	};

	eleventyConfig.setLibrary("md", markdownIt(options).disable("code"));
};
```

</details>

<div class="youtube-related">
  {%- youtubeEmbed "ZE5Np95-PeU", "The Dreaded Markdown Indented Code Blocks (Weekly №14)", "42" -%}
</div>

## Why can’t I return markdown from paired shortcodes to use in a markdown file?

{% callout "warn" %}This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.{% endcallout %}

The truth is, **you can** return markdown inside shortcodes (as long as the file is transforming markdown, either as a `.md` file extension or [with `templateEngineOverride`](/docs/languages/#overriding-the-template-language)). However, there is one small wrinkle that might catch you off guard.

{% codetitle ".eleventy.js" %}

```js
eleventyConfig.addPairedShortcode("myShortcode", function (content) {
	// Method A: ✅ This works fine
	return content;

	// Method B: ⚠️ Careful when wrapping with HTML
	return `<div>${content}</div>`;
});
```

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}

```
{% myShortcode %}My really *important* content.{% endmyShortcode %}
```

{% endraw %}

1. Method A returns: `My really *important* content.` which is successfully [transformed as markdown into `My really <em>important</em> content`](https://spec.commonmark.org/dingus/?text=My%20really%20*important*%20content.).
1. Method B returns: `<div>My really *important* content.</div>` which markdown treats as an HTML block which cannot have nested markdown inside of it. It’s [transformed into `<div>My really *important* content.</div>`](https://spec.commonmark.org/dingus/?text=%3Cdiv%3EMy%20really%20*important*%20content.%3C%2Fdiv%3E). Read more at the [CommonMark specification on HTML blocks](https://spec.commonmark.org/0.28/#html-blocks).
