---
eleventyNavigation:
  parent: Why Eleventy?
  key: Performance
  excerpt: Eleventy is known for both its lightweight core in the form of speedy builds/installs and lightweight site output in the form of speedy sites!
---
# Performance

{% tableofcontents "open" %}

## Site Performance

Eleventy allows you full control over the output. That also means that by-default we do not include any costly runtime JavaScript bundles that often hamper site performance!

{% callout "", "md" %}Have a look at our new [Partial Hydration `<is-land>` component](/docs/plugins/is-land/)!{% endcallout %}

Sites listed on the [Eleventy Leaderboards](/speedlify/) are tested and ranked (approximately) monthly as a fun community way to maintain speedy site performance for Eleventy sites.

* Want to [add your site to the Leaderboards](/docs/leaderboards-add/)?

<div class="youtube-related">
  {%- youtubeEmbed "b4frtsT4Cgo", "Full Control over HTML" -%}
  {%- youtubeEmbed "dIa2Y4zesnw", "Add your site to the Leaderboards (Weekly №6)" -%}
</div>

Looking for guidance on [single page applications (SPA)](/docs/single-page-applications/)?

## Build Performance

**Eleventy offers best-in-class build performance for JavaScript site generators.**

<is-land on:visible on:media="(prefers-reduced-motion: no-preference)">
	<template data-island="once"><link rel="stylesheet" href="/css/throbber.css"><script src="/js/throbber.js"></script></template>
	{% renderTemplate "webc" %}<build-comparison @show-all></build-comparison>{% endrenderTemplate %}
</is-land>

Data taken from [_Which Generator Builds Markdown the Fastest?_ (July 2022)](https://www.zachleat.com/web/build-benchmark/#benchmark-results).

### Performance Tips

- You can analyze your [project’s specific build performance metrics (via DEBUG or Node.js CPU Profiling)](/docs/debug-performance/).
- [Memoize costly Shortcodes](/docs/shortcodes/#memoize-shortcodes) and [Filters](/docs/filters/#memoize-filters) (we typically see the most expensive ones are those performing JavaScript, CSS, or HTML minification)
- Take [passthrough copy out of your build-loop with the Eleventy Dev Server](/docs/copy/#emulate-passthrough-copy-during-serve).
- Use the [Image HTML Transform method to optimize images on-request during development](/docs/plugins/image.md#build-performance).
- Use [`--incremental` for Incremental builds](/docs/usage/#incremental-for-partial-incremental-builds).
- Use the [Directory Output plugin](/docs/plugins/directory-output/) to report per-template performance and file size information.
- Making network requests (to an API) can be expensive! Use the [Fetch utility](/docs/plugins/fetch/) to create a local cache of external network requests (use `duration` to configure how long the cache should last).

<div class="youtube-related">
  {%- youtubeEmbed "KETQ4zS9Yp4", "28% build time performance improvement for Google’s web.dev (Weekly №1)", "30" -%}
  {%- youtubeEmbed "kUC87Zr0dKg", "Eleventy Build went from 54s to 17s—Pagination Memory/Performance Wins 🏆 (Weekly №10)", "344" -%}
  {%- youtubeEmbed "sfPNgt3joWI", "Markdown Benchmarks (Weekly №16)", "1566" -%}
</div>

## Installation Performance

<is-land on:visible on:media="(prefers-reduced-motion: no-preference)">
	<template data-island="once"><link rel="stylesheet" href="/css/throbber.css"><script src="/js/throbber.js"></script></template>
	{% renderTemplate "webc" %}<install-comparison></install-comparison>{% endrenderTemplate %}
</is-land>

Data taken from [_The JavaScript Site Generator Review, 2023_ (February 2023)](https://www.zachleat.com/web/site-generator-review/).