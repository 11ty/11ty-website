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
		<div><strong class="sites-val">{{ sites | length }}</strong> Sites</div>
		{%- set medianLhScore = fastestSites | calc("median", "lighthouseScore") * 100 %}
		{%- set meanLhScore = fastestSites | calc("mean", "lighthouseScore") * 100 %}
		<div><strong class="sites-val">{{ medianLhScore | round }}</strong> Median Lighthouse Score</div>
		<div><strong class="sites-val">{{ meanLhScore | round(1) }}</strong> Mean Lighthouse Score</div>
		{%- set medianSi = fastestSites | calc("median", "speedIndex") %}
		{%- set meanSi = fastestSites | calc("mean", "speedIndex") %}
		<div><strong class="sites-val">{{ medianSi | round | commaNumber }}</strong> Median Speed Index</div>
		<div><strong class="sites-val">{{ meanSi | round | commaNumber }}</strong> Mean Speed Index</div>
		{%- set medianFcp = fastestSites | calc("median", "firstContentfulPaint") %}
		{%- set meanFcp = fastestSites | calc("mean", "firstContentfulPaint") %}
		<div><strong class="sites-val">{{ medianFcp | round | commaNumber }}</strong> Median First Contentful Paint</div>
		<div><strong class="sites-val">{{ meanFcp | round | commaNumber }}</strong> Mean First Contentful Paint</div>
		<!-- {%- set medianFmp = fastestSites | calc("median", "firstMeaningfulPaint") %}
		{%- set meanFmp = fastestSites | calc("mean", "firstMeaningfulPaint") %}
		<div><strong class="sites-val">{{ medianFmp | round | commaNumber }}</strong> Median First Meaningful Paint</div>
		<div><strong class="sites-val">{{ meanFmp | round | commaNumber }}</strong> Mean First Meaningful Paint</div> -->
		{%- set medianA11yScore = fastestSites | calc("median", "accessibilityScore") * 100 %}
		{%- set meanA11yScore = fastestSites | calc("mean", "accessibilityScore") * 100 %}
		<div><strong class="sites-val">{{ medianA11yScore | round }}</strong> Median Accessibility Score</div>
		<div><strong class="sites-val">{{ meanA11yScore | round(1) }}</strong> Mean Accessibility Score</div>
	</div>
	<div class="lo-c">
		<h3 class="authors-hed">Most Sites Created</h3>
		<ul class="authors-list">
		{%- for author in sites | topAuthors | head(11) %}
			<li><code>×{{ author.count }}</code> <a href="https://twitter.com/{{ author.name }}">{% avatarlocalcache "twitter", author.name %}{{ author.name }}</a></li>
		{%- endfor %}
		</ul>
	</div>
</div>

<br>

## Performance Leaderboard Top 11

Top 11 fastest sites shown here. See the full <a href="/docs/performance-leaderboard/">Performance Leaderboard (all {{ sites | length }} sites)</a>. Rankings are updated approximately once per week on Sunday. _Last generated {{ fastestSitesMeta.generated | newsDate }}_. {% addToSampleSites %}

<br>

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- for perf in fastestSites %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{%- if site.disabled !== true and site.excludedFromLeaderboards !== true and site.url and perf.rank <= 11 %}
	{%- set topKey = "performance" %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endif %}
{%- endfor %}
</div>

See the full <a href="/docs/performance-leaderboard/">Performance Leaderboard</a>.

## Accessibility Leaderboard Top 11

Top 11 highest ranked sites shown here, ordered by Lighthouse accessibility scores with ties broken by fewest reported violations from a full axe accessibility scan. See the full <a href="/docs/accessibility-leaderboard/">Accessibility Leaderboard (all {{ sites | length }} sites)</a>. Rankings are updated approximately once per week on Sunday. _Last generated {{ fastestSitesMeta.generated | newsDate }}_. {% addToSampleSites %}

<br>

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- set accessibilityRanked = fastestSites | rankSortByNumericKey("accessibilityRank") %}
{%- for perf in accessibilityRanked %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{%- if site.disabled !== true and site.excludedFromLeaderboards !== true and site.url and perf.accessibilityRank <= 11 %}
	{%- set topKey = "accessibility" %}
	{%- set showMetadata = true %}
	{%- set showAccessibilityMetadata = true %}
	{%- set showScreenshot = true %}
	{% include "site.njk" %}
{%- endif %}
{%- endfor %}
</div>

See the full <a href="/docs/accessibility-leaderboard/">Accessibility Leaderboard</a>.