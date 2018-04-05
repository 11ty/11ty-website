---
layout: layouts/main.njk
---

<h2 class="news">🚨 <a href="https://www.zachleat.com/web/eleventy-google-award/">Eleventy wins Google Open Source Award </a> 🚨</h2>

## Documentation

* [Usage and Documentation](https://github.com/11ty/eleventy/blob/master/README.md) on GitHub

## Sample Projects

* [eleventy-base-blog, a Blog](https://github.com/11ty/eleventy-base-blog) on GitHub

## Tutorials

* [Getting Started Quick Guide](https://github.com/11ty/eleventy#getting-started) on GitHub
* <span class="elv-b">Making a Simple Web Site with the Simplest Static Site Generator</span>, on Medium:
	* [Level 1—Making Content with Data](https://medium.com/@11ty/making-a-simple-web-site-with-the-simplest-static-site-generator-level-1-7fc6febca1)
	* [Level 2—Adding Filters](https://medium.com/@11ty/making-a-simple-web-site-with-eleventy-level-2-1b356183377c)

## Sites Built with Eleventy

{% for site in eleventysites -%}
* [{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{% endfor -%}
* [_Have another to add?_](https://github.com/11ty/11ty.io/issues/new?title=I+built+a+site+with+Eleventy!)