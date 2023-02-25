---
layout: layouts/main.njk
logoLink: /docs/
# Don’t forget to update the emoji in CSS
# logoLink: /blog/eleventy-v2-beta/
# logoContent: "<span class='elv-hero-content'>2.0</span>"
ignoreGitHubButtons: true
ignoreSupporters: true
ignoreFastestSite: true
searchTitle: Eleventy, a simpler static site generator
bigPossum: true
skipAuth: true
eleventyComputed:
  social:
    description: "Eleventy, a simpler static site generator."
eleventyImport:
  collections: ["blog"]
---
{%- set highlightedBlogPost = collections.blog | findBy("data.homePageHighlight", true) | first %}
{%- if highlightedBlogPost %}
{% callout %}<strong><a href="{{ highlightedBlogPost.data.page.url }}">{{ highlightedBlogPost.data.newstitle }}</a></strong> and more on the <a href="/blog/">Eleventy Blog</a>.{% endcallout %}
{%- endif %}

<p class="ta-c"><em>Eleventy has <strong>Fast Builds</strong></em></p>

<is-land id="buildperf-island" on:visible import="/js/throbber.js">
<style>
#buildperf-island {
  display: block;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 1rem;
  background-color: #272822;
	color: #fff;
  border-radius: .3em;
}
@media (prefers-color-scheme: dark) {
	#buildperf-island {
		background-color: #000;
		color: #fff;
	}
}
#buildperf-table {
  margin-bottom: 0;
}
#buildperf-table tr:first-child td {
  border-top: none;
}
#buildperf-table tr:last-child td {
  border-bottom: none;
}
#buildperf-table td:last-child {
  min-width: 40ch;
}
</style>
<template data-island="once"><link rel="stylesheet" href="/css/throbber.css"></template>
<table id="buildperf-table">
<thead>
<tr class="sr-only">
<th>Tool</th>
<th class="numeric">×4000 Files</th>
<th class="numeric"></th>
</tr>
</thead>
<tbody>
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

From a [benchmark of ×4000 markdown files](https://www.zachleat.com/web/build-benchmark/#benchmark-results). Learn more about [Eleventy’s site and build performance](/docs/performance/).

## Quick Start

Create a Markdown file.

```bash
echo '# Page header' > index.md
```

<details>
<summary>Eleventy requires Node.js {% latestVersionNodeMinimum versions, config %} <em>(expand to learn more)</em></summary>

You can check whether or not you have Node installed by running `node --version` in a terminal window. ([_Well, wait—what is a Terminal window?_](/docs/terminal-window/))

If the command is not found or it reports a number lower than {% latestVersionNodeMinimum versions, config %}, you will need to [download and install Node.js](https://nodejs.org/en/download/) before moving on to the next step.

</details>

Run Eleventy.

```
npx @11ty/eleventy
```

Eleventy compiles any files in the current directory matching valid [file extensions](/docs/languages/) (`.md` is one of many) to the output folder (`_site` by default). It might look like this:

<style>
#getting-started-build .highlight-line:last-child,
#getting-started-build .highlight-line:last-child * {
  color: #0dbc79 !important;
}
</style>

{% codewithprompt "noop", "getting-started-build" %}
Writing _site/index.html from ./index.md (liquid)
Wrote 1 file in 0.03 seconds ({% latestVersion versions, config %})
{% endcodewithprompt %}

Run `npx @11ty/eleventy --serve` to start up a [local development server](/docs/dev-server/) and open `http://localhost:8080/` in your web browser of choice to see your web site.

Keep going:

1. Read our full [**Getting Started guide**](/docs/getting-started/).
2. Check out the [Documentation for {% latestVersion versions, config %}](/docs/).

---

<div class="fullwidth-module">{% include "logos.njk" %}</div>

<div class="why-are-you-doing-this"><a href="/docs/" class="btn-primary benchnine rainbow-active rainbow-active-noanim">Documentation for <span>Eleventy</span></a></div>
<span>Todd and <a href="{{ "https://twitter.com/brucel/status/1107699886584143872" | canonicalTwitterUrl }}">Bruce</a> said this button should be bigger and as you can see they were right</span>

{% include "supporters.njk" %}

## Built With Eleventy

<div class="sites-vert">
  <div class="lo-grid">
{% for key, site in builtwith -%}{% if site.url and site.disabled != true and site.featured and site.superfeatured -%}
  {%- set hideRelatedLinks = true %}
  {%- include "site-card.njk" %}
{% endif %}{%- endfor %}
  </div>
</div>

<div class="fullwidth-module">
  <is-land on:visible on:save-data="false">
    <html-fetch target="is-land" src="/imports/facepile.html"></html-fetch>
  </is-land>
</div>



View [all {{ builtwith | objectFilterNot("disabled") | length }} sites](/speedlify/).

## Don’t take my word for it {% emoji "🌈" %}

Listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

