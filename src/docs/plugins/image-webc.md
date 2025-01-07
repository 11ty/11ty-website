---
pageTitle: Image (WebC)
eleventyNavigation:
  key: Image WebC
  parent: Image
  excerpt: Use a WebC component for WebC templates.
---

{% tableofcontents %}

{% include "image-usage.njk" %}

## Usage

{% renderTemplate "webc" %}
<div class="build-cost-inline">
<div><a href="./image.md#optimize-images-on-request"><build-cost @cost="1" @icon="🍦" @rating-icon="🍨" label="Serve Cost"></build-cost></a></div>
<div><a href="./image.md#build-cost"><build-cost @cost="3"></build-cost></a></div>
</div>
{% endrenderTemplate %}

{% addedin "Image v3.1.0" %} Eleventy Image now provides a built-in `<eleventy-image>` WebC component for use in your Eleventy project.

Using Eleventy Image in [WebC](/docs/languages/webc.md) offers all the same great benefits you’re used to from Eleventy Image with an intuitive declarative HTML-only developer experience. WebC components work in `*.webc` files. For similar functionality in other template formats, use the the [Liquid/Nunjucks/JavaScript shortcodes](./image-shortcodes.md) above (or even `<eleventy-image>` with the [Render plugin](/docs/plugins/render.md)).

### Configuration

First, add the following to your project’s configuration file:

{% set codeContent %}
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
	// WebC
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: [
			// …
			// Add as a global WebC component
			"npm:@11ty/eleventy-img/*.webc",
		],
	});

	// Image plugin
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["webp", "jpeg"],
		urlPath: "/img/",

		// Notably `outputDir` is resolved automatically
		// to the project output directory

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% addedin "v3.0.0-alpha.7" %}{% addedin "Image v5.0.0" %}During local development (when using `--serve`), `<eleventy-image>` images are _not_ processed at build time and instead are optimized when requested in the browser. Read more about [`transformOnRequest`](./image.md#optimize-images-on-request).

- _HTML Tip:_ Read more about the special (and very useful) [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) and [`decoding`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) HTML attributes.

Now you can use the `<eleventy-image>` WebC component in your templates.

### Template Usage

```html
<img webc:is="eleventy-image" src="cat.jpg" alt="photo of my tabby cat">
```

```html
<eleventy-image src="cat.jpg" alt="photo of my tabby cat"></eleventy-image>
```

```html
<!-- Specify widths: -->
<img webc:is="eleventy-image" width="100, 200" src="cat.jpg" alt="photo of my tabby cat">
<img webc:is="eleventy-image" :width="[100, 200]" src="cat.jpg" alt="photo of my tabby cat">
```

```html
<!-- Specify formats (overriding defaults set via the configuration) -->
<img webc:is="eleventy-image" formats="avif, png" src="cat.jpg" alt="photo of my tabby cat">
<img webc:is="eleventy-image" :formats="['avif', 'png']" src="cat.jpg" alt="photo of my tabby cat">
```

```html
<!-- Change the url path or output dir (overriding defaults set via the configuration above) -->
<img webc:is="eleventy-image" url-path="/some-dir/" output-dir="_site/some-dir/" src="cat.jpg" alt="photo of my tabby cat">
```