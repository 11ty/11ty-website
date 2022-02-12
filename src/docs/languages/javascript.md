---
eleventyNavigation:
  parent: Template Languages
  key: JavaScript
  order: 4
addedInVersion: 0.7.0
relatedKey: javascript
relatedTitle: Template Language—JavaScript
tags:
  - related-filters
  - related-shortcodes
relatedLinks:
  /docs/config/#watch-javascript-dependencies: Watch JavaScript Dependencies
communityLinksKey: javascript
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package |
| ------------------- | -------------- | ----------- |
| `11ty.js`              | `.11ty.js`        | N/A         |

Eleventy supports many different types of JavaScript content that will be parsed as Eleventy templates:

## Raw Values

Raw values will not have access to Data or [JavaScript Template Functions](#javascript-template-functions). [Use a function](#function) that returns a value instead.

### String

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = "<p>Zach</p>";
```

Or [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = `<p>These can
span
multiple
lines!</p>`;
```


### Buffer

Some templating libraries return [Buffers](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding) (e.g. [viperHTML](https://github.com/WebReflection/viperHTML)).

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = Buffer.from("<p>Zách</p>");
```

### Promise

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve("<p>Zach</p>");
  }, 1000);
});
```

## Function

Can return any [raw value](#raw-values) (e.g. String, Buffer, Promise). Use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to embed data values without having to concatenate strings!

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = function(data) {
  return `<p>${data.name}</p>`;
};
```

De-structuring syntax is a little bit easier to read:

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = function({name}) {
  return `<p>${name}</p>`;
};
```

Maybe you like arrow functions:

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = ({name}) => `<p>${name}</p>`;
```

`async` functions work too:

{% codetitle "JavaScript", "Syntax" %}

```js
const getAnAsyncThing = require("./lib/asyncThing");

module.exports = async function(data) {
  return `<p>${await getAnAsyncThing()}</p>`;
};
```

## Classes

Eleventy looks for classes that have a `render` method and uses `render` to return the content of the template. `render` methods can be `async`.

`render` can return any [raw value](#raw-values) (e.g. String, Buffer, Promise).

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  // or `async render({name}) {`
  render({name}) {
    return `<p>${name}</p>`;
  }
}

module.exports = Test;
```

### Optional `data` Method

{% callout "info" %}<a href="/docs/data-frontmatter/">YAML Front Matter</a> is not supported in JavaScript template types. Use <code>data</code> methods instead!{% endcallout %}

This data acts as Front Matter for the template and similarly to Front Matter will take precedence over all other data in the data cascade. The `data` method can be asynchronous `async data()` or it can be a getter `get data()`.

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      name: "Ted",
      layout: "teds-rad-layout",
      // … other front matter keys
    };
  }

  render({name}) {
    // will always be "Ted"
    return `<p>${name}</p>`;
  }
}

module.exports = Test;
```

### Permalinks

The `permalink` data key will work here. Permalinks can be a [raw value](#raw-values) (e.g. String, Buffer, Promise) or a Function that returns any raw value.

#### Permalink String

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  data() {
    return {
      // Writes to "/my-permalink/index.html"
      permalink: "/my-permalink/"
    };
  }

  render(data) { /* … */ }
}

module.exports = Test;
```

#### Permalink Function

Permalink Functions can return any [raw value](#raw-values) (e.g. String, Buffer, Promise).

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  data() {
    return {
      key: "hello",
      // Writes to "/my-permalink/hello/index.html"
      permalink: data => `/my-permalink/${data.key}/`
    };
  }

  render(data) { /* … */ }
}

module.exports = Test;
```

#### Permalink Function using a Filter

Universal filters, shortcodes, and other JavaScript Template Functions work here and are exposed on `this`. Read more about [Eleventy provided Universal Filters](/docs/filters/#eleventy-provided-universal-filters).

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  data() {
    return {
      title: "This is my blog post title",
      // Writes to "/this-is-my-blog-post-title/index.html"
      permalink: function(data) {
        return `/${this.slug(data.title)}/`;
      }
    };
  }

  render(data) { /* … */ }
}

module.exports = Test;
```

### Markdown and JavaScript

Yes, you can use JavaScript as your preprocessor language for Markdown. Read more about [`templateEngineOverride`](/docs/languages/#overriding-the-template-language).

{% codetitle "JavaScript and Markdown", "Syntax" %}

```js
class Test {
  data() {
    return {
      myName: "Zach",
      templateEngineOverride: "11ty.js,md"
    };
  }

  render(data) {
    return `# This is ${data.myName}`;
  }
}

module.exports = Test;
```

{% callout "info" %}While <code>templateEngineOverride: 11ty.js,md</code> works to add markdown support, the special behavior of JavaScript templates does not allow other template engines to be supported here (e.g. <code>templateEngineOverride: njk,md</code>). This will be mitigated with <a href="https://github.com/11ty/eleventy/issues/148">Enhancement Request Issue #148</a>.{% endcallout %}

<span id="filters"></span><span id="shortcodes"></span>

## JavaScript Template Functions

A JavaScript Template Function allows you to extend your JavaScript templates with extra functionality. If you add any Universal Filters or Shortcodes, they will be exposed as JavaScript Template Functions.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myFunction", function(a, b) { … });
};
```

{% codetitle "js-fn-example.11ty.js" %}

{% raw %}
```js
module.exports = function(data) {
  return `<h1>${this.myFunction(data.a, data.b)}</h1>`;
};
```
{% endraw %}

### Asynchronous JavaScript Template Functions

This works the same as any `async` JavaScript function or function that returns a `Promise`.

This is the same as the example above but adds `async` before the `function`.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myAsyncFunction", async function(a, b) { … });
};
```

This is the same as the example above but adds `await` before the function is called.

{% codetitle "js-async-fn-example.11ty.js" %}

{% raw %}
```js
module.exports = async function(data) {
  return `<h1>${await this.myAsyncFunction(data.a, data.b)}</h1>`;
};
```
{% endraw %}

### Warning about Arrow Functions

{% callout "warn" %}
Note that by definition (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this">read on MDN</a>) arrow functions do not have access to <code>this</code>, so any use of JavaScript Functions inside of an arrow function template will throw an error.
{% endcallout %}

{% codetitle "js-arrow-fn-example.11ty.js" %}

{% raw %}
```js
module.exports = (data) => {
  // Using `this` in an arrow function will throw an error!
  return `<h1>${this.myFunction(data.a, data.b)}</h1>`;
};
```
{% endraw %}

### Relationship to Filters and Shortcodes

Any universal filters or shortcodes will also be available as JavaScript Template Functions.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // Universal filters (Adds to Liquid, Nunjucks, 11ty.js, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(myVariable) { … });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, 11ty.js, Handlebars)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });

  // Universal Paired Shortcodes (Adds to Liquid, Nunjucks, 11ty.js, Handlebars)
  eleventyConfig.addPairedShortcode("pairedUser", function(content, firstName, lastName) { … });
};
```

{% codetitle "universal-examples.11ty.js" %}

{% raw %}
```js
module.exports = function(data) {
  return `
<h1>${this.myFilter(data.myVar)}</h1>
<p>${this.user(data.firstName, data.lastName)}</p>
<p>${this.pairedUser(`Here is some more content`, data.firstName, data.lastName)}</p>
`;
};
```
{% endraw %}

### Access to `page` data values {% addedin "0.11.0" %}

If you aren’t using an arrow function, JavaScript Functions (and Nunjucks, Liquid, and Handlebars Shortcodes) will have access to Eleventy [`page` data values](/docs/data-eleventy-supplied/#page-variable-contents) without needing to pass them in as arguments.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myFunction", function() {
    // Available in 0.11.0 and above
    console.log( this.page );

    // For example:
    console.log( this.page.url );
    console.log( this.page.inputPath );
    console.log( this.page.fileSlug );
  });
};
```