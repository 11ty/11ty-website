---
subtitle: Starter Projects
tags:
  - docs-getting-started
---
# {{ subtitle }}

{% for site in starters -%}
{% if site.disabled != true -%}
1. [{% avatarlocalcache "twitter", site.author, site.author %}{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{% endif -%}
{% endfor -%}

## Source Code Samples

This list shows all of the sample sites that have provided a link to their source code. A [comprehensive list of all sample sites is available](/docs/sites/). {% addToSampleSites %}

<table>
  <thead>
    <tr>
      <th style="min-width: 9em"><span class="sr-only">Source Code</span></th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
{% for key, site in sites -%}
{% if site.disabled != true and site.source_url -%}
    <tr>
      <td>{% if site.source_url %}<a href="{{ site.source_url }}" class="minilink">Source Code</a>{% endif %}</td>
      <td>{% if site.url %}<a href="{{ site.url }}">{% endif %}{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}{% if site.url %}</a>{% endif %}</td>
    </tr>
{% endif -%}
{% endfor -%}
  </tbody>
</table>

