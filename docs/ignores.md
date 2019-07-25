---
subtitle: Ignore Files
tags:
  - docs-config
---
# Ignore Template Files

Add an `.eleventyignore` file to your _input directory_ (or your _project root_ {% addedin "0.7.0", "span", "minilink-inline" %}) for a new line-separated list of files (or globs) that will not be processed by Eleventy. Paths listed in your project’s `.gitignore` file are automatically ignored.

## Example

{% codetitle ".eleventyignore" %}

```
README.md
_drafts/
secretNunjucksTemplates/anotherFolder/**/*.njk
```

## `node_modules` Exemption

If you do not have a `.gitignore` file in your project, the `node_modules` directory will be ignored automatically. This makes new Eleventy projects a little easier and helps developers new to Eleventy get ramped up easier too.

{% callout "info" %}{% addedin "0.9.0" %}<strong>If <code>.gitignore</code> exists but is empty</strong>: if you have a <code>.gitignore</code> file and it is empty (or only contains white-space), <code>node_modules</code> will be ignored automatically.{% endcallout %}

## Opt-out of using `.gitignore` {% addedin "0.3.5" %}

You can disable automatic use of your `.gitignore` file by using the Configuration API method: `eleventyConfig.setUseGitIgnore(false);`.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
};
```

When using `.gitignore` is disabled, `.eleventyignore` will be the single source of truth for ignored files. This also means that your `node_modules` directory will be processed unless otherwise specified in your `.eleventyignore` file.
