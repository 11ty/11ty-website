---
subtitle: JavaScript
relatedKey: javascript
relatedTitle: Template Language—JavaScript
tags:
  - docs-languages
  - related-filters
  - related-shortcodes
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package |
| ------------------- | -------------- | ----------- |
| `11ty.js`              | `.11ty.js`        | N/A         |

{% addedin "0.7.0" %} Eleventy supports many different types of JavaScript content that will be parsed as Eleventy templates:

## String

Raw strings do not have access to data or [JavaScript Template Functions](#javascript-template-functions).

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = "<p>Zach</p>";
```

## Buffer

Raw buffers do not have access to data or [JavaScript Template Functions](#javascript-template-functions).

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = Buffer.from("<p>Zách</p>");
```

## Function

Can return a String or a Buffer (or a Promise).

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = function(data) {
  return `<p>${data.name}</p>`;
};
```

De-structuring syntax may read better to you:

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = function({name}) {
  return `<p>${name}</p>`;
};
```

`async` functions work too:

{% codetitle "JavaScript", "Syntax" %}

```js
module.exports = async function(data) {
  return `<p>${await getAnAsyncThing()}</p>`;
};
```

## Classes

Eleventy looks for classes that have a `render` method and uses `render` to return the content of the template. `render` methods can be `async`.

`render` can return a String or a Buffer (or a Promise).

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

{% callout "info" %}YAML Front Matter is not supported in JavaScript template types. Use <code>data</code> methods instead!{% endcallout %}

This data acts as Front Matter for the template and similarly to Front Matter will take precedence over all other data in the data cascade. The `data` method can be asynchronous `async data()` or it can be a getter `get data()`.

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      name: "Ted"
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

The `permalink` data key will work here. It can be a `String` or a `Function`.

#### Permalink String

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  data() {
    return {
      // Writes to "/my-permalink/index.html"
      permalink: "/my-permalink/"
    }
  }

  render(data) { /* … */ }
}

module.exports = Test;
```

#### Permalink Function

{% codetitle "JavaScript", "Syntax" %}

```js
class Test {
  data() {
    return {
      key: "hello",
      // Writes to "/my-permalink/hello/index.html"
      permalink: data => `/my-permalink/${data.key}/`
    }
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
      permalink: data => `/${this.slug(data.key)}/`
    }
  }

  render(data) { /* … */ }
}

module.exports = Test;
```

### Markdown and JavaScript

Yes, you can use JavaScript as your preprocessor language for Markdown.

{% codetitle "JavaScript and Markdown", "Syntax" %}

```js
class Test {
  data() {
    return {
      myName: "Zach",
      templateEngineOverride: "11ty.js,md"
    }
  }

  render(data) {
    return `# This is ${data.myName}`;
  }
}

module.exports = Test;
```

{% callout "info" %}While <code>templateEngineOverride: 11ty.js,md</code> works to add markdown support, the special behavior of JavaScript does not allow other template engines to be supported here (e.g. <code>templateEngineOverride: njk,md</code>). This will be mitigated with <a href="https://github.com/11ty/eleventy/issues/148">Enhancement Request Issue #148</a>.{% endcallout %}

<span id="filters"></span><span id="shortcodes"></span>

## JavaScript Template Functions

A JavaScript Template Function allows you to extend your JavaScript templates with extra functionality. If you add any Universal Filters or Shortcodes, they will be exposed as JavaScript Template Functions.

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myFunction", function(a, b) { … });
};
```

### Usage

{% codetitle "js-fn-example.11ty.js" %}

{% raw %}
```html
module.exports = function(data) {
  return `<h1>${this.myFunction(data.a, data.b)}</h1>`;
};
```
{% endraw %}

### Relationship to Filters and Shortcodes

Any universal filters or shortcodes will also be available as as JavaScript Template Functions.

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

#### Usage

{% codetitle "universal-examples.11ty.js" %}

{% raw %}
```html
module.exports = function(data) {
  return `
<h1>${this.myFilter(data.myVar)}</h1>
<p>${this.user(data.firstName, data.lastName)}</p>
<p>${this.pairedUser(`Here is some more content`, data.firstName, data.lastName)}</p>
`;
};
```
{% endraw %}

## Related Configuration

* [Watch JavaScript Dependencies](/docs/config/#watch-javascript-dependencies)