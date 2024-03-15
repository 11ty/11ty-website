---
eleventyNavigation:
  parent: Working with Templates
  key: Pagination
  order: 4
  excerpt: Iterate over a data set and create multiple files from a single template.
relatedKey: pagination
---

# Pagination

{% tableofcontents %}

Pagination allows you to iterate over a data set and create multiple files from a single template. The input data can be in the form of an array or object defined in your frontmatter or in [global data](/docs/data-global/), or you can paginate a collection to make an easily digestible list of your posts.

## Paging an Array

To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template’s front matter by adding the `pagination` key.

Consider the following template, which will result in two pages being created, each of which will display two items from `testdata`:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "paged-array"} %}
  <div id="paged-array-liquid" role="tabpanel">
    {%- codetitle "paged.liquid" %}
    {%- highlight "liquid" %}
    {%- include "examples/pagination/paged-array.njk" %}
    {%- endhighlight %}

If the above file were named `paged.liquid`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
  <div id="paged-array-njk" role="tabpanel">
    {%- codetitle "paged.njk" %}
    {%- highlight "jinja2" %}
    {%- include "examples/pagination/paged-array.njk" %}
    {%- endhighlight %}

If the above file were named `paged.njk`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
  <div id="paged-array-js" role="tabpanel">
    {%- codetitle "paged.11ty.js" %}
    {%- highlight "js" %}
    {%- include "examples/pagination/paged-array.js" %}
    {%- endhighlight %}

If the above file were named `paged.11ty.js`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
  <div id="paged-array-hbs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

We enable pagination and then give it a dataset with the `data` key. We control the number of items in each chunk with `size`. The pagination data variable will be populated with what you need to create each template. Here’s what’s in `pagination`:

{% codetitle "JavaScript Object", "Syntax" %}

```js
{
  items: [], // Array of current page’s chunk of data
  pageNumber: 0, // current page number, 0 indexed

  // Cool URLs
  hrefs: [], // Array of all page hrefs (in order)
  href: {
    next: "…", // put inside <a href="{{ pagination.href.next }}">Next Page</a>
    previous: "…", // put inside <a href="{{ pagination.href.previous }}">Previous Page</a>
    first: "…",
    last: "…",
  },

  pages: [], // Array of all chunks of paginated data (in order)
  page: {
    next: {}, // Next page’s chunk of data
    previous: {}, // Previous page’s chunk of data
    first: {},
    last: {},
  }
}
```

<details>
  <summary>Expand to see all of the extra stuff in the <code>pagination</code> object that you probably don’t need any more but it’s still in there for backwards compatibility.</summary>

In addition to the `pagination` object entries documented above, it also has:

{% codetitle "JavaScript Object", "Syntax" %}

```js
{
  data: "…", // the original string key to the dataset
  size: 1, // page chunk sizes

  // Cool URLs
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
  // firstPageLink
  // lastPageLink
  // pageLinks (alias to `links`)
}
```

</details>

## Creating Navigation Links to your Pages

Learn how to create a list of links to every paginated page on a pagination template with a full [Pagination Navigation](/docs/pagination/nav/) tutorial.

## Paging an Object

All of the examples thus far have paged Array data. Eleventy does allow paging objects too. Objects are resolved to pagination arrays using either the `Object.keys` or `Object.values` JavaScript functions. Consider the following templates:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "pagedobj"} %}
  <div id="pagedobj-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
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
  <li>{{ item }}={{testdata[item] }}</li>
{% endfor -%}
</ol>
```

{% endraw %}

  </div>
  <div id="pagedobj-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
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
  <li>{{ item }}={{testdata[item] }}</li>
{% endfor -%}
</ol>
```

{% endraw %}

  </div>
  <div id="pagedobj-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
exports.data = {
	pagination: {
		data: "testdata",
		size: 1,
	},
	testdata: {
		itemkey1: "itemvalue1",
		itemkey2: "itemvalue2",
		itemkey3: "itemvalue3",
	},
};

exports.render = function (data) {
	return `<ol>
		${data.pagination.items
			.map(function (item) {
				return `<li>${(item = data.testdata[item])}</li>`;
			})
			.join("")}
	</ol>`;
};
```

{% endraw %}

  </div>
  <div id="pagedobj-hbs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

In this example, we would get 3 pages that each print a key/value pair from `testdata`. The paged items hold the object keys:

{% codetitle "JavaScript Object", "Syntax" %}

```js
[
	["itemkey1"], // pagination.items[0] holds the object key
	["itemkey2"],
	["itemkey3"],
];
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
	["itemvalue1"], // pagination.items[0] holds the object value
	["itemvalue2"],
	["itemvalue3"],
];
```

## Paginate a global or local data file

[Read more about Template Data Files](/docs/data/). The only change here is that you point your `data` pagination key to the global or local data instead of data in the front matter. For example, consider the following `globalDataSet.json` file in your global data directory.

{% codetitle "JavaScript Object", "Syntax" %}

```json
{
	"myData": ["item1", "item2", "item3", "item4"]
}
```

Your front matter would look like this:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "pagedatafile"} %}
  <div id="pagedatafile-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
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

  </div>
  <div id="pagedatafile-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
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

  </div>

  <div id="pagedatafile-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
exports.data = {
	pagination: {
		data: "globalDataSet.myData",
		size: 1,
	},
};

exports.render = function (data) {
	return `<ol>
    ${data.pagination.items
			.map(function (item) {
				return `<li>${item}</li>`;
			})
			.join("")}
  </ol>`;
};
```

