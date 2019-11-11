---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Eleventy Supporters
ignoreSupporters: true
---
# {{ "Eleventy Is Supported Financially By The Following Lovely People" | orphanWrap | safe }}

You too can <a href="https://opencollective.com/11ty"><strong>Support Eleventy</strong> on Open Collective {% emoji "🎁" %}</a>! There are <a href="/docs/how-to-support/">other ways to support Eleventy too</a>.

<ol class="facepile">
{% for supporter in supporters %}{% if supporter.role === "BACKER" -%}
{%- set nameToSlug = supporter.name | slug | lower -%}
	<li><a href="{{ supporter.profile }}" class="elv-externalexempt">{% avatarlocalcache "opencollective", nameToSlug, supporter.name %}{{ supporter.name }}</a><em> is {% if supporter.tier %}a  Monthly{% else %}an{% endif %} Eleventy Supporter</em> {% supporterAmount supporter.totalAmountDonated %}</li>
{%- endif %}{% endfor %}
	<li><a href="https://opencollective.com/11ty"><img src="/img/default-avatar.png" alt="Default Avatar Image" loading="lazy" class="avatar"><strong>and you?</strong> {% emoji "🎁" %}{% emoji "🎁" %}{% emoji "🎁" %}</a></li>
</ol>

There are <a href="/docs/how-to-support/"><strong>other ways to support Eleventy</strong> too</a>!

_Monthly supporters have the added benefit of being listed in the footer of (almost) all documentation pages._