---
layout: layouts/main.njk
logoLink: /docs/
ignoreGitHubButtons: true
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

<a href="{{ "/docs/" | url }}" class="btn-primary benchnine rainbow-active rainbow-active-noanim">Documentation for <span>Eleventy {% latestVersion versions, config %}</span></a><span>Todd and [Bruce](https://twitter.com/brucel/status/1107699886584143872) said this button should be bigger and as you can see they were right</span>

## News

* 2018 March—[Eleventy wins Google Open Source Award](https://www.zachleat.com/web/eleventy-google-award/)
* 2018 September—[Google’s {% avatar "v8js" %}V8 web site launches using Eleventy](https://twitter.com/v8js/status/1044202940494475265)
* 2018 November—[Happy First Birthday, Eleventy! 🎉](https://www.zachleat.com/web/eleventy-birthday/)
* 2018 December—[Turn Jekyll up to Eleventy—a lovely tutorial by {% avatar "paulrobertlloyd" %}Paul Robert Lloyd](https://24ways.org/2018/turn-jekyll-up-to-eleventy/)

## Built With Eleventy

<div class="featured-sites">
    {% for key, site in sites -%}{% if site.twitter and site.disabled != true and site.url and site.featured and site.superfeatured -%}<a href="{{ site.url }}" class="elv-externalexempt">{% avatar site.twitter %}<span class="sr-only">{{ site.name | safe }}</span></a>{% endif -%}{% endfor -%}
    {% for key, site in sites -%}{% if site.twitter and site.disabled != true and site.url and site.featured and not site.superfeatured -%}<a href="{{ site.url }}" class="elv-externalexempt">{% avatar site.twitter %}<span class="sr-only">{{ site.name | safe }}</span></a>{% endif -%}{% endfor -%}
    {% for key, site in sites | shuffle %}{% if site.twitter and site.disabled != true and not site.featured and not site.superfeatured and not site.hideOnHomepage -%}<a href="{{ site.url or site.source_url }}" class="elv-externalexempt">{% avatar site.twitter %}<span class="sr-only">{{ site.name | safe }}</span></a>{% endif -%}{% endfor %}
</div>

View the [full list](/docs/sites/).

## Don’t take my word for it {% emoji "🌈" %}

Listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

