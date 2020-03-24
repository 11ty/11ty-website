---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Eleventy Contributors
  order: 1
ignoreSupporters: true
css:
  - components/page-supporters.css
---
# Thank You Eleventy Contributors!

Eleventy is made possible by financial contributions from these lovely people:

<div class="facepile supporters-facepile lo">
{% for supporter in supporters %}{% if supporter.role === "BACKER" -%}
{%- set nameToSlug = supporter.name | slug | lower -%}
	<div class="lo-c">
    <a href="{{ supporter.website or supporter.profile }}" class="elv-externalexempt supporters-link">{% avatarlocalcache "opencollective", nameToSlug, supporter.name %}{{ supporter.name }}</a>
    <span class="lo lo-inline">
        <span class="lo-c lo-nocontentwrap supporters-hearts">{% supporterAmount supporter.totalAmountDonated %}</span>
        {%- if supporter.tier and supporter.isActive %}
        <span class="lo-c supporters-tier">{% emoji "📅" %} Monthly</span>
        {%- endif %}
    </span>
  </div>
{%- endif %}{% endfor %}
{%- if config.localDev %}<div data-supporters-slug="zach-leatherman" class="lo-c"><a href="https://opencollective.com/zachleat" class="supporters-link"><img src="/img/avatar-local-cache/opencollective/zach-leatherman.jpg" alt="Zach Leatherman" loading="lazy" class="avatar">Zach Leatherman</a><span class="lo"><span class="lo-c supporters-tier"> Supporter</span><span class="lo-c supporters-hearts">❤️❤️❤️<span class="supporters-hearts-empty">💛💛💛💛💛💛💛</span></span></span></div>{% endif %}
  <div class="lo-c"><a href="https://opencollective.com/11ty"><img src="/img/default-avatar.png" alt="Default Avatar Image" loading="lazy" class="avatar"><strong>and you?</strong> {% emoji "🎁" %}{% emoji "🎁" %}{% emoji "🎁" %}</a></div>
</div>

There are <a href="/docs/how-to-support/"><strong>other ways to support Eleventy</strong> too</a>!
