---
eleventyNavigation:
  key: Community
  order: 2.5
ignoreSupporters: true
ignoreGitHubButtons: true
---
# Community

{% set count = 0 %}

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Participate

* **Build something**—join the [{{ authors | length }} developers building with Eleventy](/docs/authors/).
* **Ask a question, answer a question**: We welcome questions from people of all experience levels on [Discord](/blog/discord/), [GitHub Discussions](https://github.com/11ty/eleventy/discussions), and the [issue tracker](https://github.com/11ty/eleventy/issues). We _really_ appreciate help answering those questions too!
* [**Tell a friend!**](https://twitter.com/intent/tweet?text={{ "I heard @eleven_ty was good" | urlencode }}) Our project doesn’t have a big marketing budget so we rely on word of mouth!
* {% include "star-on-github.njk" %}
* Looking to **Hire an Eleventy developer**? Browse the [Eleventy Super Professional Business Network 💼](/super-professional-business-network/)

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Stay up-to-date

* [**Follow @eleven_ty on Twitter**](https://twitter.com/intent/follow?screen_name=eleven_ty)
* Read the [**Eleventy Blog**](/blog/)
* Subscribe/unsubscribe to the [Eleventy YouTube Channel](/youtube/)
* We publish RSS feeds for: [**Blog Posts**](/blog/feed.xml) and [**Documentation Updates**](/docs/feed.xml)
* View the full [Eleventy Release History](/docs/versions/) (with documentation for previous versions)

{% set count = count + 1 %}
## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Contribute on [Open Collective](https://opencollective.com/11ty)

Eleventy is supported by [folks <strong>like {% emoji "👋" %} <span class="nowrap" data-investors-avatar="prepend">you</span></strong>](/docs/supporters/) that want to invest in better, longer lasting tools to create on the web.

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

