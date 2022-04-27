---
eleventyNavigation:
  parent: Filters
  key: log Filter
  title: '<code>log</code>'
  order: 3
  excerpt: '<code>console.log</code> inside templates.'
---
# `log` Universal Filter

{% addedin "0.11.0" %} An easy way to <code>console.log</code> anything from inside of a template file.


<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    View this example in:
    <a href="#log-liquid" role="tab">Liquid</a>
    <a href="#log-njk" role="tab">Nunjucks</a>
    <a href="#log-js" role="tab">11ty.js</a>
  </div>
  <div id="log-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```liquid
{{ "My Title" | log }}
```
{% endraw %}

  </div>
  <div id="log-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```jinja2
{{ "My Title" | log }}
```
{% endraw %}

  </div>
  <div id="log-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}
```js
module.exports = function(data) {
  // Caveat: you have access to `console.log` here, so probably use that.
  return this.log("My Title");
}
```
{% endraw %}

  </div>
</seven-minute-tabs>

is functionally the same as running `console.log("My Title")` inside of your template.

* [← Back to Filters documentation.](/docs/filters/)
