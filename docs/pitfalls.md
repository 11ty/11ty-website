---
subtitle: Pitfalls
excerpt: Some common problems.
tags:
  - docs-templates
sampleDate: 2018-01-01
---
# Common Pitfalls

## Same Input and Output Dir with HTML Templates

<div id="same-input-output"></div>

If you’re using `--formats=html` and run eleventy more than once, it’ll try to process your output files too.

```
$ eleventy --input=. --output=. --formats=md,html
Writing ./README/index.html from ./README.md

$ eleventy --input=. --output=. --formats=md,html
Writing ./README/index.html from ./README.md
Writing ./README/index-o.html from ./README/index.html
```

If you’re going to use `--formats=html`, it’s probably best not using the same input and output directories.

Moreover, you may notice in the above output that the second template wrote to `index-o.html`. When the input and output directories are the same _and_ the source template is named `index.html`, we add an `-o` suffix to avoid overwriting itself. This is a special case that only applies to `index.html` filenames. You can customize the `-o` suffix with the [`htmlOutputSuffix` configuration option](/docs/config/#change-exception-case-suffix-for-html-files).

## File Creation Dates reset on Continuous Integration server

Be careful relying on the default `date` associated with a piece of content. By default Eleventy uses file creation dates, which works fine if you run Eleventy locally but may reset in some conditions if you run Eleventy on a Continuous Integration server. Work around this by using explicit date assignments, either in your front matter or your content’s file name. [Read more at Content Dates](/docs/dates/).

## Dates off by One Day?

Many date formats in Eleventy (when set in your content‘s filename as `YYYY-MM-DD-myfile.md` or in your front matter as `date: YYYY-MM-DD`) assume midnight in UTC. When displaying your dates, make sure you’re using the UTC time and not your own local time zone, which may be the default.

### Example

```
---
date: 2018-01-01
---
```

```
{% raw %}{{ page.date }}{% endraw %} will display a local time zone date.
{{ sampleDate }}
```

```
{% raw %}{{ page.date.toString() }}{% endraw %} will display a local time zone date.
{{ sampleDate.toString() }}
```

```
{% raw %}{{ page.date.toUTCString() }}{% endraw %} will display a UTC time zone date.
{{ sampleDate.toUTCString() }}
```

Read more at [Content Dates](/docs/dates/).

## Quoted Include Paths and Liquid Templates

Read more at [Liquid Templates](/docs/languages/liquid/#quoted-include-paths).