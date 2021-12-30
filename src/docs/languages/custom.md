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

Eleventy now allows the addition of custom template extensions, meaning that you can use Eleventy to process any arbitrary file extension and compile it to your site’s output folder.

[[toc]]

## Process `.clowd` files to HTML

`clowd` is a new templating language that uses the `.clowd` file extension and translates any instances of the world `cloud` inside of the files to be the word `butt` instead.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
   // Add as a valid extension to process, a.k.a. add to --formats
  eleventyConfig.addTemplateFormats("clowd");

  // Creates the extension for use
  eleventyConfig.addExtension("clowd", {
    compile: (inputContent) => {
      // Replace any instances of cloud with butt
      let output = inputContent.replace(/cloud/gi, "butt");

      // This is the render function, `data` is the data cascade
      return (data) => {
        return output;
      };
    }
  });
};
```

{% callout "info", "md" -%}
Situations where you might want to use `addExtension` but probably shouldn’t:

1. If you want to post-process the content of an existing template language (a file extension already processed by Eleventy), use a [Configuration API Transform](/docs/config/#transforms) instead.
2. If you want to pre-process `md` or `html` files using another template language, change the _Default Template Engine for [Markdown Files](/docs/config/#default-template-engine-for-global-data-files)_ or _[HTML Files](/docs/config/#default-template-engine-for-html-files)_, respectively. This can also be done on [a per-template basis](/docs/languages/#overriding-the-template-language). We may add additional hooks for preprocessing in the future.
{%- endcallout %}

## Add Sass support to Eleventy

For a more realistic sample, here’s an example of Eleventy looking for all `.sass` files in a project’s input directory to process them to your output directory. Don’t forget to `npm install sass`.

{% codetitle ".eleventy.js" %}

```js
const sass = require("sass");

module.exports = function(eleventyConfig) {
   // Add as a valid extension to process, a.k.a. add to --formats
  eleventyConfig.addTemplateFormats("scss");

  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    compile: function(inputContent) {
      let result = sass.compileString(inputContent);

      // This is the render function, `data` is the data cascade
      return (data) => {
        return result.css;
      };
    }
  });
};
```

We’re using `compileString` from the Sass library above for speed benefits over their asynchronous counterparts (reported by [the Sass documentation](https://sass-lang.com/documentation/js-api#usage)).

<!-- Note also that the `data` is not used in the above example. This is the full Eleventy data cascade and may be more useful in other templating languages. -->

The above extension would process a file located at `subdir/test.scss` to the output directory at `_site/subdir/test.css`.

## Using `inputPath`

You can pass in both the file’s `inputPath` and the Eleventy includes folder to provide a set of directories to look for when using Sass’ `@use`, `@forward`, and `@import` features. Read more about [`loadPaths` on the Sass documentation](https://sass-lang.com/documentation/js-api/interfaces/Options#loadPaths).

{% codetitle ".eleventy.js" %}

```js/9,10,14
const sass = require("sass");

module.exports = function(eleventyConfig) {
   // add as a valid template language to process, e.g. this adds to --formats
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    compile: function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      let result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || ".",
          this.config.dir.includes
        ]
      });

      return (data) => {
        return result.css;
      };
    }
  });
};
```

## Skipping a template from inside of the `compile` function.

To add support for Sass’ underscore convention (file names that start with an underscore aren’t written to the output directory), just return early in the `compile` function (don’t return a `render` function).

```js/3-5
    // some configuration truncated …
    compile: function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if(parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent);

      return (data) => {
        return result.css;
      };
    }
```

## Advanced Compile Options

### Override Permalink Compilation

This has the same signature as the `compile` function and expects a reusable `render` function to be returned.

```js
compileOptions: {
  permalink: function(contents, inputPath) {
    return (data) => {
      // Return a string to override: you’ll want to use `data.page`
      // Or `return;` (return undefined) to fallback to default behavior
    }
  }
}
```

* Don’t compile permalink strings in the parent template language
  * `permalink: "raw"`
* Don’t write *any* files to the file system:
  * `permalink: false`
  * `permalink: (contents, inputPath) => false`
  * `permalink: (contents, inputPath) => ((data) => false)`
* Override the default permalink function (return a string to override)
  * `permalink: (contents, inputPath) => "…"`
  * `permalink: (contents, inputPath) => ((data) => "…")` (use the data cascade)
  * If you return nothing (or `undefined`), this will revert to the default permalink behavior.

This provides another way to implement Sass’ underscore convention to skip writing the file to the output directory:

{% codetitle ".eleventy.js" %}

```js
// … some configuration truncated

compileOptions: {
  permalink: function(contents, inputPath) {
    let parsed = path.parse(inputPath);
    if(parsed.name.startsWith("_")) {
      return false;
    }
  }
},
```