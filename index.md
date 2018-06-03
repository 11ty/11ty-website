---
layout: layouts/main.njk
---

{% for page in collections.home %}
{{ page.templateContent | safe }}
{% endfor %}

## News

* 2018 March—<a href="https://www.zachleat.com/web/eleventy-google-award/">Eleventy wins Google Open Source Award</a>

