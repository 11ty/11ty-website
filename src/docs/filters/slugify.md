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

Uses the [`@sindresorhus/slugify` npm package](https://www.npmjs.com/package/@sindresorhus/slugify) to convert a string into a URL slug. Typically used inside of permalinks.

{% raw %}
```
{{ "My Title" | slugify }} -> `my-title`
```
{% endraw %}

If you’re trying to migrate a legacy project from the `slug` to the `slugify` filter, you must take extra care to make sure that any existing filters don’t break. Peter deHaan created [a small compatibility configuration script to compare old and new URLs](https://gist.github.com/zachleat/a58bc9e7273fc182a3c9c1234fee82c8) to ensure that they match.

* [`slug` Universal Filter](/docs/filters/slug/)
* [← Back to Filters documentation.](/docs/filters/)