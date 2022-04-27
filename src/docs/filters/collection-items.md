---
eleventyNavigation:
  parent: Filters
  key: Next or Previous Collection Item Filters
  title: '<code>get*CollectionItem</code>'
  order: 4
  excerpt: 'Get next or previous collection items for easy linking.'
---
# Get Next or Previous Collection Item Universal Filters

{% addedin "0.11.0" %} Fetch the previous and next items in a collection when you pass in the current `page` object.


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View this example in:
    <a href="#nextprev-liquid" role="tab">Liquid</a>
    <a href="#nextprev-njk" role="tab">Nunjucks</a>
    <a href="#nextprev-js" role="tab">11ty.js</a>
  </div>
  <div id="nextprev-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```liquid
{% assign previousPost = collections.posts | getPreviousCollectionItem: page %}
{% assign nextPost = collections.posts | getNextCollectionItem: page %}
```
{% endraw %}

  </div>
  <div id="nextprev-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```jinja2
{% set previousPost = collections.posts | getPreviousCollectionItem(page) %}
{% set nextPost = collections.posts | getNextCollectionItem(page) %}
```
{% endraw %}

  </div>
  <div id="nextprev-js" role="tabpanel">
    <p><em>This example has not yet been added. Do you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>

Useful when you’d like to link to the previous or next template in your collection:


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View this example in:
    <a href="#nextprevlink-liquid" role="tab">Liquid</a>
    <a href="#nextprevlink-njk" role="tab">Nunjucks</a>
    <a href="#nextprevlink-js" role="tab">11ty.js</a>
  </div>
  <div id="nextprevlink-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```liquid
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
```
{% endraw %}

  </div>
  <div id="nextprevlink-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```jinja2
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
```
{% endraw %}

  </div>
  <div id="nextprevlink-js" role="tabpanel">
    <p><em>This example has not yet been added. Do you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>

The [Collections documentation](/docs/collections/#sorting) outlines the default sorting algorithm and how to override it.

## Also `getCollectionItem`

For completeness, a `getCollectionItem` filter is also included that fetches the current page from a collection.


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View this example in:
    <a href="#getitem-liquid" role="tab">Liquid</a>
    <a href="#getitem-njk" role="tab">Nunjucks</a>
    <a href="#getitem-js" role="tab">11ty.js</a>
  </div>
  <div id="getitem-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```liquid
{% assign currentPost = collections.posts | getCollectionItem: page %}
```
{% endraw %}

  </div>
  <div id="getitem-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```jinja2
{% set currentPost = collections.posts | getCollectionItem(page) %}
```
{% endraw %}

  </div>
  <div id="getitem-js" role="tabpanel">
    <p><em>This example has not yet been added. Do you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>


* [← Back to Filters documentation.](/docs/filters/)
