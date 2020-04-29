---
eleventyNavigation:
  parent: Configuration
  key: Passthrough File Copy
  order: 1
---
# Passthrough File Copy  {% addedin "0.2.7" %}

Eleventy, by default, searches for any file in the input directory with a file extension listed in your [`templateFormats` configuration](/docs/config/#template-formats). That means if you’ve listed `njk` in your `templateFormats`, we’ll look for any Nunjucks templates (files with the `.njk` file extension).

If a file format is not recognized by Eleventy as a valid template file extension, Eleventy will simply copy this file directly to your output.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css" // css is not yet a recognized template extension in Eleventy
  ]);
};
```

For example, in the above code sample `css` is not currently a recognized Eleventy template, but Eleventy will search for any `*.css` files inside of the input directory and copy them to output (keeping directory structure).

You might want to use this for images by adding `"jpg"`, `"png"`, or maybe even `"webp"`.

## Learn more

<style>
/* Hide the irrelevant stuff above this TOC in the document */
.table-of-contents > ul > li:first-child {
  display: none;
}
</style>

[[toc]]

<a id="{{ 'Manual Pass-through Copy (Faster)' | slug }}"></a>
## Manual Passthrough File Copy (Faster) {% addedin "0.2.14" %}

Searching the entire directory structure for files to copy based on file extensions is not optimal with large directory structures. If we know what non-template static content we want to appear in our output, we can opt-in to specify _files_ or _directories_ for Eleventy to copy. This will probably speed up your build times.

{% callout "info" %}Passthrough File Copy entries are relative to the root of your project and <em>not</em> your Eleventy input directory.{% endcallout %}

{% codetitle ".eleventy.js" %}{% codetitle "_site", "Output Directory" %}

```js
module.exports = function(eleventyConfig) {
  // Output directory: _site

  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("img");
  
  // Copy `css/fonts/` to `_site/css/fonts`
  // If you use a subdirectory, it’ll copy using the same directory structure.
  eleventyConfig.addPassthroughCopy("css/fonts");
};
```

If you do not want to maintain the same directory structure, [change the output directory.](#change-the-output-directory)

### How Passthrough File Copy Handles Input Directories

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

This example emulates the `templateFormats` passthrough file copy method above, copying all `jpg` image files to the output folder, maintaining their directory structure. If you do not want to maintain the same directory structure, [change the output directory.](#using-globs-and-output-directories)

Note that this method is slower than manual passthrough file copy without globs, as it searches the entire directory structure and copies each file in Eleventy individually.

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

<!-- Note that when the output directory is specified, the input directory is **not** stripped from the output path. It is used as-is.

```js
module.exports = function(eleventyConfig) {
  // Input directory: src
  // Output directory: _site

  // Copy `src/img/` to `_site/src/subfolder/img`
  eleventyConfig.addPassthroughCopy({ "src/img": "src/subfolder/img" });
};
``` -->

#### Using Globs and Output Directories

Note that this method is slower than manual passthrough file copy without globs, as it is searching the entire directory structure and copies each file in Eleventy individually.

{% codetitle ".eleventy.js" %}{% codetitle "_site", "Output Dir" %}

```js
module.exports = function(eleventyConfig) {
  // Output directory: _site

  // Find and copy any `jpg` files in any folder to _site/img
  // Does not maintain directory structure.
  eleventyConfig.addPassthroughCopy({ "**/*.jpg": "img" });
};
```

With an output directory of `_site`:

 * `img/avatar.jpg` would copy to `_site/img/avatar.jpg`
 * `subdir/img/avatar.jpg` would copy to `_site/img/avatar.jpg`


## Passthrough All Content {% addedin "0.5.4" %}

Given that global copy of all content in the directory may be a security risk, we do not copy anything that doesn’t match the file extensions listed in `templateFormats`. Note that we do provide a command line flag to bypass this behavior: `--passthroughall`. Intentionally, there is no configuration option to do this.

<div class="elv-callout elv-callout-warn"><strong>Warning:</strong> This may be a security risk—this is intended only for demos and other non-production use.</div>

{% codewithprompt "npxeleventy", "last" %}
# Copies ALL files in the input directory to the output directory
--passthroughall
{% endcodewithprompt %}

## Disabling Passthrough File Copy

If you’d like to disable passthrough file copy, use `passthroughFileCopy: false`.

{% callout "info" %}Note that this will disable both automatic and manual passthrough copy (the <code>addPassthroughCopy</code> configuration API method).{% endcallout %}

```js
module.exports = function(eleventyConfig) {
  return {
    passthroughFileCopy: false
  };
};
```
