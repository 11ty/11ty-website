---
eleventyNavigation:
  key: Release History
  order: 9.2
---
# Release History

You can also browse the latest releases [on npm](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions) or [on GitHub](https://github.com/11ty/eleventy/releases).

{%- for version in versions %}
- `{{ version.tag }}`{% if version.channel %} on the `@{{ version.channel }}` channel{% endif %}—[Docs]({% if version.docs_url %}{{ version.docs_url }}{% else %}https://github.com/11ty/eleventy/blob/{{ version.tag }}/README.md{% endif %}){% if version.ignore_release_notes !== true %} and [Release Notes](https://github.com/11ty/eleventy/releases/tag/{{ version.tag }}){% endif %}
{%- endfor -%}