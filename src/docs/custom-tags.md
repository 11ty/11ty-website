---
eleventyNavigation:
  parent: Configuration
  key: Custom Tags
  order: 5
relatedKey: custom-tags
relatedTitle: Template Custom Tags
tags:
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


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View this example in:
    <a href="#customtag-liquid" role="tab">Liquid</a>
    <a href="#customtag-njk" role="tab">Nunjucks</a>
    <a href="#customtag-hbs" role="tab">Handlebars</a>
  </div>
  <div id="customtag-liquid" role="tabpanel">


* [LiquidJS: Tags](https://liquidjs.com/tutorials/register-filters-tags.html)

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
      render: async function(scope, hash) {
        // Resolve variables
        var str = await this.liquid.evalValue(this.str, scope); // "alice"

        // Do the uppercasing
        return str.toUpperCase(); // "ALICE"
      }
    };
  });
};
```
{% endraw %}

See all of the [built-in tag implementations for LiquidJS](https://liquidjs.com/tags/overview.html).

  </div>
  <div id="customtag-njk" role="tabpanel">

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

  </div>
  <div id="customtag-hbs" role="tabpanel">

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

  </div>
</seven-minute-tabs>
