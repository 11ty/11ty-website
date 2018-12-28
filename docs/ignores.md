---
subtitle: Ignore Files
tags:
  - docs-config
---
# Ignore Template Files

Add an `.eleventyignore` file to the _root of your input directory_ for a new line-separated list of files (or globs) that will not be processed by Eleventy. Paths listed in your project’s `.gitignore` file are automatically ignored.

Important note: if you do not have a `.gitignore` file in your project, the `node_modules` directory will be ignored automatically.

## Example

{% codetitle ".eleventyignore" %}

```
README.md
_drafts/
secretNunjucksTemplates/anotherFolder/**/*.njk
```

## Opt-out of using `.gitignore` {% addedin "0.3.5", "span" %}

You can disable automatic use of your `.gitignore` file by using the Configuration API method: `eleventyConfig.setUseGitIgnore(false);`.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
};
```

When using `.gitignore` is disabled, `.eleventyignore` will be the single source of truth for ignored files. This also means that your `node_modules` directory will be processed unless otherwise specified in your `.eleventyignore` file.
