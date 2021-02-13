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


### A custom JSON file extension

{% codetitle ".eleventy.js" %}

```js
module.exports = eleventyConfig => {
  eleventyConfig.addDataExtension("geojson", contents => JSON.parse(contents));
};
```

## Ordering in the Data Cascade

Note that in the [data cascade](/docs/data-cascade/) there is a specific conflict resolution order when the same keys are used in data files. For example, [JavaScript files take priority over JSON](/docs/data-template-dir/). These new custom data file formats are treated as lower priority than both JavaScript and JSON.

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

### Example

Consider the [template data file search](/docs/data-template-dir/) for a `my-first-blog-post.md` file. The order with custom `toml` and `yaml` formats (as seen above) will go as follows:

* `my-first-blog-post.11tydata.js`
* `my-first-blog-post.11tydata.json`
* `my-first-blog-post.11tydata.yaml` (custom)
* `my-first-blog-post.11tydata.toml` (custom)
* `my-first-blog-post.json`
* `my-first-blog-post.yaml` (custom)
* `my-first-blog-post.toml` (custom)

This same ordering would be used for [template directory data files](/docs/data-template-dir/) as well.
