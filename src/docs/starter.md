---
eleventyNavigation:
  parent: Getting Started
  key: Starter Projects
  order: 2
---
# Starter Projects

[Add your own starter project](https://github.com/11ty/11ty-website/tree/master/src/_data/starters). Community contributions are shown in random order. [Lighthouse scores are updated daily](https://www.speedlify.dev/eleventy-starters/).

<filter-container data-oninit>
<form>
  <select data-filter-bind="tags" class="select-filter">
    <option value="">Show All</option>
    <option value="perfectlh">Four Hundos Lighthouse Score</option>
  </select>
</form>
<div class="sites-vert sites-vert--lg">
  <div class="lo-grid" style="--lo-margin-v: 5em;">
{%- for site in starters | sortObjectByOrder %}
{%- if site.disabled != true and site.official %}
{%- set siteData = speedlifyStarters.data[site.demo] or speedlifyStarters.data[site.url] %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{%- for site in starters | sortObjectByOrder %}
{%- if site.disabled != true and site.featured %}
{%- set siteData = speedlifyStarters.data[site.demo] or speedlifyStarters.data[site.url] %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{%- for name, site in starters | shuffle %}
{%- if site.disabled != true and not site.official and not site.featured %}
{%- set siteData = speedlifyStarters.data[site.demo] or speedlifyStarters.data[site.url] %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
  </div>
</div>
</filter-container>

## Lists

* [{% avatarlocalcache "twitter", "stackbithq" %}Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).