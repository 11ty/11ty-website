---
layout: layouts/main.njk
logoLink: /docs/
ignoreGitHubButtons: true
ignoreSupporters: true
searchTitle: Eleventy Home
bigPossum: true
---

## Quick Start

``` bash
npm install -g @11ty/eleventy
echo '# Page header' > README.md
eleventy
```

This will compile any files matching valid template file extensions in the current directory into the output folder (defaults to `_site`).

``` text
Writing _site/README/index.html from ./README.md
Wrote 1 file in 0.10 seconds
```

Run `eleventy --serve` to start up a hot-reloading web server. Then open `http://localhost:8080/README/` in your web browser of choice to see your Eleventy output.

➡ Keep going! Read a longer [Getting Started guide](/docs/getting-started/) or check out the full [**Documentation for {% latestVersion versions, config %}**]({{ "/docs/" | url }}).

<h2 id="eleventy-is-supported-by">Eleventy is <a href="/docs/supporters/">supported</a> by… <a class="direct-link" href="#eleventy-is-supported-by">#</a></h2>

{% include "supporters.njk" %}

## Latest [News]({{ '/news/' | url }})

{%- set news = collections.news | reverse | first %}
{%- if news %}
[{{ news.data.newstitle }}]({{ news.data.page.url }}) ({{ news.date | newsDate }})
{%- endif %}


<a href="{{ "/docs/" | url }}" class="btn-primary btn-primary-why-are-you-doing-this benchnine rainbow-active rainbow-active-noanim">Documentation for <span>Eleventy {% latestVersion versions, config %}</span></a><span>Todd and [Bruce](https://twitter.com/brucel/status/1107699886584143872) said this button should be bigger and as you can see they were right</span>

## Built With Eleventy

<ul class="inlinelist list-superfeatured">
    {% for key, site in sites -%}{% if site.twitter and site.disabled != true and site.url and site.featured and site.superfeatured -%}<li class="inlinelist-item"><a href="{{ site.url }}" class="elv-externalexempt">{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}</a></li>{% endif %}{% endfor -%}
</ul>

---

{# lighthouse flags if more than 60 nodes, so divide by 60 😅 #}
{% for key, site in sites | shuffle -%}
{%- if loop.first %}<div class="facepile">{% endif %}
{%- if site.twitter and site.disabled != true and site.url and not site.superfeatured and not site.hideOnHomepage -%}<a href="{{ site.url }}" class="elv-externalexempt">{% avatarlocalcache "twitter", site.twitter %}<span class="sr-only">{{ site.name | safe }}</span></a>{% endif -%}
{%- if loop.last or (loop.index0 % 60 == 0 and not loop.first) %}</div>{% endif %}
{%- if not loop.first and loop.index0 % 60 == 0 and not loop.last %}<div class="facepile">{% endif %}
{%- endfor %}

This is only a random sample of 60. See [all {{ sites | length }} sites](/docs/sites/).

## Don’t take my word for it {% emoji "🌈" %}

Listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

