---
pageTitle: Sparklines
eleventyNavigation:
  key: Sparklines
  excerpt: Returns a Sparkline image given a set of numbers.
  # order: 0
communityLinksKey: api-services-sparkline
---

Feed this runtime service a comma separated list of numeric values and it will return an SVG sparkline image.

## Open Source

* [`11ty/api-sparkline` on GitHub](https://github.com/11ty/api-sparkline)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-sparkline" class="elv-externalexempt"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Usage

Try it out on the [Eleventy API Explorer](https://api-explorer.11ty.dev/).

Image URLs have the format:

```
https://v1.sparkline.11ty.dev/:dimensions/:values/
https://v1.sparkline.11ty.dev/:dimensions/:values/:color/
```

* `dimensions` must be two integers separated by an `x`. `[height]x[width]`, e.g. `120x30`
* `values` must be a comma separated list of numbers.
* `color` is an SVG friendly color (URI encoded).


## Samples

Using color `#123456`:

{% callout "demo" %}

<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,40/%23123456/" width="120" height="30" alt="Sparkline representing frequency of posts written from 2007 to 2021" loading="lazy" decoding="async">

{% endcallout %}

```html
<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,40/%23123456/" width="120" height="30" alt="Sparkline representing frequency of posts written from 2007 to 2021" loading="lazy" decoding="async">
```
