---
eleventyNavigation:
  parent: Template Languages
  key: Custom
  order: 12
relatedKey: customlang
relatedTitle: Template Language—Custom
layout: layouts/langs.njk
---
{% addedin "1.0.0" %}

{% callout %}This documentation is incomplete! See [the issue proposing this feature](https://github.com/11ty/eleventy/issues/117) and [the issue for complete documentation.](https://github.com/11ty/eleventy/issues/2036){% endcallout %}

To create a custom template language, call `eleventyConfig.addExtension`:

```js
eleventyConfig.addExtension("mdx", {
  // the file extension that the compiled output will get
  outputFileExtension: "html",

  // create a compiler for the provided file.
  // optional if you provide an extension Eleventy already supports for the `extension` parameter above.
  async compile(content, inputPath) {
    // this.config is your eleventyConfig object

    return function (data) {
      // data is the merged data object to pass to the template.
      // this.defaultRenderer is the default renderer for the file type, if there is one
      return "<html>...</html>"
    }
  },

  // [optional] called before this template language is first used
  init() {
    // this.config is your eleventyConfig object
  },

  // [optional] provide data for your file (such as from front matter):
  // either specify a function that returns the data directly...
  async getData(inputPath) { /* ... */ },
  // or, specify a list of data keys, and `getInstanceFromInputPath`:
  getData: true, // equivalent to ["data"]
  getData: ["key1", "key2", "key3"], // only the keys you specify will be available to the template
  async getInstanceFromInputPath(inputPath) {
    return {
      // ... return data here. Values can be either the value itself, a promise, or a function that returns either of those.

      // optional, overrides the value of `getData`:
      // (must be an array or other iterable if present)
      eleventyDataKey: ["key1", "key2", "key3"]
    }
  }
  
  // [optional] disable reading from the file (resulting in a `null` value for `content` in the `compile` method)
  // (you might do this if the template engine you’re providing handles reading files itself)
  read: false
})
```
