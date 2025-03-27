---
eleventyNavigation:
  parent: JavaScript
  key: TypeScript
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—TypeScript
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name                       | File Extension | npm Package                       |
| ----------------------------------------- | -------------- | --------------------------------- |
| `11ty.ts`                                 | `.11ty.ts`     | [`tsx`](https://tsx.is/node/esm)  |
| [`11ty.tsx`](/docs/languages/typescript/) | `.11ty.tsx`    | [`tsx`](https://tsx.is/node/esm)  |

* Related languages: [JSX](/docs/languages/jsx/), [JavaScript](/docs/languages/javascript/), [Custom](/docs/languages/custom/)
* _[Front matter](/docs/data-frontmatter/) is not yet supported in TypeScript files._

{% callout "info", "md" %}TypeScript requires ESM (when used with Eleventy, read more at [Issue #3304](https://github.com/11ty/eleventy/issues/3304)). This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`. Read more about [CommonJS versus ESM](../cjs-esm.md).{% endcallout %}

## Configuration

{% addedin "3.0.0-alpha.11" %}Here we use [`tsx`](https://tsx.is/node/esm) to process TypeScript files.

<div class="codetitle">eleventy.config.js</div>

```js
import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

export default function (eleventyConfig) {
	// We can add support for JSX too, at the same time:
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

Now run Eleventy and tell it to process `11ty.ts` and `11ty.tsx` files:

```sh
npx @11ty/eleventy --formats=11ty.ts,11ty.tsx
```

Alternatively, you can add `eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx")` to your configuration file.

## Using a TypeScript Configuration File

You can use `tsx` to process your configuration file too, just run it directly like so:

```sh
npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts --formats=11ty.tsx
```

## Community Contributions <span id="alternative-approaches"></span>

* {% indieweblink "JetBrains: Better 11ty Development with Tooling", "https://www.jetbrains.com/guide/javascript/tutorials/eleventy-tsx/" %}

### Using `esbuild-register`

If you’d like an approach that works with CommonJS and Eleventy 2.0, you can use [`esbuild-register`](https://github.com/egoist/esbuild-register) with Eleventy (using the same conventions as [`11ty.js` templates](/docs/languages/javascript/)). Check out [this gist from `@pspeter3` on GitHub](https://gist.github.com/zachleat/b274ee939759b032bc320be1a03704a2) or [this GitHub comment from `@danielrob`](https://github.com/11ty/eleventy/issues/577#issuecomment-1464868585).

Your config file might look like this:

{% codetitle "eleventy.config.js (CommonJS)" %}

```js
const { register } = require("esbuild-register/dist/node");

register();

module.exports = function(eleventyConfig) {
	// We can add support for JSX too, at the same time:
	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});
};
```

Now run Eleventy and tell it to process `11ty.ts` and `11ty.tsx` files:

```sh
npx @11ty/eleventy --formats=11ty.ts,11ty.tsx
```