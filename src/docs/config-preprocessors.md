---
eleventyNavigation:
  parent: Configuration
  key: Preprocessors
  order: 4.5
---

# Preprocessors {% addedin "3.0.0-alpha.17" %}

{% tableofcontents %}

The Preprocessor Configuration API allows you to intercept and modify the content in template files (_not_ [Layouts](/docs/layouts.md)) before they’re processed and rendered by Eleventy.

## Example: Drafts

Here’s an example that uses the Preprocessor API to implement a Drafts workflow:

{% raw %}
```js
export default function(eleventyConfig) {
	eleventyConfig.addProcessor("drafts", "njk,md,liquid", (data, content) => {
		// If `draft` is truthy in the template’s Data Cascade, ignore the file.
		if(data.draft) {
			return false;
		}

		// You can also modify the raw input of the template here too, be careful!
		return `${content}<!-- Template file: {{ page.inputPath }} -->`;

		// If you return nothing or `undefined`, no changes will be made to this template.
	});
};
```
{% endraw %}

* The first argument is an arbitrary `name` (`String`) used for error messaging.
* The second argument can be:
	* a `String` of comma separated file extensions
	* an `Array<String>` of file extensions
* Returning `false` will ignores the template in the same way as using [`eleventyConfig.ignores` or `.eleventyignore`](/docs/ignores.md)
* Returning nothing or `undefined` has no effect (unlike [Transforms](/docs/transforms.md))

_Originally [GitHub Issue #188](https://github.com/11ty/eleventy/issues/188#issuecomment-2224060755)._