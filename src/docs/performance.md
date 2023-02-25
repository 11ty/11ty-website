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

<is-land on:visible import="/js/throbber.js">
<template data-island="once"><link rel="stylesheet" href="/css/throbber.css"></template>
<style>
#buildperf-table td:last-child {
  width: 100%;
}
</style>
<table id="buildperf-table">
<thead>
<tr>
<th>Tool</th>
<th class="numeric">×4000 Files</th>
<th class="numeric"></th>
</tr>
</thead>
<tbody>
<tr>
<td>Hugo</td>
<td class="numeric">0.68<abbr title="seconds">s</abbr></td>
<td><text-throbber duration="684"></text-throbber></td>
</tr>
<tr>
<td>Eleventy</td>
<td class="numeric">1.93<abbr title="seconds">s</abbr></td>
<td><text-throbber duration="1930"></text-throbber></td>
</tr>
<tr>
<td>Astro</td>
<td class="numeric">22.90<abbr title="seconds">s</abbr></td>
<td><text-throbber duration="22900"></text-throbber></td>
</tr>
<tr>
<td>Gatsby</td>
<td class="numeric">29.05<abbr title="seconds">s</abbr></td>
<td><text-throbber duration="29050"></text-throbber></td>
</tr>
<tr>
<td>Next.js</td>
<td class="numeric">70.65<abbr title="seconds">s</abbr></td>
<td><text-throbber duration="70650"></text-throbber></td>
</tr>
</tbody>
</table>
</is-land>

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


<is-land on:visible import="/js/throbber.js">
<template data-island="once"><link rel="stylesheet" href="/css/throbber.css"></template>
<style>
#install-table td:last-child {
  width: 100%;
}
</style>
<table id="install-table">
<thead>
  <tr>
    <th>Tool</th>
    <th class="ta-c"><code>node_modules</code><br>Weight</th>
    <th class="ta-c"><code>npm install</code><br>Time</th>
    <th></th>
  </tr>
</thead>
<tbody>
<tr>
<tr>
  <td>Eleventy</td>
  <td><div class="numeric">34 MB</div></td>
  <td><div class="numeric">5.81s</div></td>
  <td><text-throbber duration="5810"></text-throbber></td>
</tr>
<tr>
  <td>SvelteKit</td>
  <td><div class="numeric">111 MB</div></td>
  <td><div class="numeric">6.78s</div></td>
  <td><text-throbber duration="6780"></text-throbber></td>
</tr>
<tr>
  <td>Next.js</td>
  <td><div class="numeric">158 MB</div></td>
  <td><div class="numeric">3.72s</div></td>
  <td><text-throbber duration="3720"></text-throbber></td>
</tr>
<tr>
  <td>Astro</td>
  <td><div class="numeric">169 MB</div></td>
  <td><div class="numeric">12.52s</div></td>
  <td><text-throbber duration="12520"></text-throbber></td>
</tr>
<tr>
  <td>Nuxt</td>
  <td><div class="numeric">164 MB</div></td>
  <td><div class="numeric">14.77s</div></td>
  <td><text-throbber duration="14770"></text-throbber></td>
</tr>
<tr>
  <td>Remix</td>
  <td><div class="numeric">497 MB</div></td>
  <td><div class="numeric">40.14s</div></td>
  <td><text-throbber duration="40140"></text-throbber></td>
</tr>
<tr>
  <td>Gatsby</td>
  <td><div class="numeric">583 MB</div></td>
  <td><div class="numeric">43.36s</div></td>
  <td><text-throbber duration="43360"></text-throbber></td>
</tr>
</tbody>
</table>
</is-land>

Data taken from [_The JavaScript Site Generator Review, 2023_ (February 2023)](https://www.zachleat.com/web/site-generator-review/).