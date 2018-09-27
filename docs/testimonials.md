---
subtitle: Testimonials
tags:
  - docs-overview
---

# {{ subtitle }}

Don’t just take my word for it. 🌈 Listen to what these happy developers are saying about Eleventy:

{% for testimonial in testimonials %}
> “{{ testimonial.text }}”—{% avatar testimonial.twitter, testimonial.source, testimonial.name %}
{% endfor %}