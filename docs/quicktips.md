---
subtitle: Quick Tips
menuSectionName: docs-quicktips
tags:
	- docs-getting-started
feedTitle: Quick Tips RSS Feed
feedUrl: /docs/quicktips/feed.xml
---
# Quick Tips

{% for tip in collections.quicktips %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)