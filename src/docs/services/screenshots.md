---
pageTitle: Screenshots
eleventyNavigation:
  key: Screenshots
  excerpt: Returns a screenshot image from a URL.
communityLinksKey: api-services-screenshot
---

Feed this runtime service a URL and it return a fully rendered screenshot image from that page (using Puppeteer):

## Open Source

* [`11ty/api-screenshot` on GitHub](https://github.com/11ty/api-screenshot)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-screenshot" class="elv-externalexempt"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Usage

Try it out on the [Eleventy API Explorer](https://api-explorer.11ty.dev/).

Image URLs have the format:

```
https://v1.screenshot.11ty.dev/:url/
https://v1.screenshot.11ty.dev/:url/:size/
https://v1.screenshot.11ty.dev/:url/:size/:aspectratio/
https://v1.screenshot.11ty.dev/:url/:size/:aspectratio/:zoom/
```

* `url` must be URI encoded.
* Valid `size` values:
  * `small`: 375×___ (default)
  * `medium`: 650×___
  * `large`: 1024×___
    * `aspectratio` of `9:16` is not supported (throws an error)
  * `opengraph`: always 1200×630, works with `zoom`
    * `aspectratio` is ignored (no errors thrown)
* Valid `aspectratio` values:
  * `1:1` (default)
  * `9:16`
* Valid `zoom` values:
  * `bigger` (1.4 `devicePixelRatio`)
  * `smaller` (0.71 `devicePixelRatio`)

## Samples

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/bigger/" class="screenshot screenshot-first-example" width="375" height="667" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev">

```html
<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/bigger/" class="screenshot screenshot-first-example" width="375" height="667" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev">
```
