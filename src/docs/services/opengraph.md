---
pageTitle: OpenGraph Image
eleventyNavigation:
  key: OpenGraph Image
  excerpt: Returns the OpenGraph image from a URL.
  # order: 0
communityLinksKey: api-services-opengraph
---

Feed this runtime service a URL and it will extract an optimized OpenGraph image using these sources:

1. `<meta name="og:image:secure_url">`
1. `<meta name="og:image">`
1. `<meta property="og:image">`
1. `<meta name="twitter:image">`

## Open Source

* [`11ty/api-opengraph-image` on GitHub](https://github.com/11ty/api-opengraph-image)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-opengraph-image" class="elv-externalexempt"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Usage

Try it out on the [Eleventy API Explorer](https://api-explorer.11ty.dev/).

Image URLs have the format:

```
https://v1.opengraph.11ty.dev/:url/
https://v1.opengraph.11ty.dev/:url/:size/
https://v1.opengraph.11ty.dev/:url/:size/:format/
```

* `url` must be URI encoded.
* `size` (optional) can be `small` (375×_), `medium` (650×_), or `auto` (keep original width)
* `format` must by an output image format supported by [Eleventy Image](https://www.11ty.dev/docs/plugins/image/)


## Samples

<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/small/" alt="OpenGraph image for 11ty.dev" loading="lazy" decoding="async" width="375" height="197">
<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.a11yproject.com%2F/small/" alt="OpenGraph image for a11yproject.com" loading="lazy" decoding="async" width="375" height="197">
<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.netlify.com%2F/small/" alt="OpenGraph image for netlify.com" loading="lazy" decoding="async" width="375" height="197">

```html
<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/small/" alt="OpenGraph image for 11ty.dev" loading="lazy" decoding="async" width="375" height="197">
<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.a11yproject.com%2F/small/" alt="OpenGraph image for a11yproject.com" loading="lazy" decoding="async" width="375" height="197">
<img src="https://v1.opengraph.11ty.dev/https%3A%2F%2Fwww.netlify.com%2F/small/" alt="OpenGraph image for netlify.com" loading="lazy" decoding="async" width="375" height="197">
```
