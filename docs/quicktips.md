---
eleventyNavigation:
  parent: Getting Started
  key: Quick Tips
  order: 5
---
## Quick Tips

{% for tip in collections.quicktipssorted %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)
