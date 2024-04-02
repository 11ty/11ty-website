---
eleventyNavigation:
  parent: Using Data
  key: Eleventy Supplied Data
  order: 0.5
---

# Eleventy Supplied Data

{% tableofcontents %}

Here are a few data values we supply to your page that you can use in your templates:

- `pkg`: The local project’s `package.json` values.
- `pagination`: Using the `pagination` key in [front matter](/docs/data-frontmatter/), this divides data into chunks for multiple output pages. [Read more about Pagination](/docs/pagination/).
- `collections`: Lists of all of your content, grouped by tags. [Read more about Collections](/docs/collections/)
- `page`: Has information about the current page (see the code block below for `page` contents). For example, `page.url` is useful for finding the current page in a collection. [Read more about Collections](/docs/collections/) (look at _Example: Navigation Links with an `active` class added for on the current page_).
- `eleventy`: {% addedin "1.0.0" %} contains Eleventy-specific data from [environment variables](/docs/environment-vars/) and the [Serverless plugin](/docs/plugins/serverless/) (if used).

<div id="page-variable-contents"></div>

## `page` Variable

```js
let page = {
	// URL can be used in <a href> to link to other templates
	// NOTE: This value will be `false` if `permalink` is set to `false`.
	url: "/current/page/myFile/",

	// For permalinks: inputPath filename minus template file extension
	fileSlug: "myFile",

	// For permalinks: inputPath minus template file extension
	filePathStem: "/current/page/myFile",

	// JS Date object for current page (used to sort collections)
	date: new Date(),

	// The path to the original source file for the template
	// NOTE: this includes your input directory path!
	inputPath: "./current/page/myFile.md",

	// Depends on your output directory (the default is _site)
	// You should probably use `url` instead.
	// NOTE: This value will be `false` if `permalink` is set to `false`.
	outputPath: "./_site/current/page/myFile/index.html",

	// Useful with `page.filePathStem` when using custom file extensions.
	outputFileExtension: "html",

	// Available in 2.0 with the i18n plugin
	// The default is the value of `defaultLanguage` passed to the i18n plugin
	lang: "",
};
```

