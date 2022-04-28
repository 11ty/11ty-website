---
eleventyNavigation:
  parent: Working with Templates
  key: Layouts
  order: 1
  excerpt: Wrap content in other content.
---
# Layouts

Eleventy Layouts are special templates that can be used to wrap other content. To denote that a piece of content should be wrapped in a template, use the `layout` key in your front matter, like so:


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View this example in:
    <a href="#layouts-md" role="tab">Markdown</a>
    <a href="#layouts-liquid" role="tab">Liquid</a>
    <a href="#layouts-njk" role="tab">Nunjucks</a>
    <a href="#layouts-js" role="tab">11ty.js</a>
  </div>
  <div id="layouts-md" role="tabpanel">

{% codetitle "Markdown", "Syntax" %}
{% raw %}
```markdown
---
layout: mylayout.njk
title: My Rad Markdown Blog Post
---
# {{ title }}
```
{% endraw %}

  </div>
  <div id="layouts-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}
{% raw %}
```liquid
---
layout: mylayout.njk
title: My Rad Liquid Blog Post
---
<h1>{{ title }}</h1>
```
{% endraw %}

  </div>
  <div id="layouts-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}
{% raw %}
```jinja2
---
layout: mylayout.njk
title: My Rad Nunjucks Blog Post
---
<h1>{{ title }}</h1>
```
{% endraw %}

  </div>
  <div id="layouts-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}
{% raw %}
```js
module.exports = {
  data: {
    layout: "mylayout.njk",
    title: "My Rad JavaScript Blog Post"
  },
  render(data) {
    return `<h1>${data.title}</h1>`;
  }
}
```
{% endraw %}

  </div>
</seven-minute-tabs>

This will look for a `mylayout.njk` Nunjucks file in your _includes_ folder at `_includes/mylayout.njk`.

* You can use any template language in your layout file—it doesn’t need to match the template language of the content: an `ejs` template can use a `njk` layout.
* Layouts can include subdirectories: `layout: "layouts/base.njk"` maps to `_includes/layouts/base.njk`.
* You can have a [separate folder for Eleventy layouts](/docs/config/#directory-for-layouts-(optional)) if you’d prefer to have them separate from your _includes_ folder.
* If you omit the file extension (for example `layout: mylayout`), Eleventy will cycle through all of the supported template formats (`mylayout.*`) to look for a matching layout file. (This is slower, though)

Next, we need to create a `mylayout.njk` file. It can contain any type of text, but here we’re using HTML:

{% codetitle "_includes/mylayout.njk" %}

{%- highlight "html" %}
{% include "examples/layouts/mylayout.njk" %}
{%- endhighlight %}

Note that the layout template will populate the `content` data with the child template’s content. Also note that we don’t want to double-escape the output, so we’re using the provided Nunjucks `safe` filter here (see more language double-escaping syntax below).

Layouts can contain their own front matter data! It’ll be merged with the content’s data on render. Content data takes precedence, if conflicting keys arise. Read more about <a href="/docs/data-cascade/">how Eleventy merges data in what we call the Data Cascade</a>.

All of this will output the following HTML content to `_site/content-using-layout/index.html`:


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View the output from:
    <a href="#layoutoutput-md" role="tab">Markdown</a>
    <a href="#layoutoutput-liquid" role="tab">Liquid</a>
    <a href="#layoutoutput-njk" role="tab">Nunjucks</a>
    <a href="#layoutoutput-js" role="tab">11ty.js</a>
  </div>
  <div id="layoutoutput-md" role="tabpanel">
{% callout "demo" %}

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

{% endcallout %}
  </div>
  <div id="layoutoutput-liquid" role="tabpanel">
{% callout "demo" %}

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Rad Liquid Blog Post</title>
  </head>
  <body>
    <h1>My Rad Liquid Blog Post</h1>
  </body>
</html>
```

{% endcallout %}
  </div>
  <div id="layoutoutput-njk" role="tabpanel">
{% callout "demo" %}

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Rad Nunjucks Blog Post</title>
  </head>
  <body>
    <h1>My Rad Nunjucks Blog Post</h1>
  </body>
</html>
```

{% endcallout %}
  </div>
  <div id="layoutoutput-js" role="tabpanel">
{% callout "demo" %}

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Rad JavaScript Blog Post</title>
  </head>
  <body>
    <h1>My Rad JavaScript Blog Post</h1>
  </body>
</html>
```

{% endcallout %}
  </div>
</seven-minute-tabs>

## Front Matter Data in Layouts

In [Eleventy’s Data Cascade](/docs/data/), front matter data in your template is merged with Layout front matter data! All data is merged ahead of time so that you can mix and match variables in your content and layout templates interchangeably.

Front matter data set in a content template takes priority over layout front matter! [Chained layouts](/docs/layout-chaining/) have similar merge behavior. The closer to the content, the higher priority the data.

{% callout "info" %}The placement in the data cascade for frontmatter data in layouts changed in 1.0! Take note of the new order below.{% endcallout %}

### Sources of Data

{% include "datasources.md" %}

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
| Nunjucks          | `{{ content \| safe }}`                                | `{{ value }}`                     | [Docs](https://mozilla.github.io/nunjucks/templating.html#safe)                      |
| EJS               | `<%- content %>`                                       | `<%= value %>`                    | [Docs](https://www.npmjs.com/package/ejs#tags)                                       |
| Handlebars        | `{{{ content }}}` (triple stash)                       | `{{ value }}` (double stash)      | [Docs](https://handlebarsjs.com/#html-escaping)                                       |
| Mustache          | `{{{ content }}}` (triple stash)                       | `{{ value }}` (double stash)      | [Docs](https://github.com/janl/mustache.js#variables)                                |
| Liquid            | is by default unescaped so you can use `{{ content }}` | `{{ value \| escape }}`            | [Docs](https://liquidjs.com/filters/escape.html)                              |
| HAML              | `! #{ content }`                                       | `= #{ content }`                  | [Docs](http://haml.info/docs/yardoc/file.REFERENCE.html#unescaping_html)             |
| Pug               | `!{content}`                                           | `#{value}`                        | [Docs](https://pugjs.org/language/interpolation.html#string-interpolation-unescaped) |
{% endraw %}

## Layout Chaining

Chaining multiple layouts together. [Read more about Layout Chaining](/docs/layout-chaining/).