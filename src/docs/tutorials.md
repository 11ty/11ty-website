---
eleventyNavigation:
  parent: Getting Started
  key: Tutorials
  order: 1.5
feedTitle: Quick Tips RSS Feed
feedUrl: /docs/quicktips/feed.xml
---

# Tutorials

_See all [Eleventy blog posts on zachleat.com](https://www.zachleat.com/web/eleventy/)._

### Series: Making a Simple Web Site with the Simplest Static Site Generator

<div class="sites-vert sites-vert--lg">
  <div class="lo-grid">
{%- for key, entry in community %}{%- if entry.key == "tutorial-simplewebsite" -%}
  {%- set site = entry | convertCommunityLinkToSiteCard %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{% for key, site in demos -%}{% if site.category.includes("tutorial-simplewebsite") -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
  </div>
</div>


### Introduction

<div class="sites-vert sites-vert--lg">
  <div class="lo-grid">
{%- for key, entry in community %}{%- if entry.key == "getting-started" or entry.key == "tutorial-intro" -%}
  {%- set site = entry | convertCommunityLinkToSiteCard %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{% for key, site in demos -%}{% if site.category.includes("getting-started") or site.category.includes("tutorial-intro") -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
  </div>
</div>

### Build a Blog

<div class="sites-vert sites-vert--lg">
  <div class="lo-grid">
{% for key, site in starters -%}{% if site.name === "eleventy-base-blog" -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
{%- for key, entry in community %}{%- if entry.key == "tutorial-blog" -%}
  {%- set site = entry | convertCommunityLinkToSiteCard %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{% for key, site in demos -%}{% if site.category.includes("tutorial-blog") -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
  </div>
</div>

### Put it on the web

* Put your new site on the web! [Read more about Deployment](/docs/deployment/)

### Adding Features

* [**Create Your Own Search** without a Third Party Service](https://www.hawksworx.com/blog/adding-search-to-a-jamstack-site/) by {% communityavatar "philhawksworth" %}Phil Hawksworth
* [Lightweight lazy loading with Netlify Large Media](https://lazy-load-nlm.netlify.com/) by {% communityavatar "philhawksworth" %}Phil Hawksworth
* [Multilingual sites with Eleventy](https://www.webstoemp.com/blog/multilingual-sites-eleventy/) (i18n, Internationalization) by {% avatarlocalcache "twitter", "jeromecoupe" %}Jérôme Coupé
* [Language switcher for multilingual JAMstack sites](https://www.webstoemp.com/blog/language-switcher-multilingual-jamstack-sites/) (i18n, Internationalization) by {% avatarlocalcache "twitter", "jeromecoupe" %}Jérôme Coupé
* [Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify) by {% communityavatar "cfjedimaster" %}Raymond Camden. (Also see [part two](https://www.raymondcamden.com/2020/07/01/adding-algolia-search-to-eleventy-and-netlify-part-two))
* [Eleventy and Cloudinary images](https://sia.codes/posts/eleventy-and-cloudinary-images/) (Setting up responsive images in Eleventy using Cloudinary) by {% avatarlocalcache "twitter", "TheGreenGreek" %} Sia Karamalegos
* [Supporting Multiple Authors in an Eleventy Blog](https://www.raymondcamden.com/2020/08/24/supporting-multiple-authors-in-an-eleventy-blog) by  {% communityavatar "cfjedimaster" %}Raymond Camden. (Also see [part two](https://www.raymondcamden.com/2021/09/19/supporting-multiple-authors-in-an-eleventy-blog-follow-up))
* [Accessing Eleventy Data on the Client Side](https://www.raymondcamden.com/2021/01/18/accessing-eleventy-data-on-the-client-side) by  {% communityavatar "cfjedimaster" %}Raymond Camden
* [Adding an Email Subscription to Your Jamstack Site](https://www.raymondcamden.com/2021/05/01/adding-an-email-subscription-to-your-jamstack-site) by  {% communityavatar "cfjedimaster" %}Raymond Camden
* [Dynamic Short URLs with Eleventy](https://www.raymondcamden.com/2021/06/22/dynamic-short-urls-with-eleventy) by  {% communityavatar "cfjedimaster" %}Raymond Camden

### Using Third Party Data

* Sample Project: [Import your **Notist** events to an Eleventy site](https://eleventy-notist-example.netlify.app/) by {% communityavatar "philhawksworth" %}Phil Hawksworth
* Sample Project: [Import your **Medium** posts to an Eleventy site](https://rss-jamstack.netlify.app/) by {% communityavatar "philhawksworth" %}Phil Hawksworth
* [Import your **Disqus Comments** into Eleventy](https://github.com/11ty/eleventy-import-disqus/blob/master/README.md) by {% communityavatar "zachleat" %}Zach Leatherman
* [Static Indieweb pt1: Syndicating Content](https://mxb.dev/blog/syndicating-content-to-twitter-with-netlify-functions/) by {% avatarlocalcache "twitter", "mxbck" %}Max Böck
* [Static Indieweb pt2: Using Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/) by {% avatarlocalcache "twitter", "mxbck" %}Max Böck
* [An In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/) by {% avatarlocalcache "twitter", "TheGreenGreek" %} Sia Karamalegos
* [Using Eleventy to Generate a Ghost Blog](https://david.darn.es/tutorial/2019/06/01/use-eleventy-to-generate-a-ghost-blog/) by {% avatarlocalcache "twitter", "DavidDarnes" %}David Darnes
* [Consuming a headless CMS GraphQL API with Eleventy](https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/) by {% avatarlocalcache "twitter", "jeromecoupe" %}Jérôme Coupé
* [Import Tweets from Twitter API](https://www.d-hagemeier.com/en/import-tweets-from-twitter-api-in-11ty/) by {% avatarlocalcache "twitter", "DennisView" %}Dennis Hagemeier
* [Convert a WordPress blog to Eleventy](https://www.joshcanhelp.com/taking-wordpress-to-eleventy/) by {% avatarlocalcache "twitter", "joshcanhelp" %}Josh Cunningham
* [Integrating Contentful with Eleventy to create static sites](https://www.contentful.com/blog/2020/07/28/integrating-contentful-with-eleventy-create-static-sites/) by {% avatarlocalcache "twitter", "shyruparel" %}Shy Ruparel
* [Creating an 11ty Photo Gallery with Contentful and GitHub actions](https://github.com/contentful/11ty-contentful-gallery) by {% avatarlocalcache "twitter", "shyruparel" %}Shy Ruparel
* [Adding Google Calendar to your JAMStack](https://www.raymondcamden.com/2019/11/18/adding-google-calendar-to-your-jamstack) by  {% communityavatar "cfjedimaster" %}Raymond Camden
* [Integrating Google Analytics with Eleventy](https://www.raymondcamden.com/2020/05/21/integrating-google-analytics-with-eleventy) by  {% communityavatar "cfjedimaster" %}Raymond Camden
* [Hooking Up FaunaDB to Eleventy](https://www.raymondcamden.com/2020/09/15/hooking-up-faunadb-to-eleventy) by {% communityavatar "cfjedimaster" %}Raymond Camden
* [Building a Database Driven Eleventy Site](https://www.raymondcamden.com/2021/04/15/building-a-database-driven-eleventy-site) by {% communityavatar "cfjedimaster" %}Raymond Camden
* [Integrating Eleventy with GitHub Flat Data](https://www.raymondcamden.com/2021/07/14/integrating-eleventy-with-github-flat-data) by {% communityavatar "cfjedimaster" %}Raymond Camden

### Tooling Integration

* [Using pHTML with Eleventy](https://github.com/phtmlorg/phtml-11ty) by {% avatarlocalcache "twitter", "jon_neal" %}Jon Neal
