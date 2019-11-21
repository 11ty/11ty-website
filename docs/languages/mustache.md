---
eleventyNavigation:
  parent: Template Languages
  key: Mustache
  order: 8
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package                                           |
| ------------------- | -------------- | ----------------------------------------------------- |
| `mustache`          | `.mustache`    | [`mustache.js`](https://github.com/janl/mustache.js/) |

You can override a `.mustache` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

## Mustache Options

### Optional: Set your own Library instance {% addedin "0.3.0" %}

As an escape mechanism for advanced usage, pass in your own instance of the Mustache library using the Configuration API.

```js
module.exports = function(eleventyConfig) {
  let mustache = require("mustache");
  eleventyConfig.setLibrary("mustache", mustache);
};
```

## Supported Features

| Feature     | Syntax                                           |
| ----------- | ------------------------------------------------ |
| ✅ Partials | `{% raw %}{{> user}}{% endraw %}` looks for `_includes/user.mustache`. Does not process front matter in the include file. |
| 🚫 Partials (Relative Path)                                                                  | **Not yet supported**: `{% raw %}{{> ./user}}{% endraw %}` looks for `user.mustache` in the template’s current directory.                                                                                             |

