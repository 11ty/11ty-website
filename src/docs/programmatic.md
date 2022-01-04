---
eleventyNavigation:
  parent: Getting Started
  key: Programmatic API
  order: 6
---
# Programmatic API {% addedin "1.0.0" %}

{% callout "info", "md" %}If you’re already experimenting with this feature on Eleventy pre-releases, this documentation is specific to `1.0.0-beta.10` or `1.0.0-canary.50` or newer. This info-box will self destruct upon final `1.0.0` stable release.{% endcallout %}

Starting in Eleventy 1.0, you can run Eleventy in your own Node script. _(This is how the [Eleventy Serverless](/docs/plugins/serverless/) plugin works, behind the scenes)_

## Contents

[[toc]]

## Examples

### Write to the file system

Don’t forget to [install Eleventy into your local project first](/docs/getting-started/#step-2-install-eleventy)!

Next create a file called `my-node-script.js` with the following contents:

{% codetitle "my-node-script.js" %}

```js
const Eleventy = require("@11ty/eleventy");

(async function() {
  let elev = new Eleventy();
  await elev.write();
})();
```

Then run your new script from the command line. _Don’t include `~ $` when you run this command._

{% codewithprompt "cmdhomedir", "all" %}
node my-node-script.js
{% endcodewithprompt %}

### Don’t write to the file system

Using `.write()` will write your output to the file system. If, instead, you want to retrieve the content programmatically without writing, use `.toJSON()` or `.toNDJSON()`.

#### JSON Output

```js
const Eleventy = require("@11ty/eleventy");

(async function() {
  let elev = new Eleventy();
  let json = await elev.toJSON();
  // All results
  console.log( json );
})();
```

#### ndjson Output

```js
const Eleventy = require("@11ty/eleventy");

(async function() {
  let elev = new Eleventy();
  let stream = await elev.toNDJSON();
  stream.on("data", (entry) => {
    // Stream one output result at a time
    let json = JSON.parse(entry.toString());
    console.log( json );
  });
})();
```

### Changing the Input and Output Directories

The first argument is the input directory. The second argument is the output directory.

```js
const Eleventy = require("@11ty/eleventy");

(async function() {
  let elev = new Eleventy( ".", "_site" );

  // Use `write` or `toJSON` or `toNDJSON`
})();
```

## Full Options List

The third argument to Eleventy is an options object.

```js
const Eleventy = require("@11ty/eleventy");

(async function() {
  let elev = new Eleventy( ".", "_site", {
    // --quiet
    quietMode: true,

    // --config
    configPath: ".eleventy.js",

    config: function(eleventyConfig) {
      // Do some custom Configuration API stuff
      // Works great with eleventyConfig.addGlobalData
    },
  });

  // Use `write` or `toJSON` or `toNDJSON`
})();
```

_(More to come)_

<!--
    // Only useful if the first argument above is a single file (or glob)
    inputDir: ".",
-->
