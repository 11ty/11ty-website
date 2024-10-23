---
eleventyNavigation:
  parent: Getting Started
  key: Migrating to Eleventy
  order: 3
---

# {{ eleventyNavigation.key }}

## Guides

<ul class="list-bare">
{%- for post in collections.migrations %}
	<li><a href="{{ post.url }}">{% if post.data.iconUrl %}{% indieavatar post.data.iconUrl %}{% endif %}{{ post.data.title }}</a></li>
{%- endfor %}
</ul>
