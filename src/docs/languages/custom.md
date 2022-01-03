---
eleventyNavigation:
  parent: Template Languages
  key: Custom
  order: 12
relatedKey: customlang
relatedTitle: Template Language—Custom
layout: layouts/langs.njk
---

{% callout "info", "md" %}If you’re already experimenting with this feature on Eleventy pre-releases, this documentation is specific to `1.0.0-beta.10` or `1.0.0-canary.50` or newer. This info-box will self destruct upon final `1.0.0` stable release.{% endcallout %}

{% addedin "1.0.0" %}

Eleventy now allows the addition of custom template extensions, meaning that you can use Eleventy to process any arbitrary file extension and compile it to your site’s output folder.

[[toc]]

## Introductory Example: Process `.clowd` files to HTML

`clowd` is a new templating language that uses the `.clowd` file extension and translates any instances of the world `cloud` inside of the files to be the word `butt` instead.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Add as a valid extension to process
  // Alternatively, add this to the list of formats you pass to the `--formats` CLI argument
  eleventyConfig.addTemplateFormats("clowd");

  // "clowd" here means that the extension will apply to any .clowd file
  eleventyConfig.addExtension("clowd", {
    compile: async (inputContent) => {
      // Replace any instances of cloud with butt
      let output = inputContent.replace(/cloud/gi, "butt");

      return async () => {
        return output;
      };
    }
  });
};
```

{% callout "info", "md" -%}
Situations where you might want to use `addExtension` but probably shouldn’t:

1. If you want to post-process the content of an existing template language (a file extension already processed by Eleventy), use a [Configuration API Transform](/docs/config/#transforms) instead.
2. If you want to pre-process `md` or `html` files using another template language, change the _Default Template Engine for [Markdown Files](/docs/config/#default-template-engine-for-markdown-files)_ or _[HTML Files](/docs/config/#default-template-engine-for-html-files)_, respectively. This can also be done on [a per-template basis](/docs/languages/#overriding-the-template-language). We will likely add additional hooks for preprocessing in the future.
{%- endcallout %}

## Example: Add Sass support to Eleventy

For a more realistic sample, here’s an example of Eleventy looking for all `.sass` files in a project’s input directory to process them to your output directory.

{% codetitle ".eleventy.js" %}

```js
// Don’t forget to `npm install sass`!
const sass = require("sass");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    // `compile` is called once per .scss file in the input directory
    compile: async function(inputContent) {
      let result = sass.compileString(inputContent);

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    }
  });
};
```

We’re using `compileString` from the Sass library above for speed benefits over their asynchronous counterparts (reported by [the Sass documentation](https://sass-lang.com/documentation/js-api#usage)).

Note also that the `data` is not used in the above example. This is the full Eleventy data cascade and may be more useful in other templating languages.

The above extension would process a file located at `subdir/test.scss` to the output directory at `_site/subdir/test.css`.

## Using `inputPath`

You can pass in both the file’s `inputPath` and the Eleventy includes folder to provide a set of directories to look for when using Sass’ `@use`, `@forward`, and `@import` features. Read more about [`loadPaths` on the Sass documentation](https://sass-lang.com/documentation/js-api/interfaces/Options#loadPaths).

{% codetitle ".eleventy.js" %}

```js/10,11,15-18
const sass = require("sass");
const path = require("node:path");

module.exports = function(eleventyConfig) {
   // add as a valid template language to process, e.g. this adds to --formats
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    // can be an async function
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
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if(parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent);

      return async (data) => {
        return result.css;
      };
    }
```

## Overriding an Existing Template Language

You can override existing template languages too! (Thank you to [Ben Holmes of Slinkity for this contribution](https://github.com/11ty/eleventy/pull/1871)).

In these example, we switch from the Eleventy default `markdown-it` to `marked` for markdown processing.

```js
const { marked } = require("marked");

