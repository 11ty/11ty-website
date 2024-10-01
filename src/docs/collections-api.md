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

{% set codeContent %}
export default function (eleventyConfig) {
	// async-friendly
	eleventyConfig.addCollection("myCollectionName", async (collectionsApi) => {
		// get unsorted items
		return collectionsApi.getAll();
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Return values

- {% addedin "0.5.3" %} `addCollection` callbacks can return any arbitrary object type and it’ll be available as data in the template. Arrays, strings, objects—have fun with it.

## Collection API Methods

The data collection gets passed to the callback. You can use it in all sorts of ways:

### getAll()

Returns an array.

{% set codeContent %}
export default function (eleventyConfig) {
	// Unsorted items (in whatever order they were added)
	eleventyConfig.addCollection("allMyContent", function (collectionsApi) {
		return collectionsApi.getAll();
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Example: `getAll().filter()`

{% set codeContent %}
export default function (eleventyConfig) {
	// Filter using `Array.filter`
	eleventyConfig.addCollection("keyMustExistInData", function (collectionsApi) {
		return collectionsApi.getAll().filter(function (item) {
			// Side-step tags and do your own filtering
			return "myCustomDataKey" in item.data;
		});
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Example: `getAll().sort()`

{% set codeContent %}
export default function (eleventyConfig) {
	// Sort with `Array.sort`
	eleventyConfig.addCollection("myCustomSort", function (collectionsApi) {
		return collectionsApi.getAll().sort(function (a, b) {
			//return a.date - b.date; // sort by date - ascending
			return b.date - a.date; // sort by date - descending
			//return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
			//return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
		});
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Curious where the date is coming from? [Read more about Content Dates](/docs/dates/).

Note that the last example adding the `myCustomSort` collection will be available in your templates as `collections.myCustomSort`.

### getAllSorted()

Returns an array.

{% set codeContent %}
export default function (eleventyConfig) {
	// Use the default sorting algorithm (ascending by date, filename tiebreaker)
	eleventyConfig.addCollection("allMySortedContent", function (collectionsApi) {
		return collectionsApi.getAllSorted();
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Example: `getAllSorted().reverse()`

{% set codeContent %}
export default function (eleventyConfig) {
	// Use the default sorting algorithm in reverse (descending dir, date, filename)
	// Note that using a template engine’s `reverse` filter might be easier here
	eleventyConfig.addCollection("myPostsReverse", function (collectionsApi) {
		return collectionsApi.getAllSorted().reverse();
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Note that while Array `.reverse()` mutates the array _in-place_, all Eleventy Collection API methods return new copies of collection arrays and can be modified without side effects to other collections. You can also use `.toReversed()` if you want to avoid mutations (Node 20+). However, <a href="/docs/collections.md#do-not-use-array-reverse()">you do need to <strong>be careful when using Array `.reverse()`</strong> in templates!</a>

#### Example: `getAllSorted().filter()`

{% set codeContent %}
export default function (eleventyConfig) {
	// Filter using `Array.filter`
	eleventyConfig.addCollection("onlyMarkdown", function (collectionsApi) {
		return collectionsApi.getAllSorted().filter(function (item) {
			// Only return content that was originally a markdown file
			let extension = item.inputPath.split(".").pop();
			return extension === "md";
		});
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### getFilteredByTag( tagName )

Returns an array.

{% set codeContent %}
export default function (eleventyConfig) {
	// Get only content that matches a tag
	eleventyConfig.addCollection("myPosts", function (collectionsApi) {
		return collectionsApi.getFilteredByTag("post");
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### getFilteredByTags( tagName, secondTagName, […] )

Retrieve content that includes _all_ of the tags passed in. Returns an array.

{% set codeContent %}
export default function (eleventyConfig) {
	// Get only content that matches a tag
	eleventyConfig.addCollection(
		"myTravelPostsWithPhotos",
		function (collectionsApi) {
			return collectionsApi.getFilteredByTags("post", "travel", "photo");
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### getFilteredByGlob( glob )

Returns an array. Will match an arbitrary glob (or an array of globs) against the input file’s full `inputPath` (including the input directory).

{% callout "info" %}
<strong>Note</strong>: <code>getFilteredByGlob</code> filters results returned from <a href="#getallsorted()"><code>getAllSorted</code></a>. It will not search the file system for new templates. It will not match files in your <a href="/docs/config.md#directory-for-includes">Includes directory</a> or anything excluded by <code>eleventyExcludeFromCollections</code>.
{% endcallout %}

{% callout "info" %}
<strong>Note</strong>: <code>getFilteredByGlob</code> will not find files that are not supported by Eleventy. For example, a file with the extension <code>.ray</code> will be ignored even if it would match the glob.
{% endcallout %}

{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.addCollection("onlyMarkdown", function (collectionApi) {
		return collectionApi.getFilteredByGlob("**/*.md");
	});

	eleventyConfig.addCollection("posts", function (collectionApi) {
		return collectionApi.getFilteredByGlob("_posts/*.md");
	});

	eleventyConfig.addCollection("posts", function (collectionApi) {
		// Also accepts an array of globs!
		return collectionApi.getFilteredByGlob(["posts/*.md", "notes/*.md"]);
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}