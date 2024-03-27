---
eleventyNavigation:
  parent: Using Data
  key: Custom Data File Formats
  order: 3
relatedLinks:
  /docs/data-frontmatter-customize/: Customize Front Matter Parsing
---

# Custom Data File Formats {% addedin "0.10.0" %}

{% tableofcontents %}

Out of the box, Eleventy supports arbitrary JavaScript and JSON for both [template and directory data files](/docs/data-template-dir/) as well as [global data](/docs/data-global/).

Maybe you want to add support for TOML or YAML too! Any text format will do.

Note that you can also add [Custom Front Matter Formats](/docs/data-frontmatter-customize/) as well.

## Usage

{% codetitle ".eleventy.js" %}

```js
// Receives file contents, return parsed data
eleventyConfig.addDataExtension("fileExtension", (contents, filePath) => {
	return {};
});
```

- {% addedin "2.0.0-canary.10" %} Pass a comma-separated list of extensions.
- {% addedin "2.0.0-canary.19" %} `filePath` was added as a second argument.

{% codetitle ".eleventy.js" %}

```js
eleventyConfig.addDataExtension("yml, yaml", (contents, filePath) => {
	// …
});
```

### Usage with Options

{% addedin "2.0.0-canary.10" %}

{% codetitle ".eleventy.js" %}

```js
// or with options (new in 2.0)
eleventyConfig.addDataExtension("fileExtension", {
	parser: (contents, filePath) => ({}),

	// defaults are shown:
	read: true,
	encoding: "utf8",
});
```

- `parser`: the callback function used to parse the data. The first argument is the data file’s contents (unless `read: false`). The second argument is the file path {% addedin "2.0.0-canary.19" %}.
- `read` (default: `true`): use `read: false` to change the parser function’s first argument to be a file path string instead of file contents.
- `encoding` (default: `"utf8"`): use this to change the encoding of [Node’s `readFile`](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options). Use `null` if you want a `Buffer`.

## Examples

### YAML

Here we’re using the [`js-yaml` package](https://www.npmjs.com/package/js-yaml). Don’t forget to `npm install js-yaml`.

{% codetitle ".eleventy.js" %}

```js
const yaml = require("js-yaml");

module.exports = (eleventyConfig) => {
	eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
};
```

### TOML

Here we’re using the [`toml` package](https://www.npmjs.com/package/toml). Don’t forget to `npm install toml`.

{% codetitle ".eleventy.js" %}

```js
const toml = require("@iarna/toml");

module.exports = (eleventyConfig) => {
	eleventyConfig.addDataExtension("toml", (contents) => toml.parse(contents));
};
```

### Adding a custom JSON file extension

{% codetitle ".eleventy.js" %}

```js
module.exports = (eleventyConfig) => {
	eleventyConfig.addDataExtension("geojson", (contents) =>
		JSON.parse(contents)
	);
};
```

### Feed EXIF image data into the Data Cascade

{% addedin "2.0.0-canary.10" %} This uses the [`exifr` package](https://www.npmjs.com/package/exifr) to read image EXIF data. Don’t forget to `npm install exifr`.

Note that the second argument is an object with a `parser` function.

{% codetitle ".eleventy.js" %}

```js
const exifr = require("exifr");

module.exports = function (eleventyConfig) {
	eleventyConfig.addDataExtension("png,jpeg", {
		parser: async (file) => {
			let exif = await exifr.parse(file);

			return {
				exif,
			};
		},

		// Using `read: false` changes the parser argument to
		// a file path instead of file contents.
		read: false,
	});
};
```

- Example using a _template data file_:
  - Given `my-blog-post.md` and `my-blog-post.jpeg` then `exif` will be available for use in `my-blog-post.md` (e.g. `{% raw %}{{ exif | log }}{% endraw %}`)
- Example using a _global data file_:
  - Given `_data/images/custom.jpeg` then `images.custom.exif` will be available for use on any template (e.g. `{% raw %}{{ images.custom.exif | log }}{% endraw %}`)

## Ordering in the Data Cascade

Note that in the [data cascade](/docs/data-cascade/) there is a specific conflict resolution order when the same keys are used in data files. For example, [JavaScript files take priority over JSON](/docs/data-template-dir/). These new custom data file formats are treated as lower priority than both JavaScript and JSON.

If you add multiple file extensions, the latter ones take priority over the earlier ones. In the following example, if there is ever conflicting data between `*.toml` and `*.yaml` files, the `yaml` file will take precedence.

{% codetitle ".eleventy.js" %}

```js
const toml = require("@iarna/toml");
const yaml = require("js-yaml");

module.exports = (eleventyConfig) => {
	// Lower priority
	eleventyConfig.addDataExtension("toml", (contents) => toml.parse(contents));

	// Higher priority
	eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
};
```

### Example

Consider the [template data file search](/docs/data-template-dir/) for a `my-first-blog-post.md` file. The order with custom `toml` and `yaml` formats (as seen above) will go as follows:

- `my-first-blog-post.11tydata.js`
- `my-first-blog-post.11tydata.json`
- `my-first-blog-post.11tydata.yaml` (custom)
- `my-first-blog-post.11tydata.toml` (custom)
- `my-first-blog-post.json`
- `my-first-blog-post.yaml` (custom)
- `my-first-blog-post.toml` (custom)

This same ordering would be used for [template directory data files](/docs/data-template-dir/) as well.

- You can also use the [`setDataFileSuffixes` Configuration API method to **customize the `.11tydata` file suffix**](/docs/config/#change-file-suffix-for-data-files).
