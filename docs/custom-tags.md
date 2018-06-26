---
subtitle: Custom Tags
relatedKey: custom-tags
relatedTitle: Template Engine Custom Tags
tags:
  - docs-config
  - related-filters
  - related-shortcodes
---
# Custom Tags

Various template engines can be extended with custom tags. It’s unlikely that you want this feature. You probably want [shortcodes](/docs/shortcodes/) instead, Eleventy’s custom tags sugar.

Custom Tags are unrelated to Eleventy’s [Collections using Tags](/docs/collections/) feature. Add a Custom Tag using the [Configuration API](/docs/config/#using-the-configuration-api). 

## LiquidJS example

* External: [LiquidJS: Tags](https://github.com/harttle/liquidjs#register-tags)

{% raw %}
```js
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
        var str = liquidEngine.evalValue(this.str, scope); // "alice"

        // Do the uppercasing
        return Promise.resolve(str.toUpperCase()); // "ALICE"
      }
    };
  });
};
```
{% endraw %}

See all of the [built-in tag implementations for LiquidJS](https://github.com/harttle/liquidjs/tree/master/tags).

## Nunjucks example

{% addedin "0.5.0" %}

* External: [Nunjucks: Custom Tags](https://mozilla.github.io/nunjucks/api.html#custom-tags)


{% raw %}
```js
module.exports = function(eleventyConfig) {
  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}
  this.addNunjucksTag("uppercase", function(nunjucksEngine) {
    return new function() {
      this.tags = ["uppercase"];

      this.parse = function(parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtensionAsync(this, "run", args);
      };

      this.run = function(context, myStringArg, callback) {
        let ret = new nunjucksEngine.runtime.SafeString(
          myStringArg.toUpperCase()
        );
        callback(null, ret);
      };
    }();
  });
};
```
{% endraw %}