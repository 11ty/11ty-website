---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Built With Eleventy
  order: 3
ignoreFastestSite: true
css:
  - components/page-sites.css
---

# Built With Eleventy

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-v: 2em">
	<div class="lo-c" style="flex-grow: 2" id="statistics"><!-- backwards compt for previous id link -->
		<div><strong class="sites-val">{{ sites | objectFilterNot("disabled") | length }}</strong> Sites</div>
		{%- set totalPerfectLhPerfScore = fastestSites | calc("count", "lighthouseScore", 1) %}
		{%- set totalPerfectLhA11yScore = fastestSites | calc("count", "accessibilityScore", 1) %}
		<div><strong class="sites-val">{{ totalPerfectLhPerfScore | round }}</strong> {% emoji "💯", "100" %}’s on <a href="/docs/performance-leaderboard/">Performance</a></div>
		<div><strong class="sites-val">{{ totalPerfectLhA11yScore | round }}</strong> {% emoji "💯", "100" %}’s on <a href="/docs/accessibility-leaderboard/">Accessibility</a></div>
		{%- set medianLhScore = fastestSites | calc("median", "lighthouseScore") * 100 %}
		<div><strong class="sites-val">{{ medianLhScore | round }}</strong> Median Performance Score</div>
		{%- set medianA11yScore = fastestSites | calc("median", "accessibilityScore") * 100 %}
		{%- set meanA11yScore = fastestSites | calc("mean", "accessibilityScore") * 100 %}
		<div><strong class="sites-val">{{ medianA11yScore | round }}</strong> Median Accessibility Score</div>
	</div>
	<div class="lo-c">
		<h3 class="authors-hed"><a href="/docs/authors/">Most Sites Created</a></h3>
		<ul class="authors-list">
		{%- for author in sites | topAuthors | head(11) %}
			<li><code>×{{ author.count }}</code> <a href="https://twitter.com/{{ author.name }}">{% avatarlocalcache "twitter", author.name %}{{ author.name }}</a></li>
		{%- endfor %}
		</ul>
	</div>
</div>

<br>


## Eleventy Leaderboard Top 11

The combined Eleventy Leaderboard finds the sites that scored the best across both the [Performance](/docs/performance-leaderboard/) and [Accessibility Leaderboards](/docs/accessibility-leaderboard/). {% addToSampleSites %}

<br>

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- set combinedRanked = fastestSites | rankSortByNumericKey("rank", "accessibilityRank") %}
{%- for perf in combinedRanked %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{%- if site.disabled !== true and site.excludedFromLeaderboards !== true and site.url and perf.accessibilityRank <= 11 %}
	{%- set topKey = "accessibility" %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = true %}
	{%- set showAccessibilityMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endif %}
{%- endfor %}
</div>
