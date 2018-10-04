---
subtitle: Global Data Files
tags:
  - docs-data
---
# Global Data Files

Your global data folder is controlled by the [`dir.data` configuration option](/docs/config/#directory-for-global-data-files). All `*.json` and `module.exports` values from [`*.js` files](/docs/data-js/) in this directory will be added into a global data object available to all templates.

## Example

Consider a JSON data file located at `_data/userList.json` with the following content:

```js
[
  "user1",
  "user2"
]
```

This data will be available to your templates under the `userList` key like this:

```js
{
  userList: [
    "user1",
    "user2"
  ]
}
```

### Folders

If a data file is in a folder, the folder name will inform your global data object structure. For example, in our previous example, consider if our `userList.json` file was moved into a `users` folder at `_data/users/userList.json`.

Our data will be now available to your templates under a `users` key like so:

```js
{
  users: {
    userList: [
      "user1",
      "user2"
    ]
  }
}
```

### Using JavaScript instead of JSON

Read more about using `module.exports` values in arbitrary [JavaScript data files](/docs/data-js/).

## Sources of Data

{% include "datasources.md" %}