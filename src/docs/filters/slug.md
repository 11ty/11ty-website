---
eleventyNavigation:
  parent: Filters
  key: slug Filter
  title: '<code>slug</code>'
  order: 2
  excerpt: '<code>"My string"</code> to <code>"my-string"</code> for permalinks.'
---

# `slug` Universal Filter

{% callout "warn", "md" %}Starting in Eleventy v1.0.0, [the `slugify` Universal Filter](/docs/filters/slugify/) is recommended as best practice instead of the `slug` filter. For backwards compatibility, `slug` is still supported but `slugify` has better default behavior for URLs with special characters. **Note: it is not recommended to swap `slug` to `slugify` wholesale in old projects without knowing for sure that your production URLs will not change. Be careful!**{% endcallout %}

Uses the [`slugify` npm package](https://www.npmjs.com/package/slugify) to convert a string into a URL slug. Can be used in pagination or permalinks.

{% raw %}
```
{{ "My Title" | slug }} -> `my-title`
```
{% endraw %}

* [`slugify` Universal Filter](/docs/filters/slugify/)
* [← Back to Filters documentation.](/docs/filters/)