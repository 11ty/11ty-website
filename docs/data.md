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

Data can be used on a template from multiple different sources.

{% include "datasources.md" %}

## Special Data Variables

Here are a few data values we supply to your page that you can use in your templates:

* `pkg`: The local project’s `package.json` values.
* `pagination`, when enabled using pagination in [front matter](/docs/data-frontmatter/). [Read more about Pagination](/docs/pagination/).
* `collections`: Lists of all of your content, grouped by tags. [Read more about Collections](/docs/collections/)
* `page`: Has information about the current page. See code block below for `page` contents. For example, `page.url` is useful for finding the current page in a collection. [Read more about Collections](/docs/collections/) (look at _Example: Navigation Links with an `active` class added for on the current page_).

### `page` Variable Contents:

```js
let page = {
  
  // URL can be used in <a href> to link to other templates
  url: "/current/page/myFile/",
  
  // New in Eleventy v0.3.4
  // Mapped from inputPath, useful for permalinks
  fileSlug: "myFile",
  
  // JS Date Object for current page (used to sort collections)
  date: new Date(),
  
  // The path to the original source file for the template
  inputPath: "/current/page/myFile.md",
  
  // Eleventy internals
  // You probably won’t use `outputPath`: `url` is more useful.
  // Depends on your output directory (the default is _site)
  outputPath: "./_site/current/page/myFile/index.html"
};
```

#### `fileSlug`

The `fileSlug` variable is mapped from inputPath and is useful for creating your own clean permalinks.

| `inputPath` | Resulting `fileSlug` |
| --- | --- |
| `"2018-01-01-myFile.md"` | `"myFile"` |
| `"myDir/myFile.md"` | `"myFile"` |

`fileSlug` returns information on the parent directory if the file is an `index` template:

| `inputPath` | Resulting `fileSlug` |
| --- | --- |
| `"index.md"` | `""` (empty) |
| `"myDir/index.md"` | `"myDir"` |
| `"myDir/2018-01-01-index.md"` | `"myDir"` |
