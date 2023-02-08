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
excludeFromSearch: true
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

<div class="fullwidth-module">{% include "logos.njk" %}</div>

## Quick Start

Eleventy {% latestVersion versions, config %} requires Node {% latestVersionNodeMinimum versions, config %} or newer. Use `node --version` on the command line to find your local Node version.

```bash
echo '# Page header' > README.md
npx @11ty/eleventy
```

This will compile any files matching valid input [template file extensions](/docs/languages/) (`.md` is one of them) in the current directory into the output folder (defaults to `_site`).

```bash
Writing _site/README/index.html from ./README.md (liquid)
Wrote 1 file in 0.03 seconds ({% latestVersion versions, config %})
```

Run `npx @11ty/eleventy --serve` to start up a web server. Then open `http://localhost:8080/README/` in your web browser of choice to see your Eleventy output.

➡ Keep going! Read a longer [Getting Started guide](/docs/getting-started/) or check out the full [**Documentation for {% latestVersion versions, config %}**](/docs/).

<a href="/docs/" class="btn-primary btn-primary-why-are-you-doing-this benchnine rainbow-active rainbow-active-noanim">Documentation for <span>Eleventy</span></a><span>Todd and [Bruce]({{ "https://twitter.com/brucel/status/1107699886584143872" | canonicalTwitterUrl }}) said this button should be bigger and as you can see they were right</span>

<h2 id="eleventy-is-supported-by">Eleventy is <a href="/docs/supporters/">supported</a> by… <a class="direct-link" href="#eleventy-is-supported-by">#</a></h2>

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

