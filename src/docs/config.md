---
eleventyNavigation:
  key: Configuration
  order: 6
---

# Configuration

{% tableofcontents %}

Configuration files are optional. Add an `.eleventy.js` file to root directory of your project to configure Eleventy to your own project’s needs. It might look like this:

{% include "config/intro.njk" %}

We support returning both a callback function (shown above) or an object literal (`module.exports = {}`). Callback functions are preferred and allow you further customization options using Eleventy’s provided helper methods.

- Add [Filters](/docs/filters/).
- Add [Shortcodes](/docs/shortcodes/).
- Add [Custom Tags](/docs/custom-tags/).
- Add [JavaScript Functions](/docs/languages/javascript/#javascript-template-functions) {% addedin "0.7.0" %}
- Add custom [Collections](/docs/collections/) and use [Advanced Collection Filtering and Sorting](/docs/collections/#advanced-custom-filtering-and-sorting).
- Add some [Plugins](/docs/plugins/).

## Default filenames

{% callout %}Is your config file getting big and hard to understand? You can <a href="/docs/quicktips/local-plugin/">create your own plugin</a> to move some code out.{% endcallout %}

We look for the following configuration files:

1. `.eleventy.js`
1. `eleventy.config.js` {% addedin "2.0.0-canary.15" %}
1. `eleventy.config.cjs` {% addedin "2.0.0-canary.15" %}

The first configuration file found is used. The others are ignored.

<div class="youtube-related">
  {%- youtubeEmbed "hJAtWQ9nmKU", "Additions to the default config filename list (Changelog №17)", "431" -%}
</div>

## Configuration Options

### Input Directory

Controls the top level directory/file/glob that we’ll use to look for templates.

| Input Directory         |                           |
| ----------------------- | ------------------------- |
| _Object Key_            | `dir.input`               |
| _Default Value_         | `.` _(current directory)_ |
| _Valid Options_         | Any valid directory.      |
| _Command Line Override_ | `--input`                 |

#### Examples

##### Command Line

```bash
# The current directory
npx @11ty/eleventy --input=.

# A single file
npx @11ty/eleventy --input=README.md

# A glob of files
npx @11ty/eleventy --input=*.md

# A subdirectory
npx @11ty/eleventy --input=views
```

##### Configuration

{% include "config/config.njk" %}

### Directory for Includes

The includes directory is meant for [Eleventy layouts](/docs/layouts/), include files, extends files, partials, or macros. These files will not be processed as full template files, but can be consumed by other templates.

| Includes Directory      |                                                                               |
| ----------------------- | ----------------------------------------------------------------------------- |
| _Object Key_            | `dir.includes`                                                                |
| _Default_               | `_includes`                                                                   |
| _Valid Options_         | Any valid directory inside of `dir.input` (an empty string `""` is supported) |
| _Command Line Override_ | _None_                                                                        |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		dir: {
			// ⚠️ This value is relative to your input directory.
			includes: "my_includes",
		},
	};
};
```

### Directory for Layouts (Optional) {% addedin "0.8.0" %}

This configuration option is optional but useful if you want your [Eleventy layouts](/docs/layouts/) to live outside of the [Includes directory](#directory-for-includes). Just like the [Includes directory](#directory-for-includes), these files will not be processed as full template files, but can be consumed by other templates.

{% callout "warn" %}

  <p>This setting <strong>only applies</strong> to Eleventy's language-agnostic <a href="/docs/layouts/">layouts</a> (when defined in front matter or data files).</p>
  <p>When using <code>{% raw %}{% extends %}{% endraw %}</code>, Eleventy will <strong>still search the <code>_includes</code> directory</strong>. See <a href="/docs/layout-chaining/#addendum-about-existing-templating-features">this note about existing templating features</a>.</p>
{% endcallout %}

| Includes Directory      |                                                                               |
| ----------------------- | ----------------------------------------------------------------------------- |
| _Object Key_            | `dir.layouts`                                                                 |
| _Default_               | _The value in `dir.includes`_                                                 |
| _Valid Options_         | Any valid directory inside of `dir.input` (an empty string `""` is supported) |
| _Command Line Override_ | _None_                                                                        |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		dir: {
			// ⚠️ These values are both relative to your input directory.
			includes: "_includes",
			layouts: "_layouts",
		},
	};
};
```

