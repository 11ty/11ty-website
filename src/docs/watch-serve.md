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

Eleventy 2.0 bundles a brand new default development server. You can configure this with the new `setServerConfig` Configuration API method.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setServerConfig({
    // Default values are shown:

    // Opt-out of the live reload snippet
    enabled: true,

    // Opt-out of DOM diffing updates and use page reloads
    // Added in v2.0.0-canary.3
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
    // Added in v2.0.0-canary.3
    showVersion: false,
  });
};
```

{% callout "info", "md" -%}
Try out the [`devcert-cli`](https://github.com/davewasmer/devcert-cli) package to generate a localhost key and certificate for `https` and HTTP/2.
{%- endcallout %}

## Browsersync

### Override Browsersync Server Options {% addedin "0.7.0" %}

Useful if you want to change or override the default Browsersync configuration. Find the Eleventy defaults in [`EleventyServe.js`](https://github.com/11ty/eleventy/blob/master/src/EleventyServe.js). Take special note that Eleventy does not use Browsersync’s watch options and trigger reloads manually after our own internal watch methods are complete. See full options list on the [Browsersync documentation](https://browsersync.io/docs/options).

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    notify: true
  });
};
```

### Opt-out of the BrowserSync JavaScript snippet {% addedin "1.0.0" %}

New in [`browser-sync@2.27.1`](https://github.com/BrowserSync/browser-sync/issues/1882#issuecomment-867767056) {% addedin "1.0.0" %}. Opt-out of the JavaScript snippet normally injected by BrowserSync. This disables BrowserSync live-reloading.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    snippet: false,
  });
};
```
