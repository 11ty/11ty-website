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

### Making a Simple Web Site with the Simplest Static Site Generator 

* [Level 1—Making Content with Data](https://www.zachleat.com/web/eleventy-tutorial-level-1/)
* [Level 2—Adding Filters](https://www.zachleat.com/web/eleventy-tutorial-level-2/)

### Introduction

* [**Turn Jekyll up to Eleventy**, a guide to converting a Jekyll site to use Eleventy](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) by {% avatar "paulrobertlloyd" %}Paul Robert Lloyd
* [Build your own Blog from Scratch using Eleventy](https://www.filamentgroup.com/lab/build-a-blog/) on the {% avatar "filamentgroup" %}Filament Group blog
* [A Site for Front-End Development Conferences (Built with 11ty on Netlify) ](https://css-tricks.com/a-site-for-front-end-development-conferences-built-with-11ty-on-netlify/) on {% avatar "css" %}CSS-Tricks

### Put it on the web

* [Create a new site from git on Netlify](https://app.netlify.com/start)
* [Deploying an 11ty Site to GitHub Pages](https://snook.ca/archives/servers/deploying-11ty-to-gh-pages) by {% avatar "snookca" %}Jonathan Snook

### Adding Features

* [**Create Your Own Search** without a Third Party Service](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) by {% avatar "philhawksworth" %}Phil Hawksworth
* [Lightweight lazy loading with Netlify Large Media](https://lazy-load-nlm.netlify.com/) by {% avatar "philhawksworth" %}Phil Hawksworth
* [Multilingual sites with Eleventy](https://www.webstoemp.com/blog/multilingual-sites-eleventy/) (i18n, Internationalization) by <!-- {% avatar "jeromecoupe" %} -->jérôme coupé

### Using Third Party Data

* Sample Project: [Import your **Notist** events to an Eleventy site](https://eleventy-notist-example.netlify.com/) by {% avatar "philhawksworth" %}Phil Hawksworth
* Sample Project: [Import your **Medium** posts to an Eleventy site](https://rss-jamstack.netlify.com/) by {% avatar "philhawksworth" %}Phil Hawksworth
* [Import your **Disqus Comments** into Eleventy](https://github.com/11ty/eleventy-import-disqus/blob/master/README.md) by {% avatar "zachleat" %}Zach Leatherman
* [Static Indieweb pt1: Syndicating Content](https://mxb.at/blog/syndicating-content-to-twitter-with-netlify-functions/) by {% avatar "mxbck" %}Max Böck
* [Static Indieweb pt2: Using Webmentions](https://mxb.at/blog/using-webmentions-on-static-sites/) by {% avatar "mxbck" %}Max Böck
* [Using Eleventy to Generate a Ghost Blog](https://david.darn.es/tutorial/2019/06/01/use-eleventy-to-generate-a-ghost-blog/) by <!-- {% avatar "DavidDarnes" %} -->David Darnes

### Tooling Integration

* [Using pHTML with Eleventy](https://github.com/phtmlorg/phtml-11ty) by <!-- {% avatar "jon_neal" %} -->Jon Neal

## Quick Tips

{% for tip in collections.quicktipssorted %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)
