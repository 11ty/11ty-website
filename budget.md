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

_Average monthly donation:_ `${{ opencollectiveMonthly.recurringAmount / opencollectiveMonthly.contributorCount }}`

## Yearly estimate

<p style="font-size: 3em"><code>${{ opencollectiveMonthly.recurringAmount * 12 }}</code></p>

_The monthly amount ×12_ 😇