---
title: Eleventy Blog
eleventyNavigation:
  key: Eleventy Blog
  order: 9.1
excludeFromSidebar: false
layout: "layouts/docs.njk"
permalink: "/blog/"
override:tags:
---
# Blog

📢 [Subscribe to the **Eleventy News Feed**](/blog/feed.xml)

You can find a bunch of other [blog posts about Eleventy on Zach’s blog](https://www.zachleat.com/web/eleventy/).

{%- for news in collections.blog | reverse %}
* [{{ news.data.newstitle }}]({{ news.data.page.url }}) <small><em>on {{ news.date | newsDate }}</em></small>
{%- endfor %}
* [Eleventy wins second Google Open Source Award](https://opensource.googleblog.com/2019/04/google-open-source-peer-bonus-winners.html) <small><em> on 2019 April 26</em></small>
* [CERN 2019 WorldWideWeb Rebuild](https://twitter.com/eleven_ty/status/1106589569238085637) site rebuilt using Eleventy! <small><em> on 2019 March</em></small>
* [Turn Jekyll up to Eleventy—a lovely tutorial by {% avatarlocalcache "twitter", "paulrobertlloyd" %}Paul Robert Lloyd](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) <small><em> on 2018 December 11</em></small>
* [Happy First Birthday, Eleventy! 🎉](https://www.zachleat.com/web/eleventy-birthday/) <small><em> on 2018 November 26</em></small>
* [Google’s {% avatarlocalcache "twitter", "v8js" %}V8 web site launches using Eleventy](https://twitter.com/v8js/status/1044202940494475265) <small><em> on 2018 September</em></small>
* James Williamson delivers [Eleventy’s mascot](https://twitter.com/jameswillweb/status/999052022497316865), named [Edison the Static-Generating Possum](https://twitter.com/jameswillweb/status/1131956888332058624). <small><em>on 2018 May 23</em></small>
* [Eleventy wins Google Open Source Award](https://www.zachleat.com/web/google-award/) <small><em> on 2018 March</em></small>
* [Introducing Eleventy, a new Static Site Generator](https://www.zachleat.com/web/introducing-eleventy/) <small><em> on 2018 February 12</em></small>
* [Eleventy’s very first (and second and third) release](https://github.com/11ty/eleventy/releases?after=v0.1.3) <small><em> on 2017 December 20</em></small>
* Eleventy’s [first commit](https://github.com/11ty/eleventy/commit/00ad9192605d5d501de6aae193701c5a2297ef2c) makes the auspicious claim: “It’s doing what it’s supposed to do” <small><em> on 2017 November 26</em></small>