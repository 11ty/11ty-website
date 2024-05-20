---
eleventyNavigation:
  key: HTML Base
  title: "HTML <code>&lt;base&gt;</code>"
  order: 3.1
  excerpt: Emulate the <code>&lt;base&gt;</code> element by adding a prefix to all URLs in <code>.html</code> output files.
---

# HTML `<base>` {% addedin "2.0.0-canary.15" %}

{% tableofcontents %}

A build-time application of `<base>` to HTML (without relying on `<base>`) by modifying `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]`, and more.

- Read about [HTML’s `<base>` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)

If you want to deploy your project in a different directory without changing the content, Eleventy provides a [Path Prefix feature to specify the target directory](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix).

- via `--pathprefix` on the command line
- or via `pathPrefix` object key in your configuration file return object

Historically, we then recommended to use the provided [`url` filter](/docs/filters/url/) in your templates to transform any local URL with the path prefix. The downside of this method was that it required you to remember and opt-in every URL transformation in your content!

## The New Way: HTML `<base>` Plugin

With this new plugin, you no longer need to use the `url` filter in your HTML content. This plugin adds an [Eleventy Transform](/docs/config/#transforms) that will modify your HTML output and inject your Path Prefix in your template content.

- Behind the scenes, this plugin uses [posthtml-urls](https://github.com/posthtml/posthtml-urls) and transforms `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/posthtml/posthtml-urls/blob/307c91342a211b3f9fb22bc57264bbb31f235fbb/lib/defaultOptions.js).

<div class="youtube-related">
  {%- youtubeEmbed "hJAtWQ9nmKU", "New HTML Base Plugin (Changelog №17)", "512" -%}
</div>

### Why not use the `<base>` HTML element?

You can, if you’d like! Some folks have found it to be a bit [unreliable]({{ "https://twitter.com/Rich_Harris/status/1526937421505609728" | canonicalTwitterUrl }}) and edge-casey. This offers a build-time alternative.

### Installation

{% addedin "2.0.0-canary.15" %} This plugin is bundled with Eleventy 2.0 (no extra installation is required). It works with all template languages (via an Eleventy Transform) and some of the advanced usage filters require async-friendly template syntax (Nunjucks, Liquid, and JavaScript).

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
};
```

_You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!_

<details>
<summary>Expand for full options list</summary>

{% codetitle ".eleventy.js" %}

```js
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		// The base URL: defaults to Path Prefix
		baseHref: eleventyConfig.pathPrefix,

		// But you could use a full URL here too:
		// baseHref: "http://example.com/"

		// Comma separated list of output file extensions to apply
		// our transform to. Use `false` to opt-out of the transform.
		extensions: "html",

		// Rename the filters
		filters: {
			base: "htmlBaseUrl",
			html: "transformWithHtmlBase",
			pathPrefix: "addPathPrefixToUrl",
		},
	});
};
```

</details>

### Usage

For HTML content, you won’t need to do anything else. The HTML plugin will automatically apply the Path Prefix to URLs in any `.html` file in your output directory.

### Advanced Usage

This plugin also provides new filters for you to use these transformations manually. This is useful when you want to use the same functionality but the URL you want to transform is not in one of the HTML elements that get automatically transformed (like an HTML comment {% raw %}`<!-- Current page: {{ page.url }} -->`{% endraw %}).

##### `htmlBaseUrl`

Transform a single URL string using the base.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "htmlbase"} %}
  <div id="htmlbase-liquid" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ "/test/" | htmlBaseUrl }}
=> "/pathprefix/test/"

Relative paths are ignored:

{{ "test/" | htmlBaseUrl }}
=> "test/"

{{ "../test/" | htmlBaseUrl }}
=> "../test/"

Absolute URLs are ignored:

{{ "http://example.com/" | htmlBaseUrl }}
=> "http://example.com/"
```

{% endraw %}

  </div>
  <div id="htmlbase-njk" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```njk
{{ "/test/" | htmlBaseUrl }}
=> "/pathprefix/test/"

Relative paths are ignored:

{{ "test/" | htmlBaseUrl }}
=> "test/"

{{ "../test/" | htmlBaseUrl }}
=> "../test/"

Absolute URLs are ignored:

{{ "http://example.com/" | htmlBaseUrl }}
=> "http://example.com/"
```

