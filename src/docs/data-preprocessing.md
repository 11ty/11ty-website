---
eleventyNavigation:
  parent: Global Data Files
  key: Data Preprocessing
  order: 4
---

# Global Data File Preprocessing

{% callout "error" %}<strong>Feature Removal</strong>: This feature was removed in Eleventy 2.0. You can use <a href="/docs/data-js/">JavaScript Data Files</a> or <a href="/docs/data-computed/">Computed Data</a> instead.{% endcallout %}

The `dir.data` global data files run through this template engine before transforming to JSON. Read more about [Global Data Files](/docs/data-global/).

| Data Template Engine    |                                                                   |
| ----------------------- | ----------------------------------------------------------------- |
| _Object Key_            | `dataTemplateEngine`                                              |
| _Default_               | `"liquid"` (before 1.0)                                           |
| _Default_               | `false` (1.0 and above)                                           |
| _Valid Options_         | A valid [template engine short name](/docs/languages/) or `false` |
| _Command Line Override_ | _None_                                                            |

[Global JSON data files](/docs/data-global/) (_not template/directory data files_) can be optionally preprocessed with a template engine specified under the `dataTemplateEngine` configuration option.

## Example

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	return {
		dataTemplateEngine: "njk",
	};
};
```

For example, if your `dataTemplateEngine` is using `njk` or `liquid` you can do this in any `*.json` files in your `_data` folder:

{% codetitle "_data/myfile.json" %}

{% raw %}

```json
{
	"version": "{{ pkg.version }}"
}
```

{% endraw %}

`package.json` data is available here supplied by Eleventy in the `pkg` variable.
