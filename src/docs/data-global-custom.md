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
  eleventyConfig.addGlobalData("myStatic", "static");
  // functions:
  eleventyConfig.addGlobalData("myFunction", () => new Date());
  // or a promise:
  eleventyConfig.addGlobalData(
    "myFunctionPromise",
    () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 100, "foo");
      })
    }
  );
  // or async:
  eleventyConfig.addGlobalData(
    "myAsyncFunction",
    async () => {
      return Promise.resolve("hi");
    }
  );
};
```

## Sources of Data

{% include "datasources.md" %}
