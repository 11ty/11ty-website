<div class="testimonials">
	<div class="testimonials-lo lo">
{%- for testimonial in testimonials | shuffle %}
{%- if testimonial.featured %}
		<div class="lo-c">{% testimonial testimonial %}</div>
{%- endif %}
{%- endfor %}
	</div>
</div>

<a href="/docs/testimonials/">…and many more!</a>