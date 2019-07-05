---
subtitle: Passthrough Copy
tags:
  - docs-config
---
# Passthrough File Copy  {% addedin "0.2.7" %}

Eleventy, by default, searches for any file in the input directory with a file extension listed in your [`templateFormats` configuration](/docs/config/#template-formats). That means if you’ve listed `njk` in your `templateFormats`, we’ll look for any Nunjucks templates (files with the `.njk` file extension).

If a file format is not recognized by Eleventy as a valid template file extension, Eleventy will simply copy this file directly to your output.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  return {
    templateFormats: [
      "md",
      "css" // css is not yet a recognized template extension in Eleventy
    ]
  };
};
```

For example, in the above code sample `css` is not currently a recognized Eleventy template, but Eleventy will search for any `*.css` files inside of the input directory and copy them to output (keeping directory structure).

You might want to use this for images by adding `"jpg"`, `"png"`, or maybe even `"webp"`.

## Manual Pass-through Copy (Faster) {% addedin "0.2.14" %}

Searching the entire directory structure for files to copy based on file extensions is not optimal with large directory structures. If we know what non-template static content we want to appear in our output, we can opt-in to specify _files_ or _directories_ for Eleventy to copy. This will probably speed up your build times. These entries are relative to the root of your project and _not_ your Eleventy input directory.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Copy the `img/` directory 
  eleventyConfig.addPassthroughCopy("img");
  
  // Copy the `css/fonts/` directory
  // If you use a subdirectory, it’ll copy using the same directory structure.
  eleventyConfig.addPassthroughCopy("css/fonts");
};
```

{% callout "info" %}Only individual <em>files</em> and <em>directories</em> are supported. <em>Globs</em> are not yet supported for manual passthrough copy.{% endcallout %}

## Passthrough All Content {% addedin "0.5.4" %}

Given that global copy of all content in the directory may be a security risk, we do not copy anything that doesn’t match the file extensions listed in `templateFormats`. Note that we do provide a command line flag to bypass this behavior: `--passthroughall`. Intentionally, there is no configuration option to do this.

<div class="elv-callout elv-callout-warn"><strong>Warning:</strong> This may be a security risk—this is intended only for demos and other non-production use.</div>

```
# Copies ALL files in the input directory to the output directory
npx eleventy --passthroughall
```

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
