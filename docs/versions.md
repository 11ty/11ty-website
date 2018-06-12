---
subtitle: Release History
tags:
  - docs
---
# {{ subtitle }}

{% for version in versions -%}
* `{{ version.tag }}`—[Docs]({% if version.docs_url %}{{ version.docs_url }}{% else %}https://github.com/11ty/eleventy/blob/{{ version.tag }}/README.md{% endif %}){% if version.ignore_release_notes !== true %} and [Release Notes](https://github.com/11ty/eleventy/releases/tag/{{ version.tag }}){% endif %}
{% endfor -%}
