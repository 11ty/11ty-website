---
subtitle: Permalinks
excerpt: Remap a template to a new output location
tags:
  - docs-templates
---
# Permalinks

## Cool URIs don’t change

Eleventy automatically helps you make sure that [Cool URIs don’t change](https://www.w3.org/Provider/Style/URI.html).

> What to leave out…
> File name extension. This is a very common one. "cgi", even ".html" is something which will change. You may not be using HTML for that page in 20 years time, but you might want today's links to it to still be valid. The canonical way of making links to the W3C site doesn't use the extension.

## Default Input/Output Examples

Assuming your `--output` directory is the default, `_site`:


<table>
    <tbody>
        <tr>
            <th>Input File</th>
            <td><code>index.njk</code></td>
        </tr>
        <tr>
            <th>Output File</th>
            <td><code>_site/index.html</code></td>
        </tr>
        <tr>
            <th>Href</th>
            <td><code>/</code></td>
        </tr>
    </tbody>
</table>

<table>
    <tbody>
        <tr>
            <th>Input File</th>
            <td><code>template.njk</code></td>
        </tr>
        <tr>
            <th>Output File</th>
            <td><code>_site/template/index.html</code></td>
        </tr>
        <tr>
            <th>Href</th>
            <td><code>/template/</code></td>
        </tr>
    </tbody>
</table>

<table>
    <tbody>
        <tr>
            <th>Input File</th>
            <td><code>subdir/template.njk</code></td>
        </tr>
        <tr>
            <th>Output File</th>
            <td><code>_site/subdir/template/index.html</code></td>
        </tr>
        <tr>
            <th>Href</th>
            <td><code>/subdir/template/</code></td>
        </tr>
    </tbody>
</table>

<table>
    <tbody>
        <tr>
            <th>Input File</th>
            <td><code>subdir/template/template.njk</code></td>
        </tr>
        <tr>
            <th>Output File</th>
            <td><code>_site/subdir/template/index.html</code></td>
        </tr>
        <tr>
            <th>Href</th>
            <td><code>/subdir/template/</code></td>
        </tr>
    </tbody>
</table>

## Remapping Output (Permalink)

To remap your template’s output to a different path than the default, use the `permalink` key in the template’s front matter. If a subdirectory does not exist, it will be created.

{% codetitle "YAML Front Matter", "Syntax" %}

```
---
permalink: this-is-a-new-path/subdirectory/testing/index.html
---
```

The above will write to `_site/this-is-a-new-path/subdirectory/testing/index.html`.

### `permalink: false`

If you set the `permalink` value to be `false`, this will disable writing the file to disk in your output folder. The file will still be processed normally (and present in collections) but will not be available in your output directory as a standalone template.

{% codetitle "YAML Front Matter", "Syntax" %}

```
---
permalink: false
---
```

### Use data variables in Permalink

You may use data variables here (and template syntax, too). These will be parsed with the current template’s rendering engine.

For example, in a Nunjucks template:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

{% raw %}
```
---
mySlug: this-is-a-new-path
permalink: subdir/{{ mySlug }}/index.html
---
```
{% endraw %}

Writes to `_site/subdir/this-is-a-new-path/index.html`.

{% callout "info", "md" %}Make sure you read about the special `page` variables useful for permalinks too: [`page.fileSlug`](/docs/data/#fileslug) and [`page.filePathStem`](/docs/data/#filepathstem).{% endcallout %}

### Disable templating in permalinks {% addedin "0.7.0" %}

Some template syntaxes are nicer than others and you may want to opt-out of the templating engine here. Use the `dynamicPermalink` option in your front matter to disable this on a per-template basis.

{% callout "warn" %}This is a <a href="/docs/pitfalls/"><strong>common pitfall</strong></a> for users of the Pug templating engine.{% endcallout %}

{% codetitle "YAML Front Matter", "Syntax" %}

```
---
permalink: "/this-will-be-a-string-without-templating/"
dynamicPermalink: false
---
```

#### Globally disable templating in permalinks {% addedin "0.3.4" %}

Eleventy includes a global configuration option to disable dynamic templating altogether. This will save a few template renders and is probably marginally faster, too.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Enabled by default
  eleventyConfig.setDynamicPermalinks(false);
};
```

### Use filters!

Use the provided [`slug` filter](/docs/filters/#slug) to modify other data available in the template.

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

{% raw %}
```
---
title: My Article Title
permalink: subdir/{{ title | slug }}/index.html
---
```
{% endraw %}

_(the above is using syntax that works in at least Liquid and Nunjucks)_

Writes to `_site/subdir/my-article-title/index.html`.

{% codetitle "YAML Front Matter using Liquid", "Syntax" %}

{% raw %}
```
---
date: "2016-01-01T06:00-06:00"
permalink: "/{{ page.date | date: '%Y/%m/%d' }}/index.html"
---
```
{% endraw %}

Writes to `_site/2016/01/01/index.html`. There are a variety of ways that the page.date variable can be set (using `date` in your front matter is just one of them). Read more about [Content dates](/docs/dates/).

### Ignore the output directory {% addedin "0.1.4" %}

To remap your template’s output to a directory independent of the output directory (`--output`), use `permalinkBypassOutputDir: true` in your front matter.

{% codetitle "YAML Front Matter", "Syntax" %}

```
---
permalink: _includes/index.html
permalinkBypassOutputDir: true
---
```

Writes to `_includes/index.html` even though the output directory is `_site`. This is useful for writing child templates to the `_includes` directory for re-use in your other templates.

### Custom File Formats

To generate different file formats for your built site, you can use a different extension in the `permalink` option of your front matter.

For example, to generate a JSON search index to be used by popular search libraries:

{% codetitle "EJS", "Syntax" %}

```
---
permalink: index.json
---
<%- JSON.stringify(collections.all) -%>
```

### Pagination

Pagination variables also work here. [Read more about Pagination](/docs/pagination/)
