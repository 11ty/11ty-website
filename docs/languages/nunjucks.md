---
subtitle: Nunjucks
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `njk`               | `.njk`         | [`nunjucks`](https://mozilla.github.io/nunjucks/) |

You can override a `.njk` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

### Use your Nunjucks Environment

_New in Eleventy `v0.3.0`:_ As an escape mechanism for advanced usage, pass in your own instance of a [Nunjucks Environment](https://mozilla.github.io/nunjucks/api.html#environment) using the Configuration API.

```js
module.exports = function(eleventyConfig) {
  let Nunjucks = require("nunjucks");
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("_includes")
  );

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
};
```

### Supported Features

| Feature                                                                      | Syntax                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ✅ Includes                                                                  | `{% raw %}{% include 'included.njk' %}{% endraw %}` looks in `_includes/included.njk`          |
| ✅ Extends                                                                   | `{% raw %}{% extends 'base.njk' %}{% endraw %}` looks in `_includes/base.njk`                  |
| ✅ Imports                                                                   | `{% raw %}{% import 'macros.njk' %}{% endraw %}` looks in `_includes/macros.njk`               |
| ✅ Filters                                                                   | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/).                                |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/). |
