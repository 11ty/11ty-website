---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Built With Eleventy
  title: Eleventy Leaderboards
  order: 3
ignoreFastestSite: true
css:
  - components/page-sites.css
---

# Built With Eleventy

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-v: 2em">
	<div class="lo-c" style="flex-grow: 2" id="statistics"><!-- backwards compt for previous id link -->
		<div><strong class="sites-val">{{ sites | objectFilterNot("disabled") | length }}</strong> Sites</div>
		{%- set medianLhScore = fastestSites | calc("median", "lighthouseScore") * 100 %}
		<div><strong class="sites-val">{{ medianLhScore | round }}</strong> Median Performance Score</div>
		{%- set medianA11yScore = fastestSites | calc("median", "accessibilityScore") * 100 %}
		{%- set meanA11yScore = fastestSites | calc("mean", "accessibilityScore") * 100 %}
		<div><strong class="sites-val">{{ medianA11yScore | round }}</strong> Median Accessibility Score</div>
		{%- set totalPerfectLhPerfScore = fastestSites | calc("count", "lighthouseScore", 1) %}
		{%- set totalPerfectLhA11yScore = fastestSites | calc("count", "accessibilityScore", 1) %}
		{%- set totalPerfectLhPerfAndA11yScore = fastestSites | calc("count", ["lighthouseScore", "accessibilityScore"], 1) %}
		<div><strong class="sites-val">{{ totalPerfectLhPerfScore | round }}</strong> {% emoji "💯", "100" %}’s on <a href="/leaderboard/perf/">Performance</a></div>
		<div><strong class="sites-val">{{ totalPerfectLhA11yScore | round }}</strong> {% emoji "💯", "100" %}’s on <a href="/leaderboard/a11y/">Accessibility</a></div>
		<div><strong class="sites-val">{{ totalPerfectLhPerfAndA11yScore | round }}</strong> {% emoji "💯", "100" %}’s on both <a href="/leaderboard/combined/">Performance and Accessibility</a></div>
	</div>
	<div class="lo-c">
		<h3 class="authors-hed"><a href="/authors/">Most Sites Created</a></h3>
		<ul class="authors-list">
		{%- for author in sites | topAuthors | head(11) %}
			<li><code>×{{ author.count }}</code> <a href="/authors/{{ author.name }}/">{% avatarlocalcache "twitter", author.name %}{{ author.name }}</a></li>
		{%- endfor %}
		</ul>
	</div>
</div>

<br>

## [Combined Leaderboard](/leaderboard/combined/)

Rankings are updated approximately once per week on Sunday. <em>Last generated {{ fastestSitesMeta.generated | newsDate }}</em>. See the full [Combined Leaderboard](/leaderboard/combined/).

<div class="lo sites-lo" style="--lo-stackpoint: 30em; --lo-margin-v: 2em">
{%- set combinedRanked = fastestSites | rankSortByNumericKey("rank", "accessibilityRank") %}
{%- for perf in combinedRanked | head(2) %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
	{%- set topKey = true %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = true %}
	{%- set showAccessibilityMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endfor %}
</div>


## [Performance Leaderboard](/leaderboard/perf/)

Rankings are updated approximately once per week on Sunday. <em>Last generated {{ fastestSitesMeta.generated | newsDate }}</em>. See the full [Performance Leaderboard](/leaderboard/perf/).

<div class="lo sites-lo" style="--lo-stackpoint: 30em; --lo-margin-v: 2em">
{%- set perfRanked = fastestSites | rankSortByNumericKey("rank") %}
{%- for perf in perfRanked | head(2) %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
	{%- set topKey = "performance" %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endfor %}
</div>


## [Accessibility Leaderboard](/leaderboard/a11y/)

Rankings are updated approximately once per week on Sunday. <em>Last generated {{ fastestSitesMeta.generated | newsDate }}</em>. See the full [Accessibility Leaderboard](/leaderboard/a11y/).

<div class="lo sites-lo" style="--lo-stackpoint: 30em; --lo-margin-v: 2em">
{%- set a11yRanked = fastestSites | rankSortByNumericKey("accessibilityRank") %}
{%- for perf in a11yRanked | head(2) %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
	{%- set topKey = "accessibility" %}
	{%- set showMetadata = true %}
	{%- set showAccessibilityMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endfor %}
</div>

## [Random Leaderboard](/leaderboard/random/)

The random Eleventy Leaderboard shows the sites that exist that were built with Eleventy in at-most as random an order as JavaScript’s capability for randomness allows. Rankings are updated whenever this site is built. <em>Last generated {{ config.now | newsDate }}</em>. See the full [Random Leaderboard](/leaderboard/random/).
