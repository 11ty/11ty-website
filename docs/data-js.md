---
eleventyNavigation:
  parent: Using Data
  key: JavaScript Data Files
  order: 2
relatedLinks:
  /docs/config/#change-file-suffix-for-template-and-directory-data-files: Change the file suffix `.11tydata` for Template/Directory data files
  /docs/config/#watch-javascript-dependencies: Watch JavaScript Dependencies
---
# JavaScript Data Files {% addedin "0.5.3" %}

This file applies to both [Global Data Files](/docs/data-global/) (`*.js` inside of your `_data` directory) and [Template and Directory Data Files](/docs/data-template-dir/) (`*.11tydata.js` files that are paired with a template file or directory).

## Using JS Data Files

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

We use `await` on the return value, so you can return a promise and/or use an `async function`, too. Fetch your data asynchronously at build time!

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

## Examples

- [Example: Using GraphQL](#example-using-graphql)
- [Example: Exposing Environment Variables](#example-exposing-environment-variables)

### Example: Using GraphQL

This “Hello World” GraphQL example works out of the box with Eleventy:

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

### Example: Exposing Environment Variables

You can expose environment variables (e.g. `ELEVENTY_ENV`) to your templates by using [Node.js’ `process.env` property](https://nodejs.org/api/process.html#process_process_env).

{% codetitle "_data/myProject.js" %}

```js
module.exports = {
  environment: process.env.ELEVENTY_ENV
};
```

Saving this as `myProject.js` in your global data directory (by default, this is `_data/`) gives you access to the `myProject.environment` variable in your templates.

#### Sample commands

```
# Serve for Development
ELEVENTY_ENV=development npx @11ty/eleventy --serve

# Build for Production
ELEVENTY_ENV=production npx @11ty/eleventy
```

#### Template Usage

Working from our [Inline CSS Quick Tip](/docs/quicktips/inline-css/), we can modify the output to only minify our CSS if we’re building for production:

{% raw %}
```
{% if myProject.environment == "production" %}
<style>{{ css | cssmin | safe }}</style>
{% else %}
<style>{{ css | safe }}</style>
{% endif %}
```
{% endraw %}