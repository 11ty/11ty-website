---
subtitle: Open Collective Contributors
ignoreSupporters: true
---

{%- css %}{% include "components/page-supporters.css" %}{% endcss %}

# Thank You Eleventy Contributors!

Eleventy is made possible by financial contributions from these lovely people:

<div class="facepile supporters-facepile fl">
{% for supporter in opencollective.supporters %}
{%- set nameToSlug = supporter.name | slug | lower -%}
{%- if nameToSlug != "zach-leatherman" %}
  <div>
    <a href="{{ supporter.website or supporter.profile }}" class="elv-externalexempt supporters-link" rel="sponsored">{% opencollectiveavatar supporter.image, supporter.name %}{{ supporter.name }}</a>
    <span class="fl fl-inline fl-nowrap">
        <span class="supporters-hearts">{% supporterAmount supporter.totalAmountDonated %}</span>
        {%- if supporter.isMonthly %}
        <span class="supporters-tier">{% emoji "📅" %} Monthly</span>
        {%- endif %}
    </span>
  </div>
{%- endif %}
{% endfor %}
  <div><a href="https://opencollective.com/11ty"><img src="/img/default-avatar.png" alt="Default Avatar Image" loading="lazy" class="avatar"><strong>and you?</strong> {% emoji "🎁" %}{% emoji "🎁" %}{% emoji "🎁" %}</a></div>
</div>

There are <a href="/docs/how-to-support/"><strong>other ways to support Eleventy</strong> too</a>!
