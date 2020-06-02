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

### Community Contributed

In random order. [Add your own](https://github.com/11ty/11ty-website/tree/master/_data/starters)!

{% for name, site in starters | shuffle -%}
{% if site.disabled != true and not site.official -%}
* [{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %} {% authorLink authors, site.author %}
{% endif -%}
{% endfor -%}
* [Add your own](https://github.com/11ty/11ty-website/tree/master/_data/starters)!

## Lists

* [{% avatarlocalcache "twitter", "stackbithq", "stackbithq" %}Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).