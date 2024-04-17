---
eleventyNavigation:
  key: Quick Tips
  parent: Working with Templates
  order: 0.9
  excerpt: A selection of common use cases.
communityLinksKey: quicktips
eleventyImport:
  collections: ["quicktips"]
---

# Quick Tips

{%- for tip in collections.quicktips | sortByQuickTipsIndex %}
- Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)
