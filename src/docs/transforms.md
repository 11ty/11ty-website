---
eleventyNavigation:
  parent: Configuration
  key: Transforms
  order: 10
---

# Transforms

Transforms can modify a template’s output. For example, use a transform to format/prettify an HTML file with proper whitespace.

{% callout "info", "md" %}The provided transform function **must** return the original or transformed content.{% endcallout %}

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Can be sync or async
	eleventyConfig.addTransform("transform-name", async function (content) {
		console.log(this.page.inputPath);
		console.log(this.page.outputPath);

		return content; // no changes made.
	});
};
```

Access to [Eleventy’s `page` variable](/docs/data-eleventy-supplied/#page-variable) (via `this.page`) was added in Eleventy v2.0. For previous versions, [consult the older versions of the docs](https://v1-0-2.11ty.dev/docs/config/#transforms).

## Running Transforms Manually

{% addedin "3.0.0-alpha.11" %} The [`renderTransforms` universal filter](/docs/filters/render-transforms/) allows projects to run transforms manually on blocks of arbitrary HTML content.

## Order of Execution

Transforms are executed in order of insertion in your configuration file.

```js
eleventyConfig.addTransform("first", () => {});
eleventyConfig.addTransform("second", () => {});
eleventyConfig.addTransform("third", () => {});
```

### Plugins

Transforms added via plugins are inserted via the [second configuration stage for plugins](/docs/plugins/#creating-a-plugin).

```js
eleventyConfig.addPlugin(eleventyConfig => {
	eleventyConfig.addTransform("third", () => {});
});
eleventyConfig.addTransform("first", () => {});
eleventyConfig.addTransform("second", () => {});
```

## Examples

### Minify HTML Output

{% codetitle ".eleventy.js" %}

```js
const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});

			return minified;
		}

		// If not an HTML output, return content as-is
		return content;
	});
};
```

Note that `html-minifier-terser` has a [significant number of options](https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference), most of which are disabled by default.
