---
subtitle: Using Data
menuSectionName: docs-data
submenuSortOrder:
  - data-frontmatter
  - data-template-dir
  - data-global
  - data-js
  - data-preprocessing
tags:
  - docs
---
# Using Data

Data can be used on a template from multiple different sources. The order of priority for duplicate keys is as follows (from highest priority to lowest):

1. [Front Matter Data](/docs/data-frontmatter/)
1. [Template Data File](/docs/data-template-dir/)
1. [Directory (and parent Directory) Data Files](/docs/data-template-dir/)
1. [Global Data Files](/docs/data-global/)

## Special Data Variables

Here are a few data values we supply to your page that you can use in your templates:

* `pkg`: The local project’s `package.json` values.
* `pagination`, when enabled using pagination in [front matter](/docs/data-frontmatter/). [Read more about Pagination](/docs/pagination/).
* `collections`: Lists of all of your content, grouped by tags. [Read more about Collections](/docs/collections/)
* `page`: Has information about the current page. See code block below for `page` contents. For example, `page.url` is useful for finding the current page in a collection. [Read more about Collections](/docs/collections/) (look at _Example: Navigation Links with an `active` class added for on the current page_).

### `page` Variable Contents:

```js
{
  // URL can be used in <a href> to link to other templates
  url: "/current/page/file.html",
  
  // JS Date Object for current page
  date: new Date(),
  
  // the path to the original source file for the template
  inputPath: "/current/page/file.md",
  
  // New in Eleventy v0.3.4
  // mapped from inputPath, useful for clean permalinks
  fileSlug: "file"
  
  // More inputPath => fileSlug examples:
  //    2018-01-01-file.md       => file
  //    dir/file.md              => file
  // Returns parent directory if an `index` template
  //    index.md                 => "" (empty)
  //    dir/index.md             => dir
  //    dir/2018-01-01-index.md  => dir
}
```

