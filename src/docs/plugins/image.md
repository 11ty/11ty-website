---
pageTitle: Image
eleventyNavigation:
  key: Image
  order: -.2
  excerpt: A utility to resize and generate images.
communityLinksKey: image
overrideCommunityLinks: true
---

{% tableofcontents %}

{% renderTemplate "webc" %}<div class="build-cost-inline"><a href="#build-cost-🧰"><build-cost cost="3"></build-cost></a></div>{% endrenderTemplate %}

Low level utility to perform build-time image transformations for both vector and raster images. Output multiple sizes, save multiple formats, cache remote images locally. Uses the [sharp](https://sharp.pixelplumbing.com/) image processor.

- [`eleventy-img` on GitHub](https://github.com/11ty/eleventy-img)

You maintain full control of the HTML. Use with `<picture>`, `<img>`, CSS `background-image`, or others! Works great to add `width` and `height` to your images!

- Easily add `width` and `height` attributes on `<img>` elements for [proper aspect ratio mapping](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping).
- Accepts a variety of image types as input: `jpeg`, `png`, `webp`, `gif`, `tiff`, `avif`, and `svg`.
- Output multiple sizes, maintaining the original aspect ratio.
  - Never upscales raster images larger than original size (with the option to upscale SVG input).
- Output multiple formats, supports: `jpeg`, `png`, `webp`, `avif` <a href="#build-cost-🧰"><span class="minilink minilink-buildcost"><code>+1</code> Build Cost</span></a>, and `svg` (SVG output requires SVG input)
- Does _not_ rely on file extensions (like `.png` or `.jpg`) in URLs or local files, which may be missing or inaccurate.
- Save remote images locally to prevent broken image URLs (using [`eleventy-fetch`](/docs/plugins/fetch/)).
- Fast: de-duplicates image requests and uses both an in-memory and disk cache.

## Installation

Published as [`@11ty/eleventy-img`](https://www.npmjs.com/package/@11ty/eleventy-img) on npm.

```
npm install @11ty/eleventy-img
```

## Usage

This utility returns a Promise and works best in `async` friendly functions, filters, shortcodes, and [transforms](#eleventy-transform).

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

(async () => {
	let url = "https://images.unsplash.com/photo-1608178398319-48f814d0750c";
	let stats = await Image(url, {
		widths: [300],
	});

	console.log(stats);
})();
```

Three things happen here:

1. If the first argument is a full URL (not a local file path), we download [the remote image](https://unsplash.com/photos/uXchDIKs4qI) and cache it locally using the [Fetch plugin](/docs/plugins/fetch/). This cached original is then used for the cache duration to avoid a bunch of network requests.
2. From that cached full-size original, images are created for each format and width, in this case: `./img/6dfd7ac6-300.webp` and `./img/6dfd7ac6-300.jpeg`.
3. A metadata object is returned, describing those new images.

<details><summary>Expand to see a sample returned metadata object</summary>
<div id="sample-return-object"></div>

```js
{
	webp: [
		{
			format: 'webp',
			width: 300,
			height: 300,
			filename: '6dfd7ac6-300.webp',
			outputPath: 'img/6dfd7ac6-300.webp',
			url: '/img/6dfd7ac6-300.webp',
			sourceType: 'image/webp',
			srcset: '/img/6dfd7ac6-300.webp 300w',
			size: 10184
		}
	],
	jpeg: [
		{
			format: 'jpeg',
			width: 300,
			height: 300,
			filename: '6dfd7ac6-300.jpeg',
			outputPath: 'img/6dfd7ac6-300.jpeg',
			url: '/img/6dfd7ac6-300.jpeg',
			sourceType: 'image/jpeg',
			srcset: '/img/6dfd7ac6-300.jpeg 300w',
			size: 15616
		}
	]
}
```

</details>

<details>
<summary>Expand to see the full list of options (defaults shown)</summary>

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

(async () => {
	let stats = await Image("…", {
		// Array of integers or "auto"
		widths: ["auto"],

		// Array of file format extensions or "auto"
		formats: ["webp", "jpeg"],

		// the URLs in markup are prefixed with this
		urlPath: "/img/",

		// the images are written here
		outputDir: "./img/",

		// skip raster formats if SVG available
		svgShortCircuit: false,

		// SVG file sizes can report the compressed size
		// Added in v3.1.8
		svgCompressionSize: "",

		// allow svg to upscale beyond supplied dimensions?
		// Added in v3.1.8
		svgAllowUpscale: true,

		// always rotate the image to enforce correct orientation from EXIF metadata
		// Added in v4.0.0
		fixOrientation: false,

		// the file name hash length
		hashLength: 10,

		// Custom file name callback (see below)
		filenameFormat: function () {},

		// Advanced options passed to eleventy-fetch
		cacheOptions: {},

		// Advanced options passed to sharp
		sharpOptions: {},
		sharpWebpOptions: {},
		sharpPngOptions: {},
		sharpJpegOptions: {},
		sharpAvifOptions: {},

		// Custom full URLs (use with hosted services, see below)
		urlFormat: function () {},
	});
})();
```

</details>

### Output Widths

Controls how many output images will be created for each image format. Aspect ratio is preserved.

- `widths: ["auto"]` (default, keep original width) `"auto"`.
- `widths: [200]` (output one 200px width)
- `widths: [200, "auto"]` (output 200px and original width)

### Output Formats

Use almost any combination of these:

- `formats: ["webp", "jpeg"]` (default)
- `formats: ["png"]`
- `formats: ["auto"]` (keep original format) `"auto"`
- `formats: ["svg"]` (requires SVG input)
- `formats: ["avif"]` <a href="#build-cost-🧰"><span class="minilink minilink-buildcost"><code>+1</code> Build Cost</span></a>

### Output Locations

#### URL Path

A path-prefix-esque directory for the `<img src>` attribute. e.g. `/img/` for `<img src="/img/MY_IMAGE.jpeg">`:

- `urlPath: "/img/"` (default)

#### Output Directory

Where to write the new images to disk. Project-relative path to the output image directory. Maybe you want to write these to your output directory directly (e.g. `./_site/img/`)?

- `outputDir: "./img/"` (default)

### Options for SVG

#### Skip raster formats for SVG

If using SVG output (the input format is SVG and `svg` is added to your `formats` array), we will skip all of the raster formats even if they’re in `formats`. This may be useful in a CMS-driven workflow when the input could be vector or raster.

- `svgShortCircuit: false` (default)
- `svgShortCircuit: true`
- `svgShortCircuit: "size"` {% addedin "Image v3.1.8" %}

Using `svgShortCircuit: "size"` means that raster image format entries will only be thrown out if the optimized raster size is larger than the SVG. This helps with large SVG images that compress to smaller raster sizes at smaller widths and will prefer the SVG over raster formats when the SVG file size is smaller.

To use Brotli compressed SVG sizes when making file size comparisons, use the `svgCompressionSize: "br"` option {% addedin "Image v3.1.8" %}.

##### Related:

<ul class="list-bare">
	<li>{% indieweblink "A New Technique for Image Optimization: SVG Short Circuiting", "https://www.zachleat.com/web/svg-short-circuit/" %} <em>({{ "2023-11-15" | newsDate("yyyy") }})</em></li>
	<li>{% indieweblink "Automatically optimize your images with Eleventy Image and CloudCannon", "https://cloudcannon.com/blog/automatically-optimize-your-images-with-eleventy-image-and-cloudcannon/" %} <em>({{ "2023-11-14" | newsDate("yyyy") }})</em></li>
</ul>

#### Allow SVG to upscale

While we do prevent raster images from upscaling (and filter upscaling `widths` from the output), you can optionally enable SVG input to upscale to larger sizes when converting to raster format.

- `svgAllowUpscale: true` (default)
- `svgAllowUpscale: false`

### Custom Filenames

Don’t like those hash ids? Make your own!

```js
{
	// Define custom filenames for generated images
	filenameFormat: function (id, src, width, format, options) {
		// id: hash of the original image
		// src: original image path
		// width: current width in px
		// format: current file format
		// options: set of options passed to the Image call

		return `${id}-${width}.${format}`;
	}
}
```

<details>
<summary>Custom Filename Example: Use the original file slug</summary>

```js
const path = require("path");
const Image = require("@11ty/eleventy-img");

await Image("./test/bio-2017.jpg", {
	widths: [300],
	formats: ["auto"],
	filenameFormat: function (id, src, width, format, options) {
		const extension = path.extname(src);
		const name = path.basename(src, extension);

		return `${name}-${width}w.${format}`;
	},
});

// Writes: "test/img/bio-2017-300w.jpeg"
```

</details>

## Use this in your templates

There are four different ways to use this utility in your Eleventy project:

1. [Eleventy Transform](#eleventy-transform) (easiest to configure, works everywhere)
1. [Asynchronous Shortcode](<#nunjucks-liquid-javascript-(asynchronous-shortcodes)>) (Nunjucks, Liquid, 11ty.js)
1. [WebC Component](#webc)
1. [Synchronous Shortcode](#synchronous-shortcode) _(deprecated)_

### Eleventy Transform

{% renderTemplate "webc" %}<div class="build-cost-inline"><a href="#build-cost-🧰"><build-cost cost="4"></build-cost></a></div>{% endrenderTemplate %}

{% addedin "v3.0.0-alpha.5" %} {% addedin "Image v4.0.1" %}This is the easiest method to configure. You add a bit of code to your configuration file and we’ll transform _any_ `<img>` tags in HTML files that exist in your output folder (probably `_site/**/*.html`).

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "transform-config", only: "jscjs,jsesm"} %}
  <div id="transform-config-jscjs" role="tabpanel">

{% codetitle ".eleventy.js" %}

```js
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
};
```

  </div>
  <div id="transform-config-jsesm" role="tabpanel">

{% codetitle ".eleventy.js" %}

```js
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
}
```

  </div>
</seven-minute-tabs>
</is-land>

#### Relative paths

If you **do not** specify the `urlPath` option:

1. Relative image sources (`<img src="./possum.png">`) will be co-located in your output directory with the template they are used in. Note that if the same source image is used in multiple templates, it will be written to two different locations!
2. Absolute image sources (`<img src="/possum.png">`) will be normalized relative to your input/content directory and written to your output directory with the default utility directory (e.g. `_site/img/`).

#### Attribute overrides

You can configure individual `<img>` elements with per-instance overrides:

- `<img eleventy:ignore>` skips this image.
- `<img eleventy:formats="webp">` comma separated string to override the default formats.
- `<img eleventy:widths="200,600">` comma separated string to override the default widths.
- `<img eleventy:output>` overrides the output directory. Similar to `urlPath` above, absolute paths (e.g. `<img eleventy:output="/mydirectory/">`) are relative to the Eleventy output directory and relative paths are relative to the template’s URL (e.g. `<img eleventy:output="./mydirectory/">`).

{% callout "info", "md" %}If you’re adding the transform method to a project that is already using an Image shortcode or the WebC component, make sure you add `eleventy:ignore` to the `<img>` attributes so the images aren’t optimized twice (e.g. `Image.generateHTML(metadata, { "eleventy:ignore": "" });`).{% endcallout %}

### Nunjucks, Liquid, JavaScript (Asynchronous Shortcodes)

<div id="asynchronous-shortcode"></div>
{% renderTemplate "webc" %}<div class="build-cost-inline"><a href="#build-cost-🧰"><build-cost cost="3"></build-cost></a></div>{% endrenderTemplate %}

The examples below require an [async-friendly shortcodes](/docs/shortcodes/#asynchronous-shortcodes) (works in Nunjucks, Liquid, JavaScript, and [WebC](/docs/languages/webc/)).

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
		let metadata = await Image(src, {
			widths: [300, 600],
			formats: ["avif", "jpeg"],
		});

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});
};
```

<details>
<summary>Expand to see full options list for <code>Image.generateHTML</code></summary>

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
		let metadata = await Image(src, {
			// omitted for brevity
		});

		let imageAttributes = {
			// omitted for brevity
		};

		let options = {
			// HTML attributes added to `<picture>` (left out if <img> is used)
			// Added in v4.0.0
			pictureAttributes: {},

			// Condense HTML output to one line (no new lines)
			// Added in v0.7.3
			whitespaceMode: "inline", // or: "block"
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		// Note that `options` are *optional*
		return Image.generateHTML(metadata, imageAttributes, options);
	});
};
```

</details>

The [`addShortcode` method is async-friendly in Eleventy 2.0+](/docs/shortcodes/#asynchronous-shortcodes). Use `addAsyncShortcode` in older versions of Eleventy. You can also [add these shortcodes to individual template engines](/docs/shortcodes/#async-friendly-per-engine-shortcodes), if you’d like!

{% callout "info", "md" %}Note that [Nunjucks macros cannot use async shortcodes](https://mozilla.github.io/nunjucks/templating.html#macro). If you use macros, use [synchronous shortcodes](#synchronous-shortcode) described below.{% endcallout %}

If you want to use Eleventy Image in WebC, take note that it is possible to wire up the method below in WebC. However it is **recommended to use the [provided `<eleventy-image>` WebC component](#webc) instead**.

- _HTML Tip:_ Read more about the special (and very useful) [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) and [`decoding`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) HTML attributes.

Now you can use the `image` shortcode in your templates and the appropriate HTML will be generated for you (based on your specified Image options).

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync>
	{% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "shortcode"} %}
	<div id="shortcode-liquid" role="tabpanel">
		{% codetitle "Liquid", "Syntax" %}
{%- highlight "liquid" %}{% raw %}
{% image "cat.jpg", "photo of my tabby cat" %}
{% image "cat.jpg", "photo of my tabby cat", "(min-width: 30em) 50vw, 100vw" %}
{% endraw %}{% endhighlight %}
		<p>The comma between arguments is <strong>optional</strong> in Liquid templates.</p>
	</div>
	<div id="shortcode-njk" role="tabpanel">
		{% codetitle "Nunjucks", "Syntax" %}
{%- highlight "jinja2" %}{% raw %}
{% image "cat.jpg", "photo of my tabby cat" %}
{% image "cat.jpg", "photo of my tabby cat", "(min-width: 30em) 50vw, 100vw" %}
{% endraw %}{% endhighlight %}
		<p>The comma between arguments is <strong>required</strong> in Nunjucks templates.</p>
	</div>
	<div id="shortcode-js" role="tabpanel">
		{% codetitle "JavaScript", "Syntax" %}
{%- highlight "js" %}{% raw %}
module.exports = function() {
	let img1 = await this.image("cat.jpg", "photo of my tabby cat");
	let img2 = await this.image("cat.jpg", "photo of my tabby cat", "(min-width: 30em) 50vw, 100vw");

    return `${img1}

${img2}`;
};
{% endraw %}{% endhighlight %}

</div>
<div id="shortcode-hbs" role="tabpanel">

This `image` shortcode example [requires an async-friendly template language](#asynchronous-shortcode) and is not available in Handlebars.

    </div>

</seven-minute-tabs>
</is-land>

#### Synchronous Shortcode

{% callout "info", "md" %}The new [Eleventy Transform](#eleventy-transform) is now preferred for situations that are not asynchronous-friendly (Handlebars, macros in Nunjucks, et al). For asynchronous-friendly templates (e.g. Nunjucks, Liquid, WebC, JavaScript), the [Asynchronous Shortcode](#asynchronous-shortcode) is another option.{% endcallout %}

<details>
<summary>Expand to see an example of Synchronous usage.</summary>

{% callout "warn" %}Deprecated in <a href="https://github.com/11ty/eleventy-img/issues/211">Eleventy Image v4.0.0</a>.{% endcallout %}

Use `Image.statsSync` to get the metadata of a source even if the image generation is not finished yet:

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");
function imageShortcode(src, cls, alt, sizes, widths) {
	let options = {
		widths: widths,
		formats: ["jpeg"],
	};

	// generate images, while this is async we don’t wait
	Image(src, options);

	let imageAttributes = {
		class: cls,
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};
	// get metadata even if the images are not fully generated yet
	let metadata = Image.statsSync(src, options);
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("myImage", imageShortcode);
};
```

</details>

### WebC

{% renderTemplate "webc" %}<div class="build-cost-inline"><a href="#build-cost-🧰"><build-cost cost="3"></build-cost></a></div>{% endrenderTemplate %}

{% addedin "Image v3.1.0" %} Eleventy Image now provides a built-in `<eleventy-image>` WebC component for use in your Eleventy project.

Using Eleventy Image in [WebC](/docs/languages/webc/) offers all the same great benefits you’re used to from Eleventy Image with an intuitive declarative HTML-only developer experience. WebC components work in `*.webc` files. To use in other template formats, use the the shortcodes above (or with the [Render plugin](/docs/plugins/render.md)).

First, add the following to your project’s configuration file:

{% codetitle ".eleventy.js" %}

```js
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");

// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
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
```

- _HTML Tip:_ Read more about the special (and very useful) [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) and [`decoding`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) HTML attributes.

Now you can use the `<eleventy-image>` WebC component in your templates:

```html
<img webc:is="eleventy-image" src="cat.jpg" alt="photo of my tabby cat" />
<eleventy-image src="cat.jpg" alt="photo of my tabby cat"></eleventy-image>

<!-- Specify widths: -->
<img
	webc:is="eleventy-image"
	width="100, 200"
	src="cat.jpg"
	alt="photo of my tabby cat"
/>
<img
	webc:is="eleventy-image"
	:width="[100, 200]"
	src="cat.jpg"
	alt="photo of my tabby cat"
/>

<!-- Specify formats (overriding defaults set via the configuration) -->
<img
	webc:is="eleventy-image"
	formats="avif, png"
	src="cat.jpg"
	alt="photo of my tabby cat"
/>
<img
	webc:is="eleventy-image"
	:formats="['avif', 'png']"
	src="cat.jpg"
	alt="photo of my tabby cat"
/>

<!-- Change the url path or output dir (overriding defaults set via the configuration above) -->
<img
	webc:is="eleventy-image"
	url-path="/some-dir/"
	output-dir="_site/some-dir/"
	src="cat.jpg"
	alt="photo of my tabby cat"
/>
```

## Build Cost 🧰

Image optimization is likely one of the costlier pieces of your Eleventy build. The total build cost of this utility is dependent on a few things:

1. Number of unique images optimized (not number of pages)
1. Number of `widths` you generate for each source image.
1. Number of `formats` you generate for each source image.
   - `avif` is more costly than other image formats. <span class="minilink minilink-buildcost"><code>+1</code> Build Cost</span>
1. File size of images being optimized (larger source images are more expensive).
1. Optimizing a lot of remote images (image content must be fetched from a remote server and is subsequently cached via [`eleventy-fetch`](/docs/plugins/fetch/)).

If you’re using the [Transform method](#eleventy-transform) to optimize images, this incurs an additional cost via the HTML postprocessing step. If you want the easiest thing to configure (or you’re _not_ using an asynchronous friendly template syntax—e.g. Nunjucks, Liquid, WebC, 11ty.js), this might be worth it—but be aware that a build performance trade-off exists.

<div id="caching"></div>

### In-Memory Cache

To prevent duplicate work and improve build performance, repeated calls to the same source image (remote or local) _with the same options_ will return a cached results object. If a request in-progress, the pending promise will be returned. This in-memory cache is maintained across builds in watch/serve mode. If you quit Eleventy, the in-memory cache will be lost.

Images will be regenerated (and the cache ignored) if:

- The source image file size changes (on local image files)
- The [cache asset](/docs/plugins/fetch/) duration expires (for remote images).

You can disable this behavior by using the `useCache` boolean option:

- `useCache: true` (default)
- `useCache: false` to bypass the cache and generate a new image every time.

##### Examples

<details>
<summary>Example of in-memory cache reuse (returns the same promise)</summary>

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

(async () => {
	let stats1 = Image("./test/bio-2017.jpg");
	let stats2 = Image("./test/bio-2017.jpg");

	console.assert(stats1 === stats2, "The same promise");
})();
```

</details>
<details>
<summary>Example of in-memory cache (returns a new promise with different options)</summary>

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

(async () => {
	let stats1 = Image("./test/bio-2017.jpg");
	let stats2 = Image("./test/bio-2017.jpg", { widths: [300] });

	console.assert(stats1 !== stats2, "A different promise");
})();
```

</details>

### Disk Cache

{% addedin "Image 1.0.0" %} Eleventy will skip processing files that are unchanged and already exist in the output directory. This requires the built-in hashing algorithm and is not yet supported with custom filenames. More background at <a href="https://github.com/11ty/eleventy-img/issues/51">Issue #51</a>.

You can use this to [speed up builds on your build server](/docs/deployment/#persisting-cache).

## Advanced Usage

### Dry-Run

If you want to try the utility out and not write any files (useful for testing), use the `dryRun` option.

- `dryRun: false` (default)
- `dryRun: true`

### Make your own Markup

If you have an advanced use case and don’t want to use our methods to generate the image markup, you can do it yourself!

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs>
<div role="tablist" aria-label="DIY mode chooser">
	Choose one:
	<a href="#filter-diy-img" role="tab">Do it yourself: &lt;img&gt;</a>
	<a href="#filter-diy-picture" role="tab">Do it yourself: &lt;picture&gt;</a>
</div>
<div id="filter-diy-img" role="tabpanel">

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode("image", async function (src, alt) {
		if (alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on myImage from: ${src}`);
		}

		let metadata = await Image(src, {
			widths: [600],
			formats: ["jpeg"],
		});

		let data = metadata.jpeg[metadata.jpeg.length - 1];
		return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
	});
};
```

</div>
<div id="filter-diy-picture" role="tabpanel">

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
	eleventyConfig.addShortcode(
		"image",
		async function (src, alt, sizes = "100vw") {
			if (alt === undefined) {
				// You bet we throw an error on missing alt (alt="" works okay)
				throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
			}

			let metadata = await Image(src, {
				widths: [300, 600],
				formats: ["webp", "jpeg"],
			});

			let lowsrc = metadata.jpeg[0];
			let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

			return `<picture>
			${Object.values(metadata)
				.map((imageFormat) => {
					return `  <source type="${
						imageFormat[0].sourceType
					}" srcset="${imageFormat
						.map((entry) => entry.srcset)
						.join(", ")}" sizes="${sizes}">`;
				})
				.join("\n")}
				<img
					src="${lowsrc.url}"
					width="${highsrc.width}"
					height="${highsrc.height}"
					alt="${alt}"
					loading="lazy"
					decoding="async">
			</picture>`;
		}
	);
};
```

</div>
</seven-minute-tabs>
</is-land>

### Process images as a Custom Template

Use Eleventy’s [Custom Template Language](/docs/languages/custom/) feature to process images. _This one is not yet available on the docs: do you want to contribute it?_

### Process images as Data Files

{% addedin "2.0.0-canary.10" %} _Nontraditional use case._ Eleventy’s [Custom Data File Formats](/docs/data-custom/) features an example of [processing Images as data files to feed EXIF data into the Data Cascade](/docs/data-custom/#feed-exif-image-data-into-the-data-cascade). You can use the same feature to add the metadata stats returned from the Image utility directly to the Data Cascade for use in your templates.

- Benefits:
  - Processing happens in the data cascade so this works in any template language.
  - Images stored in the [global data folder](/docs/data-global/) will be processed and available to all templates
- Drawbacks:
  - You can’t customize the Image options (e.g. `widths` or `formats`) from the template code. It is set globally in the config.
- Both a benefit and a drawback:
  - Beholden to Eleventy’s Data Cascade file name conventions when using with [template/directory data files](/docs/data-template-dir/).

<details>
	<summary><strong>Show the code</strong></summary>

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
	eleventyConfig.addDataExtension("png,jpeg", {
		read: false, // Don’t read the input file, argument is now a file path
		parser: async (imagePath) => {
			let stats = await Image(imagePath, {
				widths: ["auto"],
				formats: ["avif", "webp", "jpeg"],
				outputDir: path.join(eleventyConfig.dir.output, "img", "built"),
			});

			return {
				image: {
					stats,
				},
			};
		},
	});

	// This works sync or async: images were processed ahead of time in the data cascade
	eleventyConfig.addShortcode("dataCascadeImage", (stats, alt, sizes) => {
		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};
		return Image.generateHTML(stats, imageAttributes);
	});
};
```

With a template `my-blog-post.md` and an image file `my-blog-post.jpeg`, you could use the above configuration code in your template like this:

{% codetitle "my-blog-post.md" %}

{% raw %}

```liquid
{% dataCascadeImage image.stats, "My alt text" %}
```

{% endraw %}

Note this also means that `folder/folder.jpeg` would be processed for all templates in `folder/*` and any images stored in your global `_data` would also be populated into the data cascade based on their folder structure.

</details>

<div class="youtube-related">
	{%- youtubeEmbed "oCTAZumAGNc", "Use images as data files (Weekly №11)", "244" -%}
</div>

### Change Global Plugin Concurrency

```js
const Image = require("@11ty/eleventy-img");
Image.concurrency = 4; // default is 10
```

### Advanced control of Sharp image processor

[Extra options to pass to the Sharp constructor](https://sharp.pixelplumbing.com/api-constructor#parameters) or the [Sharp image format converter for webp](https://sharp.pixelplumbing.com/api-output#webp), [png](https://sharp.pixelplumbing.com/api-output#png), [jpeg](https://sharp.pixelplumbing.com/api-output#jpeg), or [avif](https://sharp.pixelplumbing.com/api-output#avif).

- `sharpOptions: {}`
- `sharpWebpOptions: {}`
- `sharpPngOptions: {}`
- `sharpJpegOptions: {}`
- `sharpAvifOptions: {}`

#### Output animated GIF or WebP

{% addedin "Image 1.1.0" %} To process and output animated `gif` or `webp` images, use the `animated` option for the Sharp constructor.

```js
const Image = require("@11ty/eleventy-img");

await Image("./test/bio-2017.jpg", {
	formats: ["webp", "gif"],

	sharpOptions: {
		animated: true,
	},
});
```

### Change the default Hash length

{% addedin "1.0.0" %} You can customize the length of the default filename format hash by using the `hashLength` property.

```js
const Image = require("@11ty/eleventy-img");

await Image("./test/bio-2017.jpg", {
	hashLength: 8, // careful, don’t make it _too_ short!
});
```

### Advanced Caching Options for Remote Images

For any full URL first argument to this plugin, the full-size remote image will be downloaded and cached locally. See all [relevant `eleventy-fetch` options](/docs/plugins/fetch/#options).

```js
{
	cacheOptions: {
		// if a remote image URL, this is the amount of time before it fetches a fresh copy
		duration: "1d",

		// project-relative path to the cache directory
		directory: ".cache",

		removeUrlQueryParams: false,
	},
}
```

When caching remote images, you may want to check the processed image output into your `git` (et al) repository to avoid refetches in the future. If remote images are _not_ checked in, they may be refetched every time on your CI server unless you [preserve the `.cache` folder between builds](/docs/plugins/fetch/#running-this-on-your-build-server).

### Using a Hosted Image Service

#### Custom URLs

Want to use a hosted image service instead? You can override the entire URL. Takes precedence over `filenameFormat` option. Useful with `statsSync` or `statsByDimensionsSync`.

When you use this, returned data will not include `filename` or `outputPath`.

```js
{
	urlFormat: function ({
		hash, // not included for `statsOnly` images
		src,
		width,
		format,
	}) {
		return `https://sample-image-service.11ty.dev/${encodeURIComponent(src)}/${width}/${format}/`;
	}
}
```

- [_Example on `11ty-website`_](https://github.com/11ty/11ty-website/blob/516faa397a98f8990f3d02eb41e1c99bedfab9cf/.eleventy.js#L105)

#### Stats Only

{% addedin "Image 1.1.0" %} Skips all image processing to return metadata. Doesn’t read files, doesn’t write files. Use this as an alternative to the separate `statsSync*` functions—this will use in-memory cache and de-duplicate requests.

- `statsOnly: false` (default)
- `statsOnly: true`

With remotely hosted images, you may also need to supply the dimensions when using `statsOnly`:

```js
{
	statsOnly: true,
	remoteImageMetadata: {
		width,
		height,
		format, // optional
	}
}
```

## From the Community

<div class="elv-community" id="community-resources">
  {%- include "community-contributed.njk" -%}
</div>

{% include "11tybundle.njk" %}
