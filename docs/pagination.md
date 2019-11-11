---
eleventyNavigation:
  parent: Working with Templates
  key: Pagination
  order: 3
  excerpt: Iterate over a data set and create multiple files from a single template.
relatedKey: pagination
---
# Pagination

[[toc]]

## Paging an Array

To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template’s front matter by adding the `pagination` key. Consider the following template:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

{% codetitle "JavaScript Object", "Syntax" %}

```js
{
  items: [], // Array of current page’s chunk of data
  pageNumber: 0, // current page number, 0 indexed

  // Cool URLs, new in v0.10.0
  hrefs: [], // Array of all page hrefs (in order)
  href: {
    next: "…", // put inside <a href="{{ pagination.href.next }}">Next Page</a>
    previous: "…", // put inside <a href="{{ pagination.href.previous }}">Previous Page</a>
    first: "…",
    last: "…",
  },

  // New in v0.10.0
  pages: [], // Array of all chunks of paginated data (in order)
  page: {
    next: "…", // Next page’s chunk of data
    previous: "…", // Previous page’s chunk of data
    first: "…",
    last: "…",
  }
}
```

<details data-details-oneway>
  <summary>Here’s some extra stuff in the <code>pagination</code> object that you probably don’t need. ℹ️</summary>

In addition to the `pagination` object entries documented above, it also has:

{% codetitle "JavaScript Object", "Syntax" %}

```js
{
  data: …, // the original string key to the dataset
  size: 1, // page chunk sizes

  // Cool URLs, new in v0.6.0
  // Use pagination.href.next, pagination.href.previous, et al instead.
  nextPageHref: "…", // put inside <a href="{{ pagination.nextPageHref }}">Next Page</a>
  previousPageHref: "…", // put inside <a href="{{ pagination.previousPageHref }}">Previous Page</a>
  firstPageHref: "…",
  lastPageHref: "…",

  // Uncool URLs
  // These include index.html file names, use `hrefs` instead
  links: [], // Array of all page links (in order)

  // Deprecated things:
  // nextPageLink
  // previousPageLink
  // firstPageLink (new in v0.6.0)
  // lastPageLink (new in v0.6.0)
  // pageLinks (alias to `links`)
}
```

</details>

