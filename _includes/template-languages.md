<ul class="inlinelist">
{% for lang in templatetypes %}
  <li{% if page.url == lang.url %} class="active"{% endif %}><a href="{{ lang.url }}">{{ lang.name }} (<code>.{{ lang.ext }}</code>)</a></li>
{% endfor %}
</ul>