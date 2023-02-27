<div class="testimonials">
	<div class="testimonials-layout fl">
{%- for testimonial in testimonials | shuffle %}
{%- if testimonial.featured %}
		<div>{% testimonial testimonial %}</div>
{%- endif %}
{%- endfor %}
	</div>
</div>

<a href="/docs/testimonials/">…and many more!</a>