---
eleventyNavigation:
  key: Image
  order: 0
  excerpt: A utility to resize and generate images.
---
# Image

Low level utility to perform build-time image transformations for both vector and raster images. Output multiple sizes, save multiple formats, cache remote images locally. Uses the [sharp](https://sharp.pixelplumbing.com/) image processor.

You maintain full control of your HTML—this plugin does not generate any markup. Use with `<picture>` or `<img>` or CSS `background-image`, or others! Works great to add `width` and `height` to your images! Does not require or rely on file extensions (like `.png` or `.jpg`) in URLs or local files, which may be missing or inaccurate.

* Accepts: `jpeg`, `png`, `webp`, `gif`, `tiff`, `avif` (0.6.0+), and `svg`.
* Output multiple sizes, keeps original aspect ratio. Never upscales raster images larger than original size (unless using SVG input).
* Output multiple formats, supports: `jpeg`, `png`, `webp`, `avif` (0.6.0+), and `svg` (requires SVG input)
* Retreive metadata about your new images (see [sample return object](#sample-return-object)).
  * Use this to add `width` and `height` attributes on `<img>` elements for [proper aspect ratio mapping](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping).
* Save remote images locally using [`eleventy-cache-assets`](/docs/plugins/cache/).
  * Use local images in your HTML to prevent broken image URLs.
  * Manage the [cache duration](/docs/plugins/cache/#change-the-cache-duration).
* Manage plugin concurrency.
* [`eleventy-img` on GitHub](https://github.com/11ty/eleventy-img)

---

[[toc]]

## Installation

* [`eleventy-img` on npm](https://www.npmjs.com/package/@11ty/eleventy-img)

```
npm install @11ty/eleventy-img
```

## Usage

This utility returns a Promise and works best in `async` friendly functions, filters, shortcodes. It _can_ also work in synchronous environments but requires a bit more setup!

```js
/* .eleventy.js */
const Image = require("@11ty/eleventy-img");

(async () => {
  let url = "https://images.unsplash.com/photo-1608178398319-48f814d0750c";
  let stats = await Image(url, {
    widths: [300]
  });

  console.log( stats );
})();
```

Three things happen here:

1. If the first argument is a full URL (not a local file path), we download [the remote image](https://unsplash.com/photos/uXchDIKs4qI) and cache it locally using the [Cache plugin](/docs/plugins/cache/). This cached original is then used for the cache duration to avoid a bunch of network requests.
2. From that cached full-size original, images are created for each format and width, in this case: `./img/6dfd7ac6-300.webp` and `./img/6dfd7ac6-300.jpeg`.
3. The metadata object is populated and returned, describing those new images:

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

Here’s the output images, one webp and one jpeg:

<img src="/img/plugins/image/6dfd7ac6-300.webp" alt="the webp output created by this Image plugin (it’s a nebula)" width="300" height="300">

<img src="/img/plugins/image/6dfd7ac6-300.jpeg" alt="the jpeg output created by this Image plugin (it’s a nebula)" width="300" height="300">


### Output Widths

Controls how many output images will be created for each image format. Aspect ratio is preserved.

* `widths: [null]` (default, keep original width)
* `widths: [200]` (output one 200px width)
* `widths: [200, null]` (output 200px and original width)

### Output Formats

Use almost any combination of these:

* `formats: ["webp", "jpeg"]` (default)
* `formats: ["png"]`
* `formats: [null]` (keep original format) {% addedin "0.4.0" %}
* `formats: ["svg"]` (requires SVG input) {% addedin "0.4.0" %}
* `formats: ["avif"]` {% addedin "0.6.0" %}

### URL Path

A path-prefix-esque directory for the `<img src>` attribute. e.g. `/img/` for `<img src="/img/MY_IMAGE.jpeg">`:

* `urlPath: "/img/"` (default)

### Output Directory

Where to write the new images to disk. Project-relative path to the output image directory. Maybe you want to write these to your output directory directly (e.g. `./_site/img/`)?

* `outputDir: "./img/"` (default)

### Caching Remote Images Locally {% addedin "0.3.0" %}

For any full URL first argument to this plugin, the full-size remote image will be downloaded and cached locally. See all [relevant `eleventy-cache-assets` options](/docs/plugins/cache/#options).

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

### Skip raster formats for SVG {% addedin "0.4.0" %}

If using SVG output (the input format is SVG and `svg` is added to your `formats` array), we will skip all of the raster formats even if they’re in `formats`. This may be useful in a CMS-driven workflow when the input could be vector or raster.

* `svgShortCircuit: false` (default)
* `svgShortCircuit: true`

### Allow SVG to upscale {% addedin "0.4.0" %}

While we do prevent raster images from upscaling (and filter upscaling `widths` from the output), you can optionally enable SVG input to upscale to larger sizes when converting to raster format.

* `svgAllowUpscale: true` (default)
* `svgAllowUpscale: false`

### Creating an `<img>` shortcode

{% callout "info" %}The example below uses a <a href="/languages/nunjucks/#asynchronous-shortcodes">Nunjucks</a> <code>async</code> shortcode. As noted, the <a href="/docs/languages/javascript/#asynchronous-javascript-template-functions">JavaScript</a> and <a href="/docs/languages/liquid/#asynchronous-shortcodes">Liquid</a> template engines also work here and are asynchronous by default.{% endcallout %}

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // works also with addLiquidShortcode or addJavaScriptFunction
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt) {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [null],
      formats: ["jpeg"],
      urlPath: "/images/",
      outputDir: "./_site/images/"
    });

    let data = metadata.jpeg.pop();
    return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}">`;
  });
};
```

Now you can use it in your templates:

{% codetitle "src/index.njk" %}

{% raw %}
```html
{% image "./src/images/cat.jpg", "photo of my cat" %}
```
{% endraw %}

And outputs the following in `src/index.html`:

{% codetitle "_site/src/index.html" %}

```html
<img src="/images/43155df7-300.jpeg" width="300" height="300" alt="photo of my cat">
```

### Creating a `<picture>` shortcode

{% callout "info" %}The example below uses a <a href="/languages/nunjucks/#asynchronous-shortcodes">Nunjucks</a> <code>async</code> shortcode. As noted, the <a href="/docs/languages/javascript/#asynchronous-javascript-template-functions">JavaScript</a> and <a href="/docs/languages/liquid/#asynchronous-shortcodes">Liquid</a> template engines also work here and are asynchronous by default.{% endcallout %}

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // works also with addLiquidShortcode or addJavaScriptFunction
  eleventyConfig.addNunjucksAsyncShortcode("responsiveimage", async function(src, alt, sizes = "100vw") {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [300, 600],
      formats: ['webp', 'jpeg']
    });

    let lowsrc = metadata.jpeg[0];

    return `<picture>
      ${Object.values(metadata).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
        <img
          src="${lowsrc.url}"
          width="${lowsrc.width}"
          height="${lowsrc.height}"
          alt="${alt}">
      </picture>`;
  });
};
```

Now you can use it in your templates:

{% codetitle "src/index.njk" %}

{% raw %}
```html
{% responsiveimage "./src/images/cat.jpg", "photo of my cat", "(min-width: 30em) 50vw, 100vw" %}
```
{% endraw %}

{% codetitle "_site/src/index.html" %}

```html
<picture>
  <source type="image/webp" srcset="/img/43155df7-300.webp 300w, /img/43155df7.webp 600w" sizes="(min-width: 30em) 50vw, 100vw">
  <source type="image/jpeg" srcset="/img/43155df7-300.jpeg 300w, /img/43155df7.jpeg 600w" sizes="(min-width: 30em) 50vw, 100vw">
  <img src="/img/43155df7-300.jpeg" width="300" height="300" alt="photo of my cat">
</picture>
```

### Advanced control of Sharp image processor

[Extra options to pass to the Sharp constructor](https://sharp.pixelplumbing.com/api-constructor#parameters) or the [Sharp image format converter for webp](https://sharp.pixelplumbing.com/api-output#webp), [png](https://sharp.pixelplumbing.com/api-output#png), or [jpeg](https://sharp.pixelplumbing.com/api-output#png).

* `sharpOptions: {}` {% addedin "0.4.0" %}
* `sharpWebpOptions: {}` {% addedin "0.4.2" %}
* `sharpPngOptions: {}` {% addedin "0.4.2" %}
* `sharpJpegOptions: {}` {% addedin "0.4.2" %}

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
  formats: [null],
  filenameFormat: function (id, src, width, format, options) {
    const extension = path.extname(src);
    const name = path.basename(src, extension);

    return `${name}-${width}w.${format}`;
  }
});

// Writes: "test/img/bio-2017-300w.jpeg"
```

</details>

### Change Global Plugin Concurrency

```js
const Image = require("@11ty/eleventy-img");
Image.concurrency = 4; // default is 10
```
