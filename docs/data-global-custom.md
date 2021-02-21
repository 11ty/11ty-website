---
eleventyNavigation:
  parent: Data Cascade
  key: Config Global Data
  order: 4
---

# Global Data from the Configuration API {% addedin "1.0.0" %}

In addition to [Global Data Files](/docs/data-global/) global data can be added to the Eleventy config object using the `addGlobalData` method. This is especially useful for plugins.

The first value of `addGlobalData` is the key that will be available to your templates and the second value is the value of the value returned to the template.

## Example

```js
module.exports = function (eleventyConfig) {
  // Values can be static:
  eleventyConfig.addGlobalData("static", "static");
  // functions:
  eleventyConfig.addGlobalData("function", () => new Date());
  // or async :
  eleventyConfig.addGlobalData(
    "async",
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 100, "foo");
      })
  );
};
```

## Sources of Data

{% include "datasources.md" %}
