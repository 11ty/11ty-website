---
layout: layouts/main.njk
---

{% for page in collections.home %}
{{ page.templateContent | safe }}
{% endfor %}

## News

* 2018 March—<a href="https://www.zachleat.com/web/eleventy-google-award/">Eleventy wins Google Open Source Award </a>

## Tutorials

* [Getting Started Quick Guide](https://github.com/11ty/eleventy#getting-started) on GitHub
* <span class="elv-b">Making a Simple Web Site with the Simplest Static Site Generator</span>, on Medium:
	* [Level 1—Making Content with Data](https://medium.com/@11ty/making-a-simple-web-site-with-the-simplest-static-site-generator-level-1-7fc6febca1)
	* [Level 2—Adding Filters](https://medium.com/@11ty/making-a-simple-web-site-with-eleventy-level-2-1b356183377c)
* [Import your Disqus Comments into Eleventy](https://github.com/11ty/eleventy-import-disqus/blob/master/README.md) on GitHub

_See all [Eleventy blog posts](https://www.zachleat.com/web/eleventy/)._


## Sample Projects

{% for site in samples -%}
{% if site.disabled != true -%}
1. [{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{% endif -%}
{% endfor -%}
1. …for more examples, see the _Source Code_ links below. [Have a suggestion?](https://github.com/11ty/eleventy/issues/new?labels=sample-project)

## Sites Built with Eleventy

{% for site in eleventysites -%}
1. [{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}{% if site.source_url %} <a href="{{ site.source_url }}" class="minilink">Source Code</a>{% endif %}
{% endfor -%}
1. [Have a suggestion?](https://github.com/11ty/11ty.io/issues/new?title=I+built+a+site+with+Eleventy!)

## Versions

{% for version in versions -%}
* `{{ version.tag }}`—[Docs](https://github.com/11ty/eleventy/blob/{{ version.tag }}/README.md){% if version.ignore_release_notes !== true %} and [Release Notes](https://github.com/11ty/eleventy/releases/tag/{{ version.tag }}){% endif %}
{% endfor -%}
