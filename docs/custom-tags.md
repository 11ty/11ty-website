---
subtitle: Custom Tags
relatedKey: custom-tags
relatedTitle: Template Custom Tags
tags:
  - docs-config
  - related-shortcodes
  - related-nunjucks
  - related-liquid
  - related-handlebars
---
# Custom Tags

<div class="elv-callout elv-callout-info">It’s unlikely that you want this feature. You probably want <a href="/docs/shortcodes/">shortcodes</a> instead, Eleventy’s custom tags sugar (it’s easier to use).</div>

Various template engines can be extended with custom tags.

Custom Tags are unrelated to Eleventy’s [Collections using Tags](/docs/collections/) feature. Unfortunately we’ve inherited this name from various upstream template languages.

But, after all that, you can still add a Custom Tag using the [Configuration API](/docs/config/#using-the-configuration-api). 

## LiquidJS example

* [LiquidJS: Tags](https://github.com/harttle/liquidjs#register-tags)

{% codetitle ".eleventy.js" %}

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

* [Nunjucks: Custom Tags](https://mozilla.github.io/nunjucks/api.html#custom-tags)


{% codetitle ".eleventy.js" %}

{% raw %}
```js
module.exports = function(eleventyConfig) {
  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}
  eleventyConfig.addNunjucksTag("uppercase", function(nunjucksEngine) {
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

## Handlebars example

Surprise—these are helpers!

{% codetitle ".eleventy.js" %}

{% raw %}
```js
module.exports = function(eleventyConfig) {
  // Usage: {{ uppercase myVar }} where myVar has a value of "alice"
  // Usage: {{ uppercase "alice" }}
  eleventyConfig.addHandlebarsHelper("uppercase", function(myStringArg) {
    return myStringArg.toUpperCase();
  });
};
```
{% endraw %}