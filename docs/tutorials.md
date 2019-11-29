---
eleventyNavigation:
  parent: Getting Started
  key: Tutorials
  order: 4
feedTitle: Quick Tips RSS Feed
feedUrl: /docs/quicktips/feed.xml
---

# Tutorials

_See all [Eleventy blog posts on zachleat.com](https://www.zachleat.com/web/eleventy/)._

### Making a Simple Web Site with the Simplest Static Site Generator

* [Level 1—Making Content with Data](https://www.zachleat.com/web/eleventy-tutorial-level-1/)
* [Level 2—Adding Filters](https://www.zachleat.com/web/eleventy-tutorial-level-2/)

### Introduction

* [**Turn Jekyll up to Eleventy**, a guide to converting a Jekyll site to use Eleventy](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) by {% avatarlocalcache "twitter", "paulrobertlloyd" %}Paul Robert Lloyd
* [Build your own Blog from Scratch using Eleventy](https://www.filamentgroup.com/lab/build-a-blog/) on the {% avatarlocalcache "twitter", "filamentgroup" %}Filament Group blog
* [A Site for Front-End Development Conferences (Built with 11ty on Netlify) ](https://css-tricks.com/a-site-for-front-end-development-conferences-built-with-11ty-on-netlify/) on {% avatarlocalcache "twitter", "css" %}CSS-Tricks
* [Video Series: Create an 11ty Theme from a free set of HTML templates](https://www.youtube.com/playlist?list=PLOSLUtJ_J3rrJ1R1qEf8CCEpV3GgbJGNr) by {% avatarlocalcache "twitter", "brob" %} Bryan Robinson
* [Creating A Blog With Eleventy](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/) by {% avatarlocalcache "twitter", "jon_keeping" %} Jon Keeping

### Put it on the web

* [Create a new site from git on Netlify](https://app.netlify.com/start)
* [Deploying an 11ty Site to GitHub Pages](https://snook.ca/archives/servers/deploying-11ty-to-gh-pages) by {% avatarlocalcache "twitter", "snookca" %}Jonathan Snook

### Adding Features

* [**Create Your Own Search** without a Third Party Service](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) by {% avatarlocalcache "twitter", "philhawksworth" %}Phil Hawksworth
* [Lightweight lazy loading with Netlify Large Media](https://lazy-load-nlm.netlify.com/) by {% avatarlocalcache "twitter", "philhawksworth" %}Phil Hawksworth
* [Multilingual sites with Eleventy](https://www.webstoemp.com/blog/multilingual-sites-eleventy/) (i18n, Internationalization) by {% avatarlocalcache "twitter", "jeromecoupe" %}Jérôme Coupé
* [Language switcher for multilingual JAMstack sites](https://www.webstoemp.com/blog/language-switcher-multilingual-jamstack-sites/) (i18n, Internationalization) by {% avatarlocalcache "twitter", "jeromecoupe" %}Jérôme Coupé

### Using Third Party Data

* Sample Project: [Import your **Notist** events to an Eleventy site](https://eleventy-notist-example.netlify.com/) by {% avatarlocalcache "twitter", "philhawksworth" %}Phil Hawksworth
* Sample Project: [Import your **Medium** posts to an Eleventy site](https://rss-jamstack.netlify.com/) by {% avatarlocalcache "twitter", "philhawksworth" %}Phil Hawksworth
* [Import your **Disqus Comments** into Eleventy](https://github.com/11ty/eleventy-import-disqus/blob/master/README.md) by {% avatarlocalcache "twitter", "zachleat" %}Zach Leatherman
* [Static Indieweb pt1: Syndicating Content](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/) by {% avatarlocalcache "twitter", "mxbck" %}Max Böck
* [Static Indieweb pt2: Using Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/) by {% avatarlocalcache "twitter", "mxbck" %}Max Böck
* [Using Eleventy to Generate a Ghost Blog](https://david.darn.es/tutorial/2019/06/01/use-eleventy-to-generate-a-ghost-blog/) by {% avatarlocalcache "twitter", "DavidDarnes" %}David Darnes
* [Consuming a headless CMS GraphQL API with Eleventy](https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/) by {% avatarlocalcache "twitter", "jeromecoupe" %}Jérôme Coupé
* [Import Tweets from Twitter API](https://www.d-hagemeier.com/en/articles/embed-twitter/) by {% avatarlocalcache "twitter", "DennisView" %}Dennis Hagemeier

### Tooling Integration

* [Using pHTML with Eleventy](https://github.com/phtmlorg/phtml-11ty) by {% avatarlocalcache "twitter", "jon_neal" %}Jon Neal

## Quick Tips

{% for tip in collections.quicktipssorted %}
* Quick Tip <a href="{{ tip.url }}"><code>#{{ tip.data.tipindex }}</code>—{{ tip.data.tiptitle }}</a>
{%- endfor %}

📢 [Subscribe to the **Eleventy Quick Tips RSS Feed**](/docs/quicktips/feed.xml)
