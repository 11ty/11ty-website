---
subtitle: Create Pages from Data
excerpt: Iterate over a data set and create multiple output files.
tags:
  - docs-templates
---
# {{ subtitle }}

While it can be confusing for beginners to Eleventy to learn this, but the [Pagination feature](/docs/pagination/) is used for iterating over any data to create multiple output files.

Pagination can be used for traditional style pagination outputs like `/result/page-0/`, `/result/page-1/`. Pagination can also iterate over an object too and output any `permalink` value!

## An Example

Let's look at an example where we dynamically build pages based on data from a json file. First let's consider this simple data file stores in `_data\cats.json`:

```js
[
  {
    "name":"Fluffy",
    "age":2
  },
  {
    "name":"Snugglepants",
    "age":5
  },
  {
    "name":"Lord Featherbottom",
    "age":4
  },
  {
    "name":"Pennywise",
    "age":9
  },
]
```

In order to create one page per cat, we can use the following template.

```html
---
pagination:
    data: cats
    size: 1
    alias: cat
permalink: cats/{{ cat.name | slug }}/index.html
---

{{ cat.name }} is {{ cat.age }} years old
```

This template will generate four files, one for each cat, where the filename is based on the cat's name passed through the `slug` function. As cats are added, edited, and removed, the resultant cat details page will be updated automatically.

## Related Pagination Topics:

* [Pagination: Paging an Object](/docs/pagination/#paging-an-object)
* [Pagination: Remapping with Permalinks](/docs/pagination/#remapping-with-permalinks)
