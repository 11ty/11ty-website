---
eleventyNavigation:
  parent: Configuration
  key: Events
  order: 10
---

# Events

{% tableofcontents %}

You may want to run some code at certain times during the compiling process. To do that, you can use _configuration events_, which will run at specific times during the compiling process.

[[toc]]

All events are configured in your `.eleventy.js` configuration file, with the code run every time the event triggers.

Asynchronous callback function support added in v1.0.

## `eleventy.before` {% addedin "1.0.0" %}

- Previously known as the now deprecated `beforeBuild` {% addedin "0.11.1" %} event.

The `eleventy.before` event runs every time Eleventy starts building, so it will run before the start of each stand-alone build, as well as each time building starts as either part of `--watch` or `--serve`. To use it, attach the event handler to your Eleventy config:

{% set codeContent %}
export default function(eleventyConfig) {
	// Async-friendly in 1.0+
	// Arguments added in 2.0+
	eleventyConfig.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
		// Run me before the build starts
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## `eleventy.after` {% addedin "1.0.0" %}

- Previously known as the now deprecated `afterBuild` {% addedin "0.11.1" %} event.

The `eleventy.after` event runs every time Eleventy finishes building, so it will run after the end of each stand-alone build, as well as each time building ends as either part of `--watch` or `--serve`. To use it, attach the event handler to your Eleventy config:

{% set codeContent %}
export default function(eleventyConfig) {
	// Async-friendly in 1.0+
	// Arguments added in 2.0+
	eleventyConfig.on(
		"eleventy.after",
		async ({ dir, results, runMode, outputMode }) => {
			// Run me after the build ends
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Event arguments {% addedin "2.0.0" %}

Eleventy now provides an object with metadata on the build as an argument to the `eleventy.before` and `eleventy.after` event callbacks.

{% set codeContent %}
export default function(eleventyConfig) {
	eleventyConfig.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
		// Read more below
	});

	eleventyConfig.on(
		"eleventy.after",
		async ({ dir, results, runMode, outputMode }) => {
			// Read more below
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

- `directories`
- `dir` (deprecated, use `directories` instead): an object with current project directories, set in [your configuration file](/docs/config/#input-directory) (or populated with Eleventy defaults).
	- Included properties: `input` (default `"."`), `output` (default `"_site"`), `includes` (default `"_includes"`), `data` (default `"_data"`), and `layouts` (no default value).
- `outputMode`: a string representing the value of [`--to` on the command line](/docs/usage/#to-can-output-json)
  - `fs` (default)
  - `json`
  - `ndjson`
- `runMode`: a string representing [`--serve` or `--watch` usage on the command line](/docs/usage/#re-run-eleventy-when-you-save). One of:
  - `build` (default)
  - `watch`
  - `serve`
- `results`: _only available on `eleventy.after`_. An array with the processed Eleventy output (similar to `--to=json` output)
  - Individual entries will have: `{ inputPath, outputPath, url, content }`

<div class="youtube-related">
  {%- youtubeEmbed "f0LsgyPV7j0", "New Event Arguments (Weekly №5)", "491" -%}
</div>

## `eleventy.beforeConfig` {% addedin "3.0.0-alpha.3" %}

The `eleventy.beforeConfig` runs before your configuration is initialized and was added as an escape hatch for folks unable to update their top-level configuration callback to be `async` (usually due to some limitation in a third-party tool). You probably won’t need this.

```js
// Synchronous configuration callback
module.exports = function (eleventyConfig) {
	// async-friendly event
  eleventyConfig.on("eleventy.beforeConfig", async function (eleventyConfig) {
    const { HtmlBasePlugin } = await import("@11ty/eleventy");
		eleventyConfig.addPlugin(HtmlBasePlugin);
  });
};
```

## `eleventy.beforeWatch` {% addedin "1.0.0" %}

The `eleventy.beforeWatch` event runs before a build _only_ if it's a re-run during `--watch` or `--serve`. This means it will not run during the initial build nor during stand-alone builds.

{% set codeContent %}
export default function(eleventyConfig) {
	// Async-friendly
	eleventyConfig.on("eleventy.beforeWatch", async (changedFiles) => {
		// Run me before --watch or --serve re-runs
		// changedFiles is an array of files that changed
		// to trigger the watch/serve build
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## `eleventy.contentMap` {% addedin "2.0.0" %}

This event facilitates the [i18n plugin](/docs/plugins/i18n/) (but is available independent of it).

{% set codeContent %}
export default function(eleventyConfig) {
	// Async-friendly
	eleventyConfig.on("eleventy.contentMap", async ({ inputPathToUrl, urlToInputPath }) => {
		// inputPathToUrl is an object mapping input file paths to output URLs
		// urlToInputPath is an object mapping output URLs to input file paths
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}