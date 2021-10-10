---
title: Eleventy Blog
layout: layouts/docs.njk
eleventyComputed:
  social:
    description: "An Eleventy blog post published on {{ page.date | newsDate('LLLL yyyy') }}."
---
# {{ newstitle }}

<div class="lo lo-inline lo-separator-h" style="--lo-margin-h: 1.5em; --lo-margin-v: .5em">
  <div class="lo-c lo-nocontentwrap">
    <em>{{ page.date | newsDate }}</em>
  </div>
  <div class="lo-c lo-nocontentwrap">
    {% emoji "📢" %} <a href="/blog/feed.xml">Subscribe to the Eleventy News Feed</a>
  </div>
</div>

{{ content | safe }}


---

### Read more blog posts:

{% set previousPost = collections.blog | getPreviousCollectionItem(page) %}
{% set nextPost = collections.blog | getNextCollectionItem(page) %}

{% if nextPost %}* <a href="{{ nextPost.url }}">Next: {{ nextPost.data.newstitle }}</a>{% endif %}
{% if previousPost %}* <a href="{{ previousPost.url }}">Previous: {{ previousPost.data.newstitle }}</a>{% endif %}
