---
eleventyNavigation:
  parent: Eleventy Authors
  key: Eleventy Author
excludeFromSidebar: true
pagination:
  data: authors
  size: 1
  resolve: values
  alias: author
layout: layouts/docs.njk
permalink: "/authors/{{ author.name | slug }}/"
css:
  - components/page-sites.css
---
{%- set twitterUrl = "https://twitter.com/" + author.name %}
{%- set supporter = supporters | findBy("twitter", twitterUrl) | last -%}
{%- set displayName = supporter.name or author.name %}

# {{ displayName }}

* <a href="{{ twitterUrl }}">{% avatarlocalcache "twitter", author.name %}{{ author.name }}</a> on Twitter
{%- if supporter %}
* <a href="{{ supporter.profile }}" class="elv-externalexempt supporters-link" rel="nofollow"><strong>{% if supporter.tier and supporter.isActive %} {% emoji "📅" %} Monthly{% endif %} Eleventy Contributor</strong> on Open Collective</a> 🎈
{%- else %}
* <a href="https://opencollective.com/11ty">Not yet <strong>Supporting Eleventy</strong> on Open Collective.</a>
* <em>Already a supporter but it’s not showing here? Make sure your Twitter account is listed on your Open Collective Profile.</em>
{%- endif %}

### {{ displayName }} Built These Eleventy Sites:

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- for site in author.sites %}
  {%- set perf = site.url | findSiteDataByUrl(fastestSites) %}
  {%- set showMetadata = true %}
  {%- set showPerformanceMetadata = true %}
  {%- set showAccessibilityMetadata = true %}
  {%- set showRankOnly = true %}
  {% include "site.njk" %}
{%- endfor %}
</div>