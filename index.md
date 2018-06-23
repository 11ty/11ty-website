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

{% set latestversion %}{{ pkg.devDependencies["@11ty/eleventy"] | version }}{% endset -%}
➡ Keep going! Check out the [**Documentation for {{ latestversion }}**]({{ "/docs/" | url }}).

## News

* 2018 March—<a href="https://www.zachleat.com/web/eleventy-google-award/">Eleventy wins Google Open Source Award</a>

{% include "testimonials.md" %}