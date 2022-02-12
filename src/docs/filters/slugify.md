---
eleventyNavigation:
  parent: Filters
  key: slugify Filter
  title: '<code>slugify</code>'
  order: 2
  excerpt: '<code>"My string"</code> to <code>"my-string"</code> for permalinks.'
---

# `slugify` Universal Filter {% addedin "1.0.0" %}

{% callout "info", "md" %}In versions prior to 1.0.0, [the `slug` Universal Filter was used](/docs/filters/slug/). To maintain backwards compatibility moving forward, `slug` is still included and supported but `slugify` is now recommended as best practice—it has better default behavior for URLs with special characters.{% endcallout %}

Uses the [`@sindresorhus/slugify` npm package](https://www.npmjs.com/package/@sindresorhus/slugify) to convert a string into a URL slug. Typically used with permalinks.


{% codetitle "slugify.md" %}
{% raw %}
```yaml
---
title: "My Title"
permalink: "/{{ title | slugify }}/"
---
Outputs to `/my-title/`.
```
{% endraw %}

* [`slug` Universal Filter](/docs/filters/slug/)
* [← Back to Filters documentation.](/docs/filters/)

### Upgrade from `slug` to `slugify`

If you’re trying to migrate the content in a pre-1.0 project from using the `slug` filter to the new `slugify` filter (note: this is optional—you can leave them as-is!), you must take extra care to make sure that any existing URLs don’t change. The [`@11ty/eleventy-upgrade-help` plugin will compare the `slug` and `slugify` versions of your URLs to see if there are any that require extra attention](https://github.com/11ty/eleventy-upgrade-help) (thank you to Peter deHaan for the assist here!).
