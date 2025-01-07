---
eleventyNavigation:
  parent: Data Cascade
  key: Config Global Data
  order: 4
---

# Global Data from the Configuration API {% addedin "1.0.0" %}

{% tableofcontents %}

In addition to [Global Data Files](/docs/data-global/) global data can be added to the Eleventy config object using the `addGlobalData` method. This is especially useful for plugins.

The first value of `addGlobalData` is the key that will be available to your templates and the second value is the value of the value returned to the template.

## Literals

```js
module.exports = function (eleventyConfig) {
	// Values can be static:
	eleventyConfig.addGlobalData("myString", "myValue");
};
```

## More Complex Paths

The first argument can be any [lodash-set compatible path](https://lodash.com/docs/4.17.15#set):

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData("myNestedObject.myString", "myValue");
};
```


## Functions

Importantly, passing a `function` to `addGlobalData` will evaluate that function before setting the value to the data cascade (and is async-friendly).

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData("myDate", () => new Date());

	// myDate’s value will be a Date instance
};
```

If you want a `function` returned, make sure you nest it:

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData("myFunction", () => {
		return () => new Date();
	});

	// myFunction’s value will be a function that returns a Date instance
};
```

The above is important to know when using this API with [Computed Data](/docs/data-computed/#using-javascript):

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData("eleventyComputed.myString", () => {
		return (data) => "This is a string!";
	});

	// myString’s value will be "This is a string!"
};
```


### Async/Promises

```js
module.exports = function (eleventyConfig) {
	// or a promise:
	eleventyConfig.addGlobalData("myFunctionPromise", () => {
		return new Promise((resolve) => {
			setTimeout(resolve, 100, "foo");
		});
	});

	// or async:
	eleventyConfig.addGlobalData("myAsyncFunction", async () => {
		return Promise.resolve("hi");
	});
};
```

## Sources of Data

{% include "datasources.md" %}
