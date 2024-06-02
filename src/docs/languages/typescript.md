---
eleventyNavigation:
  parent: JavaScript
  key: TypeScript
  order: 11.1
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—TypeScript
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name                       | File Extension | npm Package                       |
| ----------------------------------------- | -------------- | --------------------------------- |
| `11ty.ts`                                 | `.11ty.ts`     | [`tsx`](https://tsx.is/node/esm)  |
| [`11ty.tsx`](/docs/languages/typescript/) | `.11ty.tsx`    | [`tsx`](https://tsx.is/node/esm)  |

* Related languages: [JSX](/docs/languages/jsx/), [JavaScript](/docs/languages/javascript/)
* _[Front matter](/docs/data-frontmatter/) is not yet supported in TypeScript files._

{% callout "info", "md" %}TypeScript requires ESM (when used with Eleventy, read more at [Issue #3304](https://github.com/11ty/eleventy/issues/3304)). This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`.{% endcallout %}


## Configuration

{% addedin "3.0.0-alpha.11" %}Here we use [`tsx`](https://tsx.is/node/esm) to process TypeScript files.

{% codetitle "eleventy.config.js (ESM)" %}

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
