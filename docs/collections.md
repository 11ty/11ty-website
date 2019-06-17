---
subtitle: Collections
excerpt: Group, reuse, and sort content in interesting ways.
tags:
  - docs-templates
---
# Collections (using Tags)

While [pagination](/docs/pagination/) allows you to iterate over a data set to create multiple templates, a collection allows you to group content in interesting ways. By default, Eleventy will automatically create collections for documents with a `tags` key in their front matter. One document can be part of multiple collections. You can also manually create collections by using the `addCollection` method in Eleventy’s configuration file.



## Table of contents

* [Creating tag-based collections](#creating-tag-based-collections)
  * [Option 1: Document front matter](#option-1%3A-document-front-matter)
  * [Option 2: Data directory files](#option-2%3A-data-directory-files)
  * [Example: A list of blog posts](#example%3A-a-list-of-blog-posts)
  * [Example: Navigation links with an `active` class for the current page](#example%3A-navigation-links-with-an-active-class-for-the-current-page)
* [The special `all` collection](#the-special-all-collection)
  * [Example: A list of links to all Eleventy-generated content](#example%3A-a-list-of-links-to-all-eleventy-generated-content)
* [Exclude content from collections](#exclude-content-from-collections)
* [Data structure of collection items](#data-structure-of-collection-items)
* [Sorting collections](#sorting-collections)
  * [Sort descending](#sort-descending)
  * [Overriding content dates](#overriding-content-dates)
* [Advanced: Custom filtering and sorting](#advanced%3A-custom-filtering-and-sorting)
  * [Return values](#return-values)
  * [Collection API methods](#collection-api-methods)
    * [getAll()](#getall())
    * [getAllSorted()](#getallsorted())
    * [getFilteredByTag( tagName )](#getfilteredbytag(-tagname-))
    * [getFilteredByGlob( glob )](#getfilteredbyglob(-glob-))



## Creating tag-based collections

### Option 1: Document front matter

You can add a document to a collection via the `tags` key in its front matter.

{% codetitle "Markdown", "Syntax" %}

```
---
tags: posts
---
# Incredible article
```

In a template, you can then access this collection as `collections.posts`.

The snippet above uses a string value to specify a single tag, but Eleventy also accepts array values for the `tags` key. This way, you can specify multiple tags for a document.

{% codetitle "Markdown", "Syntax" %}

```
---
tags: ['animals', 'dogs']
---
```

{% codetitle "Markdown", "Syntax" %}

```
---
tags:
  - animals
  - cats
---
```

Both snippets function identically. While one adds a document to the “animals” and “dogs” collections, the other adds it to the “animals” and “cats” collections.



### Option 2: Data directory files

You can add multiple documents to a collection at once based on the directory they are in. For this, a [data directory file](https://www.11ty.io/docs/data-template-dir/) sets the `tags` property for all documents for this directory. A data directory file called `posts.json` inside a `posts` directory adds all documents inside of it the `posts` collection like this:

{% codetitle "JSON", "Syntax" %}

```json
{
  "tags": "posts"
}
```

<div class="elv-callout elv-callout-info">
  For this to work as expected, you may want to use the <a href="/docs/config/#data-deep-merge">“data deep merge”</a> configuration. It allows the data of your documents to supplement the data specified in data directory files rather than overriding it.
</div>



### Example: A list of blog posts

For a blog site, your individual post files may use a tag called `posts`, but it can be whatever you want. In this example, `mypost.md` has a single tag called `posts`:

{% codetitle "Markdown", "Syntax" %}

```
---
tags: posts
title: Hot Take—Social Media is Considered Harmful
---
```

This will place this `mypost.md` document into the `posts` collection together with all other pieces of content sharing the `posts` tag. To reference this collection and make a list of all posts with that tag, use the `collections` object in any template:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.posts -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

{% codetitle "JavaScript .11ty.js", "Syntax" %}

{% raw %}
```js
module.exports = function({collections}) {
  return `<ul>
    ${collections.posts.map((post) => `<li>${ post.data.title }</li>`).join("\n")}
  </ul>`;
};
```
{% endraw %}



### Example: Navigation links with an `active` class for the current page

Compare the `post.url` and special Eleventy-provided `page.url` variable to find the current page. Building on the previous example:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```
<ul>
{%- for post in collections.post -%}
  <li{% if page.url == post.url %} class="active"{% endif %}>
    {{ post.data.title }}
  </li>
{%- endfor -%}
</ul>
```
{% endraw %}



## The special `all` collection

By default, Eleventy puts all of your content (independent of whether or not it has any assigned tags) into the `collections.all` collection. This allows you to iterate over all of your content inside of a template.



### Example: A list of links to all Eleventy-generated content

{% raw %}
```
<ul>
{%- for post in collections.all -%}
  <li>
    <a href="{{ post.url }}">{{ post.url }}</a>
  </li>
{%- endfor -%}
</ul>
```
{% endraw %}



## Exclude content from collections {% addedin "0.8.0" %}

In front matter (or further upstream in the data cascade), set the `eleventyExcludeFromCollections` option to true to opt out of specific pieces of content added to all collections (including `collections.all`, collections set using tags, or collections added from the configuration API in your config file). Useful for your RSS feed, `sitemap.xml`, custom templated `.htaccess` files, et cetera.

{% codetitle "excluded.md" %}

```
---
eleventyExcludeFromCollections: true
tags: post
---
This will not be available in `collections.all` or `collections.post`.
```



## Data structure of collection items

Eleventy populates each collection item with a set of useful information. Each item in a collection has access to the following variables:

* `inputPath`: the full path to the source input file (including the path to the input directory).
* `fileSlug`: {% addedin "0.5.3" %} Mapped from the input file name, useful for permalinks. Read more about [`fileSlug`](/docs/data/#fileslug).
* `outputPath`: the full path to the output file to be written for this content.
* `url`: url used to link to this piece of content.
* `date`: the resolved date used for sorting. Read more about [Content Dates](/docs/dates/).
* `data`: all data for this piece of content (includes any data inherited from layouts).
* `templateContent`: the rendered content of this template. This does _not_ include layout wrappers.

Here is an example of what these variables could contain for a collection item:

```
{
  inputPath: './test1.md',
  fileSlug: 'test1', // fileSlug was added in 0.5.3
  outputPath: './_site/test1/index.html',
  url: '/test1/',
  date: 2018-01-09T04:10:17.000Z,
  data: {
    title: 'Test Title',
    tags: ['tag1', 'tag2'],
    date: 'Last Modified'
  },
  templateContent: '<h1>This is my title</h1>\n\n<p>This is content…'
}
```



## Sorting collections

The default collection sorting algorithm sorts in ascending order using:

1. The input file’s Created Date (you can override using `date` in front matter, as shown below)
2. Files created at the exact same time are tie-broken using the input file’s full path including filename

For example, assume I only write blog posts on New Year’s Day:

* posts/postA.md (created on 2008-01-01)
* posts/postB.md (created on 2008-01-01)
* posts/post3.md (created on 2007-01-01)
* another-posts/post1.md (created on 2011-01-01)

This collection would be sorted like this:

1. `posts/post3.md`
2. `posts/postA.md`
3. `posts/postB.md`
4. `another-posts/post1.md`



### Sort descending

To sort descending in your template, you can use a filter to reverse the sort order. For example, in Nunjucks it’d look like this (Liquid also has a `reverse` filter built in):

{% raw %}
```
<ul>
{%- for post in collections.post | reverse -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

<div class="elv-callout elv-callout-warn elv-callout-warn-block" id="array-reverse">
  <p>You should <em><strong>not</strong></em> use Array <code>reverse()</code> on collection arrays in your templates, like so:</p>
  <p><code>{%raw %}{%- for post in collections.post.reverse() -%}{% endraw %}</code></p>
  <p>This will <a href="https://doesitmutate.xyz/reverse/">mutate the array</a> and re-order it <em>in-place</em> and will have side effects for any use of that collection in other templates.</p>
  <p>Instead, use one of the many template engine utilities provided for you to do this, such as <a href="http://shopify.github.io/liquid/filters/reverse/">Liquid’s <code>reverse</code></a> or <a href="https://mozilla.github.io/nunjucks/templating.html#reverse">Nunjucks’ <code>reverse</code></a></p>
  <p>This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</p>
</div>



### Overriding content dates

You can modify how a piece of content is sorted in a collection by changing its default `date`. [Read more about content dates](/docs/dates/).

```
---
date: 2016-01-01
---
```



## Advanced: Custom filtering and sorting

To get fancier with your collections (and even do a bit of your own custom filtering, if you’d like), you can use our Configuration API.

Inside of your `.eleventy.js` config file, use the first argument to the config function (`eleventyConfig` below) to call the API (note that module exports is a function and not an object literal):

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // API is available in `eleventyConfig` argument

  return {
    // your normal config options
    markdownTemplateEngine: "njk"
  };
};
```

You can use `eleventyConfig` like so:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {

  eleventyConfig.addCollection("myCollectionName", function(collection) {
    // get unsorted items
    return collection.getAll();
  });

};
```

{% addedin "0.8.0" %} `addCollection` can accept `async` functions too. Use `await` in your callback to do some asynchronous things!

### Return values

* These `addCollection` callbacks should return an array of [template objects](#collection-item-data-structure) (in Eleventy 0.5.2 and prior).
* {% addedin "0.5.3" %} `addCollection` callbacks can now return any arbitrary object type and it’ll be available as data in the template. Arrays, strings, objects—have fun with it.

### Collection API methods

The data collection gets passed to the callback. You can use it in all sorts of ways:

#### getAll()

Returns an array.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Unsorted items (in whatever order they were added)
  eleventyConfig.addCollection("allMyContent", function(collection) {
    return collection.getAll();
  });
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Filter using `Array.filter`
  eleventyConfig.addCollection("keyMustExistInData", function(collection) {
    return collection.getAll().filter(function(item) {
      // Side-step tags and do your own filtering
      return "myCustomDataKey" in item.data;
    });
  });
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Sort with `Array.sort`
  eleventyConfig.addCollection("myCustomSort", function(collection) {
    return collection.getAll().sort(function(a, b) {
      return b.date - a.date;
    });
  });
};
```

Curious where the date is coming from? [Read more about Content Dates](/docs/dates/).

Note that the last example adding the `myCustomSort` collection will be available in your templates as `collections.myCustomSort`.

#### getAllSorted()

Returns an array.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Use the default sorting algorithm (ascending by date, filename tiebreaker)
  eleventyConfig.addCollection("allMySortedContent", function(collection) {
    return collection.getAllSorted();
  });
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Use the default sorting algorithm in reverse (descending dir, date, filename)
  // Note that using a template engine’s `reverse` filter might be easier here
  eleventyConfig.addCollection("myPostsReverse", function(collection) {
    return collection.getAllSorted().reverse();
  });
};
```

Note that while Array `.reverse()` mutates the array _in-place_, all Eleventy Collection API methods return new copies of collection arrays and can be modified without side effects to other collections. <a href="#array-reverse">However, you do need to be careful ⚠️ when using Array `.reverse()` in templates!</a>

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Filter using `Array.filter`
  eleventyConfig.addCollection("onlyMarkdown", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      // Only return content that was originally a markdown file
      let extension = item.inputPath.split('.').pop();
      return extension === "md";
    });
  });
};
```

#### getFilteredByTag( tagName )

Returns an array.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Get only content that matches a tag
  eleventyConfig.addCollection("myPosts", function(collection) {
    return collection.getFilteredByTag("post");
  });
};
```

#### getFilteredByGlob( glob )

Returns an array. Will match an arbitrary glob (or an array of globs) against the input file’s full `inputPath` (including the input directory).

{% codetitle ".eleventy.js" %}
{% addedin "0.2.14" %}

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("onlyMarkdown", function(collection) {
    return collection.getFilteredByGlob("**/*.md");
  });
};
```

{% codetitle ".eleventy.js" %}
{% addedin "0.2.14" %}

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("_posts/*.md");
  });
};
```

{% codetitle ".eleventy.js" %}
{% addedin "0.2.14" %}

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("posts", function(collection) {
    // Also accepts an array of globs!
    return collection.getFilteredByGlob(["posts/*.md", "notes/*.md"]);
  });
};
```

<div class="elv-community" id="community-resources">
  <h3 class="elv-community-hed">Community Resources</h3>
  <ul>
    <li><a href="https://www.pborenstein.com/articles/collections/">Working with Collections</a> by {% avatarlocalcache "twitter", "pborenstein" %}Philip Borenstein</li>
  </ul>
</div>
