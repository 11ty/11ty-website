---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Sites Using Eleventy
  order: 3
---

# {{ sites | getsize }} Sites Using Eleventy

<ul class="list-bare">
{% for key, site in sites | shuffle -%}
{% if site.disabled != true and site.url -%}
  <li><a href="{{ site.url }}">{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}</a>
    {%- if site.description %}<em class="list-bare-desc list-bare-desc-avatar">{{ site.description }}</em>{% endif -%}
    {%- if site.source_url %}<em class="list-bare-desc list-bare-desc-avatar">Includes <a href="{{ site.source_url }}">sample source code</a>.</em>{% endif -%}
  </li>
{% endif -%}
{% endfor -%}
  <li>{% addToSampleSites %}</li>
</ul>