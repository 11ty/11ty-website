{% for testimonial in testimonials | shuffle %}
{% if testimonial.featured -%}
> “{{ testimonial.text }}”—{% avatar testimonial.twitter, testimonial.source, testimonial.name %}
{% endif %}
{% endfor %}

<a href="/docs/testimonials/" class="naked testimonials-more">And more: &#160;{% for testimonial in testimonials %}{% if not testimonial.featured %}<img src="/img/avatars/{{ testimonial.twitter }}.jpg" alt="@{{ testimonial.twitter }}" class="avatar"> {% endif %}{% endfor %}</a>