---
eleventyNavigation:
  key: Render
  order: 0
  excerpt: A plugin to add shortcodes to render an Eleventy template string (or file) inside of another template.
communityLinksKey: syntaxrender
---
# Render {% addedin "1.0.0" %}

_(If you’re already using the 1.0 beta channel, this plugin is available starting in 1.0.0-beta.7)_

{{ eleventyNavigation.excerpt }}

[[toc]]


## Template Compatibility

This plugin adds a `renderTemplate` and `renderFile` asynchronous shortcode to:

* Nunjucks
* Liquid
* JavaScript (11ty.js)

Everything you’ve added to project’s configuration file will also be available in these renders too: shortcodes, filters, etc. That means you can nest 😱 them, too!

## Installation

This plugin is bundled with Eleventy core so it doesn’t require additional installation. But you do have to add it to your configuration file (probably `.eleventy.js`) with `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

## Usage

### `renderTemplate`

Use the `renderTemplate` paired shortcode to render a template string.

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```liquid
{% renderTemplate "md" %}
# I am a title

* I am a list
* I am a list
{% endrenderTemplate %}
```
{% endraw %}

The content inside of the shortcode will be rendered using Markdown (`"md"`). Front matter is not yet supported.

The first argument to `renderTemplate` can be any valid [`templateEngineOverride`](/docs/languages/#templateengineoverride-examples) value. You can even use `"liquid,md"` to preprocess markdown with liquid. You can use [custom template types](/docs/languages/custom/) here too, including [the Vue plugin](https://github.com/11ty/eleventy-plugin-vue)! The one exception here is that `11ty.js` string templates are not yet supported—use `renderFile` below instead.

{% raw %}
```liquid
{% renderTemplate "vue" %}
<div>
  THIS IS VUE <p v-html="hi"></p>
</div>
{% endrenderTemplate %}
```
{% endraw %}

To add Vue support, don’t forget to install [`@11ty/eleventy-plugin-vue` (v0.6.0 or newer)](https://github.com/11ty/eleventy-plugin-vue) and add the Vue plugin in your config file. There is an example on the Eleventy Vue Plugin documentation showing [how to call the render plugin inside of Vue components](https://github.com/11ty/eleventy-plugin-vue#advanced-run-async-things-before-component-render).

#### Pass in data

The [`page` variable](/docs/data-eleventy-supplied/#page-variable) is available inside of these templates without any additional configuration. If you want to pass in additional data, you can do so like this:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

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

Outputs `myValue`.

### `renderFile`

Use the `renderFile` shortcode to render an include file.

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```liquid
{% renderFile "./_includes/blogpost.md" %}
```
{% endraw %}

The first argument to `renderFile` is a project root relative path to any template file. Front matter inside of the target files is not yet supported. The template syntax used is inferred by the file extension.

Note that you can use files supported by any [custom file extensions](/docs/languages/custom/) you’ve added too, including a Vue Single File Component from the [Eleventy Vue plugin](https://github.com/11ty/eleventy-plugin-vue)!

{% raw %}
```liquid
{% renderFile "./_includes/header.vue" %}
```
{% endraw %}

To add Vue support, don’t forget to install [`@11ty/eleventy-plugin-vue` (v0.6.0 or newer)](https://github.com/11ty/eleventy-plugin-vue) and add the Vue plugin in your config file.

#### Pass in data

The [`page` variable](/docs/data-eleventy-supplied/#page-variable) is available inside of these templates without any additional configuration. If you want to pass in additional data, you can do so like this:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```liquid
---
myData:
  myKey: myValue
---
{% renderFile "./_includes/blogpost.md", myData %}
```
{% endraw %}

#### Override the target file syntax

The syntax is normally inferred using the file extension, but it can be overridden using a third argument. It can be any valid [`templateEngineOverride`](/docs/languages/#templateengineoverride-examples) value. You can even use `"liquid,md"` to preprocess markdown with liquid.

{% codetitle "Liquid, Nunjucks", "Syntax" %}

{% raw %}
```liquid
---
myData:
  key: value
---
{% renderFile "./_includes/blogpost.md", myData, "njk" %}
```
{% endraw %}

Will render blogpost.md using Nunjucks instead of Markdown!

## Advanced

### Change the default shortcode names

Pass some options into the `addPlugin` call:

* `tagName: "renderTemplate"`: The default shortcode name to render a string.
* `tagNameFile: "renderFile"`: The default shortcode name to render a file.

```js
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  let options = {
    tagName: "superCoolString",
    tagNameFile: "superCoolFile",
  };

  eleventyConfig.addPlugin(EleventyRenderPlugin, options);
};
```
