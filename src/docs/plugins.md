---
eleventyNavigation:
  key: Plugins
  order: 7.5
communityLinksKey: plugins
---

# Plugins

{% tableofcontents %}

Plugins are custom code that Eleventy can import into a project from an external repository.

- [Official Eleventy Plugins](/docs/plugins/official.md) (look for the `@11ty/` prefix on npm)
- [Community Contributed Plugins](/docs/plugins/community.md)

## Adding a Plugin

### Installation

We use the [`npm` command line tool](https://www.npmjs.com) (included with Node.js) to install plugins.

Looking for a plugin? Check out the [official plugins](/docs/plugins/official/) or [community-contributed plugins](/docs/plugins/community/).

```bash
npm install @11ty/eleventy-plugin-rss --save
```

### Add the plugin to Eleventy in your config file

Your config file is probably named `.eleventy.js`.

{% codetitle ".eleventy.js" %}

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
};
```

### Plugin Configuration Options {% addedin "0.5.4" %}

Use an optional second argument to `addPlugin` to customize your plugin’s behavior. These options are specific to the plugin. Please consult the plugin’s documentation (e.g. the [`eleventy-plugin-syntaxhighlight` README](https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/master/README.md)) to learn what options are available to you.

```js
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		// only install the markdown highlighter
		templateFormats: ["md"],

		init: function ({ Prism }) {
			// Add your own custom language to Prism!
		},
	});
};
```

<details>
<summary><strong>Advanced Usage: Namespacing a plugin</strong></summary>

It’s unlikely you’ll need this feature _but_ you can namespace parts of your configuration using `eleventyConfig.namespace`. This will add a string prefix to all filters, tags, helpers, shortcodes, collections, and transforms.

{% codetitle ".eleventy.js" %}

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function (eleventyConfig) {
	eleventyConfig.namespace("myPrefix_", () => {
		// the rssLastUpdatedDate filter is now myPrefix_rssLastUpdatedDate
		eleventyConfig.addPlugin(pluginRss);
	});
};
```

{% callout "warn" %}
Plugin namespacing is an application feature and should not be used if you are creating your own plugin (in your plugin configuration code). Follow along at <a href="https://github.com/11ty/eleventy/issues/256">Issue #256</a>.
{% endcallout %}

</details>

## Creating a Plugin

A plugin primarily provides a “configuration function.” This function is called when Eleventy is first initialized, and takes the same `eleventyConfig` object as the user’s `.eleventy.js` file gets, in addition to any config passed by the user:

{% codetitle "plugin.js" %}

```js
module.exports = function (eleventyConfig, pluginOptions) {
	// Your plugin code goes here
};
```

Note that plugins run as a second stage after the user’s primary configuration file has executed (to have access to the return object values).

<details>
<summary><strong>Advanced Usage: Custom Plugin Arguments</strong></summary>

If you want to allow developers to use custom arguments provided by your plugin, you can export an object. Prefer using the above syntax unless you need this behavior. For an example of how this is used, see the [syntax highlighting plugin](https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/23761d7fd54de0312040520175959327b1a0ab9b/.eleventy.js#L10)

{% codetitle "fancy-plugin.js" %}

```js
module.exports = {
	initArguments: {},
	configFunction: function (eleventyConfig, pluginOptions) {
		// Your plugin code goes here
	},
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(require("./fancy-plugin.js"), {
		init: function (initArguments) {
			// `this` is the eleventyConfig object
			// initArguments will be the `myInitArguments` object from above
		},
	});
};
```

</details>

### Distributing a Plugin

If you’re distributing your plugin as a package, consider following these conventions. These are not hard requirements.

- Add `"eleventy-plugin"` to your package.json’s `keywords` field.
- Prefix your package name with `eleventy-plugin-`
- Write your plugin code in a `.eleventy.js` file in the root of your repository, and set the `"main"` field of your package.json to `".eleventy.js"`
- Open a PR to add your plugin to our [list of community plugins](https://github.com/11ty/11ty-website/tree/main/src/_data/plugins) <3
