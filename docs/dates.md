---
subtitle: Content Dates
tags:
  - docs-templates
---
# {{ subtitle }}

## Setting a Content Date in Front Matter

Add a `date` key to your front matter to override the default date (file creation) and customize how the file is sorted in a collection.

```
---
date: 2016-01-01
---
```

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

<div class="elv-callout elv-callout-warn"><strong>Running Eleventy on a Continuous Integration Server?</strong> Your collections may appear out of order! See <a href="/docs/pitfalls/#file-creation-dates-reset-on-continuous-integration-server">Common Pitfalls</a>.</div>

<div class="elv-callout elv-callout-warn"><strong>Are your dates displaying off by one day?</strong> You’re probably displaying UTC dates in a local time zone. See <a href="/docs/pitfalls/#dates-off-by-one-day%3F">Common Pitfalls</a>.</div>

