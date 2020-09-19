---
eleventyNavigation:
  parent: Global Data Files
  key: Data Preprocessing
  order: 4
---
# Global Data File Preprocessing

* Starting in Eleventy 1.0, this feature is disabled by default: `dataTemplateEngine: false`
* Prior versions of Eleventy used Liquid preprocessing by default: `dataTemplateEngine: "liquid"`

[Global JSON data files](/docs/data-global/) (*not template/directory data files*) can be optionally preprocessed with a template engine specified under the `dataTemplateEngine` configuration option. `package.json` data is available here under the `pkg` variable.

For example, if your `dataTemplateEngine` is using `liquid` you can do this:

{% raw %}
```json
{
  "version": "{{ pkg.version }}"
}
```
{% endraw %}
