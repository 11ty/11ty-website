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

A plugin primarily provides a “configuration function.” This function is called when Eleventy is first initialized, and operates similarly to a user’s configuration function (the same `eleventyConfig` argument passed to the user’s `.eleventy.js` file is passed here), in addition to any config passed by the user:

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

### Feature Testing

If your plugin requires a specific feature in Eleventy, you should feature test it!

```js
module.exports = function (eleventyConfig, pluginOptions) {
	if(!("addTemplate" in eleventyConfig)) {
		console.log( `[my-test-plugin] WARN Eleventy plugin compatibility: Virtual Templates are required for this plugin, please use Eleventy v3.0 or newer.` );
	}
};
```

### Version Checking

If feature testing is not available for your specific use case, you can add this code to your plugin configuration to show a warning if the plugin consumer does not have a compatible version of Eleventy:

```js
module.exports = function (eleventyConfig, pluginOptions) {
	try {
		// Emit a warning message if the application is not using Eleventy 3.0 or newer (including prereleases).
		eleventyConfig.versionCheck(">=3.0");
	} catch(e) {
		console.log( `[my-test-plugin] WARN Eleventy plugin compatibility: ${e.message}` );
	}
};
```

* This uses the [`semver` package](https://www.npmjs.com/package/semver) and is compatible with advanced range syntax.
* **Upper bounding your version number is _not recommended_**. Eleventy works very hard to maintain backwards compatibility between major versions. Please ensure your plugin code does the same!
* The `versionCheck` method has been available in Eleventy core since v0.3.2 (~2018).


### Distributing a Plugin

If you’re distributing your plugin as a package, consider following these conventions. These are not hard requirements.

- Add `"eleventy-plugin"` to your package.json’s `keywords` field.
- Prefix your package name with `eleventy-plugin-`
- Open a PR to add your plugin to our [list of community plugins](https://github.com/11ty/11ty-website/tree/main/src/_data/plugins) for publication on [our community plugins directory](/docs/plugins/community.md).
