---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Built With Eleventy
  order: 3
---

# Built Using Eleventy

{{ sites | getsize }} sites featured below. {% addToSampleSites %}

<div class="lo sites-lo" style="--lo-margin-h: 2em; --lo-margin-v: 1em; --lo-stackpoint: 31.25em;">
{% for key, site in sites | shuffle -%}
{% if site.disabled != true and site.url -%}
  <div class="lo-c"><a href="{{ site.url }}">{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}</a>
    {%- if site.description %}<em class="list-bare-desc list-bare-desc-avatar">{{ site.description }}</em>{% endif -%}
    {%- if site.source_url %}<em class="list-bare-desc list-bare-desc-avatar">Includes <a href="{{ site.source_url }}">sample source code</a>.</em>{% endif -%}
  </div>
{% endif -%}
{% endfor -%}
  <div class="lo-c">{% addToSampleSites %}</div>
</div>

<div style="margin-top: 50vh"></div>

#### Any site using AMP

<div class="lo lo-carousel ampcarousel" style="--lo-c-minwidth: 13.125em">
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
	<div class="lo-c"><a href="#">{% avatarlocalcache "twitter", "AMPhtml" %}A site using AMP</a></div>
</div>