### Directory for Global Data Files

Controls the directory inside which the global data template files, available to all templates, can be found. Read more about [Global Data Files](/docs/data-global/).

| Data Files Directory    |                                           |
| ----------------------- | ----------------------------------------- |
| _Object Key_            | `dir.data`                                |
| _Default_               | `_data`                                   |
| _Valid Options_         | Any valid directory inside of `dir.input` |
| _Command Line Override_ | _None_                                    |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		dir: {
			// ⚠️ This value is relative to your input directory.
			data: "lore",
		},
	};
};
```

### Output Directory

Controls the directory inside which the finished templates will be written to.

| Output Directory        |                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| _Object Key_            | `dir.output`                                                                              |
| _Default_               | `_site`                                                                                   |
| _Valid Options_         | Any string that will work as a directory name. Eleventy creates this if it doesn’t exist. |
| _Command Line Override_ | `--output`                                                                                |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		dir: {
			output: "dist",
		},
	};
};
```

### Default template engine for global data files

{% callout "warn" %}<strong>Feature Removal</strong>: <a href="/docs/data-preprocessing/">This feature was removed in Eleventy 2.0.</a>{% endcallout %}

### Default template engine for Markdown files

Markdown files run through this template engine before transforming to HTML.

| Markdown Template Engine |                                                                   |
| ------------------------ | ----------------------------------------------------------------- |
| _Object Key_             | `markdownTemplateEngine`                                          |
| _Default_                | `liquid`                                                          |
| _Valid Options_          | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_  | _None_                                                            |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		markdownTemplateEngine: "njk",
	};
};
```

### Default template engine for HTML files

HTML templates run through this template engine before transforming to (better) HTML.

| HTML Template Engine    |                                                                   |
| ----------------------- | ----------------------------------------------------------------- |
| _Object Key_            | `htmlTemplateEngine`                                              |
| _Default_               | `liquid`                                                          |
| _Valid Options_         | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_ | _None_                                                            |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		htmlTemplateEngine: "njk",
	};
};
```

### Template Formats

Specify which types of templates should be transformed.

| Template Formats        |                                                          |
| ----------------------- | -------------------------------------------------------- |
| _Object Key_            | `templateFormats`                                        |
| _Default_               | `html,liquid,ejs,md,hbs,mustache,haml,pug,njk,11ty.js`   |
| _Valid Options_         | Array of [template engine short names](/docs/languages/) |
| _Command Line Override_ | `--formats` _(accepts a comma separated string)_         |
| _Configuration API_     | `setTemplateFormats` {% addedin "0.2.14" %}              |

#### Examples

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		templateFormats: ["html", "liquid", "njk"],
	};
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats("html,liquid,njk");

	// Or:
	// eleventyConfig.setTemplateFormats([ "html", "liquid", "njk" ]);
};
```

```
npx @11ty/eleventy --formats=html,liquid,njk
```

{% callout "info" %}{% addedin "0.9.0" %} <strong>Case sensitivity</strong>: File extensions should be considered case insensitive, cross-platform. While Mac OS—by default—already behaves this way, other operating systems do not and needed additional Eleventy code to enable this behavior.{% endcallout %}

### Enable Quiet Mode to Reduce Console Noise

In order to maximize user-friendliness to beginners, Eleventy will show each file it processes and the output file. To disable this noisy console output, use quiet mode!

| Quiet Mode              |                   |
| ----------------------- | ----------------- |
| _Default_               | `false`           |
| _Valid Options_         | `true` or `false` |
| _Command Line Override_ | `--quiet`         |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true);
};
```

The command line will override any setting in configuration:

```
npx @11ty/eleventy --quiet
```

### Deploy to a subdirectory with a Path Prefix

If your site lives in a different subdirectory (particularly useful with GitHub pages), use pathPrefix to specify this. When paired with the [HTML `<base>` plugin](/docs/plugins/html-base.md) it will transform any absolute URLs in your HTML to include this folder name and does **not** affect where things go in the output folder.

| Path Prefix             |                                       |
| ----------------------- | ------------------------------------- |
| _Object Key_            | `pathPrefix`                          |
| _Default_               | `/`                                   |
| _Valid Options_         | A prefix directory added to links     |
| _Command Line Override_ | `--pathprefix` {% addedin "0.2.11" %} |

