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
	<li><a href="{{ supporter.profile }}" class="elv-externalexempt"><img src="{% if supporter.image %}/img/avatar-local-cache/{{ supporter.name | slug | lower }}.jpg{% else %}/img/default-avatar.png{% endif %}" alt="{{ supporter.name }}" loading="lazy" class="avatar">{{ supporter.name }}<!--for {% if supporter.currency === "USD" %}${% endif %}{{ supporter.totalAmountDonated }}--></a><em> is {% if supporter.tier %}a  Monthly{% else %}an{% endif %} Eleventy Supporter</em> {% supporterAmount supporter.totalAmountDonated %}</li>
{%- endif %}{% endfor %}
	<li><a href="https://opencollective.com/11ty"><img src="/img/default-avatar.png" alt="Default Avatar Image" loading="lazy" class="avatar"><strong>and you?</strong> {% emoji "🎁" %}{% emoji "🎁" %}{% emoji "🎁" %}</a></li>
</ol>