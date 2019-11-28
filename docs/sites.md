---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Sites Using Eleventy
  order: 3
---

# {{ sites | getsize }} Sites Using Eleventy

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