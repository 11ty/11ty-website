---
eleventyNavigation:
  parent: Markdown
  key: MDX
  order: 11.1
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—MDX
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `mdx`          | `.mdx`         | [`@mdx-js/node-loader`](https://mdxjs.com/packages/node-loader/) |

* Related languages: [Markdown](/docs/languages/markdown/), [JSX](/docs/languages/jsx/), [Custom](/docs/languages/custom/)
* _[Front matter](/docs/data-frontmatter/) is not yet supported in MDX files._
* While [Markdown files](/docs/languages/markdown/) are preprocessed as Liquid, MDX files are not preprocessed by any other template syntax.

{% callout "info", "md" %}MDX requires ESM. This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`.{% endcallout %}

## Configuration

{% addedin "3.0.0-alpha.11" %}MDX provides a Node.js loader ([`@mdx-js/node-loader`](https://mdxjs.com/packages/node-loader/) on npm). We can add this to our Eleventy configuration file to render `*.mdx` files.

{% codetitle "eleventy.config.js (ESM)" %}

```js
import {renderToStaticMarkup} from 'react-dom/server'
import {register} from 'node:module';

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

## Community Contributions

* [`eleventy-plugin-mdx`](https://github.com/jamshop/eleventy-plugin-mdx)