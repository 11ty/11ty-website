---
eleventyNavigation:
  key: Render
  order: 0
  excerpt: A plugin to add shortcodes to render an Eleventy template string (or file) inside of another template.
communityLinksKey: syntaxrender
---

# Render {% addedin "1.0.0" %}<!-- Beta 7 -->

{% tableofcontents %}

{{ eleventyNavigation.excerpt }}

## Template Compatibility

This plugin adds a `renderTemplate` and `renderFile` asynchronous shortcode to:

- Nunjucks
- Liquid
- JavaScript (11ty.js)

Everything you’ve added to project’s configuration file will also be available in these renders too: shortcodes, filters, etc. That means you can nest 😱 them, too!

## Installation

This plugin is bundled with Eleventy core so it doesn’t require additional installation. But you do have to add it to your configuration file (probably `.eleventy.js`) with `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyRenderPlugin);
};
```

<details>
  <summary>Expand to view all of the Plugin Options</summary>

{% codetitle ".eleventy.js" %}

```js
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyRenderPlugin, {
		tagName: "renderTemplate", // Change the renderTemplate shortcode name
		tagNameFile: "renderFile", // Change the renderFile shortcode name
	});
};
```

</details>

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

## Usage

### `renderTemplate`

Use the `renderTemplate` paired shortcode to render a template string.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "rendertmpl"} %}
  <div id="rendertmpl-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% renderTemplate "md" %}
# I am a title

* I am a list
* I am a list
{% endrenderTemplate %}
```

{% endraw %}

  </div>
  <div id="rendertmpl-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% renderTemplate "md" %}
# I am a title

* I am a list
* I am a list
{% endrenderTemplate %}
```

{% endraw %}

  </div>
  <div id="rendertmpl-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports = async function () {
	return await this.renderTemplate(
		`# I am a title

* I am a list
* I am a list`,
		"md"
	);
};
```

{% endraw %}

  </div>
  <div id="rendertmpl-hbs" role="tabpanel">

The `renderTemplate` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

The content inside of the shortcode will be rendered using Markdown (`"md"`). Front matter is not yet supported.

The first argument to `renderTemplate` can be any valid [`templateEngineOverride`](/docs/languages/#templateengineoverride-examples) value. You can even use `"liquid,md"` to preprocess markdown with liquid. You can use [custom template types](/docs/languages/custom/) here too, including [the Vue plugin](https://github.com/11ty/eleventy-plugin-vue)!

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "rendertmplvue"} %}
  <div id="rendertmplvue-liquid" role="tabpanel">

{% raw %}

```liquid
{% renderTemplate "vue" %}
<div>
  THIS IS VUE <p v-html="hi"></p>
</div>
{% endrenderTemplate %}
```

{% endraw %}

  </div>
  <div id="rendertmplvue-njk" role="tabpanel">

{% raw %}

```jinja2
{% renderTemplate "vue" %}
<div>
  THIS IS VUE <p v-html="hi"></p>
</div>
{% endrenderTemplate %}
```

{% endraw %}

  </div>
  <div id="rendertmplvue-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports = async function () {
	return await this.renderTemplate(
		`<div>
  THIS IS VUE <p v-html="hi"></p>
</div>`,
		"vue"
	);
};
```

{% endraw %}

  </div>
  <div id="rendertmplvue-hbs" role="tabpanel">

The `renderTemplate` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

{% callout "info", "md" %}The one exception here is that `{% raw %}{% renderTemplate "11ty.js" %}{% endraw %}` JavaScript string templates are not yet supported—use `renderFile` below instead.{% endcallout %}

