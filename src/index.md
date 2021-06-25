---
layout: layouts/main.njk
logoLink: /docs/
ignoreGitHubButtons: true
ignoreSupporters: true
ignoreFastestSite: true
searchTitle: Eleventy Home
excludeFromSearch: true
bigPossum: true
permalink:
  dynamic: /
---
{% callout "info", "html", "elv-serverless-banner" %}
<strong>This page was rendered <em>just-in-time</em> for you using <a href="/docs/plugins/serverless/">Eleventy Serverless</a></strong>
<code><time datetime="{{ config.now | toISO }}">{{ config.now | newsDate("yyyy LLL dd HH:mm:ss.SSS") }}</time></code>
{% endcallout %}

## Quick Start

Eleventy {% latestVersion versions, config %} requires Node 10 or newer. Use `node --version` on the command line to find your local Node version.

``` bash
npm install -g @11ty/eleventy
echo '# Page header' > README.md
eleventy
```

This will compile any files matching valid input [template file extensions](/docs/languages/) (`.md` is one of them) in the current directory into the output folder (defaults to `_site`).

``` text
Writing _site/README/index.html from ./README.md.
Wrote 1 file in 0.11 seconds ({% latestVersion versions, config %})
```

Run `eleventy --serve` to start up a web server. Then open `http://localhost:8080/README/` in your web browser of choice to see your Eleventy output.

➡ Keep going! Read a longer [Getting Started guide](/docs/getting-started/) or check out the full [**Documentation for {% latestVersion versions, config %}**]({{ "/docs/" | url }}).

<h2 id="eleventy-is-supported-by">Eleventy is <a href="/docs/supporters/">supported</a> by… <a class="direct-link" href="#eleventy-is-supported-by">#</a></h2>

{% include "supporters.njk" %}

<a href="{{ "/docs/" | url }}" class="btn-primary btn-primary-why-are-you-doing-this benchnine rainbow-active rainbow-active-noanim">Documentation for <span>Eleventy {% latestVersion versions, config %}</span></a><span>Todd and [Bruce](https://twitter.com/brucel/status/1107699886584143872) said this button should be bigger and as you can see they were right</span>

## Built With Eleventy

<div class="sites-vert">
  <div class="lo-grid">
{% for key, site in sites -%}{% if site.twitter and site.disabled != true and site.url and site.featured and site.superfeatured -%}
  {% include "site-card.njk" %}
{% endif %}{%- endfor %}
  </div>
</div>

<!-- TODO some kind of aspect ratio? -->
<div data-import="/imports/facepile.html" class="facepile-fullwidth"></div>

View [all {{ sites | objectFilterNot("disabled") | length }} sites](/speedlify/).

## Don’t take my word for it {% emoji "🌈" %}

Listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

