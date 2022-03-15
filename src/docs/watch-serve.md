---
eleventyNavigation:
  key: Watch and Serve
  parent: Configuration
  order: 11
---
# Watch and Serve Configuration

[[toc]]

## Watch JavaScript Dependencies {% addedin "0.7.0" %}

When in `--watch` mode, Eleventy will spider the dependencies of your [JavaScript Templates](/docs/languages/javascript/) (`.11ty.js`), [JavaScript Data Files](/docs/data-js/) (`.11tydata.js` or `_data/**/*.js`), or Configuration File (usually `.eleventy.js`) to watch those files too. Files in `node_modules` directories are ignored. This feature is _enabled by default_.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Enabled by default
  eleventyConfig.setWatchJavaScriptDependencies(false);
};
```

## Add Your Own Watch Targets {% addedin "0.10.0" %}

The `addWatchTarget` config method allows you to manually add a file or directory for Eleventy to watch. When the file or the files in this directory change Eleventy will trigger a build. This is useful if Eleventy is not directly aware of any external file dependencies.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/scss/");
};
```

Eleventy will not add a watch for files or folders that are in `.gitignore`, unless `setUseGitIgnore` is turned off. See the chapter on [ignore files](/docs/ignores/#opt-out-of-using-.gitignore).

## Add delay before re-running {% addedin "0.11.0" %}

A hardcoded amount of time Eleventy will wait before triggering a new build when files have changes during `--watch` or `--serve` modes. You probably won’t need this, but is useful in some edge cases with other task runners (Gulp, Grunt, etc).

```js
module.exports = function(eleventyConfig) {
  // default is 0
  eleventyConfig.setWatchThrottleWaitTime(100); // in milliseconds
};
```

## Eleventy Dev Server {% addedin "2.0.0" %}

Eleventy 2.0 bundles a brand new default development server. You can configure this with the new `setServerOptions` Configuration API method.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    // Default values are shown:

    // Opt-out of the live reload snippet
    enabled: true,

    // Opt-out of DOM diffing updates and use page reloads
    domdiff: true,

    // The starting port number to attempt to use
    port: 8080,

    // number of times to increment the port if in use
    portReassignmentRetryCount: 10,

    // Show local network IP addresses for device testing
    showAllHosts: false,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },

    // Change the name of the special folder name used for injected scripts
    folder: ".11ty",

    // Show the server version number on the command line
    showVersion: false,

    // Change the default file encoding for reading/serving files
    encoding: "utf-8",
  });
};
```

<details>
<summary>Want to know if your Canary version includes one of these properties?</summary>

* `domdiff` was added in `v2.0.0-canary.3`
* `showVersion` was added in `v2.0.0-canary.3`
* `encoding` was added in `v2.0.0-canary.4`
* `404.html` support added in `v2.0.0-canary.4`

</details>

* For a full list of `encoding` values supported by Node (also used in the `Content-Type` HTTP Header), check out [Node’s Buffer documentation](https://nodejs.org/api/buffer.html#buffers-and-character-encodings).
* The `404.html` convention supported by Netlify, GitHub Pages, Vercel, and others is now supported and we use the content from a `404.html` in your output folder when serving the error page for missing content.

{% callout "info", "md" -%}
Try out the [`devcert-cli`](https://github.com/davewasmer/devcert-cli) package to generate a localhost key and certificate for `https` and HTTP/2.
{%- endcallout %}

### Swap back to Browsersync {% addedin "2.0.0" %}

You can swap back to Eleventy Dev Server using the `setServerOptions` configuration API and the [`@11ty/eleventy-server-browsersync` package](https://github.com/11ty/eleventy-server-browsersync).

First, install it:

```
npm install @11ty/eleventy-server-browsersync
```

Then, enable it in your configuration file:

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",

    // Default Browsersync options shown:
    port: 8080,
    open: false,
    notify: false,
    ui: false,
    ghostMode: false,

    // Opt-out of the Browsersync snippet
    // snippet: false,
  })
};
```

View the [full list of Browsersync options](https://browsersync.io/docs/options).

#### `setBrowserSyncConfig`

`eleventyConfig.setBrowserSyncConfig` was the previous Configuration API method used in versions of Eleventy prior to v2. It was changed to be a no-op in Eleventy v2 (it has no functional purpose). Check out the previous version docs to learn how to:

* [Override Browsersync server options](https://v1-0-0.11ty.dev/docs/watch-serve/#override-browsersync-server-options)
* [Opt-out of the Browsersync JavaScript snippet](https://v1-0-0.11ty.dev/docs/watch-serve/#opt-out-of-the-browsersync-javascript-snippet)
