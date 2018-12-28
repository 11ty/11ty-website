---
subtitle: Plugins
tags:
  - docs-config
---
# Plugins {% addedin "0.2.13" %}

Plugins are custom code that Eleventy can import into a project from an external repository.

## List of Official Plugins

* [`eleventy-plugin-rss`](https://github.com/11ty/eleventy-plugin-rss) is a collection of Nunjucks filters for RSS/Atom feed templates.
* [`eleventy-plugin-syntaxhighlight`](https://github.com/11ty/eleventy-plugin-syntaxhighlight) for syntax highlighting using Markdown and Liquid tags.
* [`eleventy-plugin-inclusive-language`](https://github.com/11ty/eleventy-plugin-inclusive-language) includes a simple linter to help your writing use more inclusive language. Inspired by [_CSS Tricks’ Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/).

### Unofficial Plugins

* [`eleventy-plugin-toc`](https://www.npmjs.com/package/eleventy-plugin-toc) by [James Steinbach](https://twitter.com/jdsteinbach) will generate a table of contents from your headings.
* [`eleventy-plugin-cache-buster`](https://www.npmjs.com/package/@mightyplow/eleventy-plugin-cache-buster) by [mightyplow](https://twitter.com/mightyplow) will add content hashes to JavaScript and CSS resources.
* [**Search for `eleventy-plugin` on `npm`**](https://www.npmjs.com/search?q=eleventy-plugin)

## Adding a Plugin

### Install the plugin through npm.

```bash
npm install @11ty/eleventy-plugin-rss --save
```

### Add the plugin to Eleventy in your config file

Your config file is probably named `.eleventy.js`.

{% codetitle ".eleventy.js" %}

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
};
```

### Plugin Configuration Options {% addedin "0.5.4" %}

Use an optional second argument to `addPlugin` to customize your plugin’s behavior. These options are specific to the plugin. Please consult the plugin’s documentation (e.g. the [`eleventy-plugin-syntaxhighlight` README](https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/master/README.md)) to learn what options are available to you.

```js
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {

    // only install the markdown highlighter
    templateFormats: ["md"],

    init: function({ Prism }) {
        // Add your own custom language to Prism!
    }
  });
};
```


### Namespace the plugin additions

You can namespace parts of your configuration using `eleventyConfig.namespace`. This will add a string prefix to all filters, tags, helpers, shortcodes (as of 0.7.0), collections, and transforms.

{% codetitle ".eleventy.js" %}

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function(eleventyConfig) {
  eleventyConfig.namespace("myPrefix_", () => {
    // the rssLastUpdatedDate filter is now myPrefix_rssLastUpdatedDate
    eleventyConfig.addPlugin(pluginRss);
  });
};
```

{% callout %}
Plugin namespacing is an application feature and should not be used if you are creating your own plugin (in your plugin configuration code). Follow along at <a href="https://github.com/11ty/eleventy/issues/256">Issue #256</a>.
{% endcallout %}
