---
eleventyNavigation:
  parent: Markdown
  key: MDX
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—MDX
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `mdx`          | `.mdx`         | [`@mdx-js/node-loader`](https://mdxjs.com/packages/node-loader/) |

* Related languages: [Markdown](/docs/languages/markdown/), [JSX](/docs/languages/jsx/), [Custom](/docs/languages/custom/)
* While [Markdown files](/docs/languages/markdown/) are preprocessed as Liquid, MDX files are not preprocessed by any other template syntax.

{% callout "info", "md" %}MDX requires ESM. This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`.{% endcallout %}

## Configuration

The following configuration will read `*.mdx` files with full compatibility for [front matter](../data-frontmatter.md) (in `.mdx` files!). _[GitHub #3760](https://github.com/11ty/eleventy/issues/3760)._

<div class="codetitle">eleventy.config.js</div>

```js
import {pathToFileURL} from "node:url";
import {evaluate} from "@mdx-js/mdx";
import {renderToStaticMarkup} from "react-dom/server";
import * as runtime from "react/jsx-runtime";

export default function(eleventyConfig) {
	eleventyConfig.addExtension("mdx", {
		compile: async (str, inputPath) => {
			const { default: mdxContent } = await evaluate(str, {
				...runtime,
				baseUrl: pathToFileURL(inputPath)
			});

			return async function(data) {
				let res = await mdxContent(data);
				return renderToStaticMarkup(res);
			}
		}
	});
};
```

Now run Eleventy and tell it to process `mdx` files:

```sh
npx @11ty/eleventy --formats=mdx
```

Alternatively, you can add `eleventyConfig.addTemplateFormats("mdx")` to your configuration file.

## Example MDX Template

```jsx
export function Thing() {
  return <>World!</>
}

# Hello, <Thing />
```

The above is rendered as `<h1>Hello, World!</h1>`.

Read more on the [What is MDX? docs](https://mdxjs.com/docs/what-is-mdx/).

## Alternate Configuration: use MDX Loader

{% addedin "3.0.0-alpha.11" %}MDX provides a Node.js loader ([`@mdx-js/node-loader`](https://mdxjs.com/packages/node-loader/) on npm). This approach may be marginally faster but will **not** include support for Front Matter in `.mdx` files.

<div class="codetitle">eleventy.config.js</div>

```js
import {register} from 'node:module';
import {renderToStaticMarkup} from 'react-dom/server'

register('@mdx-js/node-loader', import.meta.url);

export default function(eleventyConfig) {
	eleventyConfig.addExtension("mdx", {
		key: "11ty.js",
		compile: () => {
			return async function(data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		}
	});
};
```

## Community Contributions

* [`eleventy-plugin-mdx`](https://github.com/jamshop/eleventy-plugin-mdx)