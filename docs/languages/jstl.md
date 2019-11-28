---
eleventyNavigation:
  parent: JavaScript
  key: JavaScript Template Literals
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package |
| ------------------- | -------------- | ----------- |
| `jstl`              | `.jstl`        | N/A         |

{% callout "warn" %}For most use cases, it’s recommended to use the standard <a href="/docs/languages/javascript/">JavaScript template type</a>, which has more comprehensive support for template literals.{% endcallout %}

You can override a `.jstl` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/languages/).

JavaScript Template Literal files behave like other Eleventy template languages: primarily because they support Front Matter and don’t necessarily look like JavaScript.

For `.jstl` files, tagged templates are not yet supported. Use the [JavaScript template type](/docs/languages/javascript/) if you want to use tagged templates.

Read more about [JavaScript Template Literals on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

## Samples

This works the same as any other template. You can include front matter and everything outside the front matter will be parsed as a standard JavaScript Template Literal.

{% codetitle "name-sample.jstl" %}

```js
---
name: zach
---
<p>${name.toUpperCase()}</p>
```

While backticks around your template content are considered optional, you can include them if you’d like.

{% codetitle "name-sample-with-backticks.jstl" %}

```js
---
name: zach
---
`<p>${name.toUpperCase()}</p>`
```