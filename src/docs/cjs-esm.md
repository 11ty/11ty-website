---
eleventyNavigation:
  parent: Learn
  key: CommonJS vs. ESM
  excerpt: Two different flavors of JavaScript
---

# {{ eleventyNavigation.key }}

{% tableofcontents %}

* Related: [JavaScript Modules on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Historically, Eleventy (prior to version 3) has worked with the Node.js default flavor of JavaScript modules: CommonJS. Practically speaking, this means you used `module.exports` and `require()` in any `.js` (or `.cjs`) files in your project. This affected Configuration files, JavaScript Data Files, and JavaScript (`.11ty.js`) templates.

However, ESM (ECMAScript Modules) are a newer JavaScript standard that will work in more JavaScript environments and runtimes. Instead of `module.exports` and `require()`, you’ll use `export` and `import()`.

## Runtimes

### Node.js

If you want to start using ESM in your project, there are two ways to do it in Node.js (both of which work fine in Eleventy v3):

1. **Project-wide**: Adding `"type": "module"` in your `package.json`, which swaps the default for `.js` files from CommonJS to ESM.
1. **Individual files** (incremental migration): by using the `.mjs` file extension instead of `.js` you can change a single file to use ESM.

**You can also choose to keep using CommonJS** in your Eleventy project: using _ESM is not required_. Eleventy will continue to support CommonJS moving forward. Our documentation shows both CommonJS and ESM versions of each JavaScript code snippet.

`.js`, `.cjs`, and `.mjs` file extensions are supported for [Configuration Files](/docs/config.md), [JavaScript Data Files](/docs/data-js.md) and [JavaScript (`.11ty.js`) templates](/docs/languages/javascript.md).

## Configuration

Read more about [supported configuration file names](/docs/config.md#default-filenames).

### CommonJS Configuration

If you use Eleventy bundled plugins (e.g. I18nPlugin, RenderPlugin, or HTMLBasePlugin, among others), you will not be able to `require` Eleventy directly in your [configuration file](/docs/config.md).

Consider this CommonJS configuration file:

{%- set codeBlock %}{% raw %}
// Any combination of these
const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

In Eleventy v3 you’ll need to use a dynamic `import()` instead of `require` (or change your configuration file to use ESM):

{%- set codeBlock %}{% raw %}
module.exports = async function (eleventyConfig) {
	const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = await import("@11ty/eleventy");
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the `async` configuration callback. This change is to work around limitations in Node.js with `require("ARBITRARY_ESM_PACKAGE")`. [Future versions of Node.js may fix this limitation](https://joyeecheung.github.io/blog/2024/03/18/require-esm-in-node-js/).

If you attempt to `require("@11ty/eleventy")` with Eleventy v3, we’ll throw a [very helpful error message which will provide you exact instructions on how to fix the issue](https://www.zachleat.com/web/future-friendly-esm/).

#### `default` and ESM plugins

When using plugin code that uses the default export as the plugin callback, you will need to use the special `default` property supplied from dynamic `import()`.

{%- set codeBlock %}{% raw %}
module.exports = async function (eleventyConfig) {
	const { default: myPlugin } = await import("my-eleventy-plugin");
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### ESM Configuration

Your [configuration file](/docs/config.md) using ESM will look like this:

{%- set codeBlock %}{% raw %}
// Any combination of these
import { I18nPlugin, RenderPlugin, HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the use of `import` and `export default`.

### Plugins

You can write your [Eleventy plugins](/docs/plugins.md) in CommonJS or ESM too.

* If you write them in ESM you’ll have to instruct folks to use the same approach as above (using dynamic `import()`).
* CommonJS plugins will work without additional instruction needed (you can `import` a CommonJS package directly without incident).
