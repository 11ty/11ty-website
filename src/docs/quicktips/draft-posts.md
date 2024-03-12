---
tipindex: "011"
tiptitle: "Draft Posts using Computed Data"
date: 2023-01-24
tags: []
relatedTitle: "Quick Tip #011—Draft Posts using Computed Data"
---

Here’s a quick snippet that shows how to combine Eleventy’s [Configuration API Global Data](/docs/data-global-custom/) and [Computed Data](/docs/data-computed/) features in your Eleventy Configuration file to implement a simple drafts feature for any piece of content.

Set `draft: true` anywhere in a file’s [data cascade](/docs/data-cascade/) and that file will be _only_ be built when using Eleventy in `--serve` or `--watch` modes. It will be excluded from full Eleventy builds.

You might imagine how this could be extended to add a publishing date feature too: to exclude content from builds before a specific date set in a post’s front matter (or elsewhere in the data cascade).

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// When `permalink` is false, the file is not written to disk
	eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
		return (data) => {
			// Always skip during non-watch/serve builds
			if (data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		};
	});

	// When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData(
		"eleventyComputed.eleventyExcludeFromCollections",
		function () {
			return (data) => {
				// Always exclude from non-watch/serve builds
				if (data.draft && !process.env.BUILD_DRAFTS) {
					return true;
				}

				return data.eleventyExcludeFromCollections;
			};
		}
	);

	eleventyConfig.on("eleventy.before", ({ runMode }) => {
		// Set the environment variable
		if (runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
	});
};
```

## Related

- You can see the [above code in action on the `eleventy-base-blog` project](https://github.com/11ty/eleventy-base-blog/blob/851eafdc4c3a612142e0e6ae84f54cb0f0eb98b1/eleventy.config.drafts.js)
- [Skip Writing to the File System with `permalink: false`](/docs/permalinks/#skip-writing-to-the-file-system)
- [How to exclude content from collections with `eleventyExcludeFromCollections`](/docs/collections/#how-to-exclude-content-from-collections)
