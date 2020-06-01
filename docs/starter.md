---
eleventyNavigation:
  parent: Getting Started
  key: Starter Projects
  order: 2
---
# Starter Projects

## Official

{% for site in starters | sortObjectByOrder -%}
{% if site.disabled != true and site.official -%}
* [{% avatarlocalcache "twitter", site.author, site.author %}{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{% endif -%}
{% endfor -%}

## Lists

* [{% avatarlocalcache "twitter", "stackbithq", "stackbithq" %}Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Community Contributed

{% for site in starters | sortObjectByOrder -%}
{% if site.disabled != true and not site.official -%}
* [{% avatarlocalcache "twitter", site.author, site.author %}{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{% endif -%}
{% endfor -%}

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).