---
pageTitle: IndieWeb Avatar
eleventyNavigation:
  key: IndieWeb Avatar
  excerpt: Returns an avatar representing a URL.
  # order: 0
communityLinksKey: api-services-avatar
---

Feed this runtime service a URL and it will extract an avatar image using these sources:

1. `<link rel="apple-touch-icon">`
1. `<link rel="apple-touch-icon-precomposed">`
1. `<link rel="icon">`
1. `favicon.ico`

All `rel` lookups match against attribute values that are space separated lists.

## Open Source

* [`11ty/api-indieweb-avatar` on GitHub](https://github.com/11ty/api-indieweb-avatar)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/11ty/api-indieweb-avatar" class="elv-externalexempt"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Usage

Try it out on the [Eleventy API Explorer](https://api-explorer.11ty.dev/).

Image URLs have the format:

```
https://v1.indieweb-avatar.11ty.dev/:url/
```

* `url` must be URI encoded.

## Samples

{% callout "demo" %}

<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/" alt="IndieWeb Avatar for 11ty.dev/" loading="lazy" decoding="async" width="50" height="50">
<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.a11yproject.com%2F/" alt="IndieWeb Avatar for a11yproject.com/" loading="lazy" decoding="async" width="50" height="50">
<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.netlify.com%2F/" alt="IndieWeb Avatar for netlify.com/" loading="lazy" decoding="async" width="50" height="50">

{% endcallout %}

```html
<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2F/" alt="IndieWeb Avatar for 11ty.dev/" loading="lazy" decoding="async" width="50" height="50">
<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.a11yproject.com%2F/" alt="IndieWeb Avatar for a11yproject.com/" loading="lazy" decoding="async" width="50" height="50">
<img src="https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fwww.netlify.com%2F/" alt="IndieWeb Avatar for netlify.com/" loading="lazy" decoding="async" width="50" height="50">
```
