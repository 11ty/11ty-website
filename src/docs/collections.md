---
pageTitle: Collections (Using Tags)
eleventyNavigation:
  parent: Working with Templates
  key: Collections
  order: 2
  excerpt: Group, reuse, and sort content in interesting ways.
communityLinksKey: collections
---
While [pagination](/docs/pagination/) allows you to iterate over a data set to create multiple templates, a collection allows you to group content in interesting ways. A piece of content can be a part of multiple collections, if you assign the same string value to the `tags` key in the front matter.

## A Blog Example

For a blog site, your individual post files may use a tag called `post`, but it can be whatever you want. In this example, `mypost.md` has a single tag `post`:

{% codetitle "Markdown", "Syntax" %}

```markdown
---
tags: post
title: Hot Take—Social Media is Considered Harmful
---
```

This will place this `mypost.md` into the `post` collection with all other pieces of content sharing the `post` tag. To reference this collection and make a list of all posts, use the `collections` object in any template:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.post -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

{% codetitle "JavaScript .11ty.js", "Syntax" %}

{% raw %}
```js
exports.render = function(data) {
  return `<ul>
    ${data.collections.post.map(post => `<li>${post.data.title}</li>`).join("\n")}
  </ul>`;
};
```
{% endraw %}

### Example: Navigation Links with an `[aria-current]` attribute added for on the current page

Compare the `post.url` and special Eleventy-provided `page.url` variable to find the current page. Building on the previous example:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.post -%}
  <li{% if page.url == post.url %} aria-current="page"{% endif %}>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

{% codetitle "JavaScript .11ty.js", "Syntax" %}

{% raw %}
```js
exports.render = function(data) {
  return `<ul>
    ${data.collections.post.map(post =>
      `<li${data.page.url === post.url ? `class="active"` : ""}>${post.data.title}</li>`
    ).join("\n")}
  </ul>`;
};
```
{% endraw %}

Background: `aria-current="page"` tells assistive technology, such as screen readers, which page of a set of pages is the current active one. It also provides a hook for your CSS styling, using its attribute selector: `[aria-current="page"] {}`.

## The Special `all` Collection

By default Eleventy puts all of your content (independent of whether or not it has any assigned tags) into the `collections.all` Collection. This allows you to iterate over all of your content inside of a template.

### Example: A list of links to all Eleventy generated content

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.all -%}
  <li><a href="{{ post.url }}">{{ post.url }}</a></li>
{%- endfor -%}
</ul>
```
{% endraw %}

{% codetitle "JavaScript .11ty.js", "Syntax" %}

{% raw %}
```js
exports.render = function(data) {
  return `<ul>
    ${data.collections.all.map(post =>
      `<li><a href="${post.url}">${post.url}</a></li>`
    ).join("\n")}
  </ul>`;
};
```
{% endraw %}

## Option: Exclude content from Collections {% addedin "0.8.0" %}

In front matter (or further upstream in the data cascade), set the `eleventyExcludeFromCollections` option to true to opt out of specific pieces of content added to all collections (including `collections.all`, collections set using tags, or collections added from the Configuration API in your config file). Useful for your RSS feed, `sitemap.xml`, custom templated `.htaccess` files, et cetera.

{% codetitle "excluded.md" %}

```markdown
---
eleventyExcludeFromCollections: true
tags: post
---
This will not be available in `collections.all` or `collections.post`.
```

## Tag Syntax

You can use a single tag, as in the above example OR you can use any number of tags for the content, using YAML syntax for a list.

### A single tag: cat

```markdown
---
tags: cat
---
```

This content would show up in the template data inside of `collections.cat`.

### Using multiple words in a single tag

```markdown
---
tags: cat and dog
---
```

If you use multiple words for one tag you can access the content by the following syntax `collections['cat and dog']`.

### Multiple tags, single line

```markdown
---
tags: ['cat', 'dog']
---
```

This content would show up in the template data inside of `collections.cat` and `collections.dog`.

### Multiple tags, multiple lines

```markdown
---
tags:
  - cat
  - dog
