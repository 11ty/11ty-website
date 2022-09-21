---
eleventyNavigation:
  key: Official Plugins
  order: 2
  parent: Plugins
---
# List of Official Plugins

All official plugins live under the `@11ty` npm organization and plugin names will include the `@11ty/` prefix.

{{ collections.all | eleventyNavigation("Official Plugins") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
