---
eleventyNavigation:
  key: RSS
  order: 1
  excerpt: Generate an Atom feed to allow others to subscribe to your content using a feed reader.
---
# RSS Plugin

A pack of plugins for generating an RSS feed (actually an Atom feed, but who’s counting) using the Nunjucks templating engine.

* [GitHub](https://github.com/11ty/eleventy-plugin-rss).

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

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

### Options {% addedin "RSS 1.1.0" %}

Advanced control of [PostHTML rendering options](https://github.com/posthtml/posthtml-render#options) via `posthtmlRenderOptions`.

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
  });
};
```

## Supplies the following Nunjucks Filters

* `getNewestCollectionItemDate`: Gets the most recently updated content in the collection. Use with `dateToRfc3339` to properly format the Date for the top-level `<updated>` element. {% addedin "RSS 1.1.0" %}
* `dateToRfc3339`: format a Date to be used for individual `<entry><updated>` elements. {% addedin "RSS 1.1.0" %}
* `absoluteUrl`: converts a single URL (relative or absolute path) to a full absolute URL including protocol, domain, full path.
* `htmlToAbsoluteUrls`: (async) transforms all of the URLs in a block of HTML with `absoluteUrl` above. Uses [posthtml-urls](https://github.com/posthtml/posthtml-urls) with `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/posthtml/posthtml-urls/blob/307c91342a211b3f9fb22bc57264bbb31f235fbb/lib/defaultOptions.js).

### Use with other template languages {% addedin "RSS 1.1.0" %}

This plugin exports `dateToRfc3339`, `getNewestCollectionItemDate`, `absoluteUrl`, and `convertHtmlToAbsoluteUrls` functions so you can use with your own filters. For example:

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateRfc3339);
};
```

### Deprecated Filters

* `rssLastUpdatedDate`, poorly named (works with Atom and JSON feeds, not RSS). Use `getNewestCollectionItemDate | dateToRfc3339` instead.
* `rssDate`, poorly named (works with Atom and JSON feeds, not RSS). Use `dateToRfc3339` instead.

## Sample Atom Feed template

Copy and paste this template and modify the JSON metadata to match your feed’s needs. Make sure `collections.posts` matches the template collection you want to provide a feed for.

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
  <updated>{{ collections.posts | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
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
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
  </entry>
  {%- endfor %}
</feed>
```
{% endraw %}

Place the file anywhere in your project (give it a `.njk` extension) and it will be transformed into a `feed.xml` file at the root of your website when Eleventy builds it. It can then be useful to check the file against a feed validator, such as the [W3C Feed Validation Service](https://validator.w3.org/feed/) to make sure that the output was good.

Ultimately your feed will be available at `https://yourwebsite.com/feed.xml`.


## Related Plugins:

* [`eleventy-xml-plugin`](https://www.npmjs.com/package/eleventy-xml-plugin) for Liquid.
