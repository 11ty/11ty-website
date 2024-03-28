---
eleventyNavigation:
  parent: Template Languages
  key: HTML
  order: 1
layout: layouts/langs.njk
relatedLinks:
  /docs/config/#default-template-engine-for-html-files: Default Template Engine for HTML Files
---

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `html`              | `.html`        | N/A         |

HTML files are pre-processed by default as [Liquid templates](/docs/languages/liquid/). This is an optional feature and can be changed to a different template engine of your choice or disabled entirely. Furthermore, it can be configured on a per-template basis or globally. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

<div id="same-input-output"></div>

## Using the Same Input and Output Directories

{% callout "warn" %}This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.{% endcallout %}

Careful with the HTML template type when using the same <code>--input</code> and <code>--output</code> directory (this is not the default).

If you run eleventy more than once, it’ll try to process your output files too.

```
$ eleventy --input=. --output=. --formats=md,html
Writing ./README/index.html from ./README.md

$ eleventy --input=. --output=. --formats=md,html
Writing ./README/index.html from ./README.md
Writing ./README/index-o.html from ./README/index.html
```

If you’re going to use `--formats=html`, it’s probably best not using the same input and output directories.

Moreover, you may notice in the above output that the second template wrote to `index-o.html`. When the input and output directories are the same _and_ the source template is named `index.html`, we add an `-o` suffix to avoid overwriting itself. This is a special case that only applies to `index.html` filenames. You can customize the `-o` suffix with the [`htmlOutputSuffix` configuration option](/docs/config/#change-exception-case-suffix-for-html-files).
