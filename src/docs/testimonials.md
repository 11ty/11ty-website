---
eleventyNavigation:
  parent: Overview
  key: Testimonials
---

# Testimonials

Don’t just take my word for it. 🌈 Listen to what these happy developers are saying about Eleventy:

{% for testimonial in testimonials | shuffle %}
{% testimonial testimonial %}
{% endfor %}