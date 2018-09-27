---
layout: layouts/main.njk
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

➡ Keep going! Check out the [**Documentation for {% latestVersion versions, config %}**]({{ "/docs/" | url }}).

## News

* 2018 March—[Eleventy wins Google Open Source Award](https://www.zachleat.com/web/eleventy-google-award/)

## Featured

<div class="featured-sites">{% for site in eleventysites -%}{% if site.disabled != true and site.url and site.featured -%}<a href="{{ site.url }}" class="elv-externalexempt">{% avatar site.twitter %}<span class="sr-only">{{ site.name | safe }}</span></a>{% endif -%}{% endfor -%}</div>

## Don’t just take my word for it 🌈

Listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

