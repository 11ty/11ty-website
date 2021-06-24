---
eleventyNavigation:
  parent: Working with Templates
  key: Layouts
  order: 1
  excerpt: Wrap content in other content.
---
# Layouts

Eleventy Layouts are special templates that can be used to wrap other content. To denote that a piece of content should be wrapped in a template, use the `layout` key in your front matter, like so:

{% codetitle "content-using-layout.md" %}
{% raw %}
```markdown
---
layout: mylayout.njk
title: My Rad Markdown Blog Post
---
# {{ title }}
```
{% endraw %}

This will look for a `mylayout.njk` Nunjucks file in your _includes folder_ (`_includes/mylayout.njk`). Note that you can have a [separate folder for Eleventy layouts](/docs/config/#directory-for-layouts-(optional)) if you’d prefer that to having them live in your _includes folder._

You can use any template language in your layout—it doesn’t need to match the template language of the content. An `ejs` template can use a `njk` layout, for example.

{% callout "info" %}If you omit the file extension (for example <code>layout: mylayout</code>), Eleventy will cycle through all of the supported template formats (<code>mylayout.*</code>) to look for a matching layout file.{% endcallout %}

Next, we need to create a `mylayout.njk` file. It can contain any type of text, but here we’re using HTML:

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Syntax:
    <a href="#mylayout-njk" id="mylayout-njk-btn" role="tab" aria-controls="mylayout-njk" aria-selected="true">Nunjucks</a>
    <a href="#mylayout-11tyjs" id="mylayout-11tyjs-btn" role="tab" aria-controls="mylayout-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="mylayout-njk" role="tabpanel" aria-labelledby="mylayout-njk-btn">
    {%- codetitle "_includes/mylayout.njk" %}
    {%- highlight "html" %}
    {% include "examples/layouts/mylayout.njk" %}
    {%- endhighlight %}
    <p>Note that the layout template will populate the <code>content</code> data with the child template’s content. Also note that we don’t want to double-escape the output, so we’re using the provided Nunjuck’s <code>safe</code> filter here (see more language double-escaping syntax below).</p>
  </div>
  <div id="mylayout-11tyjs" role="tabpanel" aria-labelledby="mylayout-11tyjs-btn">
    {%- codetitle "_includes/mylayout.11ty.js" %}
    {%- highlight "js" %}
    {% include "examples/layouts/mylayout.11ty.js" %}
    {%- endhighlight %}
    <p>Note that the layout template will populate the <code>data.content</code> variable with the child template’s content.
  </div>
</seven-minute-tabs>

{% callout "info" %}Layouts can contain their own front matter data! It’ll be merged with the content’s data on render. Content data takes precedence, if conflicting keys arise. Read more about <a href="/docs/data-cascade/">how Eleventy merges data in what we call the Data Cascade</a>.{% endcallout %}

All of this will output the following HTML content:

{% codetitle "_site/content-using-layout/index.html" %}

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Rad Markdown Blog Post</title>
  </head>
  <body>
    <h1>My Rad Markdown Blog Post</h1>
  </body>
</html>
```

## Front Matter Data in Layouts

In [Eleventy’s Data Cascade](/docs/data/), front matter data in your template is merged with Layout front matter data! All data is merged ahead of time so that you can mix and match variables in your content and layout templates interchangeably.

Front matter data set in a content template takes priority over layout front matter! [Chained layouts](/docs/layout-chaining/) have similar merge behavior. The closer to the content, the higher priority the data.

### Sources of Data

{% include "datasources.md" %}

## Layouts in a Subdirectory {% addedin "0.2.7" %}

Layouts can be a full path inside of the _includes folder_, like so:

```markdown
---
layout: layouts/base.njk
---
```

This will look for `_includes/layouts/base.njk`.

## Layout Aliasing {% addedin "0.2.8" %}

Configuration API: use `eleventyConfig.addLayoutAlias(from, to)` to add layout aliases. Say you have a bunch of existing content using `layout: post`. If you don’t want to rewrite all of those values, map `post` to a new file like this:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
};
```

## Prevent double-escaping in layouts

{% raw %}
| Template Language | Unescaped Content (for layout content)                 | Comparison with an Escaped Output | Docs                                                                                 |
| ----------------- | ------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------ |
| Nunjucks          | `{{ content | safe }}`                                | `{{ value }}`                     | [Docs](https://mozilla.github.io/nunjucks/templating.html#safe)                      |
| EJS               | `<%- content %>`                                       | `<%= value %>`                    | [Docs](https://www.npmjs.com/package/ejs#tags)                                       |
| Handlebars        | `{{{ content }}}` (triple stash)                       | `{{ value }}` (double stash)      | [Docs](https://handlebarsjs.com/#html-escaping)                                       |
| Mustache          | `{{{ content }}}` (triple stash)                       | `{{ value }}` (double stash)      | [Docs](https://github.com/janl/mustache.js#variables)                                |
| Liquid            | is by default unescaped so you can use `{{ content }}` | `{{ value | escape}}`            | [Docs](http://shopify.github.io/liquid/filters/escape/)                              |
| HAML              | `! #{ content }`                                       | `= #{ content }`                  | [Docs](http://haml.info/docs/yardoc/file.REFERENCE.html#unescaping_html)             |
| Pug               | `!{content}`                                           | `#{value}`                        | [Docs](https://pugjs.org/language/interpolation.html#string-interpolation-unescaped) |
{% endraw %}

## Layout Chaining

Chaining multiple layouts together. [Read more about Layout Chaining](/docs/layout-chaining/).