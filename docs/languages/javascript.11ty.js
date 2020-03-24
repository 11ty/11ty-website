/**
 * @file Code examples for JavaScript layouts (`*.11ty.js` file extension)
 * @author Zach Leatherman
 * @author Reuben L. Lillie
 * @since 0.11.0
 */

// Import methods from PrismJS for syntax highlighting
const Prism = require("prismjs");

/**
 * @todo Adopt code in the official syntax highlighting plugin instead
 * Highlight a portion of text as JavaScript with PrismJS
 *
 * A simplified version of the paired shortcode from 11ty’s {@link https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/master/src/HighlightPairedShortcode.js official syntax highlighting plugin}, only this one highlights JavaScript (the plugin currently supports plain text, Markdown, Liquid, and Nunjucks); NB, even though the `templateOverrideEngine` allows Markdown blocks inside the JavaScript template literals here, the bakcticks normally used for defining code blocks inside Markdown do not work—that’s why this helper function exists.
 * @param {String} content Text to be highlighted
 * @return {String} Highlighted content
 */
const highlight = function(content) {
  let language = "js"
  let highlightedContent = Prism.highlight(content.trim(), Prism.languages[language], language);
  let lines = highlightedContent.split("\n");
  lines = lines.map(function(line) {
    return line;
  });
  return `<pre class="language-${language}"><code class="language-${language}">` + lines.join("<br>") + "</code></pre>";
};

/*
 * Acts as front matter in JavaScript templates
 */
exports.data = {
  eleventyNavigation: {
    parent: "Template Languages",
    key: "JavaScript",
    order: 4
  },
  addedInVersion: "0.7.0",
  relatedKey: "javascript",
  relatedTitle: "Template Language—JavaScript",
  tags: [
    "related-filters",
    "related-shortcodes"
  ],
  relatedLinks: {
    ["/docs/config/#watch-javascript-dependencies"]: "Watch JavaScript Dependencies"
  },
  layout: "layouts/langs.njk",
  templateEngineOverride: "11ty.js,md"
};

/**
 * The content of the template
 * @method
 * @name render()
 * @param {Object} data 11ty’s data object
 * @return {String} HTML template literal
 * @see {@link https://www.11ty.dev/docs/shortcodes/ Shortcodes in 11ty}
 */
exports.render = function(data) {
  return `
| Eleventy Short Name  | File Extension        | NPM Package |
| -------------------- | --------------------- | ----------- |
| <code>11ty.js</code> | <code>.11ty.js</code> | N/A         |

Eleventy supports many different types of JavaScript content that will be parsed as Eleventy templates:

## Raw Values

Raw values will not have access to Data or [JavaScript Template Functions](#javascript-template-functions). [Use a function](#function) that returns a value instead.

### String

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = "<p>Zach</p>";`)}

Or [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = \`<p>These can
span
multiple
lines!</p>\`;
`)}

### Buffer

Some templating libraries return [Buffers](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding) (e.g. [viperHTML](https://github.com/WebReflection/viperHTML)).

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = Buffer.from("<p>Zách</p>");`)}

### Promise

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve("<p>Zach</p>");
  }, 1000);
});
`)}

## Function

Can return any [raw value](#raw-values) (e.g. String, Buffer, Promise). Use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to embed data values without having to concatenate strings!

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = function(data) {
  return \`<p>\${data.name}</p>\`;
};
`)}

De-structuring syntax is a little bit easier to read:

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = function({name}) {
  return \`<p>\${name}</p>\`;
};
`)}

Maybe you like arrow functions:

${this.codetitle("JavaScript", "Syntax")}

${highlight(`module.exports = ({name}) => \`<p>\${name}</p>\`;`)}

<code>async</code> functions work too:

${this.codetitle("JavaScript", "Syntax")}

${highlight(`const getAnAsyncThing = require("./lib/asyncThing");

module.exports = async function(data) {
  return \`<p>\${await getAnAsyncThing()}</p>\`;
};
`)}

## Classes

Eleventy looks for classes that have a <code>render</code> method and uses <code>render</code> to return the content of the template. <code>render</code> methods can be <code>async</code>.

