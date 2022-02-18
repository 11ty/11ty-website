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
* `git Last Modified`: {% addedin "1.0.1" %} automatically resolves to the file’s latest git commit. If a file is not yet checked in to git, it assigns `Date.now()` to `page.date` instead. This one is a bit resource intensive, so you may want to limit this to your CI server environment only using JavaScript data files and environment variables. Read more about [Environment Variables](/docs/data-js/#example-exposing-environment-variables) and check out [this example code](https://github.com/11ty/11ty-website/blob/5403f2b853e09165bec8bc6f7466a6a041487bcc/src/docs/docs.11tydata.js#L5-L7).
* `2016-01-01` or any other valid [YAML date value](https://yaml.org/type/timestamp.html) (leaving off the time assumes midnight in UTC, or `00:00:00Z`)
* `"2016-01-01"` or any other valid UTC **string** that [Luxon’s `DateTime.fromISO`](https://moment.github.io/luxon/#/parsing?id=iso-8601) can parse (see also the [Luxon API docs](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)).

If a `date` key is omitted from the file, we then look for a `YYYY-MM-DD` format anywhere in the file path (even folders). If there are multiple dates found, the first is used. ℹ️ [Note that starting in 1.0 for consistency with front matter formats file name date formats are now assumed to be UTC.](https://github.com/11ty/eleventy/pull/1752)

As a last resort, the file creation date is used. [Careful when relying on file creation dates on a deployment server](#collections-out-of-order-when-you-run-eleventy-on-your-server).

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
Using {% raw %}{{ page.date }}{% endraw %} will display a date using a local time zone like:

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

You could add your own `toUTCString` [filter in Liquid](/docs/filters/) to perform the same task.

## Collections out of order when you run Eleventy on your Server?

{% callout "warn", "md" -%}
  This is a [**Common Pitfall**](/docs/pitfalls/).
{%- endcallout %}

Be careful relying on the default `date` associated with a piece of content. By default Eleventy uses file creation dates, which works fine if you run Eleventy locally but may reset in some conditions if you run Eleventy on a Continuous Integration server. Work around this by using explicit date assignments, either in your front matter or your content’s file name. Read more at [_Setting a Content Date in Front Matter_](#setting-a-content-date-in-front-matter).

{% callout "info", "md" -%}
  {% addedin "1.0.1" %} The new `date: "git Last Modified"` feature will resolve this issue! Source control dates are available and will be consistent on most Continuous Integration servers. Read more at [_Setting a Content Date in Front Matter_](#setting-a-content-date-in-front-matter).
{%- endcallout %}