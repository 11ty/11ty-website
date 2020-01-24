---
eleventyNavigation:
  parent: Using Data
  key: Template Configuration
  order: 0
---
# Template Configuration

There are a few special data keys you can assign in your data to control how templates behave. These can live anywhere in the [Data Cascade](/docs/data-cascade/).

* `permalink`: Change the output target of the current template. Normally, you cannot use template syntax to reference other variables in your data, but `permalink` is an exception. [Read more about Permalinks](/docs/permalinks/).
* `dynamicPermalink`: Enable or disable template syntax for the `permalink` key. [Read more](/docs/permalinks/#disable-templating-in-permalinks).
* `layout`: Wrap current template with a layout template found in the `_includes` folder. [Read more about Layouts](/docs/layouts/).
* `pagination`: Enable to iterate over data. Output multiple HTML files from a single template. [Read more about Pagination](/docs/pagination/).
* `tags`: A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template. [Read more about Collections](/docs/collections/).
* `date`: Override the default date (file creation) to customize how the file is sorted in a collection. [Read more at Content Dates](/docs/dates/).
* `templateEngineOverride`: Override the template engine on a per-file basis, usually configured with a file extension or globally using the `markdownTemplateEngine` and `htmlTemplateEngine` configuration options. [Read more about Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language). [_This option only works in Front Matter ⚠️ (for now), read Issue #445_](https://github.com/11ty/eleventy/issues/445).
* `eleventyExcludeFromCollections`: {% addedin "0.8.0" %} Set to `true` to exclude this content from any and all [Collections](/docs/collections/) (those tagged in data or setup using the Configuration API).