To add Vue support, don’t forget to install [`@11ty/eleventy-plugin-vue` (v0.6.0 or newer)](https://github.com/11ty/eleventy-plugin-vue) and add the Vue plugin in your config file. There is an example on the Eleventy Vue Plugin documentation showing [how to call the render plugin inside of Vue components](https://github.com/11ty/eleventy-plugin-vue#advanced-run-async-things-before-component-render).

#### Pass in data

Both the [`eleventy`](/docs/data-eleventy-supplied/#eleventy-variable) and [`page` variables](/docs/data-eleventy-supplied/#page-variable) are available inside of these templates by default. If you want to pass in additional data, you can do so like this:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "rendertmpldata"} %}
  <div id="rendertmpldata-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
myData:
  myKey: myValue
---
{% renderTemplate "liquid", myData %}
{{ myKey }}
{% endrenderTemplate %}
```

{% endraw %}

  </div>
  <div id="rendertmpldata-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---
myData:
  myKey: myValue
---
{% renderTemplate "liquid", myData %}
{{ myKey }}
{% endrenderTemplate %}
```

{% endraw %}

  </div>
  <div id="rendertmpldata-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports.data = {
	myData: {
		myKey: "myValue",
	},
};
module.exports.render = async function (data) {
	return await this.renderTemplate(`{{ myKey }}`, "liquid", data.myData);
};
```

{% endraw %}

  </div>
  <div id="rendertmpldata-hbs" role="tabpanel">

The `renderTemplate` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

Outputs `myValue`.

### `renderFile`

Use the `renderFile` shortcode to render an include file.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "renderfile"} %}
  <div id="renderfile-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% renderFile "./_includes/blogpost.md" %}
```

{% endraw %}

  </div>
  <div id="renderfile-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% renderFile "./_includes/blogpost.md" %}
```

{% endraw %}

  </div>
  <div id="renderfile-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports = async function () {
	return await this.renderFile("./includes/blogpost.md");
};
```

{% endraw %}

  </div>
  <div id="renderfile-hbs" role="tabpanel">

The `renderFile` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

The first argument to `renderFile` is a project root relative path to any template file. Front matter inside of the target files is not yet supported. The template syntax used is inferred by the file extension.

Note that you can use files supported by any [custom file extensions](/docs/languages/custom/) you’ve added too, including a Vue Single File Component from the [Eleventy Vue plugin](https://github.com/11ty/eleventy-plugin-vue)!

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "renderfilevue"} %}
  <div id="renderfilevue-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% renderFile "./_includes/header.vue" %}
```

{% endraw %}

  </div>
  <div id="renderfilevue-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% renderFile "./_includes/header.vue" %}
```

{% endraw %}

  </div>
  <div id="renderfilevue-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports = async function () {
	return await this.renderFile("./includes/header.vue");
};
```

{% endraw %}

  </div>
  <div id="renderfilevue-hbs" role="tabpanel">

The `renderFile` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

To add Vue support, don’t forget to install [`@11ty/eleventy-plugin-vue` (v0.6.0 or newer)](https://github.com/11ty/eleventy-plugin-vue) and add the Vue plugin in your config file.

#### Pass in data

Both the [`eleventy`](/docs/data-eleventy-supplied/#eleventy-variable) and [`page` variables](/docs/data-eleventy-supplied/#page-variable) are available inside of these templates by default. If you want to pass in additional data, you can do so like this:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "renderfiledata"} %}
  <div id="renderfiledata-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
myData:
  myKey: myValue
---
{% renderFile "./_includes/blogpost.md", myData %}
```

{% endraw %}

  </div>
  <div id="renderfiledata-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---
myData:
  myKey: myValue
---
{% renderFile "./_includes/blogpost.md", myData %}
```

{% endraw %}

  </div>
  <div id="renderfiledata-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports.data = {
	myData: {
		myKey: "myValue",
	},
};
module.exports.render = async function (data) {
	return await this.renderFile("./includes/blogpost.md", data.myData);
};
```

{% endraw %}

  </div>
  <div id="renderfiledata-hbs" role="tabpanel">

The `renderFile` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

#### Override the target file syntax

The syntax is normally inferred using the file extension, but it can be overridden using a third argument. It can be any valid [`templateEngineOverride`](/docs/languages/#templateengineoverride-examples) value. You can even use `"liquid,md"` to preprocess markdown with liquid.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "renderfileoverride"} %}
  <div id="renderfileoverride-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
myData:
  key: value
---
{% renderFile "./_includes/blogpost.md", myData, "njk" %}
```

{% endraw %}

  </div>
  <div id="renderfileoverride-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---
myData:
  key: value
---
{% renderFile "./_includes/blogpost.md", myData, "njk" %}
```

{% endraw %}

  </div>
  <div id="renderfileoverride-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}

```js
module.exports.data = {
	myData: {
		myKey: "myValue",
	},
};
module.exports.render = async function (data) {
	return await this.renderFile("./includes/blogpost.md", data.myData, "njk");
};
```

{% endraw %}

  </div>
  <div id="renderfileoverride-hbs" role="tabpanel">

The `renderFile` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

Will render `blogpost.md` using Nunjucks instead of Markdown!
