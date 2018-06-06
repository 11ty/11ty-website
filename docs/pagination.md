---
subtitle: Pagination
excerpt: Iterate over a data set and create multiple files from a single template.
tags:
  - docs-templates
---
# Pagination

To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template’s front matter by adding the `pagination` key. Consider this Nunjucks template:

{% raw %}
```
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
<ol>{% for item in pagination.items %}<li>{{ item }}</li>{% endfor %}</ol>
```
{% endraw %}

We enable pagination and then give it a dataset with the `data` key. We control the number of items in each chunk with `size`. The pagination data variable will be populated with what you need to create each template. Here’s what’s in `pagination`:

```
{
  items: [], // current page’s chunk of data
  pageNumber: 0, // current page number, 0 indexed
  nextPageLink: "", // put inside <a href="{{ pagination.nextPageLink }}">Next Page</a>
  previousPageLink: "", // put inside <a href="{{ pagination.previousPageLink }}">Previous Page</a>
  pageLinks: [], // all page links
  data: "", // pointer to dataset
  size: 1, // chunk sizes
}
```

If the above file were named `paged.njk`, it would create two pages: `_site/paged/0/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

## Paginate a global or local data file

[Read more about Template Data Files](/docs/data/). The only change here is that you point your `data` pagination key to the global or local data instead of data in the front matter. For example, consider the following `globalDataSet.json` file in your global data directory.

```
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
```
---
pagination:
  data: globalDataSet.myData
  size: 1
---
<ol>{% for item in pagination.items %}<li>{{ item }}</li>{% endfor %}</ol>
```
{% endraw %}

## Remapping with permalinks

Pagination variables also work here. Here’s an example of a permalink using the pagination page number:

{% raw %}
```
---
permalink: different/page-{{ pagination.pageNumber }}/index.html
---
```
{% endraw %}

Writes to `_site/different/page-0/index.html`, `_site/different/page-1/index.html`, et cetera.

That means Nunjucks will also let you start your page numbers with 1 instead of 0, by just adding 1 here:

{% raw %}
```
---
permalink: different/page-{{ pagination.pageNumber + 1 }}/index.html
---
```
{% endraw %}

Writes to `_site/different/page-1/index.html`, `_site/different/page-2/index.html`, et cetera.

### Use page item data in the permalink

You can do more advanced things like this:

{% raw %}
```
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

#### Aliasing pagination items to a different variable

Ok, so `pagination.items[0]` is ugly. We provide an option to alias this to something different.

{% raw %}
```
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
```
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
