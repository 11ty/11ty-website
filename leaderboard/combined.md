---
eleventyNavigation:
  parent: Built With Eleventy
  key: Combined Leaderboard
  order: 1
ignoreFastestSite: true
excludeFromSidebar: true
css:
  - components/page-sites.css
---
# Eleventy Leaderboard Top 11

The combined Eleventy Leaderboard finds the sites that scored the best across both the [Performance](/leaderboard/perf/) and [Accessibility Leaderboards](/leaderboard/a11y/). {% addToSampleSites %}

<br>

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- set combinedRanked = fastestSites | rankSortByNumericKey("rank", "accessibilityRank") %}
{%- for perf in combinedRanked %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{%- if site.disabled !== true and site.excludedFromLeaderboards !== true and site.url and loop.index0 < 11 %}
	{%- set topKey = true %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = true %}
	{%- set showAccessibilityMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endif %}
{%- endfor %}
</div>
