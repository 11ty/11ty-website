---
eleventyNavigation:
  parent: Using Data
  key: Eleventy Supplied Data
  order: 0.5
---
# Eleventy Supplied Data

Here are a few data values we supply to your page that you can use in your templates:

* `pkg`: The local project’s `package.json` values.
* `pagination`, when enabled using pagination in [front matter](/docs/data-frontmatter/). [Read more about Pagination](/docs/pagination/).
* `collections`: Lists of all of your content, grouped by tags. [Read more about Collections](/docs/collections/)
* `page`: Has information about the current page. See code block below for `page` contents. For example, `page.url` is useful for finding the current page in a collection. [Read more about Collections](/docs/collections/) (look at _Example: Navigation Links with an `active` class added for on the current page_).

<div id="page-variable-contents"></div>

## `page` Variable Contents:

```js
let page = {

  // URL can be used in <a href> to link to other templates
  // Note: This value will be `false` if `permalink` is set to `false`.
  url: "/current/page/myFile/",

  // For permalinks: inputPath filename minus template file extension (New in v0.3.4)
  fileSlug: "myFile",

  // For permalinks: inputPath minus template file extension (New in v0.9.0)
  filePathStem: "/current/page/myFile",

  // JS Date Object for current page (used to sort collections)
  date: new Date(),

  // The path to the original source file for the template
  // Note: this will include your input directory path!
  inputPath: "./current/page/myFile.md",

  // Depends on your output directory (the default is _site)
  // You probably won’t use this: `url` is better.
  // Note: This value will be `false` if `permalink` is set to `false`.
  outputPath: "./_site/current/page/myFile/index.html"
};
```

### `date`

The date associated with the page. Defaults to the content’s file created date but can be overridden. [Read more at Content Dates](/docs/dates/).


### `fileSlug` {% addedin "0.3.4" %}

The `fileSlug` variable is mapped from inputPath and is useful for creating your own clean [permalinks](/docs/permalinks/).

| `inputPath` | `page.fileSlug` Result |
| --- | --- |
| `"2018-01-01.md"` | `"2018-01-01"` |
| `"2018-01-01-myFile.md"` | `"myFile"` |
| `"myDir/myFile.md"` | `"myFile"` |

`fileSlug` returns information on the parent directory if the file is an `index` template:

| `inputPath` | `page.fileSlug` Result |
| --- | --- |
| `"index.md"` | `""` _(empty)_ |
| `"myDir/index.md"` | `"myDir"` |
| `"myDir/2018-01-01-index.md"` | `"myDir"` |

### `filePathStem` {% addedin "0.9.0" %}

The `filePathStem` variable is mapped from inputPath and is useful if you’ve inherited a project that doesn’t use clean [permalinks](/docs/permalinks/).

{% callout "info" %}<strong>Careful with this one</strong> and remember that <a href="/docs/permalinks/#cool-uris-dont-change">Cool URI’s don’t change</a>.{% endcallout %}

If you absolutely need a file extension on your output, you might use it like this:

{% codetitle "YAML Front Matter", "Syntax" %}

{% raw %}
```markdown
---
permalink: "{{ page.filePathStem }}.html"
---
```
{% endraw %}

Example Output below is using the above permalink value.

| `inputPath` | `page.filePathStem` Result | Example Output |
| --- | --- | --- |
| `"2018-01-01-myFile.md"` | `"myFile"` | `myFile.html` |
| `"myDir/myFile.md"` | `"myDir/myFile"` | `myDir/myFile.html` |
