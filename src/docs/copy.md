---
eleventyNavigation:
  parent: Configuration
  key: Passthrough File Copy
  order: 1
---
# Passthrough File Copy {% addedin "0.2.14" %}

If we want to copy additional files that are not Eleventy templates, we use a feature called Passthrough File Copy to  tell Eleventy to copy things to our output folder for us.

[[toc]]

<a id="{{ 'Manual Pass-through Copy (Faster)' | slug }}"></a>
<a id="{{ 'Manual Passthrough Copy (Faster)' | slug }}"></a>

## Configuration API Method

Use a configuration API method to specify _files_ or _directories_ for Eleventy to copy.

{% codetitle ".eleventy.js" %}{% codetitle "_site", "Output Directory" %}

```js
module.exports = function(eleventyConfig) {
  // Output directory: _site

  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("img");

  // Copy `css/fonts/` to `_site/css/fonts`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("css/fonts");

  // Copy any .jpg file to `_site`, via Glob pattern (in 0.9.0+)
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("**/*.jpg");
};
```

{% callout "info" %}Passthrough File Copy entries are relative to the root of your project and <em>not</em> your Eleventy input directory.{% endcallout %}

If you do not want to maintain the same directory structure, [change the output directory.](#change-the-output-directory)

{% addedin "0.11.0" %}Pass-through copy is now friendly to [incremental builds](/docs/usage/incremental/#passthrough-copy). Changes to copied files will not trigger a full build and changes to template files will not trigger passthrough file copy.

### How Input Directories are Handled

As stated above, passthrough file copy paths are relative to the project root and not the input directory. Because of this, if the passthrough file copy path is inside of your input directory, the input directory will be stripped from the output path.

For example:

* `input` directory is `src`
* `output` directory is `_site`.

If we copy `src/img` using passthrough file copy, it will copy to `_site/img`.

{% codetitle ".eleventy.js" %}{% codetitle "src", "Input Directory" %}
{% codetitle "_site", "Output Directory" %}

```js
module.exports = function(eleventyConfig) {
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
module.exports = function(eleventyConfig) {
  // Find and copy any `jpg` files, maintaining directory structure.
  eleventyConfig.addPassthroughCopy("**/*.jpg");
};
```

With an output directory of `_site`:

 * `img/avatar.jpg` will copy to `_site/img/avatar.jpg`
 * `subdir/img/avatar.jpg` will copy to `_site/subdir/img/avatar.jpg`

### Change the Output Directory {% addedin "0.9.0" %}

Instead of a string, pass in an object of the following structure: `{ "input": "target" }`.

{% codetitle ".eleventy.js" %}{% codetitle "src", "Input Directory" %}
{% codetitle "_site", "Output Directory" %}

```js
module.exports = function(eleventyConfig) {
  // Input directory: src
  // Output directory: _site

  // Copy `img/` to `_site/subfolder/img`
  eleventyConfig.addPassthroughCopy({ "img": "subfolder/img" });

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
module.exports = function(eleventyConfig) {
  // Output directory: _site

  // Find and copy any `jpg` files in any folder to _site/img
  // Does not keep the same directory structure.
  eleventyConfig.addPassthroughCopy({ "**/*.jpg": "img" });
};
```

With an output directory of `_site`:

 * `img/avatar.jpg` would copy to `_site/img/avatar.jpg`
 * `subdir/img/avatar.jpg` would copy to `_site/img/avatar.jpg`

## Passthrough by File Extension {% addedin "0.2.7" %}

Eleventy, by default, searches for any file in the input directory with a file extension listed in your [`templateFormats` configuration](/docs/config/#template-formats). That means if you’ve listed `njk` in your `templateFormats`, we’ll look for any Nunjucks templates (files with the `.njk` file extension).

If a file format is not recognized by Eleventy as a template file extension, Eleventy will ignore the file. You can modify this behavior by adding supported template formats:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css" // css is not yet a recognized template extension in Eleventy
  ]);
};
```

In the above code sample `css` is not currently a recognized Eleventy template, but Eleventy will search for any `*.css` files inside of the input directory and copy them to output (keeping directory structure).

You might want to use this for images by adding `"jpg"`, `"png"`, or maybe even `"webp"`.

{% callout "info", "md" %}Note that this method is typically slower than the `addPassthroughCopy` configuration API method above, especially if your project is large and has lots of files.{% endcallout %}

## Passthrough all Content {% addedin "0.5.4" %}

Given that global copy of all content in the directory may be a security risk, we do not copy anything that doesn’t match the file extensions listed in `templateFormats`. Note that we do provide a command line flag to bypass this behavior: `--passthroughall`. Intentionally, there is no configuration option to do this.

<div class="elv-callout elv-callout-warn"><strong>Warning:</strong> This may be a security risk—this is intended only for demos and other non-production use.</div>

```bash
# Copies ALL files in the input directory to the output directory
npx @11ty/eleventy --passthroughall
```
