---
subtitle: Content Dates
tags:
  - docs-templates
sampleDate: 2018-01-01
---
# {{ subtitle }}

## Setting a Content Date in Front Matter

Add a `date` key to your front matter to override the default date (file creation) and customize how the file is sorted in a collection.

{% codetitle "YAML Front Matter", "Syntax" %}

```
---
date: 2016-01-01
---
```

{% codetitle "YAML Front Matter", "Syntax" %}

```
---
date: Last Modified
---
```

Valid `date` values:

* `Last Modified`: automatically resolves to the file’s last modified date
* `Created`: automatically resolves to the file’s created date (default, this is what is used when `date` is omitted).
* `2016-01-01` or any other valid [YAML date value](http://yaml.org/type/timestamp.html) (leaving off the time assumes midnight in UTC, or `00:00:00Z`)
* `"2016-01-01"` or any other valid UTC **string** that [Luxon’s `DateTime.fromISO`](https://moment.github.io/luxon/docs/manual/parsing.html#parsing-technical-formats) can parse (see also the [Luxon API docs](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromISO)).

If a `date` key is omitted from the file, the date is assumed to be:

1. If the file name has a `YYYY-MM-DD` format (anywhere), this date is used.
1. File creation date.

## Dates off by one day?

<div class="elv-callout elv-callout-warn">This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</div>

You’re probably displaying UTC dates in a local time zone.

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

## Collections out of order when you run Eleventy on your Server?

<div class="elv-callout elv-callout-warn">This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</div>

Be careful relying on the default `date` associated with a piece of content. By default Eleventy uses file creation dates, which works fine if you run Eleventy locally but may reset in some conditions if you run Eleventy on a Continuous Integration server. Work around this by using explicit date assignments, either in your front matter or your content’s file name. [Read more at Content Dates](/docs/dates/).


