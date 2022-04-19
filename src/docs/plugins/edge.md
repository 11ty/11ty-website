---
eleventyNavigation:
  key: Edge
  order: -2
  excerpt: A plugin to run Eleventy in an Edge Function to add dynamic content to your Eleventy sites.
# communityLinksKey: edge
overrideCommunityLinks: true
---
# Eleventy Edge {% addedin "2.0.0" %}

{{ eleventyNavigation.excerpt }}

{% callout "info" %}This feature is considered <strong>experimental</strong> and requires Eleventy <code>v2.0.0-canary.6</code> or higher. Our first release is limited to <a href="https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/">Netlify Edge Functions</a> support only.{% endcallout %}

Eleventy Edge is an exciting new way to add dynamic content to your Eleventy templates. With a simple Eleventy shortcode you can opt-in a part of your Eleventy template to run on an Edge server, allowing your site to use dynamic, user-specific content!

Here are a few ideas:

* Any user personalized content (User accounts, premium-only content, AB testing)
* Accessing/setting HTTP Headers (e.g. Cookies, Save-Data, Client Hints, etc)
* Handling Forms
* Using Geolocation information to localize content


## Check out our demos

Try out the [working demo site of Eleventy Edge using Netlify’s Edge Functions](https://demo-eleventy-edge.netlify.app/).

## How does it work?

### 1. Installation

If you don’t have an existing project, you can create a sample `package.json` file using `npm init -y`. [Read more about package.json and local package installation.](/docs/getting-started/#step-2-install-eleventy)

The Eleventy Edge plugin is bundled with Eleventy, but do note that the plugin requires version `2.0.0-canary.6` or newer.

At launch (to run Eleventy Edge locally), you will need to use Netlify CLI (version `10.0.0` or higher).

```
npm install netlify-cli
```

### 2. Add to your configuration file

```js
const { EleventyEdgePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin);
};
```

<details>
<summary>See the advanced options (you probably don’t need these)</summary>

```js
const { EleventyEdgePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin, {
    // controls the shortcode name
    name: "edge",

    // controls where the Edge Function bundles go
    functionsDir: "./netlify/edge-functions/",

    // Version check for the Edge runtime
    compatibility: ">=2",
  });
};
```

</details>

### 3. Create your Edge Function

Save this file to `./netlify/edge-functions/eleventy-edge.js`. Note that [Edge Functions](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/) run in Deno so they require ESM (`import` not `require`).

```js
import { EleventyEdge } from "./_generated/eleventy-edge.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config(eleventyConfig => {
      // Run some more Edge-specific configuration
      // e.g. Add a sample filter
      eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
    });

    return await edge.handleResponse();
  } catch(e) {
    console.log( "ERROR", { e } );
    return context.next(e);
  }
};
```

### 4. Create/add to your `netlify.toml`

```toml
[dev]
framework = "#static"
command = "npx @11ty/eleventy --quiet --watch"

[build]
command = "npx @11ty/eleventy"
publish = "_site"

# eleventy-edge points to the file you created above
# at `./netlify/edge-functions/eleventy-edge.js`
[[edge_functions]]
function = "eleventy-edge"
path = "/*"
```

Feel free to change `path = "/*"` to something more granular!

### 5. Make your content template

Here we are making a simple `index.liquid` file. We can use the `{% raw %}{% edge %}{% endraw %}` shortcode to run the Liquid template syntax inside on the Edge server.

```html
The content outside of the <code>edge</code> shortcode is generated with the Build.

{% raw %}{% edge %}
The content inside of the <code>edge</code> shortcode is generated on the Edge.

<pre>
{{ eleventy | json }}
</pre>
{% endedge %}{% endraw %}
```

### 6. Run your local server

```
npx netlify dev
```

Navigation to `index.liquid` by going to `http://localhost:8888/` in your browser. (Double check your console output to make sure the port is `8888`).

## Frequently Asked Questions

### Limitations

_In progress._

### How does it compare to Serverless?

They can be used together! _In progress._