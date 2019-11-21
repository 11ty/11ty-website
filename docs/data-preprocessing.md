---
eleventyNavigation:
  parent: Using Data
  key: Data Preprocessing
  order: 3
---
# Global Data File Preprocessing

All [global JSON data files](/docs/data-global/) (*not template/directory data files*) will be preprocessed with the template engine specified under the `dataTemplateEngine` configuration option. Note that `package.json` data is automatically available here under the `pkg` variable.

For example, if your `dataTemplateEngine` is using the default `liquid` engine you can do this:

{% raw %}
```
{
  "version": "{{ pkg.version }}"
}
```
{% endraw %}

If using `dataTemplateEngine: false` in your configuration file, data file preprocessing will be skipped.