---
eleventyNavigation:
  key: Quick Tips
  order: 3
communityLinksKey: quicktips
eleventyImport:
  collections: ["quicktips"]
---

# Quick Tips

{% for tip in collections.quicktips | sortByQuickTipsIndex %}

- Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
  {%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)
