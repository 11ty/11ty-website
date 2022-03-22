---
pagination:
  data: authors
  size: 1
  alias: author
  serverless: eleventy.serverless.path.name
  # addAllPagesToCollections: true
permalink:
  serverless: "/authors/:name/"

eleventyNavigation:
  parent: Authors
excludeFromSearch: true
excludeFromSidebar: true
layout: layouts/docs.njk
css:
  - components/page-sites.css
---
{# @TODO add support for githubTwitterMap.js data #}
{%- set twitterUrl = "https://twitter.com/" + author.name.substring("twitter:".length) %}
{%- set githubUrl = "https://github.com/" + author.name %}

{%- set supporter = opencollective.supporters | isSupporter(author.name, githubTwitterMap[author.name], author.opencollective) -%}
{%- set displayName = supporter.name or author.name %}

# {{ displayName }}

{%- if author.name.startsWith("twitter:") %}
* <a href="{{ twitterUrl }}">{% communityavatar author.name %}{{ author.name | friendlyAuthorName | safe }}</a> on Twitter
{%- else %}
* <a href="{{ githubUrl }}">{% communityavatar author.name %}{{ author.name }}</a> on GitHub
{%- endif %}
{%- if supporter %}
* <a href="{{ supporter.profile }}" class="elv-externalexempt supporters-link"><strong>{% if supporter.tier and supporter.isActive %} {% emoji "📅" %} Monthly{% endif %} Eleventy Contributor</strong> on Open Collective</a> 🎈
{%- else %}
* <a href="https://opencollective.com/11ty">Not yet <strong>Supporting Eleventy</strong> on Open Collective.</a>
* <em>Already a supporter but it’s not showing here? Make sure your Twitter account is listed on your Open Collective Profile.</em>
{%- endif %}

{%- if author.business_url and supporter | isBusinessPerson %}
### Member of the [Eleventy Super Professional Business Network {% emoji "💼" %}](/super-professional-business-network/)

<a href="{{ author.business_url }}" class="btn-primary benchnine rainbow-active rainbow-active-noanim elv-externalexempt">Let’s Do Business</a>
{%- endif %}

{%- set authorStarters = starters | sortObjectByOrder | findBy("author", author.name) %}
{%- if authorStarters.length %}
### {{ displayName }}’s Starter Projects:

{%- for site in authorStarters %}
{%- if not site.disabled %}
* [{% avatarlocalcache "twitter", site.author, site.author %}{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{%- endif %}
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

### Demos, Examples, and Community Links

<div class="sites-vert">
  <div class="lo-grid">
{% for key, site in demos -%}{% if site.twitter.toLowerCase() == author.name.toLowerCase() or (site.authoredBy and site.authoredBy.includes(author.name)) -%}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{%- for key, entry in community %}
{%- if entry.author == author.name.toLowerCase()  -%}
  {%- set site = entry | convertCommunityLinkToSiteCard -%}
  {% include "site-card.njk" %}
{%- endif %}
{%- endfor %}
  </div>
</div>