module.exports = function(eleventyConfig) {
  eleventyConfig.addExtension("md", {
    compile: async function (inputContent, inputPath) {
      let html = marked.parse(inputContent);

      return async (data) => {
        return html;
      };
    }
  }
};
```

Note that overriding `md` opts-out of the default pre-processing by another template language [Markdown Files](/docs/config/#default-template-engine-for-markdown-files)_. As mentioned elsewhere, improvements to add additional hooks for preprocessing will likely come later.

## Full Options List

### `compile`

A function that takes two parameters:

- `content`: the full content of the file to parse (as a string)
- `inputPath`: the path to the file (as a string, useful for looking up relative imports)

`compile` can either return nothing (to indicate that the file should be ignored and not used as a page), or return a render function.

The render function is passed the merged data object (i.e. the top level value available inside templates)

### `outputFileExtension`

When the output file is written to the file system, what file extension should be used? If missing, defaults to `html`.

### `init`

A function that runs once per template language, for any additional setup at the beginning before any compilation or rendering.

```js
{
  init: async function() {
    // has access to current configuration settings in `this.config`
  },
}
```

### `read`

Set to `false` to opt out of reading the contents of files from the file system. This is useful if you’re using an external bundler to read the files (e.g. the Vue plugin uses rollup to read and compile `.vue` files).

```js
{
  read: false, // default: true
}
```

Use with `compileOptions.setCacheKey` to get more fine-grained control over how the template is cached.

<!-- ## `extension`

You probably won’t need this but it’s useful if your extension doesn’t match the template language key. -->

### `getData` and `getInstanceFromInputPath`

Controls if and how additional data should be retrieved from a JavaScript object to populate the Data Cascade. If your templates aren’t compiling JavaScript objects, you probably won’t need this.

Notably, this is separate from (in addition to) front matter parsing (which requires `read: true`). As an example, this is used by the Vue plugin to retrieve the return from the Vue `data()` function in the Vue component to feed back into the Data Cascade.

```js
{
  // this is the default
  getData: false // no additional data is used
}
```

```js
{
  getData: async function(inputPath) {
    // completely DIY, this object will be merged into data cascade
    return {};
  },
}
```

```js
{
  // get the `data` property from the instance.
  getData: ["data"],
  // * `getData: true` is aliased to ["data"]
  // * You can use more than one property name! ["data", "otherPropName"]

  getInstanceFromInputPath: function(inputPath) {
    // Return the JavaScript object from which the `data` property will be retrieved.
    let instance = doSomethingMyselfToFetchAJavaScriptObject(inputPath);
    return instance;
  }
}
```

<details>
  <summary><strong><em>Advanced Use Case:</em></strong> overriding <code>getData</code> keys for one instance</summary>

If the JavaScript object returned from `getInstanceFromInputPath` has an `eleventyDataKey` property, this is used to override the keys returned from the `getData` Array for this specific instance only. Anything you can pass into a [`new Set()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) works here (Array, Map, another Set).

```js
{
  // if getData is `false`, `eleventyDataKey` will not be used.
  getData: true,

  getInstanceFromInputPath: function(inputPath) {
    return {
      // Overrides `getData` for this instance
      eleventyDataKey: ["myOverrideData"],

      // Will not be used
      data: {
        notAvailableOnGlobalData: 456
      },

      // Will be used.
      myOverrideData: {
        availableOnGlobalData: 123
      }
    }
  }
}
```

In the above example, the data cascade will include a top-level variable `availableOnGlobalData` with a value of `123`. Using `eleventyDataKey` overrides any keys set in `getData`, which means (for this instance) `data` will be ignored and `notAvailableOnGlobalData` will not be present.

</details>

### `compileOptions`

#### `compileOptions.permalink` to Override Permalink Compilation

This has the same signature as the `compile` function and expects a reusable `render` function to be returned.

```js
{
  compileOptions: {
    permalink: function(contents, inputPath) {
      return (data) => {
        // Return a string to override: you’ll want to use `data.page`
        // Or `return;` (return undefined) to fallback to default behavior
      }
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

{
  compileOptions: {
    permalink: function(contents, inputPath) {
      let parsed = path.parse(inputPath);
      if(parsed.name.startsWith("_")) {
        return false;
      }
    }
  }
}
```

#### `compileOptions.spiderJavaScriptDependencies`

Default is `false`. Enable to use Eleventy to spider and watch files `require`’d in these templates. This allows you to control the [Watch JavaScript Dependencies](/docs/watch-serve/#watch-javascript-dependencies) feature on a per-template language basis. Most template languages will want the default here and keep this feature disabled.

#### `compileOptions.cache` for advanced control of caching

This controls caching for the compilation step, which saves the compiled template function for reuse if another template attempts to compile with the same key (usually a file’s contents).

By default, whether or not `cache` is enabled is tied to boolean value of `read`. If `read: true`, then `cache` will also be `true`. It’s unlikely you will need this, but you can override this to mismatch `read`.

You can also control the caching key using `getCacheKey`. It might be useful to change this when using `read: false` and `contents` are unavailable.

```js
{
  read: false,
  compileOptions: {
    cache: true,
    getCacheKey: function(contents, inputPath) {
      // return contents; // this is the default
      return inputPath; // override to cache by inputPath (this means the compile function will not get called when the file contents change)
    }
  }
}
```
