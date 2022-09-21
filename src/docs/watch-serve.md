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

<div id="swap-back-to-browsersync"></div>

* [This content has moved to `/docs/dev-server/`](/docs/dev-server/)

## Browsersync

* [This content has moved to `/docs/server-browsersync/`](/docs/server-browsersync/)
