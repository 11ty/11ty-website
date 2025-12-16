---
eleventyNavigation:
  parent: Learn
  key: CommonJS and ESM
  excerpt: Two different flavors of JavaScript
---

# {{ eleventyNavigation.key }}

{% tableofcontents %}

* Related: [JavaScript Modules on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Eleventy has always been compatible with CommonJS, the default Node.js flavor of JavaScript modules. ECMAScript Modules (also known as: ESM) is a newer JavaScript standard is supported by more JavaScript environments and runtimes (browsers, even!). **ESM is also supported by Eleventy (v3 and newer).**

It’s important to remember that Eleventy is **compatible with both module types** and will continue to support both moving forward. The module type affects the JavaScript syntax for Exports, Imports, and your file extensions:

<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>CommonJS</th>
			<th>ESM</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Exports</td>
			<td><code>module.exports</code></td>
			<td><code>export</code></td>
		</tr>
		<tr>
			<td>Imports</td>
			<td><code>require</code></td>
			<td><code>import</code></td>
		</tr>
		<tr>
			<td>File Extension</td>
			<td><code>.js</code> and <code>.cjs</code></td>
			<td><code>.js</code> and <code>.mjs</code></td>
		</tr>
	</tbody>
</table>

This applies to the following Eleventy project files and features:

- [Configuration files](/docs/config/)
- [JavaScript Data Files](/docs/data-js/)
- [JavaScript Templates](/docs/languages/javascript/) (e.g. `11ty.js`)
- [JavaScript Front Matter](/docs/data-frontmatter/#java-script-front-matter)

## JavaScript Runtimes

Eleventy has goals to broadly support the same module formats as the [JavaScript runtime](/docs/javascript-runtime/) you choose to run Eleventy in.

### Node.js and Deno

<table>
	<thead>
		<tr>
			<th>Eleventy Version</th>
			<th>ESM</th>
			<th>CommonJS</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>@11ty/eleventy@2</code> and older</td>
			<td>❌ Not available</td>
			<td>✅ Supported</td>
		</tr>
		<tr>
			<td><code>@11ty/eleventy@3</code> and newer</td>
			<td>✅ Supported</td>
			<td>✅ Supported</td>
		</tr>
	</tbody>
</table>

Both CommonJS and ESM are supported in Node.js and Deno. If you want to use ESM in your Eleventy (v3+) project running Node.js, you can do this project-wide or incrementally on a per-file basis:

1. **Project-wide**: Adding `"type": "module"` in your `package.json`, which swaps the default for `.js` files from CommonJS to ESM.
	- Notably, Deno uses `"type": "module"` as the default and Node.js uses `"type": "commonjs"` as the default (if not specified).
1. **Individual files** (incremental migration): by using the `.mjs` file extension instead of `.js` you can change a single file to use ESM.

**If your Eleventy project already uses CommonJS, you can keep using CommonJS**: using _ESM is not required_. Eleventy will continue to support CommonJS moving forward. Our docs include code snippets for both CommonJS and ESM.

`.js`, `.cjs`, and `.mjs` file extensions are supported for [Configuration Files](/docs/config.md), [JavaScript Data Files](/docs/data-js.md) and [JavaScript (`.11ty.js`) templates](/docs/languages/javascript.md).

- Related: read more about [Deno’s CommonJS compatibility](https://docs.deno.com/runtime/fundamentals/node/#commonjs-support).

### Web Browsers

{% callout "info" %}Coming to Eleventy v4 via <code>@11ty/client</code>!{% endcallout %}

## Configuration

Read more about [supported configuration file names](/docs/config.md#default-filenames).

### ESM Configuration

Your [configuration file](/docs/config.md) using ESM can use Eleventy bundled plugins (like [i18n](/docs/plugins/i18n/), [Render](/docs/plugins/render/), [InputPath to URL](/docs/plugins/inputpath-to-url/), [`id` Attribute](/docs/plugins/id-attribute/) or [HTML `<base>`](/docs/plugins/html-base/)) directly:

{%- set codeBlock %}{% raw %}
// Any combination of these
import { I18nPlugin, RenderPlugin, HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the use of `import` and `export default`.

### CommonJS Configuration

If you use Eleventy bundled plugins (like [i18n](/docs/plugins/i18n/), [Render](/docs/plugins/render/), [InputPath to URL](/docs/plugins/inputpath-to-url/), [`id` Attribute](/docs/plugins/id-attribute/) or [HTML `<base>`](/docs/plugins/html-base/)), you have a few options to use Eleventy v3 in your [configuration file](/docs/config.md).

Consider this CommonJS configuration file:

{%- set codeBlock %}{% raw %}
// This requires Node v20.19 or newer
const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

- Read more about [`require(ESM)` in Node.js](https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require)

If you attempt to `require("@11ty/eleventy")` with Eleventy v3 in a version of Node that does not support it, we’ll throw a [very helpful error message which will provide you exact instructions on how to fix the issue](https://www.zachleat.com/web/future-friendly-esm/).

#### CommonJS Configuration in Node 18

For older versions of Node.js, you’ll need to use a dynamic `import()` instead of `require` (or change your configuration file to use ESM):

{%- set codeBlock %}{% raw %}
module.exports = async function (eleventyConfig) {
	const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = await import("@11ty/eleventy");
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the `async` configuration callback.

#### Using ESM plugins in CommonJS Configuration

You can use any third-party plugin written in ESM using the same approach. Keep in mind that using default export as the plugin callback, you will need to use the special `default` property supplied from dynamic `import()`.

{%- set codeBlock %}{% raw %}
module.exports = async function (eleventyConfig) {
	const { default: myPlugin } = await import("my-eleventy-plugin");
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### Plugins

You can write your [Eleventy plugins](/docs/plugins.md) in CommonJS or ESM too. Which should you choose?

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>ESM or CommonJS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Compatibility with Eleventy v3 and newer</td>
      <td>✅ ESM</td>
    </tr>
    <tr>
      <td>Compatibility with Eleventy v2 or older</td>
      <td>✅ CommonJS</td>
    </tr>
    <tr>
      <td>Compatibility with Node 20.19+</td>
      <td>✅ ESM</td>
    </tr>
    <tr>
      <td>Compatibility with older Node &lt; 20.19</td>
      <td>✅ CommonJS</td>
    </tr>
  </tbody>
</table>

Notably, the same limitations documented above for Eleventy bundled plugins will apply to your plugin code as well!
