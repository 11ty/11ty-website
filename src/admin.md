---
headerTitle: Eleventy Not-So-Private Admin Dashboard
ignoreSupporters: true
ignoreFooterTestimonial: true
ignoreGitHubButtons: true
eleventyExcludeFromCollections: true
layout: layouts/docs.njk
---
## Budget

- See also the [Open Collective Budget page for the current balance](https://opencollective.com/11ty#section-budget).

### Monthly Contributor Count

<p style="font-size: 3em"><code>{{ opencollectiveMonthly.contributorCount }}</code></p>

### Current recurring monthly donations

<p style="font-size: 3em"><code>{{ opencollectiveMonthly.recurringAmount | displayPrice }}</code></p>

_Monthly donations:_

{%- for donation,count in opencollectiveMonthly.buckets %}

- `{{ donation | displayPrice }}` _(×{{ count }}) {{ opencollectiveMonthly.names[donation] | join(", ") }}_
  {%- endfor %}

_Median monthly donation:_ `{{ opencollectiveMonthly.stats.median | displayPrice }}`
_Mean monthly donation:_ `{{ opencollectiveMonthly.stats.mean | displayPrice }}`

### One-time donations in the last 12 months

* `{{ opencollective.onetimeDonations.count }}` donations in the last 12 months
* Totalling `{{ opencollective.onetimeDonations.total | displayPrice }}`
* Approximately `{{ (opencollective.onetimeDonations.total/12) | displayPrice }}` per month

#### Months ago:

{%- for month in opencollective.onetimeDonations.months %}
1. {% if month %}`{{ month | displayPrice }}`{% endif %}
{%- endfor %}

### Yearly estimate

<p style="font-size: 3em"><code>{{ (opencollectiveMonthly.recurringAmount * 12) | displayPrice }}</code></p>

_The monthly amount ×12_ 😇

`{{ (opencollectiveMonthly.recurringAmount * 12 + opencollective.onetimeDonations.total) | displayPrice }}` with amortized one time payments.

## Sites

{% for key, site in builtwith -%}{% if site.url and site.featured -%}
{% generatoravatar site.url %} [`{{ site.url }}`]({{site.url}})
{% endif %}{%- endfor %}
