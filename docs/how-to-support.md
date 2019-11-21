---
eleventyNavigation:
  key: Supporting Eleventy
  order: 2
ignoreGitHubButtons: true
ignoreSupporters: true
---
# How can you Support Eleventy?

{% set count = 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Participate

* **Build something**—join the [{{ sites | getsize }} sites Built With Eleventy](/docs/sites/). Hopefully you’re doing this already, if you’re here reading the documentation.
* **Help answer questions**: We welcome questions from people of all experience levels on our [GitHub issue tracker](https://github.com/11ty/eleventy/issues). We also welcome help answering those questions too!
* **Tell a friend!** Our project doesn’t have a big venture-capital backed marketing budget so we rely on word of mouth recommendations.

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Give us a star on GitHub

{% include "star-on-github.njk" %}

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Contribute on Open Collective

Eleventy isn’t backed by rich venture capitalists. It’s supported by individuals <strong>like {% emoji "👋" %} <span class="nowrap" data-investors-avatar="prepend">you</span></strong> that want to invest in better, longer lasting tools to create on the web.

<div class="lo" style="--lo-margin-h: 1em; --lo-margin-v: .5em">
    <div class="lo-c">
        <a href="https://opencollective.com/11ty" class="btn-primary btn-primary-sm btn-inline benchnine rainbow-active rainbow-active-noanim elv-externalexempt">Contribute</a>
    </div>
    <div class="lo-c" style="flex-basis: 30em">

As a thank you to our Supporters, Eleventy will:

1. Display your [name and avatar on the Eleventy documentation](/docs/supporters/). Monthly supporter avatars are listed in the footer of _almost_ all documentation pages.
1. Provide access to <a href="/docs/search/">on-site documentation Search</a>!
1. No advertisements, tag managers, or third party trackers on Eleventy documentation pages. (Okay, everyone gets this)
1. <em>More to come!</em>
<!-- 1. **Future Roadmap** Access to documentation offline (Progressive Web App). -->

</div><!-- /lo-c --></div><!-- /lo -->

All Eleventy contributors on Open Collective will be given a <a href="/docs/account/">Contributor Account</a> with access to Contributor-only features. To sign up, donate to <a href="https://opencollective.com/11ty"><strong>Support Eleventy</strong> on Open Collective {% emoji "🎁" %}</a>!

{% include "supporters.njk" %}

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Web Monetization Using Coil

We’re participating in what we hope will be the future of standards-based Web Monetization. We’re using a `<meta>` tag on our site (_importantly, this means no hefty third party runtime overhead_). If you have the [Coil web browser extension installed and an active Coil subscription](https://coil.com/), we get a few cents when you visit the site. Read more about it on [CSS Tricks](https://css-tricks.com/site-monetization-with-coil-and-removing-ads-for-supporters/).
