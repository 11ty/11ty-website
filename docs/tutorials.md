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

Not sure where to start? Start by reading these:

* [Level 1—Making Content with Data](https://www.zachleat.com/web/eleventy-tutorial-level-1/)
* [Level 2—Adding Filters](https://www.zachleat.com/web/eleventy-tutorial-level-2/)

## Using Jekyll?

* [**Turn Jekyll up to Eleventy**, a guide to converting a Jekyll site to use Eleventy](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) by {% avatar "paulrobertlloyd" %}Paul Robert Lloyd

## Quick Tips

{% for tip in collections.quicktipssorted %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)

## How To’s

* [**Create Your Own Search** without a Third Party Service](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) by {% avatar "philhawksworth" %}Phil Hawksworth
* Sample Project: [Import your **Notist** events to an Eleventy site](https://eleventy-notist-example.netlify.com/) by {% avatar "philhawksworth" %}Phil Hawksworth
* Sample Project: [Import your **Medium** posts to an Eleventy site](https://rss-jamstack.netlify.com/) by {% avatar "philhawksworth" %}Phil Hawksworth
* [Import your **Disqus Comments** into Eleventy](https://github.com/11ty/eleventy-import-disqus/blob/master/README.md) by {% avatar "zachleat" %}Zach Leatherman