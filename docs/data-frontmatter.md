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

## Front Matter Configuration
<span id="user-defined-front-matter-customizations"></span>

Here are a few special front matter keys you can assign:

* `permalink`: Add in front matter to change the output target of the current template. Normally, you cannot use template syntax for variables in front matter, but `permalink` is an exception. [Read more about Permalinks](/docs/permalinks/).
* `dynamicPermalink`: Enable or disable template syntax for the `permalink` key. [Read more](/docs/permalinks/#disable-templating-in-permalinks).
* `layout`: Wrap current template with a layout template found in the `_includes` folder. [Read more about Layouts](/docs/layouts/).
* `pagination`: Enable to iterate over data. Output multiple HTML files from a single template. [Read more about Pagination](/docs/pagination/).
* `tags`: A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template. [Read more about Collections](/docs/collections/).
* `date`: Override the default date (file creation) to customize how the file is sorted in a collection. [Read more at Content Dates](/docs/dates/).
* `templateEngineOverride`: Override the template engine on a per-file basis, usually configured with a file extension or globally using the `markdownTemplateEngine` and `htmlTemplateEngine` configuration options. [Read more about Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).
* `eleventyExcludeFromCollections`: {% addedin "0.8.0" %} Set to `true` to exclude this content from any and all [Collections](/docs/collections/) (those tagged in data or setup using the Configuration API).

## Sources of Data

{% include "datasources.md" %}

## Alternative Front Matter Formats

Eleventy uses the [`gray-matter` package](https://github.com/jonschlinkert/gray-matter) for front matter processing. `gray-matter` includes support for YAML, JSON, and even arbitrary JavaScript front matter.

### JSON Front Matter

```
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
```
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