---
subtitle: Custom Tags
relatedKey: custom-tags
relatedTitle: Template Engine Custom Tags
tags:
  - docs-config
  - related-filters
---
# Custom Tags

Various template engines can be extended with custom tags. Some template engines call these shortcodes. This is unrelated to Eleventy’s [Collections using Tags](/docs/collections/) feature.

* External: [LiquidJS: Tags](https://github.com/harttle/liquidjs#register-tags)
{# * External: [Nunjucks: Custom Tags](https://mozilla.github.io/nunjucks/api.html#custom-tags) #}

This can be customized using the [Configuration API](/docs/config/#using-the-configuration-api). Here is an example:

{% raw %}
```js
const Liquid = require("liquidjs");
module.exports = function(eleventyConfig) {
  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}
  eleventyConfig.addLiquidTag("uppercase", function(liquidEngine) {
    return {
      parse: function(tagToken, remainingTokens) {
        this.str = tagToken.args; // myVar or "alice"
      },
      render: function(scope, hash) {
        // Resolve variables
        var str = Liquid.evalValue(this.str, scope); // "alice"

        // Do the uppercasing
        return Promise.resolve(str.toUpperCase()); // "ALICE"
      }
    };
  });
};
```
{% endraw %}

See all of the [built-in tag implementations for LiquidJS](https://github.com/harttle/liquidjs/tree/master/tags).