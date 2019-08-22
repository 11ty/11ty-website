---
subtitle: Eleventy Supporters
tags:
  - docs-overview
ignoreSupporters: true
---
# {{ "Eleventy Is Supported Financially By The Following Lovely People" | orphanWrap | safe }}

You too can <a href="https://opencollective.com/11ty"><strong>Support Eleventy</strong> on Open Collective {% emoji "🎁" %}</a>!

<ol class="facepile">
{% for supporter in supporters %}{% if supporter.role === "BACKER" -%}
{%- set nameToSlug = supporter.name | slug | lower -%}
	<li><a href="{{ supporter.profile }}" class="elv-externalexempt">{% if supporter.image %}{% avatarlocalcache nameToSlug, supporter.name %}{% else %}<img src="/img/default-avatar.png" alt="{{ supporter.name }}" loading="lazy" class="avatar">{% endif %}{{ supporter.name }}</a><em> is {% if supporter.tier %}a  Monthly{% else %}an{% endif %} Eleventy Supporter</em> {% supporterAmount supporter.totalAmountDonated %}</li>
{%- endif %}{% endfor %}
	<li><a href="https://opencollective.com/11ty"><img src="/img/default-avatar.png" alt="Default Avatar Image" loading="lazy" class="avatar"><strong>and you?</strong> {% emoji "🎁" %}{% emoji "🎁" %}{% emoji "🎁" %}</a></li>
</ol>