---
eleventyNavigation:
  parent: Configuration
  key: Events
  order: 10
---

# Events

You may want to run some code at certain times during the compiling process. To do that, you can use _configuration events_, which will run at specific times during the compiling process.

[[toc]]

All events are configured in your `.eleventy.js` configuration file, with the code run every time the event triggers.

Asynchronous callback function support added in v1.0.

## `eleventy.before` {% addedin "1.0.0" %}

* Previously known as the now deprecated (but not removed) `beforeBuild` {% addedin "0.11.1" %} event.

The `eleventy.before` event runs every time Eleventy starts building, so it will run before the start of each stand-alone build, as well as each time building starts as either part of `--watch` or `--serve`. To use it, attach the event handler to your Eleventy config:

```js
module.exports = function (eleventyConfig) {
  // Async-friendly in 1.0+
  eleventyConfig.on('eleventy.before', async () => {
    // Run me before the build starts
  });
};
```

## `eleventy.after` {% addedin "1.0.0" %}

* Previously known as the now deprecated (but not removed) `afterBuild` {% addedin "0.11.1" %} event.

The `eleventy.after` event runs every time Eleventy finishes building, so it will run after the end of each stand-alone build, as well as each time building ends as either part of `--watch` or `--serve`. To use it, attach the event handler to your Eleventy config:

```js
module.exports = function (eleventyConfig) {
  // Async-friendly in 1.0+
  eleventyConfig.on('eleventy.after', async () => {
    // Run me after the build ends
  });
};
```

## `eleventy.beforeWatch` {% addedin "1.0.0" %}

* Previously known as the now deprecated (but not removed) `beforeWatch` {% addedin "0.11.0" %} event.

The `eleventy.beforeWatch` event runs before a build is run _only_ if it's a re-run during `--watch` or `--serve`. This means it will neither run during the initial build nor during stand-alone builds. To use it, attach the event handler to your Eleventy config:

```js
module.exports = function (eleventyConfig) {
  // Async-friendly in 1.0+
  eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
    // Run me before --watch or --serve re-runs

    // changedFiles is an array of files that changed
    // to trigger the watch/serve build
  });
};
```

The `changedFiles` parameter was {% addedin "v0.11.1" %}.
