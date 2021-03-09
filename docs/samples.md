---
eleventyNavigation:
  parent: Starter Projects
  key: Source Code Samples
  order: 1
excludeFromSidebar: true
---
## Source Code Samples

This list shows all of the sample sites that have provided a link to their source code in random order. A [comprehensive list of all sample sites is available](/speedlify/). {% addToSampleSites %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th style="min-width: 9em">Source Code</th>
    </tr>
  </thead>
  <tbody>
{% for key, site in sites | shuffle -%}
{% if site.disabled != true and site.source_url -%}
    <tr>
      <td>{% if site.url %}<a href="{{ site.url }}">{% endif %}{% avatarlocalcache "twitter", site.twitter %}{{ site.name | safe }}{% if site.url %}</a>{% endif %}</td>
      <td>{% if site.source_url %}<a href="{{ site.source_url }}" class="minilink">Source Code</a>{% endif %}</td>
    </tr>
{% endif -%}
{% endfor -%}
  </tbody>
</table>
