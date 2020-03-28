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

{% addToSampleSites %}

Sites with Lighthouse scores greater than or equal to 90 are ordered by performance. The remainder are ordered randomly. Performance rankings are updated approximately once per week on Sunday. _Last generated {{ fastestSitesMeta.generated | newsDate }}_.

<br>

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- for perf in fastestSites %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{%- if site.disabled !== true and site.url and perf.lighthouseScore >= 0.9 %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = true %}
	{%- set showScreenshot = perf.rank <= 11 %}
	{% include "site.njk" %}
{%- endif %}
{%- endfor %}
	<div class="lo-c lo-fullwidth sites-divider"><strong>Remaining items are in random order</strong></div>
{%- for perf in fastestSites | shuffle %}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{%- if site.disabled !== true and site.url and perf.lighthouseScore < 0.9 %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = false %}
	{% include "site.njk" %}
{%- endif %}
{%- endfor %}
	<div class="lo-c lo-fullwidth sites-divider"><strong>Pending</strong></div>
{%- for key, site in sites -%}
{%- set missingEntry = site.url | hasPerformanceEntryByUrl(fastestSites) %}
{%- if not missingEntry and site.disabled !== true and site.url %}
	{%- set showMetadata = true %}
	{%- set showPerformanceMetadata = false %}
	{% include "site.njk" %}
{%- endif -%}
{% endfor -%}
	<div class="lo-c">{% addToSampleSites %}</div>
</div>

<div style="margin-top: 50vh"></div>

#### Any site using AMP

<div class="lo lo-carousel ampcarousel" style="--lo-c-minwidth: 13.125em">
{%- for j in [1,2,3,4,5,6,7,8] %}
	<div class="lo-c"><a>{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
{%- endfor %}
</div>