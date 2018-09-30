---
subtitle: Front Matter Data
tags:
  - docs-data
---
# Front Matter Data

Add data in your template front matter, like this:

```
---
title: My page title
---
<!doctype html>
<html>
…
```

The above is using [YAML syntax](https://learnxinyminutes.com/docs/yaml/).

Locally assigned front matter values override things further up the layout chain. Note also that layouts can contain front matter variables that you can use in your local template. Leaf template front matter takes precedence over layout front matter. Read more about [Layouts](/docs/layouts/).

## User Defined Front Matter Customizations

Here are a few special front matter keys you can assign:

* `permalink`: Add in front matter to change the output target of the current template. You can use template syntax for variables here. [Read more about Permalinks](/docs/permalinks/).
* `layout`: Wrap current template with a layout template found in the `_includes` folder. [Read more about Layouts](/docs/layouts/).
* `pagination`: Enable to iterate over data. Output multiple HTML files from a single template. [Read more about Pagination](/docs/pagination/).
* `tags`: A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template. [Read more about Collections](/docs/collections/).
* `date`: Override the default date (file creation) to customize how the file is sorted in a collection. [Read more at Content Dates](/docs/dates/).
* `templateEngineOverride`: Override the template engine on a per-file basis, usually configured with a file extension or globally using the `markdownTemplateEngine` and `htmlTemplateEngine` configuration options. [Read more about Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).

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

{% include "datasources.md" %}
