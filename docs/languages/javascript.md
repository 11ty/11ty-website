---
subtitle: JavaScript
layout: layouts/langs.njk
---
| Eleventy Short Name | File Extension | NPM Package |
| ------------------- | -------------- | ----------- |
| `11ty.js`              | `.11ty.js`        | N/A         |

{% addedin "0.7.0" %} Eleventy supports many different types of JavaScript content that will be parsed as Eleventy templates:

## String

Raw strings do not have access to data.

```js
module.exports = "<p>Zach</p>";
```

## Buffer

Raw buffers do not have access to data.

```js
module.exports = Buffer.from("<p>Zách</p>");
```

## Function

Can return a String or a Buffer (or a Promise).

```js
module.exports = function(data) {
  return `<p>${data.name}</p>`;
};
```

De-structuring syntax may read better to you:

```js
module.exports = function({name}) {
  return `<p>${name}</p>`;
};
```

`async` functions work too:

```js
module.exports = async function(data) {
  return `<p>${await getAnAsyncThing()}</p>`;
};
```

## Classes

Make sure your class has a `render` method! `render` methods can be `async` too.

`render` can return a String or a Buffer (or a Promise).

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

{% callout %}YAML Front Matter is not supported in JavaScript template types. Use <code>data</code> methods instead!{% endcallout %}

This data acts as Front Matter for the template and similarly to Front Matter will take precedence over all other data in the data cascade. The `data` method can be asynchronous `async data()` or it can be a getter `get data()`.

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


## Supported Features

{% callout %}Work In Progress{% endcallout %}
