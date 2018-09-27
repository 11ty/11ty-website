## Don’t just take my word for it 🌈

Listen to what these happy developers are saying about Eleventy:

{% for testimonial in testimonials %}
> ”{{ testimonial.text }}“—[![@{{ testimonial.twitter }}](/img/avatars/{{ testimonial.twitter }}.jpg){{ testimonial.name }}]({% if testimonial.source %}{{ testimonial.source }}{% else %}https://twitter.com/{{ testimonial.twitter }}{% endif %})

{% endfor %}