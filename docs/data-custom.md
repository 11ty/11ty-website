---
eleventyNavigation:
  parent: Using Data
  key: Custom Data File Formats
  order: 3
relatedLinks:
  /docs/data-frontmatter-customize/: Customize Front Matter Parsing
---
# Custom Data File Formats {% addedin "0.10.0" %}

Out of the box, Eleventy supports arbitrary JavaScript and JSON for both [template and directory data files](/docs/data-template-dir/) as well as [global data](/docs/data-global/).

Maybe you want to add support for TOML or YAML too! Any text format will do.

[[toc]]

Note that you can also add [Custom Front Matter Formats](/docs/data-frontmatter-customize/) as well.

## Examples

### YAML

Here we’re using the [`js-yaml` package](https://www.npmjs.com/package/js-yaml). Don’t forget to `npm install js-yaml --save`.

{% codetitle ".eleventy.js" %}

```js
const yaml = require("js-yaml");

module.exports = eleventyConfig => {
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));
};
```

### TOML

Here we’re using the [`toml` package](https://www.npmjs.com/package/toml). Don’t forget to `npm install toml --save`.

{% codetitle ".eleventy.js" %}

```js
const toml = require("toml");

module.exports = eleventyConfig => {
  eleventyConfig.addDataExtension("toml", contents => toml.parse(contents));
};
```


### Another file extension for JSON

{% codetitle ".eleventy.js" %}

```js
module.exports = eleventyConfig => {
  eleventyConfig.addDataExtension("geojson", contents => JSON.parse(contents));
};
```

## Ordering in the Data Cascade

Note that in the [data cascade](/docs/data-cascade) JavaScript files take priority over JSON. The custom data file formats you add will be treated as lower priority than both JavaScript and JSON. There is a full example of this on the [Template and Directory Specific Data Files docs](/docs/data-template-dir/).

If you add multiple file extensions, the latter ones take priority over the earlier ones. In the following example, if there is ever conflicting data between `*.toml` and `*.yaml` files, the `yaml` file will take precedence.

{% codetitle ".eleventy.js" %}

```js
const toml = require("toml");
const yaml = require("js-yaml");

module.exports = eleventyConfig => {
  // Lower priority
  eleventyConfig.addDataExtension("toml", contents => toml.parse(contents));

  // Higher priority
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));
};
```