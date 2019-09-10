---
subtitle: Working with Templates
menuSectionName: docs-templates
submenuSortOrder:
  - layouts
  - collections
  - pagination
  - dates
  - permalinks
  - pitfalls
tags: docs
---
# {{ subtitle }}

{% for section in collections["docs-templates"] | sortMenu(submenuSortOrder) -%}
* [{{ section.data.subtitle }}]({{ section.data.page.url }}){% if section.data.excerpt %}: {{ section.data.excerpt }}{% endif %}
{% endfor %}