---
eleventyNavigation:
  parent: Configuration
  key: Plugins
  order: 6
---
# Plugins {% addedin "0.2.13" %}

Plugins are custom code that Eleventy can import into a project from an external repository.

## List of Official Plugins

All official plugins live under the `@11ty` npm organization and plugin names will include the `@11ty/` prefix.

* [@11ty/eleventy-plugin-rss](https://www.npmjs.com/package/@11ty/eleventy-plugin-rss) is a collection of Nunjucks filters for RSS/Atom feed templates.
* [@11ty/eleventy-plugin-syntaxhighlight](https://www.npmjs.com/package/@11ty/eleventy-plugin-syntaxhighlight) for syntax highlighting using Markdown and Liquid tags.
* [@11ty/eleventy-navigation](https://www.npmjs.com/package/@11ty/eleventy-navigation) is a plugin for creating hierarchical navigation—supports breadcrumbs too!
* [@11ty/eleventy-plugin-inclusive-language](https://www.npmjs.com/package/@11ty/eleventy-plugin-inclusive-language) includes a simple linter to help your writing use more inclusive language. Inspired by [_CSS Tricks’ Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/).

### Unofficial Plugins

* [eleventy-plugin-toc](https://www.npmjs.com/package/eleventy-plugin-toc) by [James Steinbach](https://twitter.com/jdsteinbach) will generate a table of contents from your headings.
* [eleventy-plugin-nesting-toc](https://www.npmjs.com/package/eleventy-plugin-nesting-toc) by [Jordan Shurmer](https://github.com/JordanShurmer) will generate a nested table of contents from your site's headings.
* [@mightyplow/eleventy-plugin-cache-buster](https://www.npmjs.com/package/@mightyplow/eleventy-plugin-cache-buster) by [mightyplow](https://twitter.com/mightyplow) will add content hashes to JavaScript and CSS resources.
* [eleventy-filter-npm-package-downloads](https://www.npmjs.com/package/eleventy-filter-npm-package-downloads) by [André Jaenisch](https://jaenis.ch/) will show you the number of downloads for the given npm package.
* [eleventy-plugin-meta-generator](https://www.npmjs.com/package/eleventy-plugin-meta-generator) by [André Jaenisch](https://jaenis.ch/) will render a generator `<meta />` tag for you.
* [eleventy-plugin-pwa](https://www.npmjs.com/package/eleventy-plugin-pwa) by [Nanda Okitavera](https://okitavera.me/) will generate a Service Worker for you.
* [eleventy-plugin-reading-time](https://www.npmjs.com/package/eleventy-plugin-reading-time) by [Johan Brook](https://johanbrook.com/) will generate a tag for the estimated reading time.
* [eleventy-plugin-respimg](https://www.npmjs.com/package/eleventy-plugin-respimg) by [Eric Portis](https://ericportis.com/) will take core of `srcset` attribute for responsive images for you.
* [eleventy-plugin-typeset](https://www.npmjs.com/package/eleventy-plugin-typeset) by [Johan Brook](https://johanbrook.com/) will make your typography nicer.
* [eleventy-plugin-yamldata](https://www.npmjs.com/package/eleventy-plugin-yamldata) by [Sungkwang Lee](https://gwangyi.github.io/) will allow you to use a yaml file as local data file.
* [@shawnsandy/npm_info](https://www.npmjs.com/package/@shawnsandy/npm_info) by [Shawn Sandy](https://github.com/shawn-sandy) will provide you with package detail for an npm package or GitHub info.
* [eleventy-plugin-lazyimages](https://www.npmjs.com/package/eleventy-plugin-lazyimages) by [Liam Fiddler](https://liamfiddler.com) will add progressive lazy loading to your images.
* [eleventy-xml-plugin](https://www.npmjs.com/package/eleventy-xml-plugin) by [Jeremias Menichelli](https://jeremenichelli.io) adds Liquid filters used for sitemap and RSS/feed file generation.
* [eleventy-plugin-markdown-shortcode](https://www.npmjs.com/package/eleventy-plugin-markdown-shortcode) by [Tyler Williams](https://ogdenstudios.xyz) adds a universal shortcode to render markdown. 
* [eleventy-plugin-sass](https://www.npmjs.com/package/eleventy-plugin-sass) by [Maarten Schroeven](https://github.com/Sonaryr) will add the ability to use Sass for your stylesheets
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

<div class="elv-community" id="community-resources">
  <h3 class="elv-community-hed">Community Resources</h3>
  <ul>
    <li><a href="https://bryanlrobinson.com/blog/creating-11ty-plugin-embed-svg-contents/">Creating an 11ty Plugin—SVG Embed Tool</a> by {% avatarlocalcache "twitter", "brob" %}Bryan Robinson</li>
  </ul>
</div>
