---
eleventyNavigation:
  parent: Template Languages
  key: WebC
  order: 3
layout: layouts/langs.njk
relatedLinks:
---
| Type | Value |
| --- | --- |
| Eleventy Name | `webc` |
| File Extension | `*.webc` |
| npm | [`@11ty/webc`](https://www.npmjs.com/package/@11ty/webc) and [`@11ty/eleventy-plugin-webc`](https://www.npmjs.com/package/@11ty/eleventy-plugin-webc) |
| GitHub | [`11ty/webc`](https://github.com/11ty/webc) and [`11ty/eleventy-plugin-webc`](https://github.com/11ty/eleventy-plugin-webc) |

**Table of Contents**

[[toc]]

## Why use WebC?

* Brings first-class **components** to Eleventy.
  * Expand any HTML element (including custom elements) to HTML with defined conventions from web standards.
  * This means that Web Components created with WebC are compatible with server-side rendering (without duplicating author-written markup)
  * WebC components are [Progressive Enhancement friendly](https://www.youtube.com/watch?v=p0wDUK0Z5Nw).
* Get first-class **incremental builds** (for page templates, components, and Eleventy layouts) when [used with `--incremental`](/docs/usage/#incremental-for-partial-incremental-builds)
* Streaming friendly (stream on the Edge 👀)
* Easily scope component CSS (or use your own scoping utility).
* Tired of importing components? Use global or per-page no-import components.
* Shadow DOM friendly (works with or without Shadow DOM)
* All configuration extensions/hooks into WebC are async-friendly out of the box.
* Bundler mode: Easily roll up the CSS and JS in-use by WebC components on a page for page-specific bundles. Dirt-simple critical CSS/JS to only load the code you need.
* For more complex templating needs, render any existing Eleventy template syntax (Liquid, markdown, Nunjucks, etc.) inside of WebC.
* Works great with [is-land](/docs/plugins/partial-hydration/) for web component hydration.

## Resources

<div class="youtube-related">
  {%- youtubeEmbed "X-Bpjrkz-V8", "Crash Course in Eleventy’s new WebC Plugin" -%}
  {%- youtubeEmbed "p0wDUK0Z5Nw", "Interactive Progressively-enhanced Web Components with WebC" -%}
</div>

* {% indieavatar "https://11ty.rocks/" %}[Introduction to WebC (on 11ty.rocks)](https://11ty.rocks/posts/introduction-webc/) by {% indieavatar "https://darthmall.net/" %}W. Evan Sheehan
* {% indieavatar "https://zachleat.com/" %}[zachleat.com: Adding Components to Eleventy with WebC](https://www.zachleat.com/web/webc-in-eleventy/): a brief history of the motivation behind WebC including influences from the Svelte and Vue communities.
* {% indieavatar "https://darthmall.net/" %}[11ty.webc.fun](https://11ty.webc.fun/): a collection of WebC recipes!

## Installation

{% callout "info", "md" %}Note that WebC support in Eleventy is **not bundled** with core! You must install the officially supported Eleventy plugin and the plugin **requires Eleventy 2.0.0-canary.16** or newer.{% endcallout %}

It’s on [npm at `@11ty/eleventy-plugin-webc`](https://www.npmjs.com/package/@11ty/eleventy-plugin-webc)!

```
npm install @11ty/eleventy-plugin-webc
```

To add support for `.webc` files in Eleventy, add the plugin in your Eleventy configuration file:

{% codetitle ".eleventy.js" %}

```js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc);
};
```

_You’re only allowed one `module.exports` in your configuration file. If you already have a configuration file, only copy the `require` and the `addPlugin` lines above!_

<details>
<summary><strong>Full options list</strong> (defaults shown)</summary>

```js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		components: false,

		// Adds an Eleventy WebC transform to process all HTML output
		useTransform: false,

		// Additional global data used in the Eleventy WebC transform
		transformData: {},
	});
};
```

</details>


## Usage

There are a few different ways to use WebC in Eleventy:

1. Add a new `.webc` file to your Eleventy input directory
1. Use the Render plugin in an existing non-WebC template
1. Pre-process HTML input as WebC
1. Post-process HTML output as WebC

### Add a new `.webc` file

Adding the plugin will enable support for `.webc` files in your Eleventy project. Just make a new `.webc` HTML file in your Eleventy input directory and Eleventy will process it for you! Notably, `.webc` files will operate [WebC in bundler mode](https://github.com/11ty/webc#aggregating-css-and-js), aggregating the CSS and JS in use on each individual page to create a bundle of the assets in use on the page.

WebC uses an HTML parser to process input files: use any HTML here!

{% codetitle "my-page.webc" %}

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
	</head>
	<body>
		WebC *is* HTML.
	</body>
</html>
```

### Use the Render plugin

Using Eleventy’s built-in [Render plugin](/docs/plugins/render/) allows you to render WebC inside of an existing Liquid, Nunjucks, or 11ty.js template.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "webc-render"} %}
  <div id="webc-render-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}
```liquid
{% renderTemplate "webc" %}
<my-custom-component></my-custom-component>
{% endrenderTemplate %}
```
{% endraw %}

  </div>
  <div id="webc-render-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```njk
{% renderTemplate "webc" %}
<my-custom-component></my-custom-component>
{% endrenderTemplate %}
```
{% endraw %}

  </div>
  <div id="webc-render-js" role="tabpanel">

{% codetitle "JavaScript", "Syntax" %}

{% raw %}
```js
module.exports = async function() {
  let content = await this.renderTemplate(`<my-custom-component></my-custom-component>`, "webc");
  return content;
};
```
{% endraw %}

  </div>
  <div id="webc-render-hbs" role="tabpanel">

The `renderTemplate` shortcode [requires an async-friendly template language](#template-compatibility) and is not available in Handlebars.

  </div>
</seven-minute-tabs>
</is-land>

### Pre-process HTML input as WebC

You can use the configuration option to change the default HTML preprocessor (from `liquid`) to `webc`. This might look like `htmlTemplateEngine: "webc"`. Read more on the [Eleventy documentation: Default Template Engine for HTML Files](/docs/config/#default-template-engine-for-html-files).

### Post-process HTML output as WebC

This is a (last-resort?) catch-all option to let WebC process `.html` output files in your project (skipping any `.webc` input files to avoid double-processing templates). This feature makes use of [Eleventy transforms](/docs/config/#transforms) and is most useful when you want to get up and running with WebC on an existing project quickly.

A few drawbacks to the transform method:

1. This is the slowest build-performance method to implement WebC in a project, so try the other methods first!
2. The WebC Eleventy transform operates with [bundler mode disabled](#css-and-js-(bundler-mode)), which means that processes WebC but _does not_ aggregate component JS or CSS.

<details>
<summary>The transform is disabled by default, you will need to use the <code>useTransform</code> option to enable it.</summary>

```js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		useTransform: true,
	});
};
```

</details>

## WebC Reference

Note that all `webc:` attributes are removed from the rendered output HTML.

### HTML-only components

* _Related: [Defining Components in WebC](#defining-components)_

When a component has only content HTML (no CSS or JavaScript) it will ignore the host component tag in the output HTML. This enables HTML-only components to have zero overhead HTML. _(You can opt-out of this behavior with `webc:keep`.)_

<details>
<summary>Expand for Example</summary>

{% callout "info", "md" %}WebC components are not limited to custom element name restrictions (e.g. `my-component`) here. You can use `p`, `blockquote`, `h1`, `img`, or any valid HTML tag name.{% endcallout %}

{% codetitle "page.webc" %}

```html
<title>WebC Example</title>
<my-component></my-component>
```

{% codetitle "components/my-component.webc" %}

```html
Components don’t need a root element, y’all.
```

Outputs:

{% codetitle "_site/page.html" %}

```html
<!doctype html>
<html>
	<head>
		<title>WebC Example</title>
	</head>
  <body>
  	Components don’t need a root element, y’all.
  </body>
</html>
```

</details>

### Asset bundling

For components that are _not_ HTML-only (they _do_ have CSS or JS), WebC will include the component tag in the output markup (e.g. `<my-component>`) (for styling or client scripting). _(You can opt-out of this behavior with `webc:nokeep`.)_

<details>
<summary>Expand for Example</summary>

{% callout "info", "md" %}WebC components are not limited to custom element name restrictions (e.g. `my-component`) here. You can use `p`, `blockquote`, `h1`, `img`, or any valid HTML tag name.{% endcallout %}

{% codetitle "page.webc" %}

```html
<title>WebC Example</title>
<my-component></my-component>
```

{% codetitle "components/my-component.webc" %}

```html
Components don’t need a root element, y’all.
<style>/* Hi */</style>
```

Outputs:

{% codetitle "_site/page.html" %}

```html
<!doctype html>
<html>
	<head>
		<title>WebC Example</title>
	</head>
  <body>
  	<my-component>Components don’t need a root element, y’all.</my-component>
  </body>
</html>
```

</details>

When Eleventy WebC finds `<style>`, `<link rel="stylesheet">`, or `<script>` elements in component definitions they are removed from the output markup and _their content_ is aggregated together for re-use in asset bundles on the page. Read more about [CSS and JS in WebC](#css-and-js-(bundler-mode)). _(You can opt-out of this behavior with `webc:keep`.)_

### `webc:keep`

With an [HTML-only component](#html-only-components), you can use `webc:keep` on the host component to keep the tag around:

```html
<html-only-component webc:keep></html-only-component>
```

You can also use `webc:keep` to opt-out of [asset bundling](#asset-bundling) for individual elements inside of a component definition:

```html
<style webc:keep></style>
<script webc:keep></script>
```

You can also use `webc:keep` to save a [`<slot>`](#slots) for use in a client-side custom element.

### `webc:nokeep`

With an CSS/JS component (not an [HTML-only component](#html-only-components)), you can use `webc:nokeep` on the host component to drop the tag:

```html
<css-js-component webc:nokeep></css-js-component>
```

### `webc:import`

WebC will expand any component it finds using known components. You can also use `webc:import` to inline import a component definition. This import path is relative to the component file path. WebC checks for circular component dependencies and throws an error if one is encountered.

* _Related: [Defining Components in WebC](#defining-components) (global or scoped)_

```html
<any-tag-name webc:import="./components/my-component.webc"></any-tag-name>
```

### Slots

Child content optionally precompiles using `<slot>` and `[slot]` too. This example is using an [HTML-only component](#html-only-components).

{% codetitle "page.webc" %}

```html
<my-component></my-component>
<my-component>This is the default slot</my-component>
```

{% codetitle "components/my-component.webc" %}

```html
<p><slot>Fallback slot content</slot></p>
```

Compiles to:

```html
<p>Fallback slot content</p>
<p>This is the default slot</p>
```

If your WebC component wants to _output_ a `<slot>` tag in the compiled markup (for use in client JavaScript), use the [`webc:keep` attribute](#webckeep) (e.g. `<slot webc:keep>`).

{% callout "info", "md" %}Per web component standard conventions, if your component file contains *no content markup* (e.g. empty or only `<style>`/`<script>`), `<slot></slot>` is implied and the default slot content will be included automatically. If the WebC component file does contain content markup, the content passed in as the default slot requires `<slot>` to be included.{% endcallout %}

#### Named slots

This works with named slots (e.g. `<span slot="named-slot">`) too.

<details>
<summary>Expand for Example</summary>

{% codetitle "page.webc" %}

```html
<my-component>
	This is the default slot.
	<strong slot="named-slot">This is a named slot</strong>
	This is also the default slot.
</my-component>
```

{% codetitle "components/my-component.webc" %}

```html
<p><slot name="named-slot"></slot></p>
```

Compiles to:

```html
<p><strong>This is a named slot.</strong></p>
```

</details>

### Attributes and `webc:root`

{% codetitle "page.webc" %}

```html
<my-component class="sr-only"></my-component>
```

Inside of your component definition, you can add attributes to the outer host component using `webc:root`:

{% codetitle "components/my-component.webc" %}

```html
<template webc:root class="another-class">
	Some component content
</template>
```

`class` and `style` attribute values are _merged_ as expected between the host component and the `webc:root` element.

#### Override the host component tag

You can use `webc:root webc:keep` together to override the host component tag name! This isn’t very useful for HTML-only components (which leave out the host component tag) but is very useful when your component has style/scripts.

{% codetitle "components/my-component.webc" %}

```html
<button webc:root webc:keep>Some component content</button>
<style>/* Hi */</style>
```

### Props (Properties)

Make any attribute into a prop by prefixing it with `@`. Props are “private” attributes that don’t end up in the output HTML (they are private to WebC). They will be filtered from the output HTML but are available to the component’s data.

{% codetitle "page.webc" %}

```html
<my-component @propName="Hello"></my-component>
```

### Dynamic attributes

Make any attribute into a dynamic attribute by prefixing it with `:`. You have access to host component attributes, props, and page data here!

{% codetitle "page.webc" %}

```html
<avatar-image src="my-image.jpeg" alt="Zach is documenting this project"></avatar-image>
```

{% codetitle "components/avatar-image.webc" %}

```html
<img :src="src" :alt="alt" class="avatar-image">
```

* WebC versions prior to `0.5.0` required `this.` (e.g. `this.src`/`this.alt`) when referencing data/attributes/property values. This is no longer required in dynamic attributes.

### `@html`

We surface a special `@html` [prop](#props-(properties)) to override any tag content with custom JavaScript.

```html
<template @html="'Template HTML'"></template>
<template @html="dataProperty"></template>

<!-- webc:nokeep will replace the outer html -->
<template @html="'Template HTML'" webc:nokeep></template>
```

* Content returned from render functions will be processed as WebC—return any WebC content here! {% addedin "@11ty/webc@0.5.0" %}
* WebC versions prior to `0.5.0` required `this.` (e.g. `this.dataProperty`) when referencing data/attributes/property values. This is no longer required when using `@html`.

### `webc:is`

Remap a component to another component name.

```html
<div webc:is="my-component"></div>

<!-- equivalent to -->
<my-component></my-component>
```

### `webc:scoped`

We include a lightweight mechanism (`webc:scoped`) to scope component CSS. Selectors are prefixed with a new component class name. The class name is based on a hash of the style content (for fancy de-duplication of identical component styles).

<details>
<summary>Expand for example</summary>

{% codetitle "page.webc" %}

```html
<my-component>Default slot</my-component>
```

If you use `:host` it will be replaced with that class selector.

{% codetitle "components/my-component.webc" %}

```html
<style webc:scoped>
:host {
	color: blue;
}
:host:defined {
	color: rebeccapurple;
}
</style>
```

This outputs:

```html
<my-component class="wcl2xedjk">Default slot</my-component>
```

and aggregates the following CSS to [the bundle](#asset-bundling):

```css
.wcl2xedjk{color:blue}
.wcl2xedjk:defined{color:rebeccapurple}
```

</details>

### `webc:type`

_Adding your own [Custom Transform](https://github.com/11ty/webc#custom-transforms) **directly** to WebC is not yet available in the Eleventy WebC plugin! If this is something folks would like to see added, [please let us know](https://twitter.com/eleven_ty)! Do note that you **can** [add your own custom template engine](/docs/languages/custom/) to the render plugin!_

### `webc:type="11ty"`

The [Custom Transforms feature](https://github.com/11ty/webc#custom-transforms) (e.g. `webc:type`) in the Eleventy WebC plugin has been wired up to the [Eleventy Render plugin](/docs/plugins/render/) to allow you to use existing Eleventy template syntax inside of WebC.

Use `webc:type="11ty"` with the `11ty:type` attribute to specify a [valid template syntax](/docs/plugins/render/#rendertemplate).

{% codetitle "my-page.webc" %}

{% raw %}
```liquid
---
frontmatterdata: "Hello from Front Matter"
---
<template webc:type="11ty" 11ty:type="liquid,md">
{% assign t = "Liquid in WebC" %}
## {{ t }}

_{{ frontmatterdata }}_
</template>
```
{% endraw %}

* You have full access to the data cascade here (note `frontmatterdata` is [set in front matter](#front-matter) above).
* Content returned from custom transforms will be processed as WebC—return any WebC content here! {% addedin "@11ty/webc@0.5.0" %}

### `webc:type="render"` (JavaScript Render Functions)

You can also transform individual element content using your own arbitrary JavaScript with `webc:type="render"`. Render functions are async friendly (e.g. `async function()`).

<details>
<summary>Expand for image component example</summary>

{% codetitle "page.webc" %}

```html
<img src="my-image.jpeg" alt="An excited Zach is trying to finish this documentation">
```

{% codetitle "components/img.webc" %}

```html
<script webc:type="render" webc:is="template">
function() {
	if(!this.alt) {
		throw new Error("oh no you didn’t");
	}
	// Free idea: use the Eleventy Image plugin to return optimized markup
	return `<img src="${this.src}" alt="${this.alt}">`;
}
</script>
```

</details>

<details>
<summary>Expand for style component example</summary>

Or use a JavaScript render function to generate some CSS:

{% codetitle "page.webc" %}

```html
<style webc:is="add-banner-to-css" license="MIT licensed">
p { color: rebeccapurple; }
</style>
```

{% codetitle "components/add-banner-to-css.webc" %}

```html
<script webc:type="render" webc:is="style">
function() {
	return `/* ${this.license} */`;
}
</script>
<style>
  <slot></slot>
</style>
```

</details>

Bonus tips:

* You can pair `webc:type="render"` with [`webc:scoped`](#webcscoped)!
* You do have access to the component attributes and props in the render function (which is covered in another section!).
* Content returned from render functions will be processed as WebC—return any WebC content here! {% addedin "@11ty/webc@0.5.0" %}

### `webc:raw`

Use `webc:raw` to opt-out of WebC template processing for all child content of the current node. Notably, attributes on the current node will be processed. This works well with `<template>`!

{% codetitle "components/my-component.webc" %}

```html
<template webc:raw>
Leave me out of this.
<style>
p { color: rebeccapurple; }
</style>
</template>
```

### Helper Functions

WebC [Helpers](https://github.com/11ty/webc#helper-functions) are JavaScript functions available in dynamic attributes, `@html`, and render functions.

{% addedin "@11ty/eleventy-plugin-webc@0.5.0" %}[JavaScript template functions](/docs/languages/javascript/#javascript-template-functions) and [Universal Filters](/docs/languages/javascript/#javascript-template-functions) are available as WebC Helpers.

```html
<!-- Use the  Eleventy provided `url` universal filter -->
<a :href="url("/local-path/")">My Link</a>
```

#### Supply your own Helper

{% codetitle ".eleventy.js" %}

```js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	// via Universal Filter
	eleventyConfig.addFilter("alwaysRed", () => "Red");

	// via JavaScript Template Function
	eleventyConfig.addJavaScriptFunction("alwaysBlue", () => "Blue");

	eleventyConfig.addPlugin(pluginWebc);
};
```

```html
<div @html="alwaysRed()"></div>
<div @html="alwaysBlue()"></div>

<!-- renders as: -->
<div>Red</div>
<div>Blue</div>
```


### Limitations

#### Void elements

Custom elements (per specification) are not supported as void elements: they require both a starting and ending tag. You can workaround this limitation using [`webc:is`](#webcis).

#### `<head>` Components

There are a few wrinkles when using an HTML parser with custom elements. Notably, the parser tries to force custom element children in the `<head>` over to the `<body>`. To workaround this limitation, use [`webc:is`](#webcis).

<details>
<summary>Expand for a few example workarounds</summary>

```html
<head webc:is="my-custom-head">
	<!-- this is slot content, yes you can use named slots here too -->
</head>
```

```html
<head>
	<!-- <my-custom-head> is not allowed here -->
	<meta webc:is="my-custom-head">
	<title webc:is="my-custom-title">Default Title</title>
</head>
```

</details>

## Eleventy + WebC Features

### Front Matter

WebC in Eleventy works automatically with standard Eleventy conventions for [front matter](/docs/data-frontmatter/) (though front matter in Eleventy is _optional_).

{% codetitle "with-front-matter.webc" %}

```yaml
---
layout: "my-layout.webc"
---
WebC *is* HTML.
```

<details>
<summary>Expand to see an example <code>my-layout.webc</code></summary>

The above example assumes the existence of `_includes/my-layout.webc` (an [Eleventy layout](/docs/layouts/)).

{% codetitle "_includes/my-layout.webc" %}

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
	</head>
	<body @html="content"></body>
</html>
```

Read more about the [special `@html` WebC property](#@html).

_WebC versions prior to `0.5.0` required `this.` (e.g. `this.content`) when referencing data/attributes/property values. This is no longer required when using `@html`._

</details>

_Notable note_: front matter (per standard Eleventy conventions) is supported in page-level templates only (files in your input directory) and not in components (see below). If this is something folks would like to see added, [please let us know](https://twitter.com/eleven_ty)!

### Defining Components

Components are the {% emoji "✨" %}magic{% emoji "✨" %} of WebC and there are a few ways to define components in WebC:

1. Use global no-import components specified in your config file.
1. Specify a glob of no-import components at a directory or template level in the data cascade.
1. You can use [`webc:import`](#webcimport) inside of your components to import another component directly.

{% callout "info" %}
Notably, WebC components can have any valid HTML tag name and are not restricted to the same naming limitations as custom elements (they do not require a dash in the name).
{% endcallout %}

#### Global no-import Components

Use the `components` property in the options passed to `addPlugin` in your Eleventy configuration file to specify project-wide WebC component files available for use in any page.

```js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		components: "_includes/components/**/*.webc",
	});
};
```

The file names of components found in the glob determine the global tag name used in your project (e.g. `_includes/components/my-component.webc` will give you access to `<my-component>`).

#### Declaring Components in Front Matter

You can also use and configure specific components in front matter (or, via any part of the data cascade—scoped to a folder or a template) by assigning a glob (or array of globs) to the property at `webc.components`:

{% codetitle "my-directory/my-page.webc" %}

```html
---
layout: "my-layout.webc"
webc:
  components: "./webc/*.webc"
---
<my-webc-component>WebC *is* HTML.</my-webc-component>
```

{% callout "warn", "md-block" %}By default these paths are relative to the template file. If you’re setting this in the data cascade in a directory data file that will apply multiple child folders deep, it might be better to:

1. Use the global no-import components option.
1. Use `~/` as a prefix (e.g. `~/my-directory/webc/*.webc`) to alias to the project’s root directory.
{% endcallout %}

### CSS and JS (Bundler mode)

[Eleventy Layouts](/docs/layouts/) can bundle any specific page’s assets (CSS and JS used by components on the page). These are automatically rolled up when a component uses `<script>`, `<style>`, or `<link rel="stylesheet">`. You can use this to implement component-driven Critical CSS.

{% callout "info", "md" %}Note that if a `<style>` is nested inside of [declarative shadow root](https://web.dev/declarative-shadow-dom/) template (e.g. `<template shadowroot>`), it is left as is and not aggregated.{% endcallout %}

{% codetitle "_includes/webc/my-webc-component.webc" %}

```html
<style>/* This is component CSS */</style>
<script>/* This is component JS */</script>

<!-- File references work too -->
<link rel="stylesheet" href="my-file.css">
<script src="my-file.js"></script>
```

As shown above this also includes `<link rel="stylesheet">` and `<script src>` when the URLs point to files on the file system ([remote URL sources are not yet supported](https://github.com/11ty/webc/issues/15)).

You can opt-out of bundling on a per-element basis [using `webc:keep`](#webckeep).

{% codetitle "_includes/layout.webc" %}

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
		<style @html="getCss(page.url)"></style>
		<script @html="getJs(page.url)"></script>
	</head>
	<body @html="content"></body>
</html>
```

Make sure you’re using these `getCss` and `getJs` helpers in an _Eleventy Layout_ file.

_WebC versions prior to `0.5.0` required `this.` (e.g. `this.getCss`/`this.page.url`) when referencing helpers/data/attributes/property values. This is no longer required when using `@html`._

#### Asset bucketing

Components can use the `webc:bucket` feature to output to any arbitrary bucket name for compartmentalization at the component level.

{% codetitle "_includes/webc/my-webc-component.webc" %}

```html
<style>/* This CSS is put into the default bucket */</style>
<script>/* This JS is put into the default bucket */</script>
<style webc:bucket="defer">/* This CSS is put into the `defer` bucket */</style>
<script webc:bucket="defer">/* This JS is put into the `defer` bucket */</script>
```

{% codetitle "_includes/layout.webc" %}

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
		<!-- Default bucket -->
		<style @html="getCss(page.url)"></style>
		<script @html="getJs(page.url)"></script>
	</head>
	<body>
		<template webc:nokeep @html="content"></template>

		<!-- `defer` bucket -->
		<style @html="getCss(page.url, 'defer')"></style>
		<script @html="getJs(page.url, 'defer')"></script>
	</body>
</html>
```

_WebC versions prior to `0.5.0` required `this.` (e.g. `this.getCss`/`this.page.url`) when referencing helpers/data/attributes/property values. This is no longer required when using `@html`._

### Use with `is-land`

You can also use this out of the box with Eleventy’s [`is-land` component for web component hydration](/docs/plugins/partial-hydration/).

At the component level, components can declare their own is-land loading conditions.

{% codetitle "_includes/webc/my-webc-component.webc" %}

```html
<is-land on:visible>
	<template data-island>
		<!-- CSS -->
		<style webc:keep>
		/* This is on-visible CSS */
		</style>
		<link rel="stylesheet" href="some-arbitrary-css.css" webc:keep>

		<!-- JS -->
		<script type="module" webc:keep>
		console.log("This is on-visible JavaScript");
		</script>
		<script type="module" src="some-arbitrary-js.js" webc:keep></script>
	</template>
</is-land>
```

