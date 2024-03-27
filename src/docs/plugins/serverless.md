---
eleventyNavigation:
  key: Serverless
  order: 99
  excerpt: A plugin to run Eleventy in a serverless function for server side rendering (e.g. Previews in your CMS) and/or in very large sites with <a href="https://www.netlify.com/blog/2021/04/14/faster-builds-for-large-sites-on-netlify-with-on-demand-builders-now-in-early-access/">On-demand Builders</a>.
communityLinksKey: serverless
overrideCommunityLinks: true
---

# Serverless {% addedin "1.0.0" %}

{% tableofcontents %}

{{ eleventyNavigation.excerpt | safe }}

<div class="youtube-related">
  {%- youtubeEmbed "JNFooPfzV9g", "Defer generating 400+ pages using Eleventy Serverless" -%}
  {%- youtubeEmbed "EiwIe8lduGs", "Add authentication with Eleventy Serverless and OAuth" -%}
</div>

## What is Serverless?

Eleventy Serverless complements your existing statically generated site by running one or more template files _at request time_ to generate dynamic pages. It can unlock many new use cases to move beyond static files into dynamically generated content.

- Server side rendering for fully dynamic pages, e.g. content preview in your Content Management System.
- Rendering of individual templates using On-demand Builders, useful to improve large site build times both locally and in production.

