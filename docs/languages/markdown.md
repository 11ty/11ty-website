---
subtitle: Markdown
layout: layouts/langs.njk
relatedLinks:
  /docs/config/#default-template-engine-for-markdown-files: Default Template Engine for Markdown Files
---
| Eleventy Short Name | File Extension | NPM Package                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `md`                | `.md`          | [`markdown-it`](https://www.npmjs.com/package/markdown-it) |

{% callout "info" %}
Markdown files are by default pre-processed as Liquid templates. <a href="/docs/config/#default-template-engine-for-markdown-files">You can change this default in your configuration file</a> (or disable it altogether). To change this for a single template and not globally, read <a href="/docs/languages/">Changing a Template’s Rendering Engine</a>.
{% endcallout %}

## Markdown Options

### Default Options

* `html: true` (`markdown-it` default is `false`)

The only listed options here are the ones that differ from the default `markdown-it` options. See [all `markdown-it` options and defaults](https://github.com/markdown-it/markdown-it#init-with-presets-and-options).

### Optional: Set your own library instance {% addedin "0.3.0" %}

Pass in your own instance of the Markdown library using the Configuration API. See [all `markdown-it` options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options).

```js
module.exports = function(eleventyConfig) {
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  eleventyConfig.setLibrary("md", markdownIt(options));
};
```

## Add your own plugins {% addedin "0.3.0" %}

Pass in your own `markdown-it` plugins using the `setLibrary` Configuration API method (building on the method described in “Using your own options”).

1. Find your [own `markdown-it` plugin on NPM](https://www.npmjs.com/search?q=keywords:markdown-it-plugin)
2. `npm install` the plugin.

```js
module.exports = function(eleventyConfig) {
  let markdownIt = require("markdown-it");
  let markdownItEmoji = require("markdown-it-emoji");
  let options = {
    html: true
  };
  let markdownLib = markdownIt(options).use(markdownItEmoji);
  
  eleventyConfig.setLibrary("md", markdownLib);
};
```

## There are extra `<pre>` and `<code>` in my output

<div class="elv-callout elv-callout-warn">This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</div>

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

That means any content that follows this four (or more) space indent may be subject to transformation. If you pre-process your markdown using Nunjucks or Liquid or another templating engine, that means the content retrieved from an `include` or a shortcode may also fit this formatting. Careful when you include extra whitespace in your includes or shortcodes!

{% codetitle ".eleventy.js" %}

```js
// 🛑 Bad, don’t do this
eleventyConfig.addShortcode("badShortcode", function() {
    return `
    This is a code block in a markdown file!
`;
});
```

{% codetitle ".eleventy.js" %}

```js
// ✅ This will return expected output
eleventyConfig.addShortcode("goodShortcode", function() {
    return `
This will not be a code block in a markdown file.
`;
});
```

## Why can’t I return markdown from paired shortcodes to use in a markdown file?

<div class="elv-callout elv-callout-warn">This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</div>

The truth is, you can return markdown inside shortcodes (as long the file is transforming markdown, either as a `.md` file extension or [with `templateEngineOverride`](/docs/languages/#overriding-the-template-language))

{% codetitle ".eleventy.js" %}

```js
eleventyConfig.addPairedShortcode("myShortcode", function(content) {
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