---
tipindex: "011"
tiptitle: "Use local plugins to reduce config file size"
date: 2022-02-20
---

Is your `.eleventy.js` file getting too large? You can [create your own plugin](/docs/plugins/#creating-a-plugin) to move some code out.

First, create a plugin file. We recommend creating a `config` or `_config` folder in your project to store config files in. Make sure that folder isn’t getting copied out to your built site. Then create a file in that folder. It doesn’t matter what you name it.

{% codetitle "config/local-plugin.js" %}

```js
module.exports = function (eleventyConfig) {
	// Move any code you want from `.eleventy.js` to here
};
```

{% callout "warn" %}Any variables defined in your <code>.eleventy.js</code> file will <em>not</em> be available to your plugin. Consider moving those variables into your plugin file, or <a href="/docs/plugins/#plugin-configuration-options">passing them in as options</a>.{% endcallout %}

Next, use the `eleventyConfig.addPlugin()` method to add your plugin.

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(require("./config/local-plugin.js"));
};
```
