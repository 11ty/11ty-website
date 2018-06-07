---
subtitle: Quick Tips
menuSectionName: docs-quicktips
tags:
	- docs-getting-started
---
# Quick Tips

{% for tip in collections.quicktips %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}
