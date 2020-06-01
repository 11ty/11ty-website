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

{{ collections.all | eleventyNavigation("Plugins") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}

### Community Contributed Plugins

[**See all `eleventy-plugin` packages on `npm`**](https://www.npmjs.com/search?q=eleventy-plugin). The rest have been added to this site by our community (and are listed in random order):

{%- for name, plugin in plugins | shuffle %}
{%- set url = plugin.url or "https://www.npmjs.com/package/" + plugin.npm %}
* [{% if plugin.deprecated %}~~{% endif %}{{ plugin.npm }}{% if plugin.deprecated %}~~{% endif %}]({{ url }}){% if plugin.description %} {% if plugin.deprecated %}~~{% endif %}{{ plugin.description | safe }}{% if plugin.deprecated %}~~{% endif %}{% endif %} {{ plugin.deprecated }} {% authorLink authors, plugin.author %}
{%- endfor %}
* [Add your own](https://github.com/11ty/11ty-website/tree/master/_data/plugins)!

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
  {% callout "info" %}
  <h3 class="elv-community-hed">Community Resources</h3>
  <ul>
    <li><a href="https://bryanlrobinson.com/blog/creating-11ty-plugin-embed-svg-contents/">Creating an 11ty Plugin—SVG Embed Tool</a> by {% avatarlocalcache "twitter", "brob" %}Bryan Robinson</li>
  </ul>
  {% endcallout %}
</div>
