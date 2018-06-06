---
subtitle: Liquid
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                          |
| ------------------- | -------------- | ---------------------------------------------------- |
| `liquid`            | `.liquid`      | [`liquidjs`](https://www.npmjs.com/package/liquidjs) |

You can override a `.liquid` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Library Options

### Defaults

Rather than constantly fixing outdated documentation, [find `getLiquidOptions` in `Liquid.js`](https://github.com/11ty/eleventy/blob/master/src/Engines/Liquid.js). These options are different than the [default `liquidjs` options](https://github.com/harttle/liquidjs#options).

### Use your own options

_New in Eleventy `v0.2.15`:_ It’s recommended to use the Configuration API to set override the default options above.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });
};
```

## Set your own Library instance

_New in Eleventy `v0.3.0`:_ As an escape mechanism for advanced usage, pass in your own instance of the Liquid library using the Configuration API. See [all `liquidjs` options](https://github.com/harttle/liquidjs#options).

⚠️ Not compatible with `setLiquidOptions` above—this method will ignore any configuration set there.

```js
module.exports = function(eleventyConfig) {
  let liquidJs = require("liquidjs");
  let options = {
    extname: ".liquid",
    dynamicPartials: true,
    root: ["_includes"]
  };

  eleventyConfig.setLibrary("liquid", liquidJs(options));
};
```

## Supported Features

| Feature                                                                      | Syntax                                                                                                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include                                                                   | `{% raw %}{% include user %}{% endraw %}` looks for `_includes/user.liquid`                                                                             |
| ✅ Include                                                                   | `{% raw %}{% include 'user' %}{% endraw %}` looks for `_includes/user.liquid` (quotes around includes require `dynamicPartials: true`—read more at #72) |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user' with 'Ava' %}{% endraw %}`                                                                                                  |
| ✅ Include (pass in Data)                                                    | `{% raw %}{% include 'user', user1: 'Ava', user2: 'Bill' %}{% endraw %}`                                                                                |
| ✅ Custom Filters                                                            | `{% raw %}{{ name | upper }}{% endraw %}`  Read more about [Filters](/docs/filters/)                                                         |
| ✅ [Eleventy Universal Filters](/docs/filters/#universal-filters) | `{% raw %}{% name | filterName %}{% endraw %}` Read more about [Filters](/docs/filters/)                                                          |
| ✅ Custom Tags                                                               | `{% raw %}{% upper name %}{% endraw %}`  Read more about [Filters](/docs/filters/)                                                               |
