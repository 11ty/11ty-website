---
eleventyNavigation:
  parent: Filters
  key: Next or Previous Collection Item Filters
  title: '<code>get*CollectionItem</code> Filters'
  order: 4
  excerpt: 'Get next or previous collection items for easy linking.'
---
# Get Next or Previous Collection Item Universal Filters

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
```liquid
{% assign previousPost = collections.posts | getPreviousCollectionItem: page %}
{% assign nextPost = collections.posts | getNextCollectionItem: page %}
```
{% endraw %}

Useful when you’d like to link to the previous or next template in your collection:

{% codetitle "Nunjucks, Liquid", "Syntax" %}

{% raw %}
```html
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
```
{% endraw %}

{% codetitle "Nunjucks, Liquid", "Syntax" %}

{% raw %}
```html
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
```
{% endraw %}

## Also `getCollectionItem`

For completeness, a `getCollectionItem` filter is also included that fetches the current page from a collection.

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```
{{ set currentPost = collections.posts | getCollectionItem(page) }}
```
{% endraw %}

* [← Back to Filters documentation.](/docs/filters/)