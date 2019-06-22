---
subtitle: Layouts
excerpt: Wrap content in other content.
tags:
  - docs-templates
---
# Layouts

Eleventy Layouts are special templates that can be used to wrap other content. To denote that a piece of content should be wrapped in a template, simply use the `layout` key in your front matter, like so:

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

{% codetitle "_includes/mylayout.njk" %}

{% raw %}
```html
---
title: My Rad Blog
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```
{% endraw %}

Note that the layout template will populate the `content` data with the child template’s content. Also note that we don’t want to double-escape the output, so we’re using the provided Nunjuck’s `safe` filter here (see more language double-escaping syntax below).

{% callout "info" %}Layouts can contain their own front matter data! It’ll be merged with the content’s data on render. Content data takes precedence, if conflicting keys arise. Read more about <a href="/docs/data-template-dir/">how Eleventy merges data</a>.{% endcallout %}

All of this will output the following HTML content:

{% codetitle "_site/content-using-layout/index.html" %}

```
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

Take note that in [Eleventy’s Data Cascade](/docs/data/), front matter data in your template is merged with Layout front matter data! All data is merged ahead of time so that you can mix and match variables in your content and layout templates interchangeably.

Note that front matter data set in a content template takes priority over layout front matter! Chained layouts (described below) have similar merge behavior. The closer to the content, the higher priority the data.

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

Configuration API: use `eleventyConfig.addLayoutAlias(from, to)` to add layout aliases! Say you have a bunch of existing content using `layout: post`. If you don’t want to rewrite all of those values, just map `post` to a new file like this:

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
| Handlebars        | `{{{ content }}}` (triple stash)                       | `{{ value }}` (double stash)      | [Docs](http://handlebarsjs.com/#html-escaping)                                       |
| Mustache          | `{{{ content }}}` (triple stash)                       | `{{ value }}` (double stash)      | [Docs](https://github.com/janl/mustache.js#variables)                                |
| Liquid            | is by default unescaped so you can use `{{ content }}` | `{{ value | escape}}`            | [Docs](http://shopify.github.io/liquid/filters/escape/)                              |
| HAML              | `! #{ content }`                                       | `= #{ content }`                  | [Docs](http://haml.info/docs/yardoc/file.REFERENCE.html#unescaping_html)             |
| Pug               | `!{content}`                                           | `#{value}`                        | [Docs](https://pugjs.org/language/interpolation.html#string-interpolation-unescaped) |
{% endraw %}

## Layout Chaining

Your layouts can also use a layout! Add the same `layout` front matter data to your layout template file and it’ll chain. You do not have to use the same template engine across layouts and content! You can mix and match.

To chain a layout, let’s look at an example:

{% codetitle "layout-chain-example.md" %}

```markdown
---
layout: mainlayout.njk
title: My Rad Blog
---
# My Rad Markdown Blog Post
```

We want to add a main element around our post’s content because we like accessibility. Here’s what `mainlayout.njk` would look like:

{% codetitle "_includes/mainlayout.njk" %}

{% raw %}
```markdown
---
layout: mylayout.njk
myOtherData: hello
---
<main>
  {{ content | safe }}
</main>
```
{% endraw %}

This layout would then be itself wrapped in the same `mylayout.njk` we used in our previous example:

{% codetitle "_includes/mylayout.njk" %}

{% raw %}
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```
{% endraw %}

Used together, this would output:

{% codetitle "_site/layout-chain-example/index.html" %}

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Rad Blog</title>
  </head>
  <body>
    <main>
      <h1>My Rad Markdown Blog Post<h1>
    </main>
  </body>
</html>
```

## Addendum about existing Templating features

It is worth noting that existing template reuse mechanisms built into different templating languages are still available to you. For instance, Nunjucks calls it [Template Inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance) and exposes with `{% raw %}{% extends %}{% endraw %}`. Eleventy’s layout system exists a layer above this and exposes a nice multi-template-language mechanism to configure layouts in your content’s front matter and share data between them.