- Note that `page.lang` is _only_ available when the [i18n plugin has been added to your configuration file](/docs/plugins/i18n/#add-to-your-configuration-file).

### Feature Availability

The data in `page` is also available as:

- `this.page` on [Shortcodes](/docs/shortcodes/#scoped-data-in-shortcodes) {% addedin "0.11.0" %}
- `this.page` on [Filters](/docs/filters/#scoped-data-in-filters), [Transforms](/docs/config/#transforms), and [Linters](/docs/config/#linters) {% addedin "2.0.0-canary.19" %}
- `page` on [Collection entries](/docs/collections/#collection-item-data-structure) {% addedin "2.0.0-canary.19" %}

### `date`

The date associated with the page. Defaults to the content’s file created date, but can be overridden. [Read more at Content Dates](/docs/dates/).

### `fileSlug` {% addedin "0.3.4" %}

The `fileSlug` variable is mapped from `inputPath`, and is useful for creating your own clean [permalinks](/docs/permalinks/).

| `inputPath`              | `page.fileSlug` Result |
| ------------------------ | ---------------------- |
| `"2018-01-01.md"`        | `"2018-01-01"`         |
| `"2018-01-01-myFile.md"` | `"myFile"`             |
| `"myDir/myFile.md"`      | `"myFile"`             |

`fileSlug` returns information on the parent directory if the file is an `index` template:

| `inputPath`                   | `page.fileSlug` Result                    |
| ----------------------------- | ----------------------------------------- |
| `"index.md"`                  | `""` _(empty)_                            |
| `"myDir/index.md"`            | `"myDir"`                                 |
| `"myDir/2018-01-01-index.md"` | `"myDir"`                                 |
| `"2018-01-01-myDir/index.md"` | `"myDir"` {% addedin "2.0.0-canary.10" %} |

### `filePathStem` {% addedin "0.9.0" %}

The `filePathStem` variable is mapped from `inputPath`, and is useful if you’ve inherited a project that doesn’t use clean [permalinks](/docs/permalinks/).

{% callout "info" %}<strong>Careful with this one!</strong> Remember that <a href="/docs/permalinks/#cool-uris-dont-change">Cool URIs don’t change</a>.{% endcallout %}

If you absolutely need a file extension on your output, you might use it like this:

{% codetitle "YAML Front Matter", "Syntax" %}

{% raw %}

```markdown
---
permalink: "{{ page.filePathStem }}.html"
---
```

{% endraw %}

This example output uses the above permalink value.

| `inputPath`              | `page.filePathStem` Result | Example Output      |
| ------------------------ | -------------------------- | ------------------- |
| `"2018-01-01-myFile.md"` | `"myFile"`                 | `myFile.html`       |
| `"myDir/myFile.md"`      | `"myDir/myFile"`           | `myDir/myFile.html` |

#### Changing your project’s default permalinks

{% addedin "2.0.0-canary.9" %} [Deep-link to `3c49f22`](https://github.com/11ty/eleventy/commit/3c49f22b31b10e5dae0daf661a54750875ae5d0f).

Want to change `resource.md` to write to `/resource.html` instead of `/resource/index.html`? Use this configuration API code sample.

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData("permalink", () => {
		return (data) =>
			`${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});
};
```

{% callout "warn", "md" %}When using this approach for URLs _without_ trailing slashes (file `/resource.html` ▶︎ url `/resource`), please do note that using trailing slashes with `index.html` files (file `/resource/index.html` ▶︎ url `/resource/`) is a bit friendlier on various JAMstack hosting providers. You may encounter unexpected 404 errors—make [sure you study up on how this works and test appropriately!](https://www.zachleat.com/web/trailing-slash/#results-table)!{% endcallout %}

## `eleventy` Variable {% addedin "1.0.0" %}

```js
let eleventy = {

  // Eleventy version
  version: "1.0.1", // New in {{ "1.0.1" | coerceVersion }}

  // For use with `<meta name="generator">`
  generator: "Eleventy v1.0.1", // New in {{ "1.0.1" | coerceVersion }}

  // Read more about their `process.env` counterparts below
  env: {
    // Absolute path to the directory in which
    // you’ve run the Eleventy command.
    root: "/Users/zachleat/myProject/",

    // Absolute path to the current config file
    config: "/Users/zachleat/myProject/.eleventy.js",

    // The method, either `cli` or `script`
    source: "cli",

    // One of `serve`, `watch`, or `build`
    runMode: "build", // New in {{ "2.0.0-beta.2" | coerceVersion }}
  },

  serverless: {
    // An object containing the values from any Dynamic URL
    //   slugs from Serverless paths
    // e.g. A slug for /path/:id/ and a URL for /path/1/
    //   would give { id: 1 }
    path: {}

    // The `event.queryStringParameters` received from the
    // serverless function. Note these are not available in
    // Netlify On-demand Builders
    // e.g. ?id=1 would be { id: 1 }
    query: {},
  }

};
```

### Feature Availability

The data in `eleventy` is also available as:

- `this.eleventy` on [Shortcodes](/docs/shortcodes/) {% addedin "2.0.0-canary.5" %}
- `this.eleventy` on [Filters](/docs/filters/) {% addedin "2.0.0-canary.19" %}

### Use with `meta name="generator"` {% addedin "1.0.1" %}

It’s helpful if you add `<meta name="generator">` to your existing Eleventy project as shown below. Learn more [from David Darnes’ blog post: _You should add a generator tag to your Eleventy site_](https://darn.es/you-should-add-a-generator-tag-to-your-eleventy-site/).

{% codetitle "Nunjucks, Liquid", "Syntax" %}

{% raw %}

```njk
<meta name="generator" content="{{ eleventy.generator }}">
```

{% endraw %}

These videos also provide some additional context as to why this is important:

<div class="youtube-related">
  {%- youtubeEmbed "b4frtsT4Cgo", "Full control over HTML, a look at requiring opt-in for the meta name=generator in Eleventy" -%}
  {%- youtubeEmbed "_YvwTHeqBZY", "eleventy.version and eleventy.generator Data (Weekly №7)", "235" -%}
</div>

### Learn more

- [Eleventy-supplied Environment Variables on `process.env`](/docs/environment-vars/#eleventy-supplied)
- [Serverless](/docs/plugins/serverless/)
  - [Dynamic Slugs and Serverless Global Data](/docs/plugins/serverless/#dynamic-slugs-and-serverless-global-data).
  - `event.queryStringParameters`, which are very similar to [URL.searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams). It’s an object representing the name/value pairs for things after the `?` in a URL.

## Environment Variables on `process.env`

- Read more about [Eleventy-supplied environment variables](/docs/environment-vars/#eleventy-supplied).