{% endraw %}

  </div>
  <div id="pagedatafile-hbs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

## Remapping with permalinks

Normally, front matter does not support template syntax, but `permalink` does, enabling parametric URLs via pagination variables. Here’s an example of a permalink using the pagination page number:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

{% raw %}

```markdown
---
permalink: "different/page-{{ pagination.pageNumber }}/index.html"
---
```

{% endraw %}

Writes to `_site/different/page-0/index.html`, `_site/different/page-1/index.html`, et cetera.

That means Nunjucks will also let you start your page numbers with 1 instead of 0, by just adding 1 here:

{% codetitle "YAML Front Matter using Nunjucks", "Syntax" %}

{% raw %}

```markdown
---
permalink: "different/page-{{ pagination.pageNumber + 1 }}/index.html"
---
```

{% endraw %}

Writes to `_site/different/page-1/index.html`, `_site/different/page-2/index.html`, et cetera.

You can even use template logic here too:

{% raw %}

```markdown
---
permalink: "different/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
```

{% endraw %}

Writes to `_site/different/index.html`, `_site/different/page-2/index.html`, et cetera.

{% callout "info" %}Note that the above example works in Nunjucks but {% raw %}<code>{{ pagination.pageNumber + 1 }}</code>{% endraw %} is not supported in Liquid. Use {% raw %}<code>{{ pagination.pageNumber | plus: 1 }}</code>{% endraw %} instead.{% endcallout %}

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
permalink: "different/{{ pagination.items[0] | slugify }}/index.html"
---
```

{% endraw %}

Using a universal `slug` filter (transforms `My Item` to `my-item`), this outputs: `_site/different/my-item/index.html`.

## Aliasing to a different variable

Ok, so `pagination.items[0]` is ugly. We provide an option to alias this to something different.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "pagedalias"} %}
  <div id="pagedalias-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
pagination:
  data: testdata
  size: 1
  alias: wonder
testdata:
  - Item1
  - Item2
permalink: "different/{{ wonder | slugify }}/index.html"
---
You can use the alias in your content too {{ wonder }}.
```

{% endraw %}

  </div>
  <div id="pagedalias-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---
pagination:
  data: testdata
  size: 1
  alias: wonder
testdata:
  - Item1
  - Item2
permalink: "different/{{ wonder | slugify }}/index.html"
---
You can use the alias in your content too {{ wonder }}.
```

{% endraw %}

  </div>
  <div id="pagedalias-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
exports.data = {
	pagination: {
		data: "testdata",
		size: 1,
		alias: "wonder",
	},
	testdata: ["Item1", "Item2"],
	permalink: function (data) {
		return `different/${this.slugify(data.wonder)}/index.html`;
	},
};

exports.render = function (data) {
	return `You can use the alias in your content too ${data.wonder}.`;
};
```

{% endraw %}

  </div>
  <div id="pagedalias-hbs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

This writes to `_site/different/item1/index.html` and `_site/different/item2/index.html`.

{% callout "info" %}Note that <code>page</code> is a reserved word so you cannot use <code>alias: page</code>. Read about Eleventy’s reserved data names in <a href="/docs/data-eleventy-supplied">Eleventy Supplied Data</a>.{% endcallout %}

If your chunk `size` is greater than 1, the alias will be an array instead of a single value.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "pagedchunk"} %}
  <div id="pagedchunk-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
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
permalink: "different/{{ wonder[0] | slugify }}/index.html"
---
You can use the alias in your content too {{ wonder[0] }}.
```

{% endraw %}

  </div>
  <div id="pagedchunk-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
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
permalink: "different/{{ wonder[0] | slugify }}/index.html"
---
You can use the alias in your content too {{ wonder[0] }}.
```

{% endraw %}

  </div>
  <div id="pagedchunk-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
exports.data = {
  pagination: {
    data: "testdata",
    size: 2,
    alias: "wonder"
  },
  testdata: [
    "Item1",
    "Item2",
    "Item3",
    "Item4"
  ],
  permalink: {
    function(data) {
      return `different/${this.slugify(data.wonder[0])}/index.html`
    };
  }
};

exports.render = function (data) {
  return `You can use the alias in your content too ${data.wonder[0]}.`;
}
```

{% endraw %}

  </div>
  <div id="pagedchunk-hbs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

This writes to `_site/different/item1/index.html` and `_site/different/item3/index.html`.

## Paging a Collection

If you’d like to make a paginated list of all of your blog posts (any content with the tag `post` on it), use something like the following template to iterate over a specific collection:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "pagedcollection"} %}
  <div id="pagedcollection-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
title: My Posts
pagination:
  data: collections.post
  size: 6
  alias: posts
---

<ol>
{% for post in posts %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ol>
```

