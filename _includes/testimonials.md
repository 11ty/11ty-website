{% for testimonial in testimonials %}
{% if testimonial.featured %}{% include "testimonial.md" %}{% endif %}
{% endfor %}

<a href="/docs/testimonials/" class="naked">And more: &#160;{% for testimonial in testimonials %}{% if not testimonial.featured %}<img src="/img/avatars/{{ testimonial.twitter }}.jpg" alt="@{{ testimonial.twitter }}" class="avatar"> {% endif %}{% endfor %}</a>