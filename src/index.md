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

## Quick Start

Create a Markdown file.

```bash
echo '# Page header' > index.md
```

<details>
<summary>Eleventy requires Node.js {% latestVersionNodeMinimum versions, config %} <em>(expand to learn more)</em></summary>

Run `node --version` on the command line to see if it is installed. If the command is not found or it reports a number lower than {% latestVersionNodeMinimum versions, config %}, you will need to [install Node.js](https://nodejs.org/en/).

</details>

Run Eleventy.

```
npx @11ty/eleventy
```

Eleventy compiles any files in the current directory matching valid [file extensions](/docs/languages/) (`.md` is one of many) to the output folder (`_site` by default).

```bash
Writing _site/index.html from ./index.md (liquid)
Wrote 1 file in 0.03 seconds ({% latestVersion versions, config %})
```

Run `npx @11ty/eleventy --serve` to start up a [local development server](/docs/dev-server/) and open `http://localhost:8080/` in your web browser of choice to see your web site.

➡ Keep going! Read a [more comprehensive Getting Started guide](/docs/getting-started/) or check out the full [**Documentation for {% latestVersion versions, config %}**](/docs/).

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

