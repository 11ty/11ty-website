---
eleventyNavigation:
  parent: Layouts
  key: Layout Chaining
  excerpt: Wrap layouts in other layouts.
---
# Layout Chaining

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

In case you prefer a [templating language](/docs/languages/) other than Nunjucks, here’s the same markup in JavaScript:

{% codetitle "_includes/mainlayout.11ty.js" %}

{% raw %}
```js
exports.data = {
  layout: "mylayout.njk",
  myOtherData: "hello"
};

exports.render = function(data) {
  return `<main>
    ${data.content}
  </main>`;
};
```
{% endraw %}

This layout would then be itself wrapped in the same `mylayout.njk` we used in our previous example:

{% codetitle "_includes/mylayout.njk" %}

{% raw %}
```html
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

```html
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