#### Example

{% codetitle ".eleventy.js" %}

```js
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

	return {
		pathPrefix: "/eleventy-base-blog/",
	};
};
```

Deploy to https://11ty.github.io/eleventy-base-blog/ on GitHub pages without modifying your config. This allows you to use the same code-base to deploy to either GitHub pages or Netlify, like the [`eleventy-base-blog`](https://github.com/11ty/eleventy-base-blog) project does.

```
npx @11ty/eleventy --pathprefix=eleventy-base-blog
```

### Change exception case suffix for HTML files

If an HTML template has matching input and output directories, index.html files will have this suffix added to their output filename to prevent overwriting the template. Read more at the [HTML template docs](/docs/languages/html/#using-the-same-input-and-output-directories).

| Exception Suffix        |                    |
| ----------------------- | ------------------ |
| _Object Key_            | `htmlOutputSuffix` |
| _Default_               | `-o`               |
| _Valid Options_         | Any valid string   |
| _Command Line Override_ | _None_             |

#### Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		htmlOutputSuffix: "-o",
	};
};
```

### Change Base File Name for Data Files

{% addedin "2.0.0-canary.19" %} When using [Directory Specific Data Files](/docs/data-template-dir/), looks for data files that match the current folder name. You can override this behavior to a static string with the `setDataFileBaseName` method.

| File Suffix             |                       |
| ----------------------- | --------------------- |
| _Configuration API_     | `setDataFileBaseName` |
| _Default_               | _Current folder name_ |
| _Valid Options_         | String                |
| _Command Line Override_ | _None_                |

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Looks for index.json and index.11tydata.json instead of using folder names
	eleventyConfig.setDataFileBaseName("index");
};
```

### Change File Suffix for Data Files

{% addedin "2.0.0-canary.19" %} When using [Template and Directory Specific Data Files](/docs/data-template-dir/), to prevent file name conflicts with non-Eleventy files in the project directory, we scope these files with a unique-to-Eleventy suffix. This suffix is customizable using the `setDataFileSuffixes` configuration API method.

| File Suffix             |                       |
| ----------------------- | --------------------- |
| _Configuration API_     | `setDataFileSuffixes` |
| _Default_               | `[".11tydata", ""]`   |
| _Valid Options_         | Array                 |
| _Command Line Override_ | _None_                |

For example, using `".11tydata"` will search for `*.11tydata.js` and `*.11tydata.json` data files. The empty string (`""`) here represents a file without a suffix—and this entry only applies to `*.json` data files.

This feature can also be used to disable Template and Directory Data Files altogether with an empty array (`[]`).

Read more about [Template and Directory Specific Data Files](/docs/data-template-dir/).

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setDataFileSuffixes([".11tydata", ""]); // e.g. file.json and file.11tydata.json

	eleventyConfig.setDataFileSuffixes([".11tydata"]); // e.g. file.11tydata.json

	eleventyConfig.setDataFileSuffixes([]); // No data files are used.
};
```

<details>
<summary><em><strong>Backwards Compatibility Note</strong></em> (<code>{{ "2.0.0-canary.19" | coerceVersion }}</code>)</summary>

Prior to {{ "2.0.0-canary.19" | coerceVersion }} this feature was exposed using a `jsDataFileSuffix` property in the configuration return object. When the `setDataFileSuffixes` method has not been used, Eleventy maintains backwards compatibility for old projects by using this property as a fallback.

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		jsDataFileSuffix: ".11tydata",
	};
};
```

</details>

### Transforms

Transforms can modify a template’s output. For example, use a transform to format/prettify an HTML file with proper whitespace.

The provided transform function must return the original or transformed content.

| Transforms              |                |
| ----------------------- | -------------- |
| _Configuration API_     | `addTransform` |
| _Default_               | `{}`           |
| _Valid Options_         | Object literal |
| _Command Line Override_ | _None_         |

```js
module.exports = function (eleventyConfig) {
	// Can be sync or async
	eleventyConfig.addTransform("transform-name", async function (content) {
		console.log(this.inputPath);
		console.log(this.outputPath);

		// Eleventy 2.0+ has full access to Eleventy’s `page` variable
		console.log(this.page.inputPath);
		console.log(this.page.outputPath);

		return content; // no change done.
	});
};
```

