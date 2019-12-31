---
eleventyNavigation:
  parent: News
  key: Release History
---
# Release History

{% for version in versions -%}
* {% if version.prerelease %}_PRE-RELEASE:_ {% endif %}`{{ version.tag }}`—[Docs]({% if version.docs_url %}{{ version.docs_url }}{% else %}https://github.com/11ty/eleventy/blob/{{ version.tag }}/README.md{% endif %}){% if version.prerelease !== true and version.ignore_release_notes !== true %} and [Release Notes](https://github.com/11ty/eleventy/releases/tag/{{ version.tag }}){% endif %}
{% endfor -%}
