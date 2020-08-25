---
title: Eleventy Budget
ignoreSupporters: true
ignoreFooterTestimonial: true
ignoreGitHubButtons: true
eleventyExcludeFromCollections: true
layout: layouts/main.njk
---
* See also the [Open Collective Budget page for the current balance](https://opencollective.com/11ty#section-budget).

## Monthly Contributor Count

<p style="font-size: 3em"><code>{{ opencollectiveMonthly.contributorCount }}</code></p>

## Current recurring monthly donations

<p style="font-size: 3em"><code>${{ opencollectiveMonthly.recurringAmount }}</code></p>

_Monthly donations:_

{%- for donation,count in opencollectiveMonthly.buckets %}
* `${{ donation }}` ×{{ count }}
{%- endfor %}

_Median monthly donation:_ `${{ opencollectiveMonthly.stats.median }}`
_Mean monthly donation:_ `${{ opencollectiveMonthly.stats.mean }}`

## Yearly estimate

<p style="font-size: 3em"><code>${{ opencollectiveMonthly.recurringAmount * 12 }}</code></p>

_The monthly amount ×12_ 😇