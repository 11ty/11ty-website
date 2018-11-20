---
subtitle: Pagination
excerpt: Iterate over a data set and create multiple files from a single template.
tags:
  - docs-templates
relatedKey: pagination
---
# Pagination

To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template’s front matter by adding the `pagination` key. Consider this Nunjucks template:

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 2
testdata:
 - item1
 - item2
 - item3
 - item4
---
<ol>
{%- for item in pagination.items %}
  <li>{{ item }}</li>
{% endfor -%}
</ol>
```
{% endraw %}

We enable pagination and then give it a dataset with the `data` key. We control the number of items in each chunk with `size`. The pagination data variable will be populated with what you need to create each template. Here’s what’s in `pagination`:

```js
{
  items: [], // current page’s chunk of data
  pageNumber: 0, // current page number, 0 indexed

  // Cool URLs, added in v0.6.0
  nextPageHref: "…", // put inside <a href="{{ pagination.nextPageHref }}">Next Page</a>
  previousPageHref: "…", // put inside <a href="{{ pagination.previousPageHref }}">Previous Page</a>
  firstPageHref: "…",
  lastPageHref: "…", 
  hrefs: [], // all page hrefs (in order)

  // Uncool URLs (these include index.html file names)
  nextPageLink: "…", // put inside <a href="{{ pagination.nextPageLink }}">Next Page</a>
  previousPageLink: "…", // put inside <a href="{{ pagination.previousPageLink }}">Previous Page</a>
  firstPageLink: "…", // added in v0.6.0
  lastPageLink: "…", // added in v0.6.0
  links: [], // all page links (in order)
  pageLinks: [], // deprecated alias to `links`

  data: …, // pointer to dataset
  size: 1, // chunk sizes
}
```

If the above file were named `paged.njk`, it would create two pages: `_site/paged/0/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

## Paging an Object

{% addedin "0.4.0" %}

All of the examples thus far have paged Array data. Eleventy does allow paging objects too. Objects are resolved to pagination arrays using either the `Object.keys` or `Object.values` JavaScript functions. Consider the following Nunjucks template:

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 1
testdata:
  itemkey1: itemvalue1
  itemkey2: itemvalue2
  itemkey3: itemvalue3
---
<ol>
{%- for item in pagination.items %}
  <li>{{ item }}</li>
{% endfor -%}
</ol>
```
{% endraw %}

In this example, we would get 3 pages, with the paged items holding the object keys:

```js
[
  [ "itemkey1" ], // pagination.items[0] holds the object key
  [ "itemkey2" ],
  [ "itemkey3" ]
]
```

You can use these keys to get access to the original value: `testdata[ pagination.items[0] ]`.

If you’d like the pagination to iterate over the values instead of the keys (using `Object.values` instead of `Object.keys`), add `resolve: values` to your `pagination` front matter:

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 1
  resolve: values
testdata:
  itemkey1: itemvalue1
  itemkey2: itemvalue2
  itemkey3: itemvalue3
---
```
{% endraw %}

This resolves to:

```js
[
  [ "itemvalue1" ], // pagination.items[0] holds the object value
  [ "itemvalue2" ],
  [ "itemvalue3" ]
]
```

## Paginate a global or local data file

[Read more about Template Data Files](/docs/data/). The only change here is that you point your `data` pagination key to the global or local data instead of data in the front matter. For example, consider the following `globalDataSet.json` file in your global data directory.

```js
{
  myData: [
    "item1",
    "item2",
    "item3",
    "item4"
  ]
}
```

Your front matter would look like this:

{% raw %}
```markdown
---
pagination:
  data: globalDataSet.myData
  size: 1
---
<ol>
{%- for item in pagination.items %}
  <li>{{ item }}</li>
{% endfor -%}
</ol>
```
{% endraw %}

## Remapping with permalinks

Pagination variables also work here. Here’s an example of a permalink using the pagination page number:

{% raw %}
```markdown
---
permalink: different/page-{{ pagination.pageNumber }}/index.html
---
```
{% endraw %}

Writes to `_site/different/page-0/index.html`, `_site/different/page-1/index.html`, et cetera.

That means Nunjucks will also let you start your page numbers with 1 instead of 0, by just adding 1 here:

{% raw %}
```markdown
---
permalink: different/page-{{ pagination.pageNumber + 1 }}/index.html
---
```
{% endraw %}

Writes to `_site/different/page-1/index.html`, `_site/different/page-2/index.html`, et cetera.

### Use page item data in the permalink

You can do more advanced things like this:

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 1
testdata:
  - My Item
permalink: different/{{ pagination.items[0] | slug }}/index.html
---
```
{% endraw %}

Using a universal `slug` filter (transforms `My Item` to `my-item`), this outputs: `_site/different/my-item/index.html`.

## Aliasing to a different variable

Ok, so `pagination.items[0]` is ugly. We provide an option to alias this to something different.

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 1
  alias: wonder
testdata:
  - Item1
  - Item2
permalink: different/{{ wonder | slug }}/index.html
---
You can use the alias in your content too {{ wonder }}.
```
{% endraw %}

This writes to `_site/different/item1/index.html` and `_site/different/item2/index.html`.

If your chunk `size` is greater than 1, the alias will be an array instead of a single value.

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 2
  alias: wonder
testdata:
  - Item1
  - Item2
  - Item3
  - Item4
permalink: different/{{ wonder[0] | slug }}/index.html
---
You can use the alias in your content too {{ wonder[0] }}.
```
{% endraw %}

This writes to `_site/different/item1/index.html` and `_site/different/item3/index.html`.

## Blacklisting or Filtering Values

{% addedin "0.4.0" %}

Use the `filter` pagination property to remove values from paginated data.

```markdown
---
pagination:
  data: testdata
  size: 1
  filter:
    - item3
testdata:
  item1: itemvalue1
  item2: itemvalue2
  item3: itemvalue3
---
```

Paginates to:

```js
[
  [ "item1" ],
  [ "item2" ],
]
```

This will work the same with paginated arrays or with `resolve: values` for paginated objects.

```markdown
---
pagination:
  data: testdata
  size: 1
  resolve: values
  filter:
    - itemvalue3
testdata:
  item1: itemvalue1
  item2: itemvalue2
  item3: itemvalue3
---
```

Paginates to:

```js
[
  [ "itemvalue1" ],
  [ "itemvalue2" ],
]
```

## Paging a Collection

If you’d like to make a paginated list of all of your blog posts (any content with the tag `post` on it), use something like the following Liquid/Nunjucks template to iterate over a specific collection:

{% raw %}
```markdown
---
title: My Posts
pagination:
  data: collections.post
  size: 6
  alias: posts
---

<ol>
{% for post in posts %}
  <li><a href="{{ post.url | url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ol>
```
{% endraw %}

The above generates a list of links but you could do a lot more. See what’s available in the [Collection documentation](/docs/collections/#individual-collection-items-(useful-for-sort-callbacks)) (specifically `templateContent`). If you’d like to use this to automatically generate Tag pages for your content, please read [Quick Tip #004—Create Tag Pages for your Blog](/docs/quicktips/tag-pages/).