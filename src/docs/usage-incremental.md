---
eleventyNavigation:
  parent: Command Line Usage
  key: Incremental
  order: 1
permalink: /docs/usage/incremental/
excludeFromSidebar: true
---
# Incremental Builds

Incremental builds perform a partial build operating only on files that have changed to improve build times when doing local development.

Incremental builds via the command line flag `--incremental` have been available without much fanfare in Eleventy for a few versions now. Let’s check in on what the current capabilities of incremental builds are and the plans to improve:

## [Passthrough Copy](/docs/copy/)

* Incremental passthrough copy (✅  available in 0.11.0+) uses the following rules:
  * Only copy a passthrough copy file when it actively changed. Don’t run a template build if only a passthrough copy file has changed.
  * If a template has changed, don’t copy the passthrough copy files.
  * Some discussion about making this behavior default at [Issue #1109](https://github.com/11ty/eleventy/issues/1109). Personally, I’m still on the fence here.

## Configuration File

If you create/update your Eleventy configuration file, a full build will run.

## Templates

* If you create/update a template file, Eleventy will run the build for that file and only that file.
* If the created/updated file is in your [Includes](/docs/config/#directory-for-includes) or [Layouts](/docs/config/#directory-for-layouts-(optional)) directories, a full build will run.
* This feature is also exposed as part of the API for [Custom template extensions](/docs/languages/custom/) via the `isIncrementalMatch` function (✅  available in 1.0.0+).
<!-- * Implemented as part of the Eleventy Vue plugin -->

## 🗓 To Do

### Templates

* Smarter dependency map between templates:
  * Eleventy layouts
  * Publishing into Collections and consuming from Collections
  * `11ty.js` JavaScript dependencies
  * Global/directory/template Data file usage mapped to templates
  * _Stretch goal_: Pagination-level incremental that operates on a subset of data
  * _Stretch goal_: Work with include/extend/import/macro specific features of template languages.

### Smarter Template Language Support

* Liquid
* Nunjucks

### Cold Start

Currently incremental does a full build to start out to provide a fresh starting point to work from. Improvements will save the state of the build to a cache for faster cold starts. [Issue #984](https://github.com/11ty/eleventy/issues/984)