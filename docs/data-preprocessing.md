---
subtitle: Data Preprocessing
tags:
  - docs-data
---
# Data Preprocessing

All data files will be pre-processed with the template engine specified under the `dataTemplateEngine` configuration option. Note that `package.json` data is available here under the `pkg` variable.

For example, if your `dataTemplateEngine` is using the default, `liquid`, you can do this:

{% raw %}
```
{
  "version": "{{ pkg.version }}"
}
```
{% endraw %}
