---
subtitle: EJS
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                |
| ------------------- | -------------- | ------------------------------------------ |
| `ejs`               | `.ejs`         | [`ejs`](https://www.npmjs.com/package/ejs) |

You can override a `.ejs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## EJS Options

### Optional: Compile/Render Options
{% addedin "0.3.0" %}

See “Options” on the [EJS home page](http://ejs.co/).

```
module.exports = function(eleventyConfig) {
  eleventyConfig.setEjsOptions({
    // use <? ?> instead of <% %>
    delimiter: "?"
  });
};
```

### Optional: Set your own Library instance

{% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of the EJS library using the Configuration API.

```js
module.exports = function(eleventyConfig) {
  let ejs = require("ejs");
  eleventyConfig.setLibrary("ejs", ejs);
};
```

## Supported Features

| Feature                             | Syntax                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------- |
| ✅ Include (Preprocessor Directive) | `<% include /user/show %>` looks for `_includes/user/show.ejs`                    |
| ✅ Include (pass in Data)           | `<%- include('/user/show', {user: 'Ava'}) %>` looks for `_includes/user/show.ejs` |
