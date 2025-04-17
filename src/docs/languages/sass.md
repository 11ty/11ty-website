---
eleventyNavigation:
  parent: Template Languages
  key: Sass
  order: 9
layout: layouts/langs.njk
logoImage: "./src/img/logos/sass.svg"
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `scss`          | `.scss`         | [`sass`](https://www.npmjs.com/package/sass) |

- [_Related: Eleventy Custom Templates for JavaScript and CSS_](/docs/assets/#eleventy-custom-templates)

## Configuration

_If you’d like to read a more detailed explanation of the following code, there is more detail on the [Custom template syntax documentation](/docs/languages/custom/#example-add-sass-support-to-eleventy)._

The following configuration will read and render `*.scss` files as `.css` files in your output directory. _[GitHub #408](https://github.com/11ty/eleventy/issues/408)._

Don’t forget to `npm install sass`!


{% set codeContent %}
import path from "node:path";
import * as sass from "sass";

export default function (eleventyConfig) {
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Now run Eleventy and tell it to process `scss` files:

```sh
npx @11ty/eleventy --formats=scss
```

Alternatively, you can add `eleventyConfig.addTemplateFormats("scss")` to your configuration file.

## Community Contributions
