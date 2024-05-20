---
eleventyNavigation:
  parent: Data Cascade
  key: Global Data Files
  order: 3
relatedLinks:
  /docs/config/#default-template-engine-for-global-data-files: Default Template Engine for Global Data Files
---

# Global Data Files

{% tableofcontents %}

Global data is [data](/docs/data/) that is exposed to every template in an Eleventy project.

One way to create global data is through <dfn>global data files</dfn>: JSON and JavaScript files placed inside of the <dfn>global data folder</dfn>. The global data folder is placed inside the project's input directory (set by the [`dir.input` configuration option](/docs/config/#input-directory)), and the name of the global data folder is set by the [`dir.data` configuration option](/docs/config/#directory-for-global-data-files) (`_data` by default). All `*.json` and `module.exports` values from [`*.js` files](/docs/data-js/) in this directory will be added into a global data object available to all templates.

You may also be interested in [config global data](/docs/data-global-custom/){% addedin "1.0.0" %}, which is another way to add global data to every template in an Eleventy project.

## Example

Consider a JSON data file located at `_data/userList.json` with the following content:

```js
["user1", "user2"];
```

This data will be available to your templates under the `userList` key like this:

```js
{
	userList: ["user1", "user2"];
}
```

### Folders

If a data file is in a folder, the folder name will inform your global data object structure. For example, in our previous example, consider if our `userList.json` file was moved into a `users` folder at `_data/users/userList.json`.

Our data will be now available to your templates under a `users` key like so:

```js
{
	users: {
		userList: ["user1", "user2"];
	}
}
```

### Using JavaScript instead of JSON

Read more about using `module.exports` values in arbitrary [JavaScript data files](/docs/data-js/).

## Sources of Data

{% include "datasources.md" %}

## From the Community

{% include "11tybundle.njk" %}
