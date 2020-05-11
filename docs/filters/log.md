---
eleventyNavigation:
  parent: Filters
  key: log Filter
  title: '<code>log</code> Filter'
  order: 3
  excerpt: '<code>console.log</code> inside templates.'
---
# `log` Universal Filter

{% addedin "0.11.0" %} An easy way to <code>console.log</code> anything from inside of a template file.

{% raw %}
```
{{ "My Title" | log }}
```

is the same as:

```js
console.log("My Title");
```
{% endraw %}

* [← Back to Filters documentation.](/docs/filters/)