If the above file were named `paged.njk`, it would create two pages: `_site/paged/0/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

## Creating Navigation Links to your Pages

Learn how to create a list of links to every paginated page on a pagination template with a full [Pagination Navigation](/docs/pagination/nav/) tutorial.

## Paging an Object {% addedin "0.4.0" %}

All of the examples thus far have paged Array data. Eleventy does allow paging objects too. Objects are resolved to pagination arrays using either the `Object.keys` or `Object.values` JavaScript functions. Consider the following Nunjucks template:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

{% codetitle "JavaScript Object", "Syntax" %}

```js
[
  [ "itemkey1" ], // pagination.items[0] holds the object key
  [ "itemkey2" ],
  [ "itemkey3" ]
]
```

You can use these keys to get access to the original value: `testdata[ pagination.items[0] ]`.

If you’d like the pagination to iterate over the values instead of the keys (using `Object.values` instead of `Object.keys`), add `resolve: values` to your `pagination` front matter:

{% codetitle "YAML Front Matter", "Syntax" %}

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

{% codetitle "JavaScript Object", "Syntax" %}

```js
[
  [ "itemvalue1" ], // pagination.items[0] holds the object value
  [ "itemvalue2" ],
  [ "itemvalue3" ]
]
```

## Paginate a global or local data file

[Read more about Template Data Files](/docs/data/). The only change here is that you point your `data` pagination key to the global or local data instead of data in the front matter. For example, consider the following `globalDataSet.json` file in your global data directory.

{% codetitle "JavaScript Object", "Syntax" %}

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

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

Normally, front matter does not support template syntax, but `permalink` does, enabling parametric URLs via pagination variables. Here’s an example of a permalink using the pagination page number:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

{% raw %}
```markdown
---
permalink: different/page-{{ pagination.pageNumber }}/index.html
---
```
{% endraw %}

Writes to `_site/different/page-0/index.html`, `_site/different/page-1/index.html`, et cetera.

That means Nunjucks will also let you start your page numbers with 1 instead of 0, by just adding 1 here:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

{% raw %}
```markdown
---
permalink: different/page-{{ pagination.pageNumber + 1 }}/index.html
---
```
{% endraw %}

Writes to `_site/different/page-1/index.html`, `_site/different/page-2/index.html`, et cetera.

You can even use template logic here too:

{% raw %}
```markdown
---
permalink: different/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html
---
```
{% endraw %}

Writes to `_site/different/index.html`, `_site/different/page-2/index.html`, et cetera.

### Use page item data in the permalink

You can do more advanced things like this:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

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

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

## Paging a Collection

If you’d like to make a paginated list of all of your blog posts (any content with the tag `post` on it), use something like the following template to iterate over a specific collection:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

## Modifying the Data Set prior to Pagination

### Reverse the Data {% addedin "0.7.0" %}

Use `reverse: true`.

```markdown
---
pagination:
  data: testdata
  size: 2
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
---
```

Paginates to:

```js
[
  ["item4", "item3"],
  ["item2", "item1"],
]
```

_(More discussion at [Issue #194](https://github.com/11ty/eleventy/issues/194))_

As an aside, this could also be achieved in a more verbose way using the [Collection API](/docs/collections/#advanced%3A-custom-filtering-and-sorting). This could also be done using the new `before` callback {% addedin "0.10.0" %}.

### Blacklisting or Filtering Values {% addedin "0.4.0" %}

Use the `filter` pagination property to remove values from paginated data.

{% codetitle "YAML Front Matter", "Syntax" %}

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

{% codetitle "JavaScript Object", "Syntax" %}

```js
[
  [ "item1" ],
  [ "item2" ],
]
```

This will work the same with paginated arrays or with `resolve: values` for paginated objects.

{% codetitle "YAML Front Matter", "Syntax" %}

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

{% codetitle "JavaScript Object", "Syntax" %}

```js
[
  [ "itemvalue1" ],
  [ "itemvalue2" ],
]
```

### The `before` Callback

The most powerful tool to change the data. Use this callback to modify, filter, or otherwise change the pagination data however you see fit *before* pagination occurs.

{% raw %}
```markdown
---js
{
  pagination: {
    data: "testdata"
    size: 2
    before: function(data) {
      return data.map(entry => `${entry} with a suffix`);
    }
  },
  testdata: [
    "item1",
    "item2",
    "item3",
    "item4"
  ]
}
---
<!-- the rest of the template -->
```
{% endraw %}

The above will iterate over a data set containing: `["item1 with a suffix", "item2 with a suffix", "item3 with a suffix", "item4 with a suffix"]`.

You can do anything in this `before` callback. Maybe a custom `.sort()`, `.filter()`, `.map()` to remap the entires, `.slice()` to paginate only a subset of the data, etc!

### Order of Operations

If you use more than one of these data set modification features, here’s the order in which they operate:

* The `before` callback
* `reverse: true`
* `filter` entries

## Add All Pagination Pages to Collections {% addedin "0.8.0" %}

By default, any tags listed in a paginated template will only add the very first page to the appropriate collection.

Consider the following pagination template:

{% codetitle "my-page.md" %}

```
tags:
  - myCollection
pagination:
  data: testdata
  size: 2
testdata:
  - item1
  - item2
  - item3
  - item4
```

This means that `collections.myCollection` will have only the first page added to the collection array (`_site/my-page/index.html`). However, if you’d like all the pagination pages to the collections, use `addAllPagesToCollections: true` to the pagination front matter options like so:

{% codetitle "my-page.md" %}

```
tags:
  - myCollection
pagination:
  data: testdata
  size: 2
  addAllPagesToCollections: true
testdata:
  - item1
  - item2
  - item3
  - item4
```

Now `collections.myCollection` will have both output pages in the collection array (`_site/my-page/index.html` and `_site/-my-page/1/index.html`).

## Full Pagination Option List

* `data` (String) [Lodash.get path](https://lodash.com/docs/4.17.10#get) to point to the target data set.
* `size` (Number, required)
* `alias` (String) [Lodash.set path](https://lodash.com/docs/4.17.10#set) to point to the property to set.
* `resolve: values` {% addedin "0.4.0" %}
* `filter` (Array) {% addedin "0.4.0" %}
* `reverse: true` (Boolean) {% addedin "0.7.0" %}
* `addAllPagesToCollections: true` (Boolean) {% addedin "0.8.0" %}