{% endraw %}

  </div>
  <div id="htmlbase-js" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = function () {
	return `
${this.htmlBaseUrl("/test/")}
=> "/pathprefix/test/"

Relative paths are ignored:

${this.htmlBaseUrl("test/")}
=> "test/"

${this.htmlBaseUrl("../test/")}
=> "../test/"

Absolute URLs are ignored:

${this.htmlBaseUrl("http://example.com/")}
=> "http://example.com/"
`;
};
```

{% endraw %}

  </div>
  <div id="htmlbase-hbs" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Handlebars", "Syntax" %}

{% raw %}

```hbs
{{htmlBaseUrl "/test/"}}
=> "/pathprefix/test/" Relative paths are ignored:

{{htmlBaseUrl "test/"}}
=> "test/"

{{htmlBaseUrl "../test/"}}
=> "../test/" Absolute URLs are ignored:

{{htmlBaseUrl "http://example.com/"}}
=> "http://example.com/"
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>

You can override the `baseHref` option by passing another argument to the filter with your one-off base value. Note that when you use a full URL as your base href, relative paths are no longer ignored—they are modified using the current page’s URL:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "htmlbasefull"} %}
  <div id="htmlbasefull-liquid" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ "/test/" | htmlBaseUrl: "http://example.com/" }}
=> "http://example.com/pathprefix/test/"

Relative urls are resolved using the current page’s url.
For example, on a page with URL `/my-template/`:

{{ "test/" | htmlBaseUrl: "http://example.com/" }}
=> "http://example.com/pathprefix/my-template/test/"

Absolute URLs are still ignored:

{{ "http://11ty.dev/" | htmlBaseUrl: "http://example.com/" }}
=> "http://11ty.dev/"
```

{% endraw %}

  </div>
  <div id="htmlbasefull-njk" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```njk
{{ "/test/" | htmlBaseUrl("http://example.com/") }}
=> "http://example.com/pathprefix/test/"

Relative urls are resolved using the current page’s url.
For example, on a page with URL `/my-template/`:

{{ "test/" | htmlBaseUrl("http://example.com/") }}
=> "http://example.com/pathprefix/my-template/test/"

Absolute URLs are still ignored:

{{ "http://11ty.dev/" | htmlBaseUrl("http://example.com/") }}
=> "http://11ty.dev/"
```

{% endraw %}

  </div>
  <div id="htmlbasefull-js" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = function () {
	return (
		`
${this.htmlBaseUrl("/test/", "http://example.com/")}
=> "http://example.com/pathprefix/test/"

Relative urls are resolved using the current page’s url.
For example, on a page with URL ` /
			my -
		template /
			`:

${this.htmlBaseUrl("test/", "http://example.com/")}
=> "http://example.com/pathprefix/my-template/test/"

Absolute URLs are still ignored:

${this.htmlBaseUrl("http://11ty.dev/", "http://example.com/")}
=> "http://11ty.dev/"`
	);
};
```

{% endraw %}

  </div>
  <div id="htmlbasefull-hbs" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Handlebars", "Syntax" %}

{% raw %}

```hbs
{{htmlBaseUrl "/test/" "http://example.com/"}}
=> "http://example.com/pathprefix/test/" Relative urls are resolved using the
current page’s url. For example, on a page with URL `/my-template/`:

{{htmlBaseUrl "test/" "http://example.com/"}}
=> "http://example.com/pathprefix/my-template/test/" Absolute URLs are still
ignored:

{{htmlBaseUrl "http://11ty.dev/" "http://example.com/"}}
=> "http://11ty.dev/"
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>

##### `transformWithHtmlBase`

Transform a block of HTML with posthtml. Applies the above `htmlBaseUrl` filter to each applicable URL in an HTML block (so the URL transformation rules are the same). Requires an async-friendly template language.

We use this in the RSS plugin to change your content to be absolute URLs for broadest compatibility with various RSS feed readers.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "htmlbasehtmlblock"} %}
  <div id="htmlbasehtmlblock-liquid" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ '<a href="/test/">Link</a>' | transformWithHtmlBase }}
=> '<a href="/pathprefix/test/">Link</a>'

{{ '<a href="/test/">Link</a>' | transformWithHtmlBase: "http://example.com/" }}
=> '<a href="http://example.com/pathprefix/test/">Link</a>'
```

