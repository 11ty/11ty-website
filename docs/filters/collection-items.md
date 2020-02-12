---
eleventyNavigation:
  parent: Filters
  key: Next or Previous Collection Item Filters
  order: 4
  excerpt: 'Get next or previous collection items for easy linking.'
---
# `getNextCollectionItem` and `getPreviousCollectionItem` Universal Filters

{% addedin "0.11.0" %} Fetch the previous and next items in a collection when you pass in the current `page` object.

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```
{{ set previousPost = collections.posts | getPreviousCollectionItem(page) }}
{{ set nextPost = collections.posts | getNextCollectionItem(page) }}
```
{% endraw %}

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```
{% assign previousPost = collections.posts | getPreviousCollectionItem: page %}
{% assign nextPost = collections.posts | getNextCollectionItem: page %}
```
{% endraw %}

Useful when you’d like to link to the previous or next template in your collection:

{% raw %}
```
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
```
{% endraw %}

{% raw %}
```
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
```
{% endraw %}

* [← Back to Filters documentation.](/docs/filters/)