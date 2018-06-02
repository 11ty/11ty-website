---
subtitle: Release History
tags:
  - docs
---
## {{ subtitle }}

{% for version in versions -%}
* `{{ version.tag }}`—[Docs](https://github.com/11ty/eleventy/blob/{{ version.tag }}/README.md){% if version.ignore_release_notes !== true %} and [Release Notes](https://github.com/11ty/eleventy/releases/tag/{{ version.tag }}){% endif %}
{% endfor -%}