{% endraw %}

Resolving relative URLs (with path prefix still at `"/pathprefix/"`):

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
On a page with URL `/my-template/`:

{{ '<a href="test/">Link</a>' | transformWithHtmlBase: "http://example.com/" }}
=> '<a href="http://example.com/pathprefix/my-template/test/">Link</a>'

Override the page URL:

{{ '<a href="test/">Link</a>' | transformWithHtmlBase: "http://example.com/", "/my-other-template/" }}
=> '<a href="http://example.com/pathprefix/my-other-template/test/">Link</a>'
```

{% endraw %}

  </div>
  <div id="htmlbasehtmlblock-njk" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```njk
{{ '<a href="/test/">Link</a>' | transformWithHtmlBase }}
=> '<a href="/pathprefix/test/">Link</a>'

{{ '<a href="/test/">Link</a>' | transformWithHtmlBase("http://example.com/") }}
=> '<a href="http://example.com/pathprefix/test/">Link</a>'
```

{% endraw %}

Resolving relative URLs (with path prefix still at `"/pathprefix/"`):

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```njk
On a page with URL `/my-template/`:

{{ '<a href="test/">Link</a>' | transformWithHtmlBase("http://example.com/") }}
=> '<a href="http://example.com/pathprefix/my-template/test/">Link</a>'

Override the page URL:

{{ '<a href="test/">Link</a>' | transformWithHtmlBase("http://example.com/", "/my-other-template/") }}
=> '<a href="http://example.com/pathprefix/my-other-template/test/">Link</a>'
```

{% endraw %}

  </div>
  <div id="htmlbasehtmlblock-js" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = async function () {
	return `
${await this.transformWithHtmlBase(`<a href="/test/">Link</a>`)}
=> '<a href="/pathprefix/test/">Link</a>'

${await this.transformWithHtmlBase(
	`<a href="/test/">Link</a>`,
	"http://example.com/"
)}
=> '<a href="http://example.com/pathprefix/test/">Link</a>'`;
};
```

{% endraw %}

Resolving relative URLs (with path prefix still at `"/pathprefix/"`):

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = async function () {
	return `
On a page with URL "/my-template/":

${await this.transformWithHtmlBase(
	'<a href="test/">Link</a>',
	"http://example.com/"
)}
=> '<a href="http://example.com/pathprefix/my-template/test/">Link</a>'

Override the page URL:

${await this.transformWithHtmlBase(
	'<a href="test/">Link</a>',
	"http://example.com/",
	"/my-other-template/"
)}
=> '<a href="http://example.com/pathprefix/my-other-template/test/">Link</a>''`;
};
```

{% endraw %}

  </div>
  <div id="htmlbasehtmlblock-hbs" role="tabpanel">

This filter requires an async-friendly template language and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

##### `addPathPrefixToFullUrl`

Note that passing a full external URL (e.g. `http://example.com/`) to `htmlBaseUrl` will return the URL unchanged. We don’t want to add `pathPrefix` to external links!

However, if you do want to force addition of pathPrefix to a URL, you can use the `addPathPrefixToFullUrl` filter.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "htmlbase-fullurl"} %}
  <div id="htmlbase-fullurl-liquid" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ "http://example.com/" | addPathPrefixToFullUrl }}
=> "http://example.com/pathprefix/"
```

{% endraw %}

  </div>
  <div id="htmlbase-fullurl-njk" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```njk
{{ "http://example.com/" | addPathPrefixToFullUrl }}
=> "http://example.com/pathprefix/"
```

{% endraw %}

  </div>
  <div id="htmlbase-fullurl-js" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "11ty.js", "Syntax" %}

{% raw %}

```js
module.exports = function () {
	return this.addPathPrefixToFullUrl("http://example.com/");
	// "http://example.com/pathprefix/"
};
```

{% endraw %}

  </div>
  <div id="htmlbase-fullurl-hbs" role="tabpanel">

With path prefix set to `"/pathprefix/"`:

{% codetitle "Handlebars", "Syntax" %}

{% raw %}

```hbs
{{addPathPrefixToFullUrl "http://example.com/"}}
=> "http://example.com/pathprefix/"
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>
