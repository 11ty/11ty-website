---
eleventyNavigation:
  parent: Supporting Eleventy
  key: Contributor Account
  order: 2
enableLogin: true
---
# Contributor Account

To receive an Eleventy Contributor Account, you must <a href="https://opencollective.com/11ty">donate to the Eleventy project on Open Collective</a>. You will then receive an email with instructions on how to activate your Eleventy Contributor account.

{% if enableLogin %}
<div class="investors-account">
  <div data-netlify-identity-button class="investors-btn btn-primary btn-primary-sm btn-inline benchnine rainbow-active rainbow-active-noanim"></div>
</div>
{% endif %}


{% if enableLogin %}
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
{% endif %}
