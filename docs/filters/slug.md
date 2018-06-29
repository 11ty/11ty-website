---
subtitle: slug Universal Filter
menuSectionName: docs-filters
tags:
	- docs-filters
---

# `slug` Universal Filter

Uses the [`slugify` npm package](https://www.npmjs.com/package/slugify) to convert a string into a URL slug. Can be used in pagination or permalinks.

{% raw %}
```
{{ "My Title" | slug }} -> `my-title`
```
{% endraw %}

* [← Back to Filters documentation.](/docs/filters/)