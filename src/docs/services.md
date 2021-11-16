---
eleventyNavigation:
  key: API Services
  order: 8
eleventyComputed:
  pageTitle: "API Services"
communityLinksKey: api-services
---
API Services are run-time things that are provided by Eleventy. We officially host instances of these and provide the source code for them so that you can self-host. The hosted instances are provided as-is without uptime guarantees.

It is encouraged to self-host these so you aren’t relying on run-time services that are out of your control but you can assess the risk-reward of this scenario yourself. (Definitely self-host for business use cases)

## [Eleventy API Explorer](https://api-explorer.11ty.dev/)

This is a website to show sample results from the official Eleventy API services.

## List of API Services

{{ collections.all | eleventyNavigation("API Services") | eleventyNavigationToMarkdown({ showExcerpt: true }) }}
