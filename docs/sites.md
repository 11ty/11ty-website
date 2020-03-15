---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Built With Eleventy
  order: 3
---

# Built Using Eleventy

{{ sites | getsize }} sites featured below ordered by _speed_. Performance rankings are updated approximately once per week. {% addToSampleSites %}

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{% for perf in fastestSites -%}
{%- set site = perf.url | findSiteDataByUrl(sites) %}
{% if site.disabled != true and site.url -%}
	<div class="lo-c"><a href="{{ site.url }}">{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}</a>
		{%- if site.description %}<em class="list-bare-desc list-bare-desc-avatar">{{ site.description }}</em>{% endif -%}
		{%- if perf.lighthouseScore >= 0.9 -%}
		<em class="list-bare-desc list-bare-desc-avatar">
			<div class="lo lo-inline lo-nocontentwrap lo-separator-h" style="--lo-margin-h: 1.5rem">
				<div class="lo-c sites-perf-rank">Performance Rank <strong>{{ perf.rank }}</strong> of {{ fastestSites | length }}</div>
				<div class="lo-c sites-perf-lh">Lighthouse Score <strong>{{ perf.lighthouseScore * 100 }}</strong></div>
				<div class="lo-c sites-perf-si">Speed Index <strong>{{ perf.speedIndex | round(1) }}</strong></div>
			</div>
		</em>
		{%- endif -%}
		{%- if site.source_url %}<em class="list-bare-desc list-bare-desc-avatar">Includes <a href="{{ site.source_url }}">sample source code</a>.</em>{% endif -%}
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