<code>render</code> can return any [raw value](#raw-values) (e.g. String, Buffer, Promise).

${this.codetitle("JavaScript", "Syntax")}

${highlight(`class Test {
  // or \`async render({name}) {\`
  render({name}) {
    return \`<p>\${name}</p>\`;
  }
}

module.exports = Test;
`)}

### Optional <code>data</code> Method

${this.callout(level="info",content=`
<a href="/docs/data-frontmatter/">YAML Front Matter</a> is not supported in JavaScript template types. Use <code>data</code> methods instead!
`)}

This data acts as Front Matter for the template and similarly to Front Matter will take precedence over all other data in the data cascade. The <code>data</code> method can be asynchronous <code>async data()</code> or it can be a getter <code>get data()</code>.

${this.codetitle("JavaScript", "Syntax")}

${highlight(`class Test {
  // or \`async data() {\`
  // or \`get data() {\`
  data() {
    return {
      name: "Ted",
      layout: "teds-rad-layout",
      // … other front matter keys
    };
  }

  render({name}) {
    // will always be "Ted"
    return \`<p>\${name}</p>\`;
  }
}

module.exports = Test;
`)}

### Permalinks

The <code>permalin</code> data key will work here. Permalinks can be a [raw value](#raw-values) (e.g. String, Buffer, Promise) or a Function that returns any raw value.

#### Permalink String

${this.codetitle("JavaScript", "Syntax")}

${highlight(`class Test {
  data() {
    return {
      // Writes to "/my-permalink/index.html"
      permalink: "/my-permalink/"
    };
  }

  render(data) { /* … */ }
}

module.exports = Test;
`)}

#### Permalink Function

Permalink Functions can return any [raw value](#raw-values) (e.g. String, Buffer, Promise).

${this.codetitle("JavaScript", "Syntax")}

${highlight(`class Test {
  data() {
    return {
      key: "hello",
      // Writes to "/my-permalink/hello/index.html"
      permalink: data => \`/my-permalink/\${data.key}/\`
    };
  }

  render(data) { /* … */ }
}

module.exports = Test;
`)}

#### Permalink Function using a Filter

Universal filters, shortcodes, and other JavaScript Template Functions work here and are exposed on <code>this</code>. Read more about [Eleventy provided Universal Filters](/docs/filters/#eleventy-provided-universal-filters).

${this.codetitle("JavaScript", "Syntax")}

${highlight(`class Test {
  data() {
    return {
      title: "This is my blog post title",
      // Writes to "/this-is-my-blog-post-title/index.html"
      permalink: function(data) {
        return \`/\${this.slug(data.title)}/\`;
      }
    };
  }

  render(data) { /* … */ }
}

module.exports = Test;
`)}

### Markdown and JavaScript

Yes, you can use JavaScript as your preprocessor language for Markdown. Read more about [<code>templateEngineOverride</code>](/docs/languages/#overriding-the-template-language).

${this.codetitle("JavaScript", "Syntax")}

${highlight(`class Test {
  data() {
    return {
      myName: "Zach",
      templateEngineOverride: "11ty.js,md"
    };
  }

  render(data) {
    return \`# This is \${data.myName}\`;
  }
}

module.exports = Test;
`)}

${this.callout(level="info", content=`
While <code>templateEngineOverride: 11ty.js,md</code> works to add markdown support, the special behavior of JavaScript templates does not allow other template engines to be supported here (e.g. <code>templateEngineOverride: njk,md</code>). This will be mitigated with <a href="https://github.com/11ty/eleventy/issues/148">Enhancement Request Issue #148</a>.
`)}

<span id="filters"></span><span id="shortcodes"></span>

## JavaScript Template Functions

A JavaScript Template Function allows you to extend your JavaScript templates with extra functionality. If you add any Universal Filters or Shortcodes, they will be exposed as JavaScript Template Functions.

${this.codetitle(".eleventy.js")}

${highlight(`module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myFunction", function(a, b) { … });
};
`)}

${this.codetitle("js-fn-example.11ty.js")}

${highlight(`module.exports = function(data) {
  return \`<h1>\${this.myFunction(data.a, data.b)}</h1>\`;
};
`)}

### Asynchronous JavaScript Template Functions

This works the same as any <code>async</code> JavaScript function or function that returns a <code>Promise</code>.

This is the same as the example above but adds <code>async</code> before the <code>function</code>.

${this.codetitle(".eleventy.js")}

${highlight(`module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myAsyncFunction", async function(a, b) { … });
};
`)}

This is the same as the example above but adds <code>await</code> before the function is called.

${this.codetitle(".eleventy.js")}

${highlight(`module.exports = async function(data) {
  return \`<h1>\${await this.myAsyncFunction(data.a, data.b)}</h1>\`;
};
`)}

### Warning about Arrow Functions

${this.callout(level="warn", content=`
Note that by definition (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this">read on MDN</a>) arrow functions do not have access to <code>this</code>, so any use of JavaScript Functions inside of an arrow function template will throw an error.`
)}

${this.codetitle(".eleventy.js")}

${highlight(`module.exports = (data) => {
  // Using \`this\` in an arrow function will throw an error!
  return \`<h1>\${this.myFunction(data.a, data.b)}</h1>\`;
};
`)}

### Relationship to Filters and Shortcodes

Any universal filters or shortcodes will also be available as as JavaScript Template Functions.

${this.codetitle(".eleventy.js")}

${highlight(`module.exports = function(eleventyConfig) {
  // Universal filters (Adds to Liquid, Nunjucks, 11ty.js, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(myVariable) { … });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, 11ty.js, Handlebars)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });

  // Universal Paired Shortcodes (Adds to Liquid, Nunjucks, 11ty.js, Handlebars)
  eleventyConfig.addPairedShortcode("pairedUser", function(content, firstName, lastName) { … });
};
`)}

${this.codetitle(".eleventy.js")}

${highlight(`module.exports = function(data) {
  return \`
<h1>\${this.myFilter(data.myVar)}</h1>
<p>\${this.user(data.firstName, data.lastName)}</p>
<p>\${this.pairedUser(\`Here is some more content\`, data.firstName, data.lastName)}</p>
\`;
};
`)}`
};
