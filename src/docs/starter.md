---
eleventyNavigation:
  parent: Getting Started
  key: Starter Projects
  order: 2
---

# Starter Projects

[Add your own starter project](https://github.com/11ty/11ty-website/tree/main/src/_data/starters). Community contributions are shown in random order. [Lighthouse scores are updated daily](https://eleventy-starters--speedlify.netlify.app/eleventy-starters/).

<filter-container oninit>
<form>
  <label>
    <input type="radio" name="projectfilter" value="" data-filter-key="tags" checked>
    Show all projects
  </label>
  <label>
    <input type="radio" name="projectfilter" value="perfectlh" data-filter-key="tags">
    Only show projects with a Four Hundos Lighthouse score
  </label>
</form>
<div class="sites-vert sites-vert--lg">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
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

- [{% avatarlocalcache "twitter", "stackbithq" %}Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).
