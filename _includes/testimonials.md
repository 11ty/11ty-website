{% for testimonial in testimonials | shuffle %}
{% if testimonial.featured %}{% testimonial testimonial %}{% endif %}
{% endfor %}

<a href="/docs/testimonials/" class="naked testimonials-more">And more: &#160;{% for testimonial in testimonials %}{% if not testimonial.featured %}{% avatar testimonial.twitter %}{% endif %}{% endfor %}</a>