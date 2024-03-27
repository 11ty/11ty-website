---
eleventyNavigation:
  parent: Community
  key: Testimonials
  order: 1.1
---

# Testimonials

Don’t just take my word for it. 🌈 Listen to what these happy developers are saying about Eleventy:

{% for testimonial in testimonials | shuffle %}

<div id="{{ testimonial.name | slugify }}">
	{%- testimonial testimonial -%}
</div>
{% endfor %}