---
```

This content would show up in the template data inside of `collections.cat` and `collections.dog`.

### Collection Item Data Structure

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.post -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

{% codetitle "JavaScript .11ty.js", "Syntax" %}

{% raw %}
```js
exports.render = function(data) {
  return `<ul>
    ${data.collections.post.map(post => `<li>${post.data.title}</li>`).join("\n")}
  </ul>`;
};
```
{% endraw %}

Note in the above example that we output the `post.data.title` value? Similarly, each collection item will have the following data:

* `inputPath`: the full path to the source input file (including the path to the input directory)
* `fileSlug`: {% addedin "0.5.3" %} Mapped from the input file name, useful for permalinks. Read more about [`fileSlug`](/docs/data-eleventy-supplied/#fileslug).
* `outputPath`: the full path to the output file to be written for this content
* `url`: url used to link to this piece of content.
* `date`: the resolved JS Date Object used for sorting. Read more about [Content Dates](/docs/dates/).
* `data`: all data for this piece of content (includes any data inherited from layouts)
* `templateContent`: the rendered content of this template. This does _not_ include layout wrappers.

```js
{ inputPath: './test1.md',
  fileSlug: 'test1', // fileSlug was added in 0.5.3
  outputPath: './_site/test1/index.html',
  url: '/test1/',
  date: new Date(),
  data: { title: 'Test Title', tags: ['tag1', 'tag2'], date: 'Last Modified' },
  templateContent: '<h1>This is my title</h1>\n\n<p>This is content…' }
