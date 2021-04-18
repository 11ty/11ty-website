---
eleventyNavigation:
  key: Supporting Eleventy
  order: 3
ignoreGitHubButtons: true
ignoreSupporters: true
---
# How can you Contribute to Eleventy?

{% set count = 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Participate

* **Build something**—join the [{{ sites | getsize }} sites Built With Eleventy](/docs/sites/). Hopefully you’re doing this already, if you’re here reading the documentation.
* **Help answer questions**: We welcome questions from people of all experience levels on our [GitHub issue tracker](https://github.com/11ty/eleventy/issues). We also welcome help answering those questions too!
* **Tell a friend!** Our project doesn’t have a big venture-capital backed marketing budget so we rely on word of mouth recommendations.
* [Join the chat on Discord](/news/discord/)!

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Give us a star on GitHub

{% include "star-on-github.njk" %}

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Contribute on Open Collective

Eleventy isn’t backed by rich venture capitalists. It’s supported by individuals <strong>like {% emoji "👋" %} <span class="nowrap" data-investors-avatar="prepend">you</span></strong> that want to invest in better, longer lasting tools to create on the web.

<div class="lo" style="--lo-margin-h: 1em; --lo-margin-v: .5em">
    <div class="lo-c">
        <a href="https://opencollective.com/11ty" class="btn-primary btn-primary-sm benchnine rainbow-active rainbow-active-noanim elv-externalexempt">Contribute</a>
    </div>
    <div class="lo-c" style="flex-basis: 30em">

As a thank you to our Supporters, Eleventy will:

{% include "supporter-benefits.njk" %}

</div><!-- /lo-c --></div><!-- /lo -->

All Eleventy contributors on Open Collective will be given a <a href="/docs/account/">Contributor Account</a> with access to Contributor-only features. To sign up, donate to <a href="https://opencollective.com/11ty"><strong>Support Eleventy</strong> on Open Collective {% emoji "🎁" %}</a>!

{% include "supporters.njk" %}
