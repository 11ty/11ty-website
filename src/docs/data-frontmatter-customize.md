---
eleventyNavigation:
  parent: Front Matter Data
  key: Custom Front Matter
  order: 1
relatedLinks:
  /docs/data-custom/: Custom Data File Formats
---

# Custom Front Matter Options {% addedin "0.9.0" %}

{% tableofcontents %}

Eleventy uses the [`gray-matter` npm package](https://www.npmjs.com/package/gray-matter) for parsing front matter. `gray-matter` allows additional options that aren’t available by default in Eleventy.

Check out the [full list of available `gray-matter` options](https://www.npmjs.com/package/gray-matter#options). By default, Eleventy uses `gray-matter`’s default options.

- [**Related**: Change the default Front Matter syntax project-wide](/docs/data-frontmatter/#change-the-default-format-project-wide)

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		/* … */
	});
};
```

### Example: use JavaScript in your front matter {% addedin "0.9.0" %}

While the existing `js` front matter type uses an object literal, this example makes use of any arbitrary JavaScript and exports all of the top level variables and functions.

- Makes use of the [`node-retrieve-globals` package](https://github.com/zachleat/node-retrieve-globals/).
- Check out the [`demo-eleventy-js-front-matter`](https://github.com/11ty/demo-eleventy-js-front-matter) repo for a full demo of this in action.

Here’s what this might look in a Nunjucks template:

{% codetitle "page.njk" %}

{% raw %}

```js
---javascript
const myString = "Hi";

// export a function
function myFunction() {}
---
<!-- The template content goes here -->
<div>{{ myString }}</div>
<div>{{ myFunction() }}</div>
```

{% endraw %}

<details>
<summary>More advanced usage options</summary>

{% raw %}

```js
---javascript
// async-friendly
const myAsyncString = await Promise.resolve("HELLO FROM THE OTHER SIDE");

// export via destructuring assignment
const { myKey } = { myKey: "myValue" };
const [ first, second ] = [ "first", "second" ];

// export via dynamic import
const { noop } = await import("@zachleat/noop");

// access Node.js globals like console.log
console.log({ noop });
---
<!-- The template content goes here -->
```

{% endraw %}

</details>

To enable this, use the following configuration:

{% codetitle ".eleventy.js" %}

```js
const { RetrieveGlobals } = require("node-retrieve-globals");

module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		engines: {
			javascript: function (frontMatterCode) {
				let vm = new RetrieveGlobals(frontMatterCode);

				// Do you want to pass in your own data here?
				let data = {};
				return vm.getGlobalContext(data, {
					reuseGlobal: true,
					dynamicImport: true,
				});
			},
		},
	});
};
```

### Example: using TOML for front matter parsing {% addedin "0.9.0" %}

While Eleventy does include support for [JSON, YAML, and JS front matter out of the box](/docs/data-frontmatter/#alternative-front-matter-formats), you may want to add additional formats too.

{% codetitle ".eleventy.js" %}

```js
// Don’t forget to `npm install @iarna/toml`
const toml = require("@iarna/toml");

module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		engines: {
			toml: toml.parse.bind(toml),
		},
	});
};
```

For more information, read [this example on the `gray-matter` documentation](https://www.npmjs.com/package/gray-matter#optionsengines).

Now you can use TOML in your front matter like this:

{% codetitle "sample.md" %}

```markdown
---toml
title = "My page title using TOML"
---

<!doctype html>
<html>
…
```

### Example: Parse excerpts from content {% addedin "0.9.0" %}

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: "<!-- excerpt -->",
	});
};
```

Now you can do things like this:

{% codetitle "sample.md" %}

```markdown
---
title: My page title
---

This is the start of my content and this will be shown as the excerpt.

<!-- excerpt -->

This is a continuation of my content…
```

Your template’s content will include the excerpt but remove the separator:

```
This is the start of my content and this will be shown as the excerpt.
This is a continuation of my content…
```

`page.excerpt` now holds `This is the start of my content and this will be shown as the excerpt.`

{% callout "info" %}<strong>Don’t want your excerpt included with your content?</strong> The unique feature of this configuration is that you can keep your excerpt right at the beginning of your content. You can add a delimiter where you want the excerpt to end and the rest of the content to begin. If you want the excerpt to be separate from the content, make a new key for this and store it separately in your front matter or a data file.{% endcallout %}

#### Changing where your excerpt is stored

If you don’t want to use `page.excerpt` to store your excerpt value, then use your own `excerpt_alias` option ([any valid path to Lodash Set will work](https://lodash.com/docs/4.17.15#set)) like so:

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Eleventy custom option
		// The variable where the excerpt will be stored.
		excerpt_alias: "my_custom_excerpt",
	});
};
```

Using `excerpt_alias: 'my_custom_excerpt'` means that the excerpt will be available in your templates as the `my_custom_excerpt` variable instead of `page.excerpt`.
