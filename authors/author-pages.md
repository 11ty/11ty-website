---
layout: layouts/docs.njk
permalink:
  cloud: "/authors/:slug/"
eleventyExcludeFromCollections: true
css:
  - components/page-sites.css
---
{%- set author = authors[params.path.slug] %}
{%- set twitterUrl = "https://twitter.com/" + author.name %}
{%- set supporter = opencollective.supporters | findBy("twitter", author.name) | last -%}
{%- set displayName = supporter.name or author.name %}

# {{ displayName }}

* <a href="{{ twitterUrl }}">{% avatarlocalcache "twitter", author.name %}{{ author.name }}</a> on Twitter
{%- if supporter %}
* <a href="{{ supporter.profile }}" class="elv-externalexempt supporters-link" rel="nofollow"><strong>{% if supporter.tier and supporter.isActive %} {% emoji "📅" %} Monthly{% endif %} Eleventy Contributor</strong> on Open Collective</a> 🎈
{%- else %}
* <a href="https://opencollective.com/11ty">Not yet <strong>Supporting Eleventy</strong> on Open Collective.</a>
* <em>Already a supporter but it’s not showing here? Make sure your Twitter account is listed on your Open Collective Profile.</em>
{%- endif %}

{%- if author.business and supporter | isBusinessPerson %}
### Member of the [Eleventy Super Professional Business Network {% emoji "💼" %}](/super-professional-business-network/)

{%- if author.business.availability %}
* {% emoji "🗓" %} Availability starting {{ author.business.availability | newsDate("LLLL yyyy") }}
{%- endif %}

<a href="{{ author.business.cta }}" class="btn-primary benchnine rainbow-active rainbow-active-noanim elv-externalexempt">Let’s Do Business</a>
{%- endif %}

{%- set authorStarters = starters | sortObjectByOrder | findBy("author", author.name) %}
{%- if authorStarters.length %}
### {{ displayName }}’s Starter Projects:

{%- for site in authorStarters %}
* [{% avatarlocalcache "twitter", site.author, site.author %}{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{%- endfor %}
{%- endif %}

{%- set authorPlugins = plugins | sortObjectByOrder | findBy("author", author.name) %}
{%- if authorPlugins.length %}
### {{ displayName }}’s Plugins:

{%- for plugin in authorPlugins %}
* [{% avatarlocalcache "twitter", plugin.author, plugin.author %}{% if plugin.deprecated %}~~{% endif %}{{ plugin.npm }}{% if plugin.deprecated %}~~{% endif %}](https://www.npmjs.com/package/{{ plugin.npm }}){% if plugin.description %} {% if plugin.deprecated %}~~{% endif %}{{ plugin.description | safe }}{% if plugin.deprecated %}~~{% endif %}{% endif %} {{ plugin.deprecated }}
{%- endfor %}
{%- endif %}


### {{ displayName }}’s Sites:

<div class="lo sites-lo" style="--lo-margin-h: 2rem; --lo-margin-v: 1rem; --lo-stackpoint: 31.25em;">
{%- for site in author.sites %}
  {%- set showMetadata = true %}
  {% include "site.njk" %}
{%- endfor %}
</div>