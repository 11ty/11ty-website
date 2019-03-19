{% for testimonial in testimonials | shuffle %}
{% if testimonial.featured -%}
> {% if not testimonial.indirect %}“{% endif %}{{ testimonial.text }}{% if not testimonial.indirect %}”—{% avatar testimonial.twitter, testimonial.source, testimonial.name %}{% endif %}
{% endif %}
{% endfor %}

<a href="/docs/testimonials/" class="naked testimonials-more">And more: &#160;{% for testimonial in testimonials %}{% if not testimonial.featured %}{% avatar testimonial.twitter %}{% endif %}{% endfor %}</a>