```


## Sorting

The default collection sorting algorithm sorts in ascending order using:

1. The input file’s Created Date (you can override using `date` in front matter, as shown below)
2. Files created at the exact same time are tie-broken using the input file’s full path including filename

For example, assume I only write blog posts on New Years Day:

```
posts/postA.md (created on 2008-01-01)
posts/postB.md (created on 2008-01-01)
posts/post3.md (created on 2007-01-01)
another-posts/post1.md (created on 2011-01-01)
```

This collection would be sorted like this:

1. `posts/post3.md`
2. `posts/postA.md`
3. `posts/postB.md`
4. `another-posts/post1.md`

### Sort descending

To sort descending in your template, you can use a filter to reverse the sort order. For example, in Nunjucks it’d look like this:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.post | reverse -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

And in Liquid it’d look like this:

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```html
<ul>
{%- for post in collections.post reversed -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>
```
{% endraw %}

And in JavaScript it’d look like this:

{% codetitle "JavaScript .11ty.js", "Syntax" %}

{% raw %}
```js
exports.render = function(data) {
  let posts = data.collections.post.reverse();
  return `<ul>
    ${posts.map(post => `<li>${post.data.title}</li>`).join("\n")}
  </ul>`;
};
```
{% endraw %}

{% callout "warn" %}
  <p id="array-reverse">You should <em><strong>not</strong></em> use Array <code>reverse()</code> on collection arrays in your templates, like so:</p>
  <p><code>{%raw %}{%- for post in collections.post.reverse() -%}{% endraw %}</code></p>
  <p>This will <a href="https://doesitmutate.xyz/reverse/">mutate the array</a> and re-order it <em>in-place</em> and will have side effects for any use of that collection in other templates.</p>
  <p>Instead, use one of the many template engine utilities provided for you to do this, such as <a href="http://shopify.github.io/liquid/filters/reverse/">Liquid’s <code>reverse</code></a> or <a href="https://mozilla.github.io/nunjucks/templating.html#reverse">Nunjucks’ <code>reverse</code></a></p>
  <p>This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</p>
{% endcallout %}

### Overriding Content Dates

You can modify how a piece of content is sorted in a collection by changing it’s default `date`. [Read more at Content Dates](/docs/dates/).

```markdown
---
date: 2016-01-01
---
```

## Advanced: Custom Filtering and Sorting

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

  eleventyConfig.addCollection("myCollectionName", function(collectionApi) {
    // get unsorted items
    return collectionApi.getAll();
  });

};
```

{% addedin "0.8.0" %} `addCollection` can accept `async` functions too. Use `await` in your callback to do some asynchronous things!

### Return values

* These `addCollection` callbacks should return an array of [template objects](#collection-item-data-structure) (in Eleventy 0.5.2 and prior).
* {% addedin "0.5.3" %} `addCollection` callbacks can now return any arbitrary object type and it’ll be available as data in the template. Arrays, strings, objects—have fun with it.

### Collection API Methods

The data collection gets passed to the callback. You can use it in all sorts of ways:

#### getAll()

Returns an array.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Unsorted items (in whatever order they were added)
  eleventyConfig.addCollection("allMyContent", function(collectionApi) {
    return collectionApi.getAll();
  });
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Filter using `Array.filter`
  eleventyConfig.addCollection("keyMustExistInData", function(collectionApi) {
    return collectionApi.getAll().filter(function(item) {
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
  eleventyConfig.addCollection("myCustomSort", function(collectionApi) {
    return collectionApi.getAll().sort(function(a, b) {
      //return a.date - b.date; // sort by date - ascending
      return b.date - a.date; // sort by date - descending
      //return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
      //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
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
  eleventyConfig.addCollection("allMySortedContent", function(collectionApi) {
    return collectionApi.getAllSorted();
  });
};
```

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Use the default sorting algorithm in reverse (descending dir, date, filename)
  // Note that using a template engine’s `reverse` filter might be easier here
  eleventyConfig.addCollection("myPostsReverse", function(collectionApi) {
    return collectionApi.getAllSorted().reverse();
  });
};
```

Note that while Array `.reverse()` mutates the array _in-place_, all Eleventy Collection API methods return new copies of collection arrays and can be modified without side effects to other collections. <a href="#array-reverse">However, you do need to be careful ⚠️ when using Array `.reverse()` in templates!</a>

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Filter using `Array.filter`
  eleventyConfig.addCollection("onlyMarkdown", function(collectionApi) {
    return collectionApi.getAllSorted().filter(function(item) {
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
  eleventyConfig.addCollection("myPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post");
  });
};
```

#### getFilteredByTags( tagName, secondTagName, […] )

Retrieve content that includes *all* of the tags passed in. Returns an array.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Get only content that matches a tag
  eleventyConfig.addCollection("myTravelPostsWithPhotos", function(collectionApi) {
    return collectionApi.getFilteredByTags("post", "travel", "photo");
  });
};
```


#### getFilteredByGlob( glob )

Returns an array. Will match an arbitrary glob (or an array of globs) against the input file’s full `inputPath` (including the input directory).

{% callout "info" %}
<strong>Note</strong>: <code>getFilteredByGlob</code> filters results returned from <a href="#getallsorted()"><code>getAllSorted</code></a>. It will not search the file system for new templates. It will not match files in your <code>_includes</code> directory or anything excluded by <code>eleventyExcludeFromCollections</code>.
{% endcallout %}

{% callout "info" %}
<strong>Note</strong>: <code>getFilteredByGlob</code> will not "find" files that are not supported by Eleventy. For example, a file with the extension <code>.ray</code> will be ignored even if it would match the glob.
{% endcallout %}

{% codetitle ".eleventy.js" %}
{% addedin "0.2.14" %}

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("onlyMarkdown", function(collectionApi) {
    return collectionApi.getFilteredByGlob("**/*.md");
  });
};
```

{% codetitle ".eleventy.js" %}
{% addedin "0.2.14" %}

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md");
  });
};
```

{% codetitle ".eleventy.js" %}
{% addedin "0.2.14" %}

```js
module.exports = function(eleventyConfig) {
  // Filter source file names using a glob
  eleventyConfig.addCollection("posts", function(collectionApi) {
    // Also accepts an array of globs!
    return collectionApi.getFilteredByGlob(["posts/*.md", "notes/*.md"]);
  });
};
```
