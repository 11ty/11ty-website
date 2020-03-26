---
eleventyNavigation:
  parent: Working with Templates
  key: Content Dates
  order: 5
  excerpt: Assigning dates to content, using dates in front matter.
---
# Content Dates

## Setting a Content Date in Front Matter

Add a `date` key to your front matter to override the default date (file creation) and customize how the file is sorted in a collection.

{% codetitle "YAML Front Matter", "Syntax" %}

```markdown
---
date: 2016-01-01
---
```

{% codetitle "YAML Front Matter", "Syntax" %}

```markdown
---
date: Last Modified
---
```

Valid `date` values:

* `Last Modified`: automatically resolves to the file’s last modified date
* `Created`: automatically resolves to the file’s created date (default, this is what is used when `date` is omitted).
* `2016-01-01` or any other valid [YAML date value](https://yaml.org/type/timestamp.html) (leaving off the time assumes midnight in UTC, or `00:00:00Z`)
* `"2016-01-01"` or any other valid UTC **string** that [Luxon’s `DateTime.fromISO`](https://moment.github.io/luxon/docs/manual/parsing.html#parsing-technical-formats) can parse (see also the [Luxon API docs](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromISO)).

If a `date` key is omitted from the file, the date is assumed to be:

1. If the file name has a `YYYY-MM-DD` format (anywhere), this date is used.
1. File creation date.

{% callout "info" %}<strong>Trying to use <code>date</code> in your templates?</strong> The <code>date</code> value will likely not be of much use, since Eleventy performs no transformation on this front matter value. You probably want <code>page.date</code> instead. Check out <a href="/docs/data-eleventy-supplied/#page-variable-contents">the values available in the <code>page</code> variable</a>.{% endcallout %}

## Dates off by one day?

<div class="elv-callout elv-callout-warn">This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</div>

You’re probably displaying UTC dates in a local time zone.

Many date formats in Eleventy (when set in your content‘s filename as `YYYY-MM-DD-myfile.md` or in your front matter as `date: YYYY-MM-DD`) assume midnight in UTC. When displaying your dates, make sure you’re using the UTC time and not your own local time zone, which may be the default.

### Example

{% codetitle "YAML Front Matter", "Syntax" %}

```markdown
---
date: 2018-01-01
---
```

If you output the Date object in a template, it will convert it to a string for display:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

```
Using {% raw %}{{ page.date }}{% endraw %} will display a
date using a local time zone like:

Sun Dec 31 2017 18:00:00 GMT-0600 (Central Standard Time)
```

Note that this appears to be the wrong day!

Nunjucks allows you to call JavaScript methods in output `{% raw %}{{ page.date.toString() }}{% endraw %}`. Liquid does not allow this.

{% codetitle "Nunjucks", "Syntax" %}

```
But {% raw %}{{ page.date.toUTCString() }}{% endraw %} will correctly
display a date with a UTC time zone like:

Mon, 01 Jan 2018 00:00:00 GMT
```

You could very easily just add a `toUTCString` [filter in Liquid](/docs/filters/) to perform the same task.

## Collections out of order when you run Eleventy on your Server?

<div class="elv-callout elv-callout-warn">This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</div>

Be careful relying on the default `date` associated with a piece of content. By default Eleventy uses file creation dates, which works fine if you run Eleventy locally but may reset in some conditions if you run Eleventy on a Continuous Integration server. Work around this by using explicit date assignments, either in your front matter or your content’s file name. [Read more at Content Dates](/docs/dates/).
