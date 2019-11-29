---
eleventyNavigation:
  parent: Front Matter Data
  key: Customize Front Matter Parsing
  order: 1
---
# Customize Front Matter Parsing {% addedin "0.9.0" %}

Eleventy uses the [`gray-matter` npm package](https://www.npmjs.com/package/gray-matter) for parsing front matter. `gray-matter` allows additional options that aren’t available by default in Eleventy.

Check out the [full list of available `gray-matter` options](https://www.npmjs.com/package/gray-matter#options). By default, Eleventy uses `gray-matter`’s default options.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({
    /* … */
  });
};
```

### Example: Parse excerpts from content {% addedin "0.9.0" %}

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });
};
```

Now you can do things like this:

{% codetitle "sample.md" %}

```markdown
---
title: My page title
---
This is the start of my content and this will be shown as the excerpt.
<!-- excerpt -->
This is a continuation of my content…
```

Your template’s content will include the excerpt but remove the separator:

```
This is the start of my content and this will be shown as the excerpt.
This is a continuation of my content…
```

`page.excerpt` now holds `This is the start of my content and this will be shown as the excerpt.`

{% callout "info" %}<strong>Don’t want your excerpt included with your content?</strong> The unique feature of this configuration is that you can keep your excerpt right at the beginning of your content. You can add a delimiter where you want the excerpt to end and the rest of the content to begin. If you want the excerpt to be separate from the content, make a new key for this and store it separately in your front matter or a data file.{% endcallout %}

#### Changing where your excerpt is stored

If you don’t want to use `page.excerpt` to store your excerpt value, then use your own `excerpt_alias` option ([any valid path to Lodash Set will work](https://lodash.com/docs/4.17.15#set)) like so:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Eleventy custom option
    // The variable where the excerpt will be stored.
    excerpt_alias: 'my_custom_excerpt'
  });
};
```

Using `excerpt_alias: 'my_custom_excerpt'` means that the excerpt will be available in your templates as the `my_custom_excerpt` variable instead of `page.excerpt`.

### Example: using TOML for front matter parsing {% addedin "0.9.0" %}

While Eleventy does include support for [JSON, YAML, and JS front matter out of the box](/docs/data-frontmatter/#alternative-front-matter-formats), you may want to add additional formats too.

{% codetitle ".eleventy.js" %}

```js
const toml = require("toml");

module.exports = function(eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml)
    }
  });
};
```

For more information, read [this example on the `gray-matter` documentation](https://www.npmjs.com/package/gray-matter#optionsengines).

{% callout "warn" %}<strong>Windows users</strong>: There is an upstream issue with the TOML dependency used here: <code>Expected "\n" but end of input found.</code>, logged at <a href="https://github.com/11ty/eleventy/issues/586">Eleventy #586</a>.{% endcallout %}

Now you can use TOML in your front matter like this:

{% codetitle "sample.md" %}

```markdown
---toml
title = "My page title using TOML"
---
<!doctype html>
<html>
…
```
