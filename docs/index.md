{% for page in collections.docs %}
{{ page.templateContent | safe }}
{% endfor %}

