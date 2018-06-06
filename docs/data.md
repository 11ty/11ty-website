---
subtitle: Using Data
menuSectionName: docs-data
submenuSortOrder:
  - data-global
  - data-template-dir
  - data-preprocessing
tags:
  - docs
---
# Using Data

## Front Matter Data

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

### Special Front Matter Customizations

Here are a few special front matter keys you can assign:

* `permalink`: Add in front matter to change the output target of the current template. You can use template syntax for variables here. [Read more about Permalinks](/docs/permalinks/).
* `layout`: Wrap current template with a layout template found in the `_includes` folder. [Read more about Layouts](/docs/layouts/).
* `pagination`: Enable to iterate over data. Output multiple HTML files from a single template. [Read more about Pagination](/docs/pagination/).
* `tags`: A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template. [Read more about Collections](/docs/collections/).
* `date`: Override the default date (file creation) to customize how the file is sorted in a collection. [Read more about Collections](/docs/collections/).
* `templateEngineOverride`: Override the template engine on a per-file basis, usually configured with a file extension or globally using the `markdownTemplateEngine` and `htmlTemplateEngine` configuration options. [Read more about Changing a Template’s Rendering Engine](/docs/languages/#overriding-the-template-language).

### Special Data Variables

Here are a few data values we supply to your page that you can use in your templates:

* `pkg`: The local project’s `package.json` values.
* `pagination`: (When enabled using pagination in front matter) [Read more about Pagination](/docs/pagination/).
* `collections`: Lists of all of your content, grouped by tags. [Read more about Collections](/docs/collections/)
* `page`: Has information about the current page. See code block below for `page` contents. For example, `page.url` is useful for finding the current page in a collection. [Read more about Collections](/docs/collections/) (look at _Example: Navigation Links with an `active` class added for on the current page_).

#### `page` Variable Contents:

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


### Alternative Front Matter Formats

Eleventy uses the [`gray-matter` package](https://github.com/jonschlinkert/gray-matter) for front matter processing. `gray-matter` includes support for YAML, JSON, and even arbitrary JavaScript front matter.

#### JSON Front Matter

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

#### JavaScript Front Matter

```
---js
{
  title: "My page title"
  currentDate: function() {
    // wow you can have a function in here
    return (new Date()).toLocaleString();
  }
}
---
<!doctype html>
<html>
…
```