<details>
<summary><strong>Transforms Example: Minify HTML Output</strong></summary>

{% codetitle ".eleventy.js" %}

```js
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function (content) {
		// Prior to Eleventy 2.0: use this.outputPath instead
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}

		return content;
	});
};
```

</details>

### Linters

Similar to Transforms, Linters are provided to analyze a template’s output without modifying it.

| Linters                 |                   |
| ----------------------- | ----------------- |
| _Configuration API_     | `addLinter`       |
| _Object Key_            | _N/A_             |
| _Valid Options_         | Callback function |
| _Command Line Override_ | _None_            |

```js
module.exports = function (eleventyConfig) {
	// Can be sync or async
	eleventyConfig.addLinter("linter-name", async function (content) {
		console.log(this.inputPath);
		console.log(this.outputPath);

		// Eleventy 2.0+ has full access to Eleventy’s `page` variable
		console.log(this.page.inputPath);
		console.log(this.page.outputPath);
	});
};
```

<details>
<summary><strong>Linters Example: Use Inclusive Language</strong></summary>

Inspired by the [CSS Tricks post _Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/), this linter will log a warning to the console when it finds a trigger word in a markdown file.

This example has been packaged as a plugin in [`eleventy-plugin-inclusive-language`](https://github.com/11ty/eleventy-plugin-inclusive-language).

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addLinter(
		"inclusive-language",
		function (content, inputPath, outputPath) {
			let words =
				"simply,obviously,basically,of course,clearly,just,everyone knows,however,easy".split(
					","
				);

			// Eleventy 1.0+: use this.inputPath and this.outputPath instead
			if (inputPath.endsWith(".md")) {
				for (let word of words) {
					let regexp = new RegExp("\\b(" + word + ")\\b", "gi");
					if (content.match(regexp)) {
						console.warn(
							`Inclusive Language Linter (${inputPath}) Found: ${word}`
						);
					}
				}
			}
		}
	);
};
```

</details>

### Data Filter Selectors

{% addedin "1.0.0" %}<!-- Beta 4 -->

A `Set` of [`lodash` selectors](https://lodash.com/docs/4.17.15#get) that allow you to include data from the data cascade in the output from `--to=json`, `--to=ndjson`, or the `EleventyServerless.prototype.getOutput` method.

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.dataFilterSelectors.add("page");
	eleventyConfig.dataFilterSelectors.delete("page");
};
```

This will now include a `data` property in your JSON output that includes the `page` variable for each matching template.

### Type Definitions

This may enable some extra autocomplete features in your IDE (where supported).

```js
/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
	// …
};
```

- More background information at [Issue 2091](https://github.com/11ty/eleventy/pull/2091).

### Documentation Moved to Dedicated Pages

<a id="{{ 'Copy Files to Output using Pass-through File Copy' | slug }}"></a>

#### Copy Files to Output using Passthrough File Copy

Files found (that don’t have a valid template engine) from opt-in file extensions in `templateFormats` will passthrough to the output directory. Read more about [Passthrough Copy](/docs/copy/).

#### Data Deep Merge {% addedin "0.6.0" %}

- Documentation for [Data Deep Merging has been moved to its own page](/docs/data-deep-merge/) under the Data Cascade.

#### Customize Front Matter Parsing Options {% addedin "0.9.0" %}

- Documented at [Customize Front Matter Parsing](/docs/data-frontmatter-customize/).

#### Watch JavaScript Dependencies {% addedin "0.7.0" %}

- Documented at [Watch and Serve Configuration](/docs/watch-serve/).

#### Add Your Own Watch Targets {% addedin "0.10.0" %}

- Documented at [Watch and Serve Configuration](/docs/watch-serve/).

#### Override Browsersync Server Options {% addedin "0.7.0" %}

- Documented at [Watch and Serve Configuration](/docs/watch-serve/).

<!--
### Experiments

Experiments are experimental Eleventy features that need a public trial. Power users may opt-in to these features in order to try out new things before they are released to the general public. Do not use these in production code! Experiments are not guaranteed and may be removed at any time.

| Experiments |  |
| --- | --- |
| _Object Key_ | _N/A_ |
| _Valid Options_ | String |
| _Command Line Override_ | _None_ |
| _Configuration API_ | `addExperiment` {% addedin "0.6.0" %} |
-->
