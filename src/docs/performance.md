---
eleventyNavigation:
  key: Performance
  parent: Overview
  excerpt: The build and site performance of Eleventy projects
  order: 3
---
# Eleventy Performance

Eleventy is known for both its lightweight core in the form of speedy installs/builds and lightweight site output in the form of speedy sites!

## Site Performance

Eleventy allows you full control over the output. That also means that by-default we do not include any costly runtime JavaScript bundles that often hamper site performance!

{% callout "", "md" %}Have a look at our new [Partial Hydration `<is-land>` component](/docs/plugins/partial-hydration/)!{% endcallout %}

Sites listed on the [Eleventy Leaderboards](/speedlify/) are tested and ranked (approximately) monthly as a fun community way to maintain speedy site performance for Eleventy sites.

* Want to [add your site to the Leaderboards](/docs/leaderboards-add/)?

<div class="youtube-related">
  {%- youtubeEmbed "b4frtsT4Cgo", "Full Control over HTML" -%}
  {%- youtubeEmbed "dIa2Y4zesnw", "Add your site to the Leaderboards (Weekly №6)" -%}
</div>

## Build Performance

**Eleventy offers best-in-class build performance for JavaScript site generators.**

<div>{% renderTemplate "webc" %}<build-comparison @show-all></build-comparison>{% endrenderTemplate %}</div>

Data taken from [_Which Generator Builds Markdown the Fastest?_ (July 2022)](https://www.zachleat.com/web/build-benchmark/#benchmark-results).

### Performance Tips

* You can analyze your [project’s specific build performance metrics using Debug Mode](/docs/debug-performance/).
* The [Directory Output plugin](/docs/plugins/directory-output/) will also report per-template performance and file size information.
* Take [passthrough copy out of your build-loop with the Eleventy Dev Server](/docs/copy/#emulate-passthrough-copy-during-serve).

<div class="youtube-related">
  {%- youtubeEmbed "KETQ4zS9Yp4", "28% build time performance improvement for Google’s web.dev (Weekly №1)", "30" -%}
  {%- youtubeEmbed "kUC87Zr0dKg", "Eleventy Build went from 54s to 17s—Pagination Memory/Performance Wins 🏆 (Weekly №10)", "344" -%}
  {%- youtubeEmbed "sfPNgt3joWI", "Markdown Benchmarks (Weekly №16)", "1566" -%}
</div>

## Installation Performance

<div>{% renderTemplate "webc" %}<install-comparison></install-comparison>{% endrenderTemplate %}</div>

Data taken from [_The JavaScript Site Generator Review, 2023_ (February 2023)](https://www.zachleat.com/web/site-generator-review/).