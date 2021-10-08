---
layout: layouts/docs.njk
eleventyComputed:
  title: "{{ newstitle }}"
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