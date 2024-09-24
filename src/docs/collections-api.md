---
pageTitle: Collections API
eleventyNavigation:
  parent: Collections
  key: Collections API
  order: 2
  excerpt: Advanced control over collections.
---
{% tableofcontents %}

To get fancier with your collections (and even do a bit of your own custom filtering, if you’d like), you can use our Configuration API.

Inside of your `eleventy.config.js` config file, you can use the `addCollection` method:

{% include "snippets/collections/add.njk" %}

## Return values

- {% addedin "0.5.3" %} `addCollection` callbacks can return any arbitrary object type and it’ll be available as data in the template. Arrays, strings, objects—have fun with it.

## Collection API Methods

The data collection gets passed to the callback. You can use it in all sorts of ways:

### getAll()

Returns an array.

{% include "snippets/collections/getall.njk" %}

#### Example: `getAll().filter()`

{% include "snippets/collections/getallfilter.njk" %}

#### Example: `getAll().sort()`

{% include "snippets/collections/getallsort.njk" %}

Curious where the date is coming from? [Read more about Content Dates](/docs/dates/).

Note that the last example adding the `myCustomSort` collection will be available in your templates as `collections.myCustomSort`.

### getAllSorted()

Returns an array.

{% include "snippets/collections/getallsorted.njk" %}

#### Example: `getAllSorted().reverse()`

{% include "snippets/collections/getallsorted-reverse.njk" %}

Note that while Array `.reverse()` mutates the array _in-place_, all Eleventy Collection API methods return new copies of collection arrays and can be modified without side effects to other collections. You can also use `.toReversed()` if you want to avoid mutations (Node 20+). However, <a href="/docs/collections.md#do-not-use-array-reverse()">you do need to <strong>be careful when using Array `.reverse()`</strong> in templates!</a>

#### Example: `getAllSorted().filter()`

{% include "snippets/collections/getallsorted-filter.njk" %}

### getFilteredByTag( tagName )

Returns an array.

{% include "snippets/collections/getfilteredbytag.njk" %}

### getFilteredByTags( tagName, secondTagName, […] )

Retrieve content that includes _all_ of the tags passed in. Returns an array.

{% include "snippets/collections/getfilteredbytags.njk" %}

### getFilteredByGlob( glob )

Returns an array. Will match an arbitrary glob (or an array of globs) against the input file’s full `inputPath` (including the input directory).

{% callout "info" %}
<strong>Note</strong>: <code>getFilteredByGlob</code> filters results returned from <a href="#getallsorted()"><code>getAllSorted</code></a>. It will not search the file system for new templates. It will not match files in your <a href="/docs/config.md#directory-for-includes">Includes directory</a> or anything excluded by <code>eleventyExcludeFromCollections</code>.
{% endcallout %}

{% callout "info" %}
<strong>Note</strong>: <code>getFilteredByGlob</code> will not find files that are not supported by Eleventy. For example, a file with the extension <code>.ray</code> will be ignored even if it would match the glob.
{% endcallout %}

{% include "snippets/collections/getfilteredbyglob.njk" %}