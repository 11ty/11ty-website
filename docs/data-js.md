---
subtitle: JavaScript Data Files
tags:
  - docs-data
---
# JavaScript Data Files

{% addedin "0.5.3" %}

This file applies to both [Global Data Files](/docs/data-global/) (`*.js` inside of your `_data` directory) and [Template and Directory Data Files](/docs/data-template-dir/) (`*.11tydata.js` files that are paired with a template file).

You can export data from a JavaScript file to add data, too. This allows you to execute arbitrary code to fetch data at build time.

```js
module.exports = [
  "user1",
  "user2"
];
```

If you return a `function`, we’ll use the return value from that function.

```js
module.exports = function() {
  return [
    "user1",
    "user2"
  ];
};
```

We use `await` on the return value, so you can return a promise and/or use an `async function` too. Fetch your data asynchronously at build time!

```js
module.exports = function() {
  return new Promise((resolve, reject) => {
    resolve([
      "user1",
      "user2"
    ]);
  });
};
```

```js
async function fetchUserData(username) {
  // do some async things
  return username;
}
 
module.exports = async function() {
  let user1 = await fetchUserData("user1");
  let user2 = await fetchUserData("user2");

  return [user1, user2];
};
```

## Example: Using GraphQL

This "Hello World" GraphQL example works out of the box with Eleventy:

```js
var { graphql, buildSchema } = require("graphql");
  
// this could also be `async function`
module.exports = function() {
  // if you want to `await` for other things here, use `async function`
  var schema = buildSchema(`type Query {
    hello: String
  }`);
  
  var root = {
    hello: () => "Hello world async!"
  };
  
  return graphql(schema, "{ hello }", root);
};
```
