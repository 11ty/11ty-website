---
layout: layouts/main.njk
---

{% for page in collections.home %}
{{ page.templateContent | safe }}
{% endfor %}

{% set latestversion %}{{ pkg.devDependencies["@11ty/eleventy"] | version }}{% endset -%}
## [Documentation v{{ latestversion }}]({{ "/docs/" | url }})

## News

* 2018 March—<a href="https://www.zachleat.com/web/eleventy-google-award/">Eleventy wins Google Open Source Award</a>

