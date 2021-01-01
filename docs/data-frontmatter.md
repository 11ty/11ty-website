---
eleventyNavigation:
  parent: Data Cascade
  key: Front Matter Data
  order: 1
---
# Front Matter Data

Add data in your template front matter, like this:

{% codetitle "YAML", "Syntax" %}

```markdown
---
title: My page title
---
<!doctype html>
<html>
…
```

The above is using [YAML syntax](https://learnxinyminutes.com/docs/yaml/). You can [use other formats too](#alternative-front-matter-formats).

Locally assigned front matter values override things further up the layout chain. Note also that layouts can contain front matter variables that you can use in your local template. Leaf template front matter takes precedence over layout front matter. Read more about [Layouts](/docs/layouts/).

## Template Configuration
<span id="user-defined-front-matter-customizations"></span>

Eleventy allows many options to control how your template works. The most popular is [`permalink`](/docs/permalinks/), which allows you to change where the file goes on the file system. You can set these options in your front matter, or anywhere else in the [Data Cascade](/docs/data-cascade/). [Read more about Template Configuration](/docs/data-configuration/).

## Sources of Data

{% include "datasources.md" %}

## Alternative Front Matter Formats

Eleventy uses the [`gray-matter` package](https://github.com/jonschlinkert/gray-matter) for front matter processing. `gray-matter` includes support for YAML, JSON, and even arbitrary JavaScript front matter.

### JSON Front Matter

```html
---json
{
  "title": "My page title"
}
---
<!doctype html>
<html>
…
```

### JavaScript Front Matter

Note that Liquid templates do not allow executing a function in output `{% raw %}{{ currentDate() }}{% endraw %}`. However, the following example does work in Nunjucks:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
---js
{
  title: "My page title",
  currentDate: function() {
    // You can have a JavaScript function here!
    return (new Date()).toLocaleString();
  }
}
---
<!doctype html>
<html>
<!-- … -->
<body>
  <h1>{{ title }}</h1>
  <p>Published on {{ currentDate() }}</p>
  <!-- … -->
```
{% endraw %}

### Add your own format {% addedin "0.9.0" %}

You can [customize Front Matter Parsing](/docs/data-frontmatter-customize/) in Eleventy to add your own custom format. We have an [example to do this with support for TOML](/docs/data-frontmatter-customize/#example-using-toml-for-front-matter-parsing).

## Advanced: Customize Front Matter Parsing {% addedin "0.9.0" %}

Configure [front matter for customized excerpts, TOML parsing, and more](/docs/data-frontmatter-customize/).