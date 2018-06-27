---
tipindex: "005"
tiptitle: "Super Simple CSS Concatenation"
date: 2018-06-27
tags: ["quicktips", "docs-quicktips"]
relatedTitle: "Quick Tip #005—Super Simple CSS Concatenation"
---

In some situations you may want to concatenate content files together into a single top level template. Maybe you want to create a single CSS file with all of your component CSS inside.

Consider this sample `theme.njk` file:

{% raw %}
```markdown
---
permalink: theme.css
---
{% include "components/header.css" %}
{% include "components/footer.css" %}
```
{% endraw %}

That’s an easy way to concatenate files and control the include order.

You might imagine creating an `include-all` [Shortcode](/docs/shortcodes/) that uses [`fast-glob`](https://www.npmjs.com/package/fast-glob) to include a glob of files like `{% raw %}{% include-all "components/*.css %}{% endraw %}`, but that’s an exercise left to the reader!

## Capture and Minify

In our [Inline CSS Quick Tip](/docs/quicktips/inline-css/), we discussed how to capture and minify a CSS file. This approach can be modified, of course, to capture multiple includes too!

{% raw %}
```html
<!-- capture the CSS content as a Nunjucks variable -->
{% set css %}
  {% include "components/header.css" %}
  {% include "components/footer.css" %}
{% endset %}
<!-- feed it through our cssmin filter to minify -->
<style>{{ css | cssmin | safe }}</style>
```
{% endraw %}