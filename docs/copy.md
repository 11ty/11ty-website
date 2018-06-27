---
subtitle: Pass-through Copy
tags:
  - docs-config
---
# Pass-through File Copy

{% addedin "0.2.7" %}

Eleventy, by default, searches for any file in the input directory with an extension listed in the `templateFormats` configuration option. That means if you’ve listed `njk` in your `templateFormats`, we’ll look for any Nunjucks templates (files with the `.njk` file extension).

If you list a format in the `templateFormats` array that isn’t a valid template, it’ll throw an error. Enabling `passthroughFileCopy` in your configuration changes this behavior. Setting `passthroughFileCopy: true` will copy unknown files directly to your output directory without modification.

```js
// .eleventy.js
module.exports = {
  templateFormats: [
    "md",
    "css" // css is not yet a valid template extension
  ],
  passthroughFileCopy: true
};
```

Although `css` is not currently a recognized Eleventy template, Eleventy will now search for any `*.css` files inside of the input directory and copy them to output (keeping directory structure).

You might also imagine using this for images by adding `"jpg"`, `"png"`, or maybe even `"webp"`.

## Manual Passthrough Copy (Faster)

{% addedin "0.2.14" %}

Searching the entire directory structure for files to copy based on file extensions is not optimal with large directory structures. If we know what non-template static content we want to appear in our output, we can opt-in to specify _files_ or _directories_ for Eleventy to copy for you. This will probably speed up your build times. These entries are relative to your the root of your project and _not_ your eleventy input directory.

```js
// .eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  
  // use a subdirectory, it’ll copy using the same directory structure.
  eleventyConfig.addPassthroughCopy("css/fonts");
  
  return {
    passthroughFileCopy: true
  };
};
```
