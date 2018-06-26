---
subtitle: Configuration
menuSectionName: docs-config
submenuSortOrder:
  - copy
  - filters
  - shortcodes
  - custom-tags
  - plugins
tags:
  - docs
---
# Configuration

Configuration is an optional feature. Add an `.eleventy.js` file to root directory of your project to override these configuration options with your own preferences.

```js
module.exports = {
  dir: {
    input: "views",
    output: "dist"
  }
};
```

## Using the Configuration API

If you expose your config as a function instead of an object literal, we’ll pass in a `config` argument that you can use!

```js
module.exports = function(eleventyConfig) {
  // Add a filter using the Config API
  eleventyConfig.addFilter( "myFilter", function() {});
  
  // You can return your Config object (optional).
  return {
    dir: {
      input: "views"
    }
  };
};
```

This allows you further customization options using Eleventy’s provided helper methods.

### Add Tags/Filters

Read more about [Tags and Filters](/docs/filters/)

### Add Collections

Read more about [Collections](/docs/collections/) and [Advanced Collection Filtering and Sorting](/docs/collections/#advanced-custom-filtering-and-sorting).

### Use Plugins

Read more about [Plugins](/docs/plugins/).


## Configuration Options

### Input Directory

Controls the top level directory that we’ll use to look for templates.

| Input Directory |  |
| --- | --- |
| _Object Key_ | `dir.input` |
| _Default Value_ | `.` _(current directory)_ |
| _Valid Options_ | Any valid directory. |
| _Command Line Override_ | `--input` |

#### Example

```
module.exports = {
    dir: {
        input: "views"
    }
};
```

### Directory for Includes

Controls the directory inside which the template includes/extends/partials/etc can be found.

| Includes Directory |  |
| --- | --- |
| _Object Key_ | `dir.includes` |
| _Default_ | `_includes` |
| _Valid Options_ | Any valid directory inside of `dir.input` |
| _Command Line Override_ | _None_ |

#### Example

```
module.exports = {
    dir: {
        // ⚠️ This value is relative to your input directory.
        includes: "SEND_INCLUDES"
    }
};
```

### Directory for Global Data Files


Controls the directory inside which the global data template files, available to all templates, can be found.

| Data Files Directory |  |
| --- | --- |
| _Object Key_ | `dir.data` |
| _Default_ | `_data` |
| _Valid Options_ | Any valid directory inside of `dir.input` |
| _Command Line Override_ | _None_ |

#### Example

```
module.exports = {
    dir: {
        // ⚠️ This value is relative to your input directory.
        data: "lore"
    }
};
```

### Output Directory

Controls the directory inside which the finished templates will be written to.

| Output Directory |  |
| --- | --- |
| _Object Key_ | `dir.data` |
| _Default_ | `_data` |
| _Valid Options_ | Any string that will work as a directory name. Eleventy creates this if it doesn’t exist. |
| _Command Line Override_ | `--output` |

#### Example

```
module.exports = {
    dir: {
        output: "dist"
    }
};
```

### Default template engine for global data files

The `data.dir` global data files run through this template engine before transforming to JSON.

| Data Template Engine |  |
| --- | --- |
| _Object Key_ | `dataTemplateEngine` |
| _Default_ | `liquid` |
| _Valid Options_ | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_ | _None_ |

#### Example

```
module.exports = {
    "dataTemplateEngine": "njk"
};
```

### Default template engine for Markdown files

Markdown files run through this template engine before transforming to HTML.

| Markdown Template Engine |  |
| --- | --- |
| _Object Key_ | `markdownTemplateEngine` |
| _Default_ | `liquid` |
| _Valid Options_ | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_ | _None_ |

#### Example

```
module.exports = {
    markdownTemplateEngine: "njk"
};
```

### Default template engine for HTML files

HTML templates run through this template engine before transforming to (better) HTML.

| HTML Template Engine |  |
| --- | --- |
| _Object Key_ | `htmlTemplateEngine` |
| _Default_ | `liquid` |
| _Valid Options_ | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_ | _None_ |

#### Example

```
module.exports = {
    htmlTemplateEngine: "njk"
};
```

### Template Formats

Specify which types of templates should be transformed. 

| Template Formats |  |
| --- | --- |
| _Object Key_ | `templateFormats` |
| _Default_ | `html,liquid,ejs,md,hbs,mustache,haml,pug,njk` |
| _Valid Options_ | Array of [template engine short names](/docs/languages/) |
| _Command Line Override_ | `--formats` _(accepts a comma separated string)_ |
| _Configuration API_ | `setTemplateFormats` {% addedin "0.2.14", "span" %} |

#### Examples

```
module.exports = {
    templateFormats: ["html", "liquid", "njk"]
};
```

```
module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats("html,liquid,njk");

    // Or:
    // eleventyConfig.setTemplateFormats([ "html", "liquid", "njk" ]);
};
```

```
eleventy --formats=html,liquid,njk
```

### Deploy to a subdirectory with a Path Prefix

If your site lives in a different subdirectory (particularly useful with GitHub pages), use pathPrefix to specify this. It’s used by the `url` filter and inserted at the beginning of all absolute url href links. It does not affect your file structure. Leading or trailing slashes are all normalized away, so don’t worry about it.

| Path Prefix |  |
| --- | --- |
| _Object Key_ | `pathPrefix` |
| _Default_ | `/` |
| _Valid Options_ | A prefix directory added to links |
| _Command Line Override_ | `--pathprefix` {% addedin "0.2.11", "span" %} |

#### Example

```
module.exports = {
    pathPrefix: "/eleventy-base-blog/"
};
```

Deploy to https://11ty.github.io/eleventy-base-blog/ on GitHub pages without modifying your config. This allows you to use the same code-base to deploy to either GitHub pages or Netlify, like the [`eleventy-base-blog`](https://github.com/11ty/eleventy-base-blog) project does.

```
eleventy --pathprefix=eleventy-base-blog
```

### Copy Files to Output using Pass-through File Copy

Files found (that don’t have a valid template engine) from white-listed file extensions (in `templateFormats`) will pass-through to the output directory. Read more about [Pass-through Copy](/docs/copy/).

| Pass-through Copy |  |
| --- | --- |
| _Object Key_ | `passthroughFileCopy` |
| _Default_ | `true` |
| _Valid Options_ | `true` or `false` |
| _Command Line Override_ | _None_ |

#### Example

```
module.exports = {
    passthroughFileCopy: false
};
```


### Change exception case suffix for HTML files

If an HTML template has matching input and output directories, index.html files will have this suffix added to their output filename to prevent overwriting the template. Read more at [Common Pitfalls](/docs/pitfalls/).

| Exception Suffix |  |
| --- | --- |
| _Object Key_ | `htmlOutputSuffx` |
| _Default_ | `-o` |
| _Valid Options_ | Any valid string |
| _Command Line Override_ | _None_ |

### Transforms

(These used to be called Filters but were renamed to Transforms, so they’re not confused with Template Filters).

Transforms can modify a template’s output. For example, use a transform to format/prettify an HTML file with proper whitespace.

| Transforms |  |
| --- | --- |
| _Object Key_ | `filters` _(Deprecated and renamed, use the Configuration API instead)_ |
| _Default_ | `{}` |
| _Valid Options_ | Object literal |
| _Command Line Override_ | _None_ |
| _Configuration API_ | `addTransform` _(This is definitely available in Eleventy v0.3.3 but was likely in earlier versions as well)_ |

#### Example

```
module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform( "doNothing", function(str, outputPath) {
    return str;
  });
};
```