> “You can write a JavaScript function that you run and receive a response from by hitting a URL.”—[The Power of Serverless](https://web.archive.org/web/20220103184003/https://serverless.css-tricks.com/) from [Chris Coyier]({{ "https://twitter.com/chriscoyier" | canonicalTwitterUrl }})

### Rendering Modes

These different use cases and rendering modes are important to understand and have different trade-offs and risks associated with them. In a Jamstack world, the order of preference should be:

1. **Build template:** Render in the build (preferred, start here)
1. **On-demand Builder template:** Render on first request (use when your build gets beefy)
1. **Dynamic template:** Render on every request (unlocks some new app-like use cases; can accept user input)

**Build-time (non-serverless) templates** should be the preferred rendering mode. They are the most reliable and stable. A failure in a build generated template will fail your deployment and prevent user-facing errors in production.

For **On-demand Builders and Dynamic templates**, rendering failures will not fail your deployment&mdash;and as such, incur more risk. Dynamic templates must also be closely performance monitored—unlike build templates, a slow render in a dynamic template means a slow web site for end-users.

## Demos and Community Resources

<div class="sites-vert sites-vert--md">
  <div class="lo-grid">
{% for key, site in demos -%}{% if site.category.includes("serverless") -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
{% for entry in communityLinks -%}
  {%- set site = entry | convertCommunityLinkToSiteCard %}
  {% include "site-card.njk" %}
{%- endfor %}
{%- for key, entry in community %}
{%- if entry.key == communityLinksKey -%}
  {%- set site = entry | convertCommunityLinkToSiteCard %}
  {% include "site-card.njk" %}
{%- endif %}
{%- endfor %}
  </div>
</div>

## Usage

### Step 1: Add the Bundler Plugin

This plugin is bundled with Eleventy core and doesn’t require you to `npm install` anything. Use the `addPlugin()` configuration API to add it to your Eleventy config file (probably `.eleventy.js`):

{% codetitle ".eleventy.js" %}

```js
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "possum", // The serverless function name from your permalink object
		functionsDir: "./netlify/functions/",
	});
};
```

You can add the Bundler plugin more than once to accommodate multiple Eleventy Serverless rendering modes simultaneously. Your templates can render in multiple modes!

{% callout "info", "md-block" -%}
You won’t need to set up bundler plugins for every individual template, but instead you’ll want to use one plugin for each rendering mode.

- Dynamic pages via server side rendering will need one plugin (perhaps named `onrequest` or `dynamic`).
- Delayed rendering using On-demand Builders will need another plugin (perhaps named `onfirstrequest` or `odb`).
  {% endcallout %}

#### Bundler Options

<table>
<thead>
  <tr>
    <th>Key: Default Value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>name</code> <em>(Required)</em></td>
    <td>Above we used <code>"possum"</code>, but you should use <code>serverless</code> if you’re not sure what to call it.</td>
  </tr>
  <tr>
    <td><code>functionsDir: "./functions/"</code></td>
    <td>The directory that holds your serverless functions. Netlify supports <code>./netlify/functions/</code> without configuration.</td>
  </tr>
  <tr>
    <td><code>copy: []</code></td>
    <td>An Array of extra files to bundle with your serverless function. We copy your templates files for you but this is useful for additional files that may be used at build-time. Array entries can be:
      <ul>
        <li>a String for a single file or a directory (e.g., <code>"logo.svg"</code> or <code>"folder/"</code>).</li>
        <li>an Object with <code>from</code> and <code>to</code> keys to change the output directory inside your bundle (e.g., <code>{ from: ".cache", to: "cache" }</code>).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <code>redirects: "netlify-toml"</code>
    </td>
    <td>How we manage your serverless redirects. This will add serverless redirects to your <code>netlify.toml</code> file and remove stale routes for you.<ul>
      <li><code>redirects: false</code> will skip this entirely.</li>
      <li><code>redirects: "netlify-toml"</code> (default) to use Netlify Functions.</li>
      <li><code>redirects: "netlify-toml-functions"</code> (alias for <code>netlify-toml</code>)<!-- {% addedin "1.0.0-beta.3" %} --></li>
      <li><code>redirects: "netlify-toml-builders"</code> to use <a href="#use-with-on-demand-builders">Netlify On-demand Builders</a><!-- {% addedin "1.0.0-beta.3" %}--></li>
      <li>Write your own: Use a custom Function instead of a String: <code>function(<var>name</var>, <var>outputMap</var>)</code>. Don’t forget to handle removal of stale routes too!</li>
    </ul></td>
  </tr>
  <tr>
    <td><del><code>inputDir: "."</code></del></td>
    <td>The Eleventy input directory (containing your Eleventy templates). <strong>This is no longer necessary.</strong> Eleventy injects this for you automatically.</td>
  </tr>
  <!-- I don’t think this belongs here !!! It belongs in the default serverless function -->
  <tr>
    <td><code>config: function(<var>eleventyConfig</var>) {}</code></td>
    <td>Run your own custom Eleventy Configuration API code inside of the serverless function. Useful for a wide variety of things, but was added to facilitate developers wiring up additional serverless information from the <code>event</code> object to templates using <code>eleventyConfig.addGlobalData()</code>. For example, wire up cookies using <code>event.headers.cookie</code> or form post data using <code>event.body</code>.<!-- {% addedin "1.0.0-beta.4" %} --></td>
  </tr>
  <tr>
    <td colspan="2"><strong><em>Advanced Options:</em></strong></td>
  </tr>
  <tr>
    <td><code>copyEnabled: true</code></td>
    <td>Useful for local development. This Boolean enables or disables the copying of project files into your serverless bundle. (File copying is pretty cheap so you will likely want to leave this as-is.)
      <ul>
        <li>Try <code>copyEnabled: process.env.NODE_ENV !== "development"</code> (and set environment variables when running Eleventy locally e.g. <code>NODE_ENV=development npx @11ty/eleventy</code>)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>copyOptions: {}</code></td>
    <td>Advanced configuration of copy behavior. Consult the <a href="https://www.npmjs.com/package/recursive-copy#usage"><code>recursive-copy</code> docs on NPM</a>. You probably won’t need this.</td>
  </tr>
  <tr>
    <td><code>excludeDependencies: []</code></td>
    <td>Array of dependencies explicitly excluded from the list found in your configuration file and global data files. These will not be visible to the serverless bundler.</td>
  </tr>
</tbody>
</table>

### Your Generated Serverless Function

Based on your plugin configuration, Eleventy will create your initial boilerplate serverless function for you. After initial creation, this serverless function code is managed by you.

Here is an over-simplified version for educational purposes only:

{% codetitle "⚠️ This snippet is for educational purposes only—don’t copy and paste it!", "Limitation" %}

```js
const { EleventyServerless } = require("@11ty/eleventy");

async function handler(event) {
	let elev = new EleventyServerless("possum", {
		path: event.path, // (required) the URL path
		query: event.queryStringParameters, // (optional)
	});

	try {
		// returns the HTML for the Eleventy template that matches to the URL
		// Can use with `eleventyConfig.dataFilterSelectors` to put data cascade data into `page.data` here.
		let [page] = await elev.getOutput();
		let html = page.content;

		return {
			statusCode: 200,
			body: html,
		};
	} catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: e.message }),
		};
	}
}

exports.handler = handler;
```

Read more about [`dataFilterSelectors`](/docs/config/#data-filter-selectors).

#### Use with On-demand Builders

{% callout "info", "md" -%}
**Note:** As of right now, **On-demand Builders** are a Netlify-specific feature.
{% endcallout %}

If, instead, you want to use an [**On-demand Builder**](https://docs.netlify.com/configure-builds/on-demand-builders/) to render the content on first-request and cache at the CDN for later requests, you will need to do two things:

**Thing 1:** Swap the export in your template (and `npm install @netlify/functions`):

```js
exports.handler = handler;
```

Replace the above with:

```js
const { builder } = require("@netlify/functions");
exports.handler = builder(handler);
```

**Thing 2:** Use `redirects: "netlify-toml-builders"` in your <a href="#bundler-options">bundler config</a>.

The redirects need to point to `/.netlify/builders/` instead of `/.netlify/functions` so if you have written your own redirects handler, you’ll need to update that.

### Step 2: Add to `.gitignore`

Add the following rules to your `.gitignore` file (where `possum` is the name of your serverless function name):

```
netlify/functions/possum/**
!netlify/functions/possum/index.js
```

### Step 3: Use a `permalink` Object

Making a template file dynamic is as easy as changing your [`permalink`](/docs/permalinks/). You might be familiar with this well-worn `permalink` syntax:

```yaml
---
permalink: /build-generated-path/
---
```

Serverless templates introduce a slight change: they use a `permalink` _Object_. So a `possum` serverless function `permalink` looks like this:

```yaml
---
permalink:
  possum: /dynamic-path/
---
```

These objects can be set anywhere in the data cascade (even inside of [Computed Data](/docs/data-computed/)).

Here’s an example of a serverless URL for our `possum` serverless function. Any requests to `/dynamic-path/` will now be generated at request-time.

{% callout "info", "md" -%}
**NOTE:** `build` is the only reserved key in a `permalink` Object. If you want your template to continue to be built at build-time, use the `build` key.
{% endcallout %}

The following is functionally equivalent to `permalink: /build-generated-path/`:

```yaml
---
permalink:
  build: /build-generated-path/
---
```

Anything other than `build` is assumed to map to a serverless function. We used the name `possum`, but you can use any string. (Just make sure it maps to the `name` you passed to the Bundler Plugin above.)

#### Build-time and Serverless

You _can_ mix both `build` and `possum` in the same permalink object! This will make the same input file render both at build-time _and_ in a serverless function.

This might be useful when you want a specific URL for a CMS preview, but still want the production build to use full build-time templates.

```yaml
---
permalink:
  build: /build-generated-path/
  possum: /dynamic-path/
---
```

#### Multiple Serverless Functions

Any number of serverless functions are allowed here.

```yaml
---
permalink:
  possum: /dynamic-path/
  quokka: /some-other-dynamic-path/
---
```

#### Multiple URLs per Serverless Function

If you want to drive multiple URLs with one serverless template, pass in an Array of URLs.

```yaml
---
permalink:
  possum:
    - /dynamic-path/
    - /some-other-dynamic-path/
---
```

#### Dynamic Slugs and Serverless Global Data

Perhaps most interestingly, this works with dynamic URLs, too! This will work with any syntax supported by the [`path-to-regexp` package](https://www.npmjs.com/package/path-to-regexp).

{% callout "info", "md" -%}
Astute users of the 1.0 canary prereleases will note that starting in Beta 1, this package changed from [`url-pattern`](https://www.npmjs.com/package/url-pattern) to `path-to-regexp`. [Read more at Issue 1988](https://github.com/11ty/eleventy/issues/1988).
{% endcallout %}

```yaml
---
permalink:
  possum: /dynamic-path/:id/
---
```

This will match any requested URL that fits the `/dynamic-path/` followed by an open-ended folder name (e.g., `/dynamic-path/hello/` or `/dynamic-path/goodbye/`).

The above uses `:id` for the key name. When the templates are rendered, the key name puts the matched path String value for `id` into your Serverless Global Data in the Data Cascade at: `eleventy.serverless.path.id`. (Here, `id` matches `:id` above).

{% callout "warn", "md" -%}
These should be treated as _potentially malicious user input_, and _you **must** escape these_ if you use them in templates!

Read more about [Escaping User Input](#escaping-user-input).
{% endcallout %}

Here’s what your Serverless Global Data might look like:

```js
{
	eleventy: {
		serverless: {
			path: {
				id: "hello"; // from /dynamic-path/hello/
				//id: "goodbye" // from /dynamic-path/goodbye/
			}
		}
	}
}
```

### Escaping User Input

These should be treated as _potentially malicious user input_, and _you **must** escape these_ if you use them in templates!
The way to do this is specific to each template language.

- **Liquid** has both an `escape` and `escape_once` filter.
- **Nunjucks** has autoescape turned on by default. (If you’ve disabled it, you can use the `escape` filter.)
- **Other template languages:** Read more [in the Layouts documentation](/docs/layouts/#prevent-double-escaping-in-layouts), which has other template languages’ methods for both escaped and unescaped output.

## Advanced

### Dynamic Slugs to Subset Your Pagination

Use the new `serverless` option in `pagination` to slice up your paginated data set using a dynamic slug!

Here’s how we use it for the [Eleventy Author Pages](/authors/).

```yaml
pagination:
  data: authors
  size: 1
  serverless: eleventy.serverless.path.id
permalink:
  possum: "/authors/:id/"
```

Eleventy fetches the value stored at `eleventy.serverless.path.id` (using [lodash `get`](https://lodash.com/docs/4.17.15#get)) and does an additional get on the pagination data in `authors`.

For example:

1. A request is made to `/authors/zachleat/`
1. The dynamic URL slug for the `possum` serverless function `/authors/:id/` matches `zachleat` to `:id`. This sets `"zachleat"` in the `eleventy.serverless.path.id` Global Data.
1. Because `pagination.serverless` has the value `"eleventy.serverless.path.id"`, we use lodash.get to select the key `"zachleat"` from Global Data.
1. An additional `lodash.get(authors, "zachleat")` returns a single chunk of data for one author.
1. Pagination only operates on that one selected page for rendering.

### Input via Query Parameters

In **Dynamic _Templates_** (_not **On-demand Builders**_), you can use query parameters as user input. Query parameters are available in the `eleventy.serverless.query` object.

{% callout "warn", "md" -%}
These should be treated as _potentially malicious user input_, and _you **must** escape these_ if you use them in templates!

Read more about [Escaping User Input](#escaping-user-input).
{% endcallout %}

`/my-url/?id=hello` might look like this in the Data Cascade of a dynamic template:

```js
{
	eleventy: {
		serverless: {
			query: {
				id: "hello"; // from /my-url/?id=hello
				//id: "goodbye" // from /my-url/?id=goodbye
			}
		}
	}
}
```

<!-- ### How do `permalink` Objects work with `page.url`?

_Documentation in progress_ (The new `serverlessURL` filter) -->

### Re-use build-time cache from the [Fetch plugin](/docs/plugins/fetch/)

To speed up serverless rendering and avoid requests to external sources, you can re-use the `cache` folder from your build!

First, we’ll need to copy the cache folder into our bundle.

{% codetitle ".eleventy.js" %}

```js
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "possum",
		copy: [".cache/eleventy-fetch/"],
	});
};
```

And re-use the `directory` in your data files:

{% codetitle "_data/github.js" %}

```js
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	let options = {
		// Use the same folder declared above
		directory: ".cache/eleventy-fetch/",
	};

	if (process.env.ELEVENTY_SERVERLESS) {
		// Infinite duration (until the next build)
		options.duration = "*";

		// Bypass writing new cache files, which would error in serverless mode
		options.dryRun = true;
	}

	let result = await EleventyFetch("https://example.com/", options);
	// …
};
```

<span id="re-use-build-time-collections"></span>

### Collections in Serverless

Eleventy Serverless typically operates on a subset of templates in your project. As such, collections that are outside the scope of the serverless build are not available in serverless mode. You have two options to workaround this limitation:

1. Precompile your collections manually at build-time
1. Build the data cascade for the project (no rendering required)

#### Precompile Collections at Build-Time

In this example we’ll build a static data file with collections data in it at build time and inject it into our serverless build at run time!

Consider a `sidebarNav` collection that populates a navigation menu (via the [`eleventy-navigation` plugin](/docs/plugins/navigation/)).

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("sidebarNav", function (collection) {
		return collection.getAll().filter((item) => item.data?.eleventyNavigation);
	});
};
```

This might be used in your templates (serverless or build) via {% raw %}`{{ collections.sidebarNav | eleventyNavigation }}`{% endraw %}.

Now, the `sidebarNav` collection would not normally be available in a serverless context, because all of the templates that populate the menu are not in the scope of the serverless build. But we can generate a static copy of that collection for use in serverless mode. In fact, this is how the sidebar works on each (serverless) Author’s page (e.g. the [one for `@zachleat`](/authors/zachleat/)).

Consider the following Eleventy template which creates an array of collection-like entries for the sidebar navigation.

<details>
<summary><strong>Expand to see code sample</strong></summary>

{% codetitle "serverless-collections-export.11ty.js" %}

```js
exports.data = function () {
	return {
		// generate directly to the serverless bundle folder
		permalink:
			"./netlify/functions/serverless/_generated-serverless-collections.json",
		permalinkBypassOutputDir: true,
		eleventyExcludeFromCollections: true,
	};
};

exports.render = function ({ collections }) {
	let entries = [];
	// Iterate over any items with the `sidebarNav` tag
	for (let entry of collections.sidebarNav) {
		entries.push({
			data: {
				page: entry.data.page,
				eleventyNavigation: entry.data.eleventyNavigation,
			},
		});
	}

	return JSON.stringify(
		{
			sidebarNav: entries,
		},
		null,
		2
	);
};
```

{% callout "info", "md" %}Note that it isn’t currently possible to serialize `entry.data.collections` to JSON as it may contain circular references. We hope to improve this in the future with a new collections API!{% endcallout %}

Inside of your serverless function file, you can import this file and use it directly:

{% codetitle "./netlify/functions/possum/index.js" %}

```js/0,6
const precompiledCollections = require("./_generated-serverless-collections.json");

async function handler (event) {
	let elev = new EleventyServerless("possum", {
		path: event.path,
		query: event.queryStringParameters,
		precompiledCollections
	});

	// Some content truncated
};
```

</details>

#### Compile the data cascade for the project

As we have just learned, Eleventy Serverless operates on a subset of templates in your project. You can disable this subset scope with the `singleTemplateScope` option on the `EleventyServerless` class (defaults to `true`). {% addedin "2.0.0-canary.27" %}

This uses incremental builds with the new ignore initial build feature to only render one file (while building the larger data cascade for the project). The downside here is that while this is much friendlier to any use of `collections` on your templates, it is slower! Here are the conditions I’d expect folks to want to make this tradeoff:

- If your project is small/fast enough and you don’t want to spend the extra development effort.
- If your project is larger but you’re using On-demand Builders where the extra rendering cost is only paid once.
- For larger projects I would _not recommend_ use of `singleTemplateScope: false` in a dynamic template that renders with each request.

Here’s how to enable this feature in your serverless function file:

{% codetitle "./netlify/functions/possum/index.js" %}

```js/4
async function handler (event) {
	let elev = new EleventyServerless("possum", {
		path: event.path,
		query: event.queryStringParameters,
		singleTemplateScope: false, // true by default
	});

	// Some content truncated
};
```

At some point we may enable this feature by default [if performance improves enough](https://github.com/11ty/eleventy/issues/2737)!

### Swap to Dynamic using the Data Cascade and `eleventyComputed`

In this example we’re using a global data entry to control whether a downstream temple renders in serverless or build mode (at build time). In some more limited use cases this can solved using your hosting providers Redirects feature (e.g. on [Netlify this means a `netlify.toml` or `_redirects` file](https://docs.netlify.com/routing/redirects/)).

If you want to make a decision at serverless runtime to render a build template, you’ll need to add logic to your [serverless function](#your-generated-serverless-function) to redirect to the build URL from the serverless template.

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	// Templates will generate via the Build
	eleventyConfig.addGlobalData("runInServerlessMode", false);

	// Or render in Serverless mode
	eleventyConfig.addGlobalData("runInServerlessMode", true);
};
```

And then in your template files you can use this global data value with [Computed Data](/docs/data-computed/) to swap rendering modes:

{% codetitle "my-template-file.njk" %}

```yaml
---js
{
	eleventyComputed: {
		permalink: function({runInServerlessMode}) {
			return {
				[runInServerlessMode ? "serverless" : "build"]: "/"
			}
		}
	}
}
---
Template Content goes here
```

- If you’re here you _may_ also be interested in the [Eleventy Serverless OAuth demo](https://github.com/11ty/demo-eleventy-serverless-oauth)

---

**For internal use**

<details>
<summary>Dependency Bundle Sizes</summary>

| Bundle size                                                                                                                                                    | Package name                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy" alt="Bundle size for @11ty/eleventy" loading="lazy">                                               | `@11ty/eleventy`                        |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy@canary" alt="Bundle size for @11ty/eleventy" loading="lazy">                                        | `@11ty/eleventy@canary`                 |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy-img" alt="Bundle size for @11ty/eleventy-img" loading="lazy">                                       | `@11ty/eleventy-img`                    |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy-fetch" alt="Bundle size for @11ty/eleventy-fetch" loading="lazy">                                   | `@11ty/eleventy-fetch`                  |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy-plugin-syntaxhighlight" alt="Bundle size for @11ty/eleventy-plugin-syntaxhighlight" loading="lazy"> | `@11ty/eleventy-plugin-syntaxhighlight` |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy-navigation" alt="Bundle size for @11ty/eleventy-navigation" loading="lazy">                         | `@11ty/eleventy-navigation`             |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy-plugin-vue" alt="Bundle size for @11ty/eleventy-plugin-vue" loading="lazy">                         | `@11ty/eleventy-plugin-vue`             |
| <img src="https://packagephobia.com/badge?p=@11ty/eleventy-plugin-rss" alt="Bundle size for @11ty/eleventy-plugin-rss" loading="lazy">                         | `@11ty/eleventy-plugin-rss`             |

</details>
