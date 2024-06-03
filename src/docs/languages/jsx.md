---
eleventyNavigation:
  parent: JavaScript
  key: JSX
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—JSX
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name                       | File Extension | npm Package                       |
| ----------------------------------------- | -------------- | --------------------------------- |
| `11ty.jsx`                                | `.11ty.jsx`    | [`tsx`](https://tsx.is/node/esm)  |
| [`11ty.tsx`](/docs/languages/typescript/) | `.11ty.tsx`    | [`tsx`](https://tsx.is/node/esm)  |

- Related languages: [TypeScript](/docs/languages/typescript/), [JavaScript](/docs/languages/javascript/), [MDX](/docs/languages/mdx/), [Custom](/docs/languages/custom/)
- _[Front matter](/docs/data-frontmatter/) is not yet supported in JSX files._

{% callout "info", "md" %}JSX requires ESM (when used with Eleventy, read more at [Issue #3304](https://github.com/11ty/eleventy/issues/3304)). This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`.{% endcallout %}

## Configuration

{% addedin "3.0.0-alpha.11" %}Here we use [`tsx`](https://tsx.is/node/esm) to process JSX files.

{% codetitle "eleventy.config.js (ESM)" %}

```js
import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

export default function (eleventyConfig) {
	// We can add support for TypeScript too, at the same time:
	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: function () {
			return async function (data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		},
	});
}
```

Now run Eleventy and tell it to process `11ty.jsx` and `11ty.tsx` files:

```sh
npx @11ty/eleventy --formats=11ty.jsx,11ty.tsx
```

Alternatively, you can add `eleventyConfig.addTemplateFormats("11ty.jsx,11ty.tsx")` to your configuration file.

## Community Contributions

* {% indieweblink "eleventy-hast-jsx", "https://github.com/j-f1/eleventy-hast-jsx" %}
* {% indieweblink "eleventy-plugin-react-ssr", "https://github.com/scinos/eleventy-plugin-react-ssr" %}

## Alternative Approaches

If you’d like an approach that works with CommonJS and Eleventy 2.0, you can use [`esbuild-register`](https://github.com/egoist/esbuild-register) with Eleventy (using the same conventions as [`11ty.js` templates](/docs/languages/javascript/)). Check out [this gist from `@pspeter3` on GitHub](https://gist.github.com/zachleat/b274ee939759b032bc320be1a03704a2) or [this GitHub comment from `@danielrob`](https://github.com/11ty/eleventy/issues/577#issuecomment-1464868585).

Your config file might look like this:

{% codetitle "eleventy.config.js (CommonJS)" %}

```js
const { register } = require('esbuild-register/dist/node')

register();

module.exports = function(eleventyConfig) {
	// We can add support for TypeScript too, at the same time:
	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});
};
```

Now run Eleventy and tell it to process `11ty.jsx` and `11ty.tsx` files:

```sh
npx @11ty/eleventy --formats=11ty.jsx,11ty.tsx
```