{% endraw %}

  </div>
  <div id="pagedcollection-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---
title: My Posts
pagination:
  data: collections.post
  size: 6
  alias: posts
---

<ol>
{% for post in posts %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ol>
```

{% endraw %}

  </div>
  <div id="pagedcollection-js" role="tabpanel">
    
{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
exports.data = {
	title: "My Posts",
	pagination: {
		data: "collections.post",
		size: 6,
		alias: "posts",
	},
};

exports.render = function (data) {
	return `<ol>
		${data.posts
			.map(function (post) {
				return `<li><a href="${post.url}">${post.title}</a></li>`;
			})
			.join("")}
	</ol>`;
};
```

{% endraw %}

  </div>
  <div id="pagedcollection-hbs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

The above generates a list of links but you could do a lot more. See what’s available in the [Collection documentation](/docs/collections/#collection-item-data-structure) (specifically `templateContent`). If you’d like to use this to automatically generate Tag pages for your content, please read [Quick Tip #004—Create Tag Pages for your Blog](/docs/quicktips/tag-pages/).

## Generating an Empty Results Page

{% addedin "2.0.0-canary.10" %}

By default, if the specified data set is empty, Eleventy will not render any pages. Use `generatePageOnEmptyData: true` to generate one pagination output with an empty chunk `[]` of items.

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}

```markdown
---
title: Available Products
pagination:
  data: collections.available
  size: 6
  generatePageOnEmptyData: true
---
```

{% endraw %}

<div class="youtube-related">
  {%- youtubeEmbed "oCTAZumAGNc", "Empty-results Pagination (Weekly №11)", "207" -%}
</div>

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
];
```

_(More discussion at [Issue #194](https://github.com/11ty/eleventy/issues/194))_

As an aside, this could also be achieved in a more verbose way using the [Collection API](/docs/collections/#advanced-custom-filtering-and-sorting). This could also be done using the new `before` callback {% addedin "0.10.0" %}.

### Filtering Values {% addedin "0.4.0" %}

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
[["item1"], ["item2"]];
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
[["itemvalue1"], ["itemvalue2"]];
```

### The `before` Callback {% addedin "0.10.0" %}

The most powerful tool to change the data. Use this callback to modify, filter, or otherwise change the pagination data however you see fit _before_ pagination occurs.

{% raw %}

```js
---js
{
  pagination: {
    data: "testdata",
    size: 2,
    before: function(paginationData, fullData) {
      // `fullData` is new in v1.0.1 and contains the full Data Cascade thus far

      return paginationData.map(entry => `${entry} with a suffix`);
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

You can do anything in this `before` callback. Maybe a custom `.sort()`, `.filter()`, `.map()` to remap the entries, `.slice()` to paginate only a subset of the data, etc!

#### Use JavaScript Template Functions here

{% addedin "2.0.0-canary.16" %}[JavaScript Template Functions](/docs/languages/javascript/#javascript-template-functions) (which are also populated by universal filters and shortcodes) are available in the `before` callback.

```js
// …
before: function() {
  let slug = this.slugify("My title.");
  // use Universal filters or shortcodes too…
},
// …
```

### Order of Operations

If you use more than one of these data set modification features, here’s the order in which they operate:

- The `before` callback
- `reverse: true`
- `filter` entries

## Add All Pagination Pages to Collections {% addedin "0.8.0" %}

By default, any tags listed in a paginated template will only add the very first page to the appropriate collection.

Consider the following pagination template:

{% codetitle "my-page.md" %}

```yaml
---
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
---
```

This means that `collections.myCollection` will have only the first page added to the collection array (`_site/my-page/index.html`). However, if you’d like to add all the pagination pages to the collections, use `addAllPagesToCollections: true` to the pagination front matter options like so:

{% codetitle "my-page.md" %}

```yaml
---
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
---
```

Now `collections.myCollection` will have both output pages in the collection array (`_site/my-page/index.html` and `_site/my-page/1/index.html`).

## Full Pagination Option List

- `data` (String) [Lodash.get path](https://lodash.com/docs/4.17.15#get) to point to the target data set.
- `size` (Number, required)
- `alias` (String) [Lodash.set path](https://lodash.com/docs/4.17.15#set) to point to the property to set.
- `generatePageOnEmptyData` (Boolean) if target data set is empty, render first page with empty chunk `[]`.
- `resolve: values` {% addedin "0.4.0" %}
- `filter` (Array) {% addedin "0.4.0" %}
- `reverse: true` (Boolean) {% addedin "0.7.0" %}
- `addAllPagesToCollections: true` (Boolean) {% addedin "0.8.0" %}

## Related

<div class="youtube-related">
  {%- youtubeEmbed "kUC87Zr0dKg", "Eleventy Build went from 54s to 17s—Pagination Memory/Performance Wins 🏆 (Weekly №10)", "344" -%}
</div>

## From the Community

{% include "11tybundle.njk" %}
