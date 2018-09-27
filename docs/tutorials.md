---
subtitle: Tutorials
menuSectionName: docs-tutorials
tags:
    - docs-getting-started
feedTitle: Quick Tips RSS Feed
feedUrl: /docs/quicktips/feed.xml
---
# Tutorials

_See all [Eleventy blog posts on zachleat.com](https://www.zachleat.com/web/eleventy/)._

## Making a Simple Web Site with the Simplest Static Site Generator

* [Level 1—Making Content with Data](https://www.zachleat.com/web/eleventy-tutorial-level-1/)
* [Level 2—Adding Filters](https://www.zachleat.com/web/eleventy-tutorial-level-2/)

## Quick Tips

{% for tip in collections.quicktipssorted %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)

## Third Party Integration

* [Import your Disqus Comments into Eleventy](https://github.com/11ty/eleventy-import-disqus/blob/master/README.md) on GitHub
