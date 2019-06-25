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
| ✅ Includes (Absolute Path)                               | `include /includedvar.pug` looks in `_includes/includedvar.pug`. Does not process front matter in the include file. |
| ✅ Includes (Relative Path) {% addedin "0.2.15" %} | Relative paths use `./` (template’s directory) or `../` (template’s parent directory).<br><br>Example: `{% raw %}{% include ./included.pug %}{% endraw %}` looks for `included.pug` in the template’s current directory. Does not process front matter in the include file. |
| ✅ Extends (Absolute Path)                                | `extends /layout.pug` looks in `_includes/layout.pug`. Does not process front matter in the include file.           |
| ✅ Extends (Relative Path) {% addedin "0.2.15" %}  | Relative paths use `./` (template’s directory) or `../` (template’s parent directory).<br><br>Example: `{% raw %}{% extends ./layout.pug %}{% endraw %}` looks for `layout.pug` in the template’s current directory. Does not process front matter in the extends file.           |
