---
eleventyNavigation:
  key: RSS
  excerpt: Generate an Atom feed to allow others to subscribe to your content using a feed reader.
---
# RSS Plugin

A pack of plugins for generating an RSS feed (actually an Atom feed, but who’s counting) using the Nunjucks templating engine.

## Template Compatibility

* Nunjucks

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-rss).

```
npm install @11ty/eleventy-plugin-rss --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
};
```

## Supplies the following Nunjucks Filters

* `rssLastUpdatedDate`: Gets the most recently updated content in the collection and retrieves the properly formatted Date for the top-level `<updated>` element.
* `rssDate`: format a Date to be used for individual `<entry><updated>` elements.
* `absoluteUrl`: converts a single URL (relative or absolute path) to a full absolute URL including protocol, domain, full path.
* `htmlToAbsoluteUrls`: transforms all of the URLs in a block of HTML with `absoluteUrl` above. Uses [posthtml-urls](https://github.com/posthtml/posthtml-urls) with `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/posthtml/posthtml-urls/blob/307c91342a211b3f9fb22bc57264bbb31f235fbb/lib/defaultOptions.js).

## Sample Atom Feed template

Copy and paste this template and modify the YAML metadata to match your feed’s needs. Make sure `collections.posts` matches the template collection you want to provide a feed for.

{% raw %}
```html
---json
{
  "permalink": "feed.xml",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "My Blog about Boats",
    "subtitle": "I am writing about my experiences as a naval navel-gazer.",
    "url": "https://example.com/",
    "feedUrl": "https://example.com/feed.xml",
    "author": {
      "name": "Boaty McBoatFace",
      "email": "me@example.com"
    }
  }
}
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ metadata.title }}</title>
  <subtitle>{{ metadata.subtitle }}</subtitle>
  <link href="{{ metadata.feedUrl }}" rel="self"/>
  <link href="{{ metadata.url }}"/>
  <updated>{{ collections.posts | rssLastUpdatedDate }}</updated>
  <id>{{ metadata.url }}</id>
  <author>
    <name>{{ metadata.author.name }}</name>
    <email>{{ metadata.author.email }}</email>
  </author>
  {%- for post in collections.posts %}
  {% set absolutePostUrl %}{{ post.url | url | absoluteUrl(metadata.url) }}{% endset %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | rssDate }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
  </entry>
  {%- endfor %}
</feed>
```
{% endraw %}
