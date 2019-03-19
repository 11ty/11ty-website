---
subtitle: Testimonials
tags:
  - docs-overview
---

# {{ subtitle }}

Don’t just take my word for it. 🌈 Listen to what these happy developers are saying about Eleventy:

{% for testimonial in testimonials | shuffle %}
> {% if not testimonial.indirect %}“{% endif %}{{ testimonial.text }}{% if not testimonial.indirect %}”—{% avatar testimonial.twitter, testimonial.source, testimonial.name %}{% endif %}
{% endfor %}