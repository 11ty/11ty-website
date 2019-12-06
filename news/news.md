---
eleventyNavigation:
  key: News
  order: 9
layout: "layouts/docs.njk"
permalink: "/news/"
override:tags:
---
# News

📢 [Subscribe to the **Eleventy News Feed**](/news/feed.xml)

{%- for news in collections.news %}
* {{ news.date | newsDate }}—[{{ news.data.newstitle }}]({{ news.data.page.url }})
{%- endfor %}
* 2019 April 26—[Eleventy wins second Google Open Source Award](https://opensource.googleblog.com/2019/04/google-open-source-peer-bonus-winners.html)
* 2019 March—[CERN 2019 WorldWideWeb Rebuild](https://twitter.com/eleven_ty/status/1106589569238085637) site rebuilt using Eleventy!
* 2018 December—[Turn Jekyll up to Eleventy—a lovely tutorial by {% avatarlocalcache "twitter", "paulrobertlloyd" %}Paul Robert Lloyd](https://24ways.org/2018/turn-jekyll-up-to-eleventy/)
* 2018 November—[Happy First Birthday, Eleventy! 🎉](https://www.zachleat.com/web/eleventy-birthday/)
* 2018 September—[Google’s {% avatarlocalcache "twitter", "v8js" %}V8 web site launches using Eleventy](https://twitter.com/v8js/status/1044202940494475265)
* 2018 May 23—{% avatarlocalcache "twitter", "jameswillweb" %}James Williamson delivers [Eleventy’s mascot](https://twitter.com/jameswillweb/status/999052022497316865), named [Edison the Static-Generating Possum](https://twitter.com/jameswillweb/status/1131956888332058624).
* 2018 March—[Eleventy wins Google Open Source Award](https://www.zachleat.com/web/eleventy-google-award/)
* 2018 February—[Introducing Eleventy, a new Static Site Generator](https://www.zachleat.com/web/introducing-eleventy/)
* 2017 December 20—[Eleventy’s very first (and second and third) release](https://github.com/11ty/eleventy/releases?after=v0.1.3)