---
subtitle: Configuration
menuSectionName: docs-config
submenuSortOrder:
  - copy
  - ignores
  - filters
  - shortcodes
  - custom-tags
  - plugins
tags:
  - docs
---
# Configuration

Configuration is an optional feature. Add an `.eleventy.js` file to root directory of your project to override these configuration options with your own preferences.

{% codetitle ".eleventy.js" %}

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

{% codetitle ".eleventy.js" %}

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

* Add [Filters](/docs/filters/).
* Add [Shortcodes](/docs/shortcodes/).
* Add [Custom Tags](/docs/custom-tags/).
* Add [JavaScript Functions](/docs/languages/javascript/#javascript-template-functions) {% addedin "0.7.0" %}
* Add custom [Collections](/docs/collections/) and use [Advanced Collection Filtering and Sorting](/docs/collections/#advanced-custom-filtering-and-sorting).
* Add some [Plugins](/docs/plugins/).

## Configuration Options

### Jump to:
{% set toc = [
  "Input Directory",
  "Directory for Includes",
  "Directory for Layouts (Optional)",
  "Directory for Global Data Files",
  "Output Directory",
  "Default Template Engine for Global Data Files",
  "Default Template Engine for Markdown Files",
  "Default Template Engine for HTML Files",
  "Template Formats",
  "Deploy to a Subdirectory with a Path Prefix",
  "Copy Files to Output using Pass-through File Copy",
  "Change Exception Case Suffix for HTML Files",
  "Change File Suffix for Template and Directory Data Files",
  "Transforms",
  "Linters",
  "Data Deep Merge",
  "Watch JavaScript Dependencies",
  "Override Browsersync Server Options"
] %}
{%- for link in toc %}
* [{{ link }}](#{{ link | slug }})
{%- endfor %}

### Input Directory

Controls the top level directory/file/glob that we’ll use to look for templates.

Glob support is {% addedin "0.6.0" %}.

| Input Directory |  |
| --- | --- |
| _Object Key_ | `dir.input` |
| _Default Value_ | `.` _(current directory)_ |
| _Valid Options_ | Any valid directory. |
| _Command Line Override_ | `--input` |

#### Examples

##### Command Line

```bash
# The current directory
eleventy --input=.

# A single file
eleventy --input=README.md

# A glob of files (New in v0.6.0)
eleventy --input=*.md

# A subdirectory
eleventy --input=views
```

##### Configuration

{% codetitle ".eleventy.js" %}

```js
module.exports = {
    dir: {
        input: "views"
    }
};
```


### Directory for Includes

The includes directory is meant for layout templates, include files, extends files, partials, or macros. These files will not be processed as input files, but can be consumed by other templates.

| Includes Directory |  |
| --- | --- |
| _Object Key_ | `dir.includes` |
| _Default_ | `_includes` |
| _Valid Options_ | Any valid directory inside of `dir.input` (an empty string `""` is supported) |
| _Command Line Override_ | _None_ |

#### Example

{% codetitle ".eleventy.js" %}

```
module.exports = {
    dir: {
        // ⚠️ This value is relative to your input directory.
        includes: "my_includes"
    }
};
```

### Directory for Layouts (Optional) {% addedin "0.8.0" %}

The layouts directory is optional and intended only for projects that don’t want their layout templates to live in the [Includes directory](#directory-for-includes). These files will not be processed as input files, but can be consumed by other templates.

<div class="elv-callout elv-callout-warn elv-callout-warn-block">
  <p>This setting <strong>only applies</strong> to Eleventy's language-agnostic <a href="/docs/layouts/">layouts</a> (i.e. when defined in front matter or data files).</p>
  <p>When using <code>{% raw %}{% extends %}{% endraw %}</code>, Eleventy will <strong>still search the <code>_includes</code> directory</strong>. See <a href="/docs/layouts/#addendum-about-existing-templating-features">this note about existing templating features</a>.</p>
</div>

| Includes Directory |  |
| --- | --- |
| _Object Key_ | `dir.layouts` |
| _Default_ | _The value in `dir.includes`_ |
| _Valid Options_ | Any valid directory inside of `dir.input` (an empty string `""` is supported) |
| _Command Line Override_ | _None_ |

#### Example

{% codetitle ".eleventy.js" %}

```
module.exports = {
    dir: {
        // ⚠️ These values are both relative to your input directory.
        includes: "_includes",
        layouts: "_layouts"
    }
};
```


### Directory for Global Data Files


Controls the directory inside which the global data template files, available to all templates, can be found. Read more about [Global Data Files](/docs/data-global/).

| Data Files Directory |  |
| --- | --- |
| _Object Key_ | `dir.data` |
| _Default_ | `_data` |
| _Valid Options_ | Any valid directory inside of `dir.input` |
| _Command Line Override_ | _None_ |

#### Example

{% codetitle ".eleventy.js" %}

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
| _Object Key_ | `dir.output` |
| _Default_ | `_site` |
| _Valid Options_ | Any string that will work as a directory name. Eleventy creates this if it doesn’t exist. |
| _Command Line Override_ | `--output` |

#### Example

{% codetitle ".eleventy.js" %}

```
module.exports = {
    dir: {
        output: "dist"
    }
};
```

### Default template engine for global data files

The `data.dir` global data files run through this template engine before transforming to JSON. Read more about [Global Data Files](/docs/data-global/).

| Data Template Engine |  |
| --- | --- |
| _Object Key_ | `dataTemplateEngine` |
| _Default_ | `liquid` |
| _Valid Options_ | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_ | _None_ |

#### Example

{% codetitle ".eleventy.js" %}

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

{% codetitle ".eleventy.js" %}

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

{% codetitle ".eleventy.js" %}

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
| _Configuration API_ | `setTemplateFormats` {% addedin "0.2.14" %} |

#### Examples

{% codetitle ".eleventy.js" %}

```
module.exports = {
    templateFormats: ["html", "liquid", "njk"]
};
```

{% codetitle ".eleventy.js" %}

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

{% callout "info" %}{% addedin "0.8.4" %} <strong>Case sensitivity</strong>: File extensions should be considered case insensitive, cross-platform. While Mac OS—by default—already behaves this way, other operating systems do not and needed additional Eleventy code to enable this behavior.{% endcallout %}

### Deploy to a subdirectory with a Path Prefix

If your site lives in a different subdirectory (particularly useful with GitHub pages), use pathPrefix to specify this. It’s used by the `url` filter and inserted at the beginning of all absolute url href links. It does not affect your file structure. Leading or trailing slashes are all normalized away, so don’t worry about it.

| Path Prefix |  |
| --- | --- |
| _Object Key_ | `pathPrefix` |
| _Default_ | `/` |
| _Valid Options_ | A prefix directory added to links |
| _Command Line Override_ | `--pathprefix` {% addedin "0.2.11" %} |

#### Example

{% codetitle ".eleventy.js" %}

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

{% codetitle ".eleventy.js" %}

```
module.exports = {
    passthroughFileCopy: false
};
```

### Change exception case suffix for HTML files

If an HTML template has matching input and output directories, index.html files will have this suffix added to their output filename to prevent overwriting the template. Read more at the [HTML template docs](/docs/languages/html/#using-the-same-input-and-output-directories).

| Exception Suffix |  |
| --- | --- |
| _Object Key_ | `htmlOutputSuffx` |
| _Default_ | `-o` |
| _Valid Options_ | Any valid string |
| _Command Line Override_ | _None_ |

#### Example

{% codetitle ".eleventy.js" %}

```
module.exports = {
    htmlOutputSuffix: "-o"
};
```

### Change File Suffix for Template and Directory Data Files {% addedin "0.5.3" %}
When using [Template and Directory Specific Data Files](/docs/data-template-dir/), to prevent file name conflicts with non-Eleventy files in the project directory, we scope these files with a unique-to-Eleventy suffix. This key is customizable using `jsDataFileSuffix`. For example, using `.11tydata` for this value will search for `*.11tydata.js` and `*.11tydata.json` data files. Read more about [Template and Directory Specific Data Files](/docs/data-template-dir/).

| File Suffix |  |
| --- | --- |
| _Object Key_ | `jsDataFileSuffix` |
| _Default_ | `.11tydata` |
| _Valid Options_ | Any valid string |
| _Command Line Override_ | _None_ |

#### Example

{% codetitle ".eleventy.js" %}

```
module.exports = {
    jsDataFileSuffix: ".11tydata"
};
```

### Transforms

_These used to be called Filters but were renamed to Transforms to avoid confusion with Template Language Filters._

Transforms can modify a template’s output. For example, use a transform to format/prettify an HTML file with proper whitespace.

| Transforms |  |
| --- | --- |
| _Object Key_ | `filters` _(Deprecated and renamed, use the Configuration API instead)_ |
| _Default_ | `{}` |
| _Valid Options_ | Object literal |
| _Command Line Override_ | _None_ |
| _Configuration API_ | `addTransform` {% addedin "0.3.3" %} |

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("transform-name", function(content, outputPath) {});

  // Support for async transforms was added in 0.7.0
  eleventyConfig.addTransform("async-transform-name", async function(content, outputPath) {});
};
```

#### Transforms Example: Minify HTML Output

{% codetitle ".eleventy.js" %}

```js
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
};
```

### Linters

Similar to Transforms, Linters are provided to analyze a template’s output without modifying it.

| Linters |  |
| --- | --- |
| _Object Key_ | _N/A_ |
| _Valid Options_ | Callback function |
| _Command Line Override_ | _None_ |
| _Configuration API_ | `addLinter` {% addedin "0.5.4" %} |

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addLinter("linter-name", function(content, inputPath, outputPath) {});
  eleventyConfig.addLinter("async-linter-name", async function(content, inputPath, outputPath) {});
};
```

#### Linters Example: Use Inclusive Language

Inspired by the [CSS Tricks post _Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/), this linter will log a warning to the console when it finds a trigger word in a markdown file.

This example has been packaged as a plugin in [`eleventy-plugin-inclusive-language`](https://github.com/11ty/eleventy-plugin-inclusive-language).

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addLinter("inclusive-language", function(content, inputPath, outputPath) {
    let words = "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy".split(",");
    if( inputPath.endsWith(".md") ) {
      for( let word of words) {
        let regexp = new RegExp("\\b(" + word + ")\\b", "gi");
        if(content.match(regexp)) {
          console.warn(chalk.yellow(`Inclusive Language Linter (${inputPath}) Found: ${word}`));
        }
      }
    }
  });
};
```

### Data Deep Merge {% addedin "0.6.0" %}

Opts in to a full deep merge when combining the Data Cascade. This will use something like `lodash.mergewith` to combine Arrays and deep merge Objects, rather than a simple top-level merge using `Object.assign`. Read more at [Issue #147](https://github.com/11ty/eleventy/issues/147). This will likely become the default in an upcoming major version.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
};
```

Note that all data stored in the `pagination` variable is exempted from this behavior (we don’t want `pagination.items` to be merged together).

#### Using the `override:` prefix

Use the `override:` prefix on any data key to opt-out of this merge behavior for specific values or nested values.

{% codetitle "posts/posts.json" %}

```json
{
  "tags": ["posts"]
}
```

{% codetitle "posts/firstpost.md" %}

```
---
override:tags: []
---
```

Even though normally the `posts/firstpost.md` file would inherit the `posts` tag from the directory data file (per normal [data cascade rules](/docs/data/)), we can override the `tags` value to be an empty array to opt-out of this behavior.

### Watch JavaScript Dependencies {% addedin "0.7.0" %}

When in `--watch` mode, Eleventy will spider the dependencies of your [JavaScript Templates](/docs/languages/javascript/) (`.11ty.js`), [JavaScript Data Files](/docs/data-js/) (`.11tydata.js` or `_data/**/*.js`), or Configuration File (usually `.eleventy.js`) to watch those files too. Files in `node_modules` directories are ignored. This feature is _enabled by default_.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Enabled by default
  eleventyConfig.setWatchJavaScriptDependencies(false);
};
```

### Override Browsersync Server Options {% addedin "0.7.0" %}

Useful if you want to change or override the default Browsersync configuration. Find the Eleventy defaults in [`EleventyServe.js`](https://github.com/11ty/eleventy/blob/master/src/EleventyServe.js). Take special note that Eleventy does not use Browsersync’s watch options and trigger reloads manually after our own internal watch methods are complete. See full options list on the [Browsersync documentation](https://browsersync.io/docs/options).

_(Read more at [Issue #123](https://github.com/11ty/eleventy/issues/123))_

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    notify: true
  });
};
```


<!--
### Experiments

Experiments are experimental Eleventy features that need a public trial. Power users may opt-in to these features in order to try out new things before they are released to the general public. Do not use these in production code! Experiments are not guaranteed and may be removed at any time.

| Experiments |  |
| --- | --- |
| _Object Key_ | _N/A_ |
| _Valid Options_ | String |
| _Command Line Override_ | _None_ |
| _Configuration API_ | `addExperiment` {% addedin "0.6.0" %} |
-->
