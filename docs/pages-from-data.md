---
eleventyNavigation:
  parent: Working with Templates
  key: Create Pages From Data
  order: 4
  excerpt: Iterate over a data set and create multiple output files.
---
# Create Pages From Data

While it can be confusing for beginners to Eleventy to learn this, but the [Pagination feature](/docs/pagination/) is used for iterating over any data to create multiple output files.

Pagination can be used for traditional style pagination outputs like `/result/page-0/`, `/result/page-1/`. Pagination can also iterate over an object too and output any `permalink` value!

## An Example

Let's look at an example where we dynamically build pages based on data from a json file. First let's consider this simple data file stores in `_data\possums.json`:

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
  }
]
```

In order to create one page per possum, we can use the following template. The file name isn’t important, but the file extension is (e.g. `possum-pages.liquid` or `possum-pages.njk`).

{% raw %}
```html
---
pagination:
    data: possums
    size: 1
    alias: possum
permalink: "possums/{{ possum.name | slug }}/"
---

{{ possum.name }} is {{ possum.age }} years old
```
{% endraw %}

This template will generate four files, one for each possum, where the filename is based on the possum's name passed through the `slug` function. As possums are added and edited the resultant possum details page will be updated automatically.

## Related Pagination Topics:

* [Pagination: Paging an Object](/docs/pagination/#paging-an-object)
* [Pagination: Remapping with Permalinks](/docs/pagination/#remapping-with-permalinks)
