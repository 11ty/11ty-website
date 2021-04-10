---
eleventyNavigation:
  key: Inclusive Language
  order: 4
  excerpt: A plugin to check for inclusive language in markdown files.
---
# Inclusive Language Plugin

An Eleventy linter plugin to check for inclusive language in markdown files. Inspired by [_CSS Tricks’ Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/). No browser/client JavaScript here—everything is this plugin is done at build-time.

* [GitHub](https://github.com/11ty/eleventy-plugin-inclusive-language).

<style>
.demo-linter-first {
  color: yellow;
}
</style>

<pre><code><span class="demo-linter-first">Inclusive Language Linter (./docs/quicktips/concatenate.md):</span>
    be modified, <u>of course</u>, to capture multiple
    <u>Of course</u>, Eleventy has no desire to re
    This is <u>just</u> a super simple example if you
    build pipeline. That’s an <u>easy</u> way to concatenate
</code></pre>

## Template Compatibility

* All

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-inclusive-language).

```
npm install @11ty/eleventy-plugin-inclusive-language --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLangPlugin);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

### Options

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin.

```js
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ["md"], // default, add more file extensions here

    // accepts an array or a comma-delimited string
    words: "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy"
  });
};
```
