---
eleventyNavigation:
  parent: Configuration
  key: Custom Tags
  order: 5
relatedKey: custom-tags
relatedTitle: Template Custom Tags
tags:
  - related-shortcodes
  - related-nunjucks
  - related-liquid
  - related-handlebars
---

# Custom Tags

{% callout "info" %}It’s unlikely that you want this feature. You probably want <a href="/docs/shortcodes/">shortcodes</a> instead, Eleventy’s custom tags sugar (it’s easier to use).{% endcallout %}

Various template engines can be extended with custom tags.

Custom Tags are unrelated to Eleventy’s [Collections using Tags](/docs/collections/) feature. Unfortunately we’ve inherited this name from various upstream template languages.

But, after all that, you can still add a Custom Tag using the [Configuration API](/docs/config/#using-the-configuration-api).

## Liquid

- [LiquidJS: Tags](https://liquidjs.com/tutorials/register-filters-tags.html)

{% include "snippets/config/liquidtags.njk" %}

See all of the [built-in tag implementations for LiquidJS](https://liquidjs.com/tags/overview.html).

## Nunjucks

- [Nunjucks: Custom Tags](https://mozilla.github.io/nunjucks/api.html#custom-tags)

{% include "snippets/config/nunjuckstags.njk" %}
