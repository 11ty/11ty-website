---
eleventyNavigation:
  parent: Configuration
  key: Passthrough File Copy
  order: 1
---

# Passthrough File Copy {% addedin "0.2.14" %}

{% tableofcontents %}

If we want to copy additional files that are not Eleventy templates, we use a feature called Passthrough File Copy to tell Eleventy to copy things to our output folder for us.

## Configuration API Method

<a id="{{ 'Manual Pass-through Copy (Faster)' | slug }}"></a><a id="{{ 'Manual Passthrough Copy (Faster)' | slug }}"></a>

Use a configuration API method to specify _files_ or _directories_ for Eleventy to copy.

{% codetitle ".eleventy.js" %}{% codetitle "_site", "Output Directory" %}

```js
module.exports = function (eleventyConfig) {
	// Output directory: _site

	// Copy `img/` to `_site/img`
	eleventyConfig.addPassthroughCopy("img");

	// Copy `css/fonts/` to `_site/css/fonts`
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("css/fonts");

	// Copy any .jpg file to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
};
```

{% callout "info" %}Passthrough File Copy entries are relative to the root of your project and <em>not</em> your Eleventy input directory.{% endcallout %}

If you do not want to maintain the same directory structure, [change the output directory.](#change-the-output-directory)

### How Input Directories are Handled

As stated above, passthrough file copy paths are relative to the project root and not the input directory. Because of this, if the passthrough file copy path is inside of your input directory, the input directory will be stripped from the output path.

For example:

- `input` directory is `src`
- `output` directory is `_site`.

If we copy `src/img` using passthrough file copy, it will copy to `_site/img`.

{% codetitle ".eleventy.js" %}{% codetitle "src", "Input Directory" %}
{% codetitle "_site", "Output Directory" %}

```js
module.exports = function (eleventyConfig) {
	// Input directory: src
	// Output directory: _site

	// The following copies to `_site/img`
	eleventyConfig.addPassthroughCopy("src/img");
};
```

### Using Globs {% addedin "0.9.0" %}

In this example, we copy all `jpg` image files to the output folder, maintaining their directory structure. If you do not want to maintain the same directory structure, [change the output directory.](#using-globs-and-output-directories)

Note that this method is slower than non-glob methods, as it searches the entire directory structure and copies each file in Eleventy individually.

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Find and copy any `jpg` files, maintaining directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
};
```

With an output directory of `_site`:

- `img/avatar.jpg` will copy to `_site/img/avatar.jpg`
- `subdir/img/avatar.jpg` will copy to `_site/subdir/img/avatar.jpg`

### Change the Output Directory {% addedin "0.9.0" %}

Instead of a string, pass in an object of the following structure: `{ "input": "target" }`.

{% codetitle ".eleventy.js" %}{% codetitle "src", "Input Directory" %}
{% codetitle "_site", "Output Directory" %}

```js
module.exports = function (eleventyConfig) {
	// Input directory: src
	// Output directory: _site

	// Copy `img/` to `_site/subfolder/img`
	eleventyConfig.addPassthroughCopy({ img: "subfolder/img" });

	// Copy `src/img/` to `_site/subfolder/img`
	eleventyConfig.addPassthroughCopy({ "src/img": "subfolder/img" });

	// Copy `random-folder/img/` to `_site/subfolder/img`
	eleventyConfig.addPassthroughCopy({ "random-folder/img": "subfolder/img" });
};
```

#### Using Globs and Output Directories

Note that this method is slower than non-glob methods, as it is searching the entire directory structure and copies each file in Eleventy individually.

{% codetitle ".eleventy.js" %}{% codetitle "_site", "Output Dir" %}

```js
module.exports = function (eleventyConfig) {
	// Output directory: _site

	// Find and copy any `jpg` files in any folder to _site/img
	// Does not keep the same directory structure.
	eleventyConfig.addPassthroughCopy({ "**/*.jpg": "img" });
};
```

With an output directory of `_site`:

- `img/avatar.jpg` would copy to `_site/img/avatar.jpg`
- `subdir/img/avatar.jpg` would copy to `_site/img/avatar.jpg`

## Passthrough by File Extension {% addedin "0.2.7" %}

Eleventy, by default, searches for any file in the input directory with a file extension listed in your [`templateFormats` configuration](/docs/config/#template-formats). That means if you’ve listed `njk` in your `templateFormats`, we’ll look for any Nunjucks templates (files with the `.njk` file extension).

If a file format is not recognized by Eleventy as a template file extension, Eleventy will ignore the file. You can modify this behavior by adding supported template formats:

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats([
		"md",
		"css", // css is not yet a recognized template extension in Eleventy
	]);
};
```

In the above code sample `css` is not currently a recognized Eleventy template, but Eleventy will search for any `*.css` files inside of the input directory and copy them to output (keeping directory structure).

You might want to use this for images by adding `"jpg"`, `"png"`, or maybe even `"webp"`.

{% callout "info", "md" %}Note that this method is typically slower than the `addPassthroughCopy` configuration API method above, especially if your project is large and has lots of files.{% endcallout %}

<span id="passthrough-during-serve"></span>

## Emulate Passthrough Copy During `--serve` {% addedin "2.0.0-canary.12" %}

The [Eleventy Dev Server](/docs/watch-serve/#eleventy-dev-server) includes a great build-performance feature that will _emulate_ passthrough file copy.

Practically speaking, this means that (during `--serve` only!) files are referenced directly and _**will not**_ be copied to your output folder. Changes to passthrough file copies will not trigger an Eleventy build but _will_ live reload appropriately in the dev server.

You can enable this behavior in your project using this configuration API method:

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// the default is "copy"
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};
```

This behavior will revert to `"copy"` in your project automatically if:

1. If you are running Eleventy without `--serve` (a standard build or via `--watch`)
2. You change from the default development server: [Eleventy Dev Server](/docs/dev-server/) (e.g. [swap back to Browsersync](/docs/dev-server/#swap-back-to-browsersync))

{% callout "info", "md" %}_For 2.0 canary users, note that this behavior spent a fair bit of time as the default and required opt-out from `2.0.0-canary.12` through `2.0.0-canary.30`. It was changed to opt-in in `2.0.0-canary.31`._{% endcallout %}

<div class="youtube-related">
  {%- youtubeEmbed "EcId2RVdUFE", "Emulated Passthrough File Copy (Weekly №15)", "443" -%}
</div>

## Advanced Options {% addedin "2.0.0-canary.12" %}

Additionally, you can pass additional configuration options to the `recursive-copy` package. This unlocks the use passthrough file copy with symlinks, transforming or renaming copied files. Here are just a few examples:

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img", {
		expand: true, // expand symbolic links
	});
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	let copyOptions = {
		debug: true, // log debug information
	};

	eleventyConfig.addPassthroughCopy({ img: "subfolder/img" }, copyOptions);
};
```

Review the [full list of options on the `recursive-copy` GitHub repository](https://github.com/timkendrick/recursive-copy#usage).

<div class="youtube-related">
  {%- youtubeEmbed "EcId2RVdUFE", "Passthrough File Copy Advanced Options (Weekly №15)", "337" -%}
</div>
