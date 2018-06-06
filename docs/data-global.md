---
subtitle: Global Data Files
tags:
  - docs-data
---
# Global Data Files

Your global data folder is controlled by the `dir.data` configuration option. All `json` files in this directory will be parsed into a global data object available to all templates.

If a data file is in a subdirectory, the subdirectory structure will inform your global data object structure. For example, consider `_data/users/userList.json` with the following data:

```js
[
  "user1",
  "user2",
  "user3",
  …
]
```

This data will be available to your templates like so:

```js
{
  users: {
    userList: [
      "user1",
      "user2",
      "user3",
      …
    ]
  }
}
```
