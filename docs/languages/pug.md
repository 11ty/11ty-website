---
subtitle: Pug
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                           |
| ------------------- | -------------- | ------------------------------------- |
| `pug`               | `.pug`         | [`pug`](https://github.com/pugjs/pug) |

Pug templates used to be called Jade templates and the project was renamed.

You can override a `.pug` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Pug Options

### Optional: Compile/Render Options {% addedin "0.2.15" %}

Set compile/render options using the Configuration API. See all [Pug options](https://pugjs.org/api/reference.html#options).

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setPugOptions({ debug: true });
};
```

### Optional: Set your own Library instance {% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of the Pug library using the Configuration API.

```js
module.exports = function(eleventyConfig) {
  let pug = require("pug");
  eleventyConfig.setLibrary("pug", pug);
};
```


## Supported Features

| Feature                                              | Syntax                                                          |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| ✅ Includes (Absolute)                               | `include /includedvar.pug` looks in `_includes/includedvar.pug` (does not process front matter) |
| ✅ Includes (Relative) _(New in Eleventy `v0.2.15`)_ | `include includedvar.pug` looks in `_includes/includedvar.pug` (does not process front matter) |
| ✅ Extends (Absolute)                                | `extends /layout.pug` looks in `_includes/layout.pug` (does not process front matter)           |
| ✅ Extends (Relative) _(New in Eleventy `v0.2.15`)_  | `extends layout.pug` looks in `_includes/layout.pug` (does not process front matter)           |
