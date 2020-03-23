---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Built With Eleventy
  order: 3
css:
  - components/page-sites.css
---

# Built With Eleventy

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-v: 2em">
	<div class="lo-c" style="flex-grow: 2" id="statistics"><!-- backwards compt for previous id link -->
		<div><strong class="sites-val">{{ sites | length }}</strong> Sites Tested</div>
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
		<h3 class="authors-hed">Top 11 Authors</h3>
		<ul class="authors-list">
		{%- for author in sites | topAuthors | head(11) %}
			<li><code>×{{ author.count }}</code> <a href="https://twitter.com/{{ author.name }}">@{{ author.name }}</a></li>
		{%- endfor %}
		</ul>
	</div>
</div>

<br>

{% addToSampleSites %}

Sites with Lighthouse scores greater than or equal to 90 are ordered by performance. The remainder are ordered randomly. Performance rankings are updated approximately once per week on Sunday. _Last generated {{ fastestSitesMeta.generated | newsDate }}_.

<br>

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{% for perf in fastestSites -%}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{% if site.disabled != true and site.url and perf.lighthouseScore >= 0.9 -%}
	<div class="lo-c{% if perf.rank <= 11 %} site-top{% endif %}">
		<div>
			<a href="{{ site.url }}">{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}</a>
			{%- if site.description %}<em class="list-bare-desc list-bare-desc-avatar">{{ site.description }}</em>{% endif -%}
			<em class="list-bare-desc list-bare-desc-avatar">
				<div class="lo lo-inline lo-nocontentwrap lo-separator-h" style="--lo-margin-h: 1.5rem; --lo-margin-v: .25rem">
					{%- if site.twitter %}<div class="lo-c">By <a href="https://twitter.com/{{ site.twitter }}" class="elv-externalexempt">@{{ site.twitter }}</a></div>{% endif -%}
					<div class="lo-c sites-perf-rank">Performance Rank <strong>#{{ perf.rank }}</strong>{% if not perf.previousRank %}<strong class="sites-perf-rank-new">New site!</strong>{% elseif perf.previousRank !== perf.rank and perf.previousRank - perf.rank > 0 %}<strong class="sites-perf-rank-{% if perf.previousRank - perf.rank > 0 %}pos{% else %}neg{% endif %}">{{ (perf.previousRank - perf.rank) | abs }}</strong>{% endif %}</div>
					<div class="lo-c sites-perf-lh">Lighthouse <strong>{{ perf.lighthouseScore * 100 }}</strong></div>
					<div class="lo-c sites-perf-si">Speed Index <strong>{{ perf.speedIndex | round(1) }}</strong></div>
					{%- if site.source_url %}<div class="lo-c"><a href="{{ site.source_url }}" class="elv-externalexempt">Source code</a> provided.</div>{% endif -%}
				</div>
			</em>
		</div>
		{%- if perf.rank <= 11 %}<div><img src="/img/sites/{{ site.url | screenshotFilenameFromUrl }}" alt="Screenshot of {{ site.url }}" class="sites-screenshot" loading="lazy" width="405" height="304"></div>{% endif %}
	</div>
{% endif -%}
{% endfor -%}
	<div class="lo-c lo-fullwidth sites-divider"><strong>Remaining items are in random order</strong></div>
{% for perf in fastestSites | shuffle -%}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{% if site.disabled != true and site.url and perf.lighthouseScore < 0.9 -%}
	<div class="lo-c">
		<div>
			<a href="{{ site.url }}">{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}</a>
			{%- if site.description %}<em class="list-bare-desc list-bare-desc-avatar">{{ site.description }}</em>{% endif -%}
			<em class="list-bare-desc list-bare-desc-avatar">
				<div class="lo lo-inline lo-nocontentwrap lo-separator-h" style="--lo-margin-h: 1.5rem; --lo-margin-v: .25rem">
					{%- if site.twitter %}<div class="lo-c">By <a href="https://twitter.com/{{ site.twitter }}" class="elv-externalexempt">@{{ site.twitter }}</a></div>{% endif -%}
					{%- if site.source_url %}<div class="lo-c"><a href="{{ site.source_url }}" class="elv-externalexempt">Source code</a> provided.</div>{% endif -%}
				</div>
			</em>
		</div>
	</div>
{% endif -%}
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