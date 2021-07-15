---
eleventyNavigation:
  key: Serverless
  order: -1
  excerpt: A plugin to run Eleventy in a serverless function for server side rendering (e.g. Previews in your CMS) and/or in very large sites with [On-demand Builders](https://www.netlify.com/blog/2021/04/14/faster-builds-for-large-sites-on-netlify-with-on-demand-builders-now-in-early-access/).
---
# Serverless {% addedin "1.0.0" %}

{{ eleventyNavigation.excerpt }}

[[toc]]

## What is Serverless?

You can read more about serverless on the [eponymous Serverless microsite from CSS-Tricks](https://serverless.css-tricks.com/about/).

> “You can write a JavaScript function that you run and receive a response from by hitting a URL.”—[The Power of Serverless](https://serverless.css-tricks.com/) from [Chris Coyier](https://twitter.com/chriscoyier)

Eleventy Serverless complements your existing statically generated site by running one or more template files _at request time_ to generate dynamic pages. It can unlock many new use cases to move beyond static files into dynamically generated content.

* Server side rendering for fully dynamic pages, e.g. content preview in your Content Management System.
* Rendering of individual templates using On-demand Builders, useful to improve large site build times both locally and in production.

### Rendering Modes

These different use cases and rendering modes are important to understand and have different trade-offs and risks associated with them. In a Jamstack world, the order of preference should be:

* Build template: render in the build (preferred, start here)
* On-demand Builder template: render on first request (use when your build gets beefy)
* Dynamic template: render on every request (unlocks some new app-like use cases, can accept user input)

Build-time (non-serverless) templates should be the preferred rendering mode. They are the most reliable and stable. A failure in a build generated template will fail your deployment and prevent user-facing errors in production.

For On-demand Builders and Dynamic templates, rendering failures will not fail your deployment and as such incur more risk. Dynamic templates must also be closely performance monitored—unlike build templates, a slow render in a dynamic template means a slow web site for end-users.

## Demos and Examples

<div class="sites-vert">
  <div class="lo-grid">
{% for key, site in demos -%}{% if site.category.includes("serverless") -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
  </div>
</div>


## Usage

### Step 1: Add the Bundler Plugin

This plugin is bundled with Eleventy core and doesn’t require you to `npm install` anything. Use the `addPlugin` configuration API to add it to your Eleventy config file (probably `.eleventy.js`):

{% codetitle ".eleventy.js" %}

```js
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "possum", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
  });
};
```

You can add the Bundler plugin more than once to accommodate multiple Eleventy Serverless rendering modes simultaneously. Your templates can render in multiple modes!

{% callout "info", "md" -%}
You won’t need to set up bundler plugins for every individual template, but instead you’ll want to use one plugin for each rendering mode.

* Dynamic pages via server side rendering will need one plugin, perhaps named `onrequest` or `dynamic`.
* Delayed rendering using On-demand Builders will need another plugin, perhaps named `onfirstrequest` or `odb`.
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
    <td>Above we used <code>"possum"</code> but you should use <code>serverless</code> if you’re not sure what to call it.</td>
  </tr>
  <tr>
    <td><code>inputDir: "."</code></td>
    <td>The Eleventy input directory (containing your Eleventy templates).</td>
  </tr>
  <tr>
    <td><code>functionsDir: "./functions/"</code></td>
    <td>The directory that holds your serverless functions. Netlify supports <code>./netlify/functions/</code> without configuration.</td>
  </tr>
  <tr>
    <td><code>copy: []</code></td>
    <td>an Array of extra files to bundle with your serverless function. We copy your templates files for you but this is useful for additional files that may be used at build-time. Array entries can be:<ul>
      <li>a String for a single file or a directory. e.g. <code>"logo.svg"</code> or <code>"folder/"</code></li>
      <li>an Object with <code>from</code> and <code>to</code> keys to change the output directory inside your bundle. e.g. <code>{ from: ".cache", to: "cache" }</code></li>
    </ul></td>
  </tr>
  <tr>
    <td><code>redirects: "netlify-toml"</code></td>
    <td>How we manage your serverless redirects. The only currently bundled option is <code>"netlify-toml"</code>. This will add serverless redirects to your <code>netlify.toml</code> file and remove stale routes for you.<ul>
      <li>Use <code>redirects: false</code> to skip this entirely.</li>
      <li>Write your own: Use a custom Function instead of a String: <code>function(name, outputMap)</code>. Don’t forget to handle removal of stale routes too!</li>
    </ul></td>
  </tr>
  <tr>
    <td colspan="2"><strong><em>Advanced Options:</em></strong></td>
  </tr>
  <tr>
    <td><code>copyEnabled: true</code></td>
    <td>Useful for local development, this is a Boolean to enable or disable copying project files into your serverless bundle. File copying is pretty cheap so you will likely want to leave this as-is.<ul>
      <li>Try <code>copyEnabled: process.env.NODE_ENV !== "development"</code> (and set environment variables when running Eleventy locally e.g. <code>NODE_ENV=development npx @11ty/eleventy</code>)</li>
    </ul></td>
  </tr>
  <tr>
    <td><code>copyOptions: {}</code></td>
    <td>Advanced configuration of copy behavior, consult the <a href="https://www.npmjs.com/package/recursive-copy#usage"><code>recursive-copy</code> docs on NPM</a>. You probably won’t need this.</td>
  </tr>
  <tr>
    <td><code>excludeDependencies: []</code></td>
    <td>Array of dependencies explicitly excluded from the list found in your configuration file and global data files. These will not be visible to the serverless bundler.</td>
  </tr>
</tbody>
</table>

### Your Generated Serverless Function

Based on your plugin configuration, we will create your initial boilerplate serverless function for you. After initial creation, this serverless function code is managed by you. Here is an over-simplified version for educational purposes only:

{% codetitle "⚠️ This snippet is for educational purposes only—don’t copy and paste it!", "Limitation" %}

```js
const { EleventyServerless } = require("@11ty/eleventy");

async function handler (event) {
  let elev = new EleventyServerless("possum", {
    path: event.path, // required, the URL path
    query: event.queryStringParameters, // optional
  });

  try {
    // returns the HTML for the Eleventy template that matches to the URL
    let html = await elev.render();

    return {
      statusCode: 200,
      body: html
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};

exports.handler = handler;
```

#### Use with On-demand Builders

_Note: As of right now, On-demand Builders are a Netlify specific feature._

If, instead, you want to use an [On-demand Builder](https://docs.netlify.com/configure-builds/on-demand-builders/) to render the content on first-request and cache at the CDN for later requests, swap the export in your template:

```js
exports.handler = handler; // turns into:

const { builder } = require("@netlify/functions");
exports.handler = builder(handler);
```

Don’t forget to `npm install @netlify/functions`.

### Step 2: Add to .gitignore

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

Serverless templates introduce a slight change and use a `permalink` Object, so a `possum` serverless function `permalink` looks like this:

```yaml
---
permalink:
  possum: /dynamic-path/
---
```

These objects can be set anywhere in the data cascade (even inside of [Computed Data](/docs/data-computed/)). Here’s an example of a serverless URL for our `possum` serverless function. Any requests to `/dynamic-path/` will now be generated at request-time.

`build` is the only reserved key in a `permalink` Object. If you want your template to continue to be built at build-time, use the `build` key. The following is functionally equivalent to `permalink: /build-generated-path/`:

```yaml
---
permalink:
  build: /build-generated-path/
---
```

Anything other than `build` is assumed to map to a serverless function. We used the name `possum`, but you can use any string and it should map to the `name` you passed to the Bundler Plugin above.

#### Build-time and Serverless

You _can_ mix both `build` and `possum` in the same permalink object! This will make the same input file render both at build-time and in a serverless function. This might be useful when you want a specific URL for a CMS preview but still want the production build to use full build-time templates.

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

Perhaps most interestingly, this works with dynamic URLs too. This will work with any syntax supported by the [`url-pattern` package](https://www.npmjs.com/package/url-pattern).

```yaml
---
permalink:
  possum: /dynamic-path/:id/
---
```

This will match any requested URL that fits the `/dynamic-path/` followed by an open-ended folder name (e.g. `/dynamic-path/hello/` or `/dynamic-path/goodbye/`). The above uses `:id` for the key name. When the templates are rendered, the key name puts the matched path String value for `id` into your Serverless Global Data in the Data Cascade at: `eleventy.serverless.path.id` (`id` here matches `:id` above).

{% callout "warn", "md" %}These should be treated as potentially malicious user input and you _must_ escape these if you use them in templates. Read more about [Escaping User Input](#escaping-user-input).{% endcallout %}

Here’s what your Serverless Global Data might look like:

```js
{
  eleventy: {
    serverless: {
      path: {
        id: "hello" // from /dynamic-path/hello/
        //id: "goodbye" // from /dynamic-path/goodbye/
      }
    }
  }
}
```

### Escaping User Input

When using dynamic slugs or query parameters, the values here should be treated as potentially malicious user input and you _must_ escape these if you use them in templates. The way to do this is template language specific.

* Liquid has both an `escape` and `escape_once` filter.
* Nunjucks has autoescape turned on by default. If you’ve disabled it, you can use the `escape` filter.
* Read more [at the Layouts documentation](/docs/layouts/#prevent-double-escaping-in-layouts), which lists both methods for escaped and unescaped output in template languages.



## Advanced

### Dynamic Slugs to Subset Your Pagination

Use the new `serverless` option in `pagination` to slice up your paginated data set using a dynamic slug! Here’s how we use it for the [Eleventy Author Pages](/authors/).

```yaml
pagination:
  data: authors
  size: 1
  serverless: eleventy.serverless.path.id
permalink:
  possum: "/authors/:id/"
```

Eleventy fetches the value stored at `eleventy.serverless.path.id` (using [lodash get](https://lodash.com/docs/4.17.15#get)) and does an additional get on the pagination data in `authors`.

For example:

1. A request is made to `/authors/zachleat/`
1. The dynamic URL slug for the `possum` serverless function `/authors/:id/` matches `zachleat` to `:id`. This sets `"zachleat"` in the `eleventy.serverless.path.id` Global Data.
1. Because `pagination.serverless` has the value `"eleventy.serverless.path.id"`, we use lodash.get to select the key `"zachleat"` from Global Data.
1. An additional `lodash.get(authors, "zachleat")` returns a single chunk of data for one author.
1. Pagination only operates on that one selected page for rendering.


### Input via Query Parameters

In Dynamic Templates (_not On-demand Builders_), you can use query parameters as user input. Query parameters are available in the `eleventy.serverless.query` object.

{% callout "warn", "md" %}These should be treated as potentially malicious user input and you _must_ escape these if you use them in templates. Read more about [Escaping User Input](#escaping-user-input).{% endcallout %}

`/my-url/?id=hello` might look like this in the Data Cascade of a dynamic template:

```js
{
  eleventy: {
    serverless: {
      query: {
        id: "hello" // from /my-url/?id=hello
        //id: "goodbye" // from /my-url/?id=goodbye
      }
    }
  }
}
```

<!-- ### How do `permalink` Objects work with `page.url`?

_Documentation in progress_ (The new `serverlessURL` filter) -->

### Re-use build-time cache from the [Cache Assets plugin](/docs/plugins/cache/)

To speed up serverless rendering and avoid requests to external sources, you can re-use the cache folder from your build! First we’ll need to copy the cache folder into our bundle and rename it without the leading dot.

{% codetitle ".eleventy.js" %}

```js
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "possum",
    copy: [
      // files/directories that start with a dot
      // are not bundled by default
      { from: ".cache", to: "cache" }
    ]
  });
};
```

And then in your data file, overwrite the `duration` and `directory` to point to this new folder:

{% codetitle "_data/github.js" %}

```js
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  let options = {};

  if(process.env.ELEVENTY_SERVERLESS) {
    // Infinite duration (until the next build)
    options.duration = "*";
    // Instead of ".cache" default because files/directories
    // that start with a dot are not bundled by default
    options.directory = "cache";
  }

  let result = await Cache("https://example.com/", options);
  // …
};
```

### Re-use build-time Collections

_Documentation in progress_

### Swap to Dynamic using the Data Cascade and `eleventyComputed`

_Documentation in progress_

### How do Dynamic Templates and `tags` work together?

_Documentation in progress_
