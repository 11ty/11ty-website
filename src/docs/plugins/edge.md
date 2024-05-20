---
eleventyNavigation:
  key: Edge
  order: 99
  excerpt: A plugin to run Eleventy in an Edge Function to add dynamic content to your Eleventy sites.
# communityLinksKey: edge
overrideCommunityLinks: true
---

# Eleventy Edge {% addedin "2.0.0-canary.7" %}

{% tableofcontents %}

{{ eleventyNavigation.excerpt }}

{% callout "info" %}This feature is considered <strong>experimental</strong> and requires Eleventy <code>{{ "2.0.0-canary.7" | coerceVersion }}</code> or higher. Our first release is limited to <a href="https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/">Netlify Edge Functions</a> support only.{% endcallout %}

Eleventy Edge is an exciting new way to add dynamic content to your Eleventy templates. With a simple Eleventy shortcode you can opt-in a part of your Eleventy template to run on an Edge server, allowing your site to use dynamic, user-specific content!

Here are a few ideas:

- Any user personalized content (User accounts, premium-only content, AB testing)
- Accessing/setting HTTP Headers (e.g. Cookies, Save-Data, Client Hints, etc)
- [Handling Forms](https://demo-eleventy-edge.netlify.app/forms/)
- Using Geolocation information to localize content
- A zero-clientside JavaScript [Dark mode/Light mode toggle](https://demo-eleventy-edge.netlify.app/appearance/)

<div class="youtube-related">
  {%- youtubeEmbed "e8cx7NYlxX0", "Eleventy Edge (Weekly №8)", "151" -%}
  {%- youtubeEmbed "rW_SqnvRDww", "Using Edge to save a Template Syntax preference (Weekly №9)", "269" -%}
  {%- youtubeEmbed "oCTAZumAGNc", "Edge-powered Search (Weekly №11)", "405" -%}
</div>

## Try out the demos

- [Eleventy Edge demos using Netlify’s Edge Functions](https://demo-eleventy-edge.netlify.app/).
  - Read the [`demo-eleventy-edge` Source Code on GitHub](https://github.com/11ty/demo-eleventy-edge)
- [Eleventy Edge search on `eleventy-base-blog`](https://demo-edge-search--eleventy-base-blog.netlify.app/search/?q=first) with [Source code](https://github.com/11ty/eleventy-base-blog/compare/demo-edge-search)
- The template language syntax tabs on this very web site are rendered using the Edge plugin (here’s [one small example on this very page](#5.-make-your-content-template)). Try saving your template language syntax preference to persist in examples throughout the site. Learn more at [`11ty-website/#1462` on GitHub](https://github.com/11ty/11ty-website/pull/1462).

## How does it work?

If you don’t yet have an Eleventy project, go through the [Get Started Guide first](/docs/) and come back here when you’re done!

### 1. Installation

The Eleventy Edge plugin is bundled with Eleventy, but do note that the plugin requires version `{{ "2.0.0-canary.7" | coerceVersion }}` or newer.

At time of initial launch, you will need to use Netlify CLI to run Eleventy Edge locally (`netlify-cli` version `10.0.0` or higher).

```
npm install netlify-cli
```

### 2. Add to your configuration file

{% codetitle ".eleventy.js" %}

```js
const { EleventyEdgePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyEdgePlugin);
};
```

<details>
<summary>Expand to read about the advanced options (you probably don’t need these)</summary>

```js
const { EleventyEdgePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyEdgePlugin, {
		// controls the shortcode name
		name: "edge",

		// Used for the default deno import URL
		eleventyEdgeVersion: "1.0.0",

		// Version check for the Edge runtime
		compatibility: ">=2",

		// controls where the Edge Function bundles go
		functionsDir: "./netlify/edge-functions/",

		// Directory to write the import_map.json to
		// Also supported: `false`
		importMap: "./.netlify/edge-functions/",
	});
};
```

</details>

The above plugin will automatically generate an Eleventy Edge Function file for you at: `./netlify/edge-functions/eleventy-edge.js`.

<details>
<summary>Expand to see a sample Eleventy Edge Function</summary>

Note that [Edge Functions](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/) run in Deno so they require ESM (`import` not `require`).

```js
import {
	EleventyEdge,
	precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
	try {
		let edge = new EleventyEdge("edge", {
			request,
			context,
			precompiled: precompiledAppData,

			// default is [], add more keys to opt-in e.g. ["appearance", "username"]
			cookies: [],
		});

		edge.config((eleventyConfig) => {
			// Run some more Edge-specific configuration
			// e.g. Add a sample filter
			eleventyConfig.addFilter("json", (obj) => JSON.stringify(obj, null, 2));
		});

		return await edge.handleResponse();
	} catch (e) {
		console.log("ERROR", { e });
		return context.next(e);
	}
};
```

</details>

#### Read more about Netlify’s Edge Functions

- [Netlify Docs: Edge Functions overview](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/)
- {% indieweblink "Netlify Edge Functions on Deno Deploy", "https://deno.com/blog/netlify-edge-functions-on-deno-deploy" %}
- [Netlify Edge Functions: A new serverless runtime powered by Deno](https://www.netlify.com/blog/announcing-serverless-compute-with-edge-functions)

### 3. Additions to `.gitignore`

```gitignore
# Netlify generated stuff
.netlify/

# Eleventy Edge Build Data files
netlify/edge-functions/_generated
```

### 4. `netlify.toml`

<details><summary>If you don’t already have a <code>netlify.toml</code>, expand this to view a sample starter.</summary>

{% codetitle "netlify.toml" %}

```toml
[dev]
framework = "#static"
command = "npx @11ty/eleventy --quiet --watch"

[build]
command = "npx @11ty/eleventy"
publish = "_site"
```

</details>

Add this to your `netlify.toml` file.

{% codetitle "netlify.toml" %}

```toml
[[edge_functions]]
function = "eleventy-edge"
path = "/*"
```

`eleventy-edge` points to the file that was created above at `./netlify/edge-functions/eleventy-edge.js`. Using `path= "/*"` will run Eleventy Edge on all of the pages on your site. You can change this setting to something more granular (e.g. `path = "/"` for just the home page).

### 5. Make your content template

Here we are making a simple template file. We can use the `{% raw %}{% edge %}{% endraw %}` shortcode to run the Liquid template syntax inside on the Edge server.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "edgetmpl"} %}
  <div id="edgetmpl-liquid" role="tabpanel">

{% codetitle "index.liquid" %}

{% raw %}

```liquid
The content outside of the `edge` shortcode is generated with the Build.

{% edge %}
The content inside of the `edge` shortcode is generated on the Edge.

<pre>
{{ eleventy | json }}
</pre>
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgetmpl-njk" role="tabpanel">
{% codetitle "index.njk" %}

{% raw %}

```jinja2
The content outside of the `edge` shortcode is generated with the Build.

{% edge %}
The content inside of the `edge` shortcode is generated on the Edge.

<pre>
{{ eleventy | dump(2) }}
</pre>
{% endedge %}
```

{% endraw %}

  </div>

  <div id="edgetmpl-js" role="tabpanel">
{% codetitle "index.11ty.js" %}

{% raw %}

```js
module.exports = async function(data) {
  return `The content outside of the \`edge\` shortcode is generated with the Build.

${await this.edge(`The content inside of this.edge() is generated on the Edge.
<pre>
{{ eleventy | json }}
</pre>, "liquid")}`;
};
```

{% endraw %}
As documented in [Limitations](#limitations), we are using `liquid` here because `11ty.js` is not _yet_ supported as an Edge content target.

  </div>
  <div id="edgetmpl-hbs" role="tabpanel">

The `edge` shortcode [requires an async-friendly template language](#limitations) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

Learn more about [the `edge` shortcode](#edge-shortcode-examples).

### 6. Run your local server

```
npx netlify dev
```

Navigation to `index.liquid` by going to `http://localhost:8888/` in your browser. (Double check your console output to make sure the port is `8888`).

## Learn More

### Always Escape Input

When using any dynamic user input (via query parameters or cookies), the values here should be treated as potentially malicious user input and you must escape these if you use them in templates. The way to do this is template language specific.

- Liquid has both an `escape` and `escape_once` filter.
- Nunjucks has autoescape turned on by default. If you’ve disabled it, you can use the `escape` filter.
- Read more at [the Layouts documentation](https://www.11ty.dev/docs/layouts/#prevent-double-escaping-in-layouts), which lists both methods for escaped and unescaped output in template languages.

### `edge` shortcode examples

#### Changing the Template Language of the `edge` Content

In what might feel familiar to folks that have used the [Render plugin](/docs/plugins/render/), adding an additional argument to the `edge` shortcode allows you to change the content’s template language. If no argument is specified, it uses the template syntax of the parent template.

{% callout "info", "md" %}If you use the `edge` shortcode inside of a [layout file](/docs/layouts/), it’s best to explicitly specify the template language!{% endcallout %}

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "edgelang"} %}
  <div id="edgelang-liquid" role="tabpanel">
{% codetitle "index.liquid" %}

{% raw %}

```liquid
{% edge "md" %}
# Markdown Heading
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgelang-njk" role="tabpanel">
{% codetitle "index.njk" %}

{% raw %}

```jinja2
{% edge "md" %}
# Markdown Heading
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgelang-js" role="tabpanel">
{% codetitle "index.11ty.js" %}

{% raw %}

```js
module.exports = async function (data) {
	return `
${await this.edge("# Markdown heading", "md")}
`;
};
```

{% endraw %}

  </div>
  <div id="edgelang-hbs" role="tabpanel">

The `edge` shortcode [requires an async-friendly template language](#limitations) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

#### Passing Build-time Data to your Edge Function

Edge content is a separate template, processed and built on the Edge. As such it has no access to your build’s data cascade. However, you can pass data in to be re-used!

When the build data argument is a literal (a string or number), it is mapped to `_` in the template.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "edgedata"} %}
  <div id="edgedata-liquid" role="tabpanel">

{% codetitle "index.liquid" %}

{% raw %}

```liquid
---
name: Zach
---
{% edge "liquid,md" name %}
# Markdown heading for {{ _ }}
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgedata-njk" role="tabpanel">

{% codetitle "index.njk" %}

{% raw %}

```jinja2
---
name: Zach
---
{% edge "liquid,md", name %}
# Markdown heading for {{ _ }}
{% endedge %}
```

{% endraw %}

  </div>

  <div id="edgedata-js" role="tabpanel">
{% codetitle "index.11ty.js" %}

{% raw %}

```js
module.exports.data = {
	name: "Zach",
};

module.exports.render = async function (data) {
	return `
${await this.edge("# Markdown heading for {{ _ }}", "liquid,md", data.name)}
`;
};
```

{% endraw %}

  </div>
  <div id="edgedata-hbs" role="tabpanel">

The `edge` shortcode [requires an async-friendly template language](#limitations) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

When the build data argument is an object, the object properties are available as top-level globals in the template.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "edgedataobj"} %}
  <div id="edgedataobj-liquid" role="tabpanel">
{% codetitle "index.liquid" %}

{% raw %}

```liquid
---
buildData:
  name: Zach
---
{% edge "liquid,md" buildData %}
# Markdown heading for {{ name }}
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgedataobj-njk" role="tabpanel">
{% codetitle "index.njk" %}

{% raw %}

```jinja2
---
buildData:
  name: Zach
---
{% edge "liquid,md", buildData %}
# Markdown heading for {{ name }}
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgedataobj-js" role="tabpanel">
{% codetitle "index.11ty.js" %}

{% raw %}

```js
module.exports.data = {
	buildData: {
		name: "Zach",
	},
};

module.exports.render = async function (data) {
	return `
${await this.edge(
	"# Markdown heading for {{ name }}",
	"liquid,md",
	data.buildData
)}
`;
};
```

{% endraw %}

  </div>
  <div id="edgedataobj-hbs" role="tabpanel">

The `edge` shortcode [requires an async-friendly template language](#limitations) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

#### Add Global Data to your Edge Function

If you open up your generated `netlify/edge-functions/eleventy-edge.js` file, you’ll notice that you are able to run your own arbitrary configuration code on Edge. This means you can run `eleventyConfig.addGlobalData` to add your own global data to the edge templates. Any data you add here will automatically be available as a global inside of any `{% raw %}{% edge %}{% endraw %}` shortcodes _without having to pass it as an argument_.

{% codetitle "netlify/edge-functions/eleventy-edge.js" %}

{% raw %}

```diff-js
 import { EleventyEdge, precompiledAppData } from "./_generated/eleventy-edge-app.js";
+import searchData from "./_generated/search-data.js";

 export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
    });

    edge.config((eleventyConfig) => {
+      eleventyConfig.addGlobalData("search", searchData);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
 };
```

{% endraw %}

Notably, the above adds a `search` global from a file we’ve created to populate search data. Now we can reference it in our templates like so:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  <div role="tablist" aria-label="Choose a template language">
    View this example in:
    <a href="#edgeglobaldata-liquid" role="tab">Liquid</a>
    <a href="#edgeglobaldata-njk" role="tab">Nunjucks</a>
    <a href="#edgeglobaldata-js" role="tab">11ty.js</a>
  </div>
  <div id="edgeglobaldata-liquid" role="tabpanel">
{% codetitle "index.liquid" %}

{% raw %}

```liquid
{% edge "liquid" %}
{{ search | json }}
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgeglobaldata-njk" role="tabpanel">
{% codetitle "index.njk" %}

{% raw %}

```jinja2
{% edge "liquid" %}
{{ search | json }}
{% endedge %}
```

{% endraw %}

  </div>
  <div id="edgeglobaldata-js" role="tabpanel">
{% codetitle "index.11ty.js" %}

{% raw %}

```js
module.exports.render = async function (data) {
	return `
${await this.edge("{{ search | json }}", "liquid")}
`;
};
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>

## Frequently Asked Questions

### Limitations

- The `edge` shortcode is only available in async-friendly template languages. Right now that includes: `11ty.js`, `njk`, `liquid`, and `markdown` (requires another [pre-processing language, and the default is Liquid](https://www.11ty.dev/docs/languages/markdown/)). You can find a bunch of different test cases and examples on [`demo-eleventy-edge`](https://demo-eleventy-edge.netlify.app/tests/)
- Content _inside_ of the `edge` shortcode (rendered on the Edge) is further limited to `liquid`, `njk`, or `markdown`.

### How does it compare to Serverless?

They can be used together! Eleventy Edge can be used to process both serverless and build templates. Keep in mind that Edge functions are _not_ cached so if you want to use them with Serverless, you’ll likely get the most value out pairing with On-demand Builders.

- Relevant talk video (21 minutes): {% indieweblink "Eleventy: Build vs. Serverless vs. Edge", "https://www.zachleat.com/web/eleventy-rendering-modes/" %}
