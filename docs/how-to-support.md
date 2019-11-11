---
eleventyNavigation:
  key: Supporting Eleventy
  order: 2
ignoreGitHubButtons: true
ignoreSupporters: true
---
# {{ "How can you Support Eleventy?" | orphanWrap | safe }}

{% set count = 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Participate

* **Build something** with Eleventy! Hopefully you’re already doing this, if you’re reading the documentation 😇.
* **Help answer questions**: We welcome questions from people of all experience levels on our [GitHub issue tracker](https://github.com/11ty/eleventy/issues). We also welcome help answering those questions too!
* **Tell a friend!** Our project doesn’t have a big venture-capital backed marketing budget so we rely on word of mouth recommendations.

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Give us a star on GitHub

{% include "star-on-github.njk" %}

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Donate on Open Collective

We have a bunch of [lovely financial supporters](/docs/supporters/) to Eleventy.

Head on over to our [Open Collective](https://opencollective.com/11ty) {% emoji "🎁" %} and you could be one of them!

{% include "supporters.njk" %}

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Join Coil

We’re participating in what we hope will be the future of standards-based Web Monetization. We’re using a `<meta>` tag on our site (_importantly, this means no hefty third party runtime overhead_). If you have the [Coil web browser extension installed and an active Coil subscription](https://coil.com/), we get a few cents when you visit the site. Read more about it on [CSS Tricks](https://css-tricks.com/site-monetization-with-coil-and-removing-ads-for-supporters/).
