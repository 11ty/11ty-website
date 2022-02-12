---
eleventyNavigation:
  parent: Configuration
  key: Ignore Files
  order: 2
---
# Ignore Template Files

Add an `.eleventyignore` file to your _input_ directory or _project root_ directory ({% addedin "0.7.0", "span", "minilink-inline" %}) for a new line-separated list of files (or globs) that will not be processed by Eleventy. Note that any paths listed in your project’s `.gitignore` file are automatically ignored—you don’t need to duplicate them to your `.eleventyignore` file. [Layouts, include files, extends, partials, macros, and other lower level template features](/docs/config/#directory-for-includes) aren’t relevant to this feature.

#### Sample `.eleventyignore`

{% codetitle ".eleventyignore" %}

```
README.md
_drafts/
secretNunjucksTemplates/anotherFolder/**/*.njk
```

## Configuration API {% addedin "1.0.0" %}

You can programmatically add and delete ignores in your configuration file. `eleventyConfig.ignores` is a JavaScript [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#instance_methods). It starts with a default `node_modules/**` entry.

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.delete("README.md");
};
```

## Defaults

### `.gitignore` entries

Paths listed in your project’s `.gitignore` file are automatically ignored.

### `node_modules` {% addedin "1.0.0" %}

{% callout "info", "md" %}The `node_modules` behavior changed in Eleventy `1.0`. If you’re still using [Eleventy `0.x`, read the `0.x` documentation](https://v0-12-1.11ty.dev/docs/ignores/#node_modules-exemption).{% endcallout %}

The project root `node_modules` folder is always ignored by Eleventy. This makes new Eleventy projects easier and helps developers new to Eleventy get ramped up easier too.

If you want to opt-out and search for templates inside of your `node_modules` folder, delete the entry using the Configuration API:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.ignores.delete("node_modules/**");
};
```

## File Locations

We look for ignores in these files. Entries are relative to the ignore file’s location.

* Project root directory (top level, where you ran Eleventy from)
  * `.eleventyignore`
  * `.gitignore`
* Input directory (while this matches the project root by default, these can be different [using `--input`](/docs/usage/))
  * `.eleventyignore`

{% callout "info", "md" %}Starting in Eleventy `1.0` support for a `.gitignore` file in a separate input directory was removed. Read more at [Issue #364](https://github.com/11ty/eleventy/issues/364).{% endcallout %}

## Opt-out of using `.gitignore` {% addedin "0.3.5" %}

You can disable automatic use of your `.gitignore` file by using the Configuration API method: `eleventyConfig.setUseGitIgnore(false);`.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
};
```

When using `.gitignore` is disabled, `.eleventyignore` will be the single source of truth for ignored files. This also means that your `node_modules` directory will be processed unless otherwise specified in your `.eleventyignore` file.
