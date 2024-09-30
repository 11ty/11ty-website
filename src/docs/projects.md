---
eleventyNavigation:
  key: Eleventy Projects
  title: Projects
  order: 4
---

# Working with Eleventy Projects

{{ collections.all | eleventyNavigation("Eleventy Projects") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
