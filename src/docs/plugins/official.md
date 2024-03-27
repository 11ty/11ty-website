---
eleventyNavigation:
  key: Official Plugins
  order: 1
  parent: Plugins
---

# Official Eleventy Plugins

All official plugins live under the `@11ty` npm organization and plugin names will include the `@11ty/` prefix.

{{ collections.all | eleventyNavigation("Official Plugins") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
