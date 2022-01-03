---
eleventyNavigation:
  key: Watch and Serve
  parent: Configuration
  order: 11
---
# Watch and Serve Configuration

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

## Override Browsersync Server Options {% addedin "0.7.0" %}

Useful if you want to change or override the default Browsersync configuration. Find the Eleventy defaults in [`EleventyServe.js`](https://github.com/11ty/eleventy/blob/master/src/EleventyServe.js). Take special note that Eleventy does not use Browsersync’s watch options and trigger reloads manually after our own internal watch methods are complete. See full options list on the [Browsersync documentation](https://browsersync.io/docs/options).

_(Read more at [Issue #123](https://github.com/11ty/eleventy/issues/123))_

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    notify: true
  });
};
```

## Add delay before re-running {% addedin "0.11.0" %}

A hardcoded amount of time Eleventy will wait before triggering a new build when files have changes during `--watch` or `--serve` modes. You probably won’t need this, but is useful in some edge cases with other task runners (Gulp, Grunt, etc).

```js
module.exports = function(eleventyConfig) {
  // default is 0
  eleventyConfig.setWatchThrottleWaitTime(100); // in milliseconds
};
```

## Opt-out of the BrowserSync JavaScript snippet {% addedin "1.0.0" %}

New in [`browser-sync@2.27.1`](https://github.com/BrowserSync/browser-sync/issues/1882#issuecomment-867767056) (available on Eleventy 1.0+). This opts-out of the JavaScript snippet normally injected by BrowserSync. Notably, this will disable BrowserSync live-reloading.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    snippet: false,
  });
};
```