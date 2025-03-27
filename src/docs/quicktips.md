---
eleventyNavigation:
  key: Quick Tips
  parent: Tutorials
  excerpt: A selection of common use cases.
communityLinksKey: quicktips
eleventyImport:
  collections: ["quicktips"]
---

# Quick Tips

{%- for tip in collections.quicktips %}
- <a href="{{ tip.url }}">{{ tip.data.title }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)
