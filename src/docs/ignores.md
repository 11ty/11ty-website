---
eleventyNavigation:
  parent: Configuration
  key: Ignore Files
  order: 2
---
# Ignore Template Files

Add an `.eleventyignore` file to your _input_ directory or _project root_ directory ({% addedin "0.7.0", "span", "minilink-inline" %}) for a new line-separated list of files (or globs) that will not be processed by Eleventy. Paths listed in your project’s `.gitignore` file are automatically ignored.

We look for ignores in:

* Project root directory (top level, where you ran Eleventy from)
  * `.eleventyignore`
  * `.gitignore`
* Input directory (while this matches the project root by default, you can specify a different one with `--input`)
  * `.eleventyignore`
  * ~~`.gitignore`~~

{% callout "info" %}{% addedin "1.0.0" %}Only project root <code>.gitignore</code> files are supported in 1.0.{% endcallout %}

* Entries in these ignore files are relative to the ignore file’s location.
* [Layouts, include files, extends, partials, macros, and other lower level template features](/docs/config/#directory-for-includes) aren’t relevant to this feature.

### Example

{% codetitle ".eleventyignore" %}

```
README.md
_drafts/
secretNunjucksTemplates/anotherFolder/**/*.njk
```

## Exemptions

### `node_modules` Exemption

If you do not have a `.gitignore` file in your project, the `node_modules` directory will be ignored automatically. This makes new Eleventy projects a little easier and helps developers new to Eleventy get ramped up easier too.

{% callout "info" %}{% addedin "0.9.0" %}<strong>If <code>.gitignore</code> exists but is empty</strong>: if you have a <code>.gitignore</code> file and it is empty (or only contains white-space), <code>node_modules</code> will be ignored automatically.{% endcallout %}

### Opt-out of using `.gitignore` {% addedin "0.3.5" %}

You can disable automatic use of your `.gitignore` file by using the Configuration API method: `eleventyConfig.setUseGitIgnore(false);`.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
};
```

When using `.gitignore` is disabled, `.eleventyignore` will be the single source of truth for ignored files. This also means that your `node_modules` directory will be processed unless otherwise specified in your `.eleventyignore` file.
