---
subtitle: Starter Projects
tags:
  - docs-getting-started
---
# {{ subtitle }}

{% for site in starters -%}
{% if site.disabled != true -%}
1. [{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{% endif -%}
{% endfor -%}

## Sites Built with Eleventy

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th class="bp-notsm"><span class="sr-only">Demo</span></th>
      <th class="bp-notsm"><span class="sr-only">Source</span></th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
{% for site in eleventysites -%}
{% if site.disabled != true -%}
    <tr>
      <td><strong>>{% avatar site.twitter %}{{ site.name | safe }}</strong></td>
      <td class="bp-notsm">{% if site.url %}<a href="{{ site.url }}" class="minilink">Demo</a>{% endif %}</td>
      <td class="bp-notsm">{% if site.source_url %}<a href="{{ site.source_url }}" class="minilink">Source</a>{% endif %}</td>
      <td>{% if site.url %}<a href="{{ site.url }}" class="minilink bp-sm">Demo</a>{% endif %}{% if site.source_url %}<a href="{{ site.source_url }}" class="minilink bp-sm">Source</a>{% endif %}{{ site.description | safe }}</td>
    </tr>
{% endif -%}
{% endfor -%}
  </tbody>
</table>

<a href="https://github.com/11ty/11ty.io/issues/new?title=I+built+a+site+with+Eleventy!"><strong>Have a suggestion?</strong></a>