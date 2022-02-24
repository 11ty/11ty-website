---
pageTitle: Image
eleventyNavigation:
  key: Image
  order: 0
  excerpt: A utility to resize and generate images.
communityLinksKey: image
---
Low level utility to perform build-time image transformations for both vector and raster images. Output multiple sizes, save multiple formats, cache remote images locally. Uses the [sharp](https://sharp.pixelplumbing.com/) image processor.

* [`eleventy-img` on GitHub](https://github.com/11ty/eleventy-img)

You maintain full control of your HTML—this plugin does not generate any markup. Use with `<picture>` or `<img>` or CSS `background-image`, or others! Works great to add `width` and `height` to your images!

* Accepts: `jpeg`, `png`, `webp`, `gif`, `tiff`, `avif` {% addedin "Image 0.6.0" %}, and `svg`.
* Output multiple sizes, keeps original aspect ratio. Never upscales raster images larger than original size (exception for SVG input).
* Output multiple formats, supports: `jpeg`, `png`, `webp`, `avif` {% addedin "Image 0.6.0" %}, and `svg` (requires SVG input)
* Retrieve metadata about your new images (see [sample return object](#sample-return-object)).
  * Use this to add `width` and `height` attributes on `<img>` elements for [proper aspect ratio mapping](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping).
* Does not require or rely on file extensions (like `.png` or `.jpg`) in URLs or local files, which may be missing or inaccurate.
* Save remote images locally using [`eleventy-cache-assets`](/docs/plugins/cache/).
  * Use local images in your HTML to prevent broken image URLs.
  * Manage the [cache duration](/docs/plugins/cache/#change-the-cache-duration).
* Fast: de-duplicates image requests and use both an in-memory and disk cache.

---

[[toc]]

## Installation

* [`eleventy-img` on npm](https://www.npmjs.com/package/@11ty/eleventy-img)

```
npm install --save-dev @11ty/eleventy-img
```

## Usage

This utility returns a Promise and works best in `async` friendly functions, filters, shortcodes. It _can_ also work in synchronous environments ([Synchronous Usage](#synchronous-usage)).

{% codetitle ".eleventy.js" %}

```js
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

{% callout "demo" %}

<img src="/img/plugins/image/6dfd7ac6-300.webp" alt="the webp output created by this Image plugin (it’s a nebula)" width="300" height="300">

<img src="/img/plugins/image/6dfd7ac6-300.jpeg" alt="the jpeg output created by this Image plugin (it’s a nebula)" width="300" height="300">

{% endcallout %}


### Output Widths

Controls how many output images will be created for each image format. Aspect ratio is preserved.

* `widths: [null]` (default, keep original width)
* `widths: [200]` (output one 200px width)
* `widths: [200, null]` (output 200px and original width)

### Output Formats

Use almost any combination of these:

* `formats: ["webp", "jpeg"]` (default)
* `formats: ["png"]`
* `formats: [null]` (keep original format) {% addedin "Image 0.4.0" %}
* `formats: ["svg"]` (requires SVG input) {% addedin "Image 0.4.0" %}
* `formats: ["avif"]` {% addedin "Image 0.6.0" %}

### Output Locations

#### URL Path

A path-prefix-esque directory for the `<img src>` attribute. e.g. `/img/` for `<img src="/img/MY_IMAGE.jpeg">`:

* `urlPath: "/img/"` (default)

#### Output Directory

Where to write the new images to disk. Project-relative path to the output image directory. Maybe you want to write these to your output directory directly (e.g. `./_site/img/`)?

* `outputDir: "./img/"` (default)

### Caching Remote Images Locally

{% addedin "Image 0.3.0" %} For any full URL first argument to this plugin, the full-size remote image will be downloaded and cached locally. See all [relevant `eleventy-cache-assets` options](/docs/plugins/cache/#options).

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

### Options for SVG

#### Skip raster formats for SVG

{% addedin "Image 0.4.0" %} If using SVG output (the input format is SVG and `svg` is added to your `formats` array), we will skip all of the raster formats even if they’re in `formats`. This may be useful in a CMS-driven workflow when the input could be vector or raster.

* `svgShortCircuit: false` (default)
* `svgShortCircuit: true`

#### Allow SVG to upscale

{% addedin "Image 0.4.0" %} While we do prevent raster images from upscaling (and filter upscaling `widths` from the output), you can optionally enable SVG input to upscale to larger sizes when converting to raster format.

* `svgAllowUpscale: true` (default)
* `svgAllowUpscale: false`

### Custom Filenames

{% addedin "Image 0.4.0" %} Don’t like those hash ids? Make your own!

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

### Using a Hosted Image Service

#### Custom URLs

{% addedin "Image 0.8.3" %} Want to use a hosted image service instead? You can override the entire URL. Takes precedence over `filenameFormat` option. Useful with `statsSync` or `statsByDimensionsSync`.

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

* [_Example on `11ty-website`_](https://github.com/11ty/11ty-website/blob/516faa397a98f8990f3d02eb41e1c99bedfab9cf/.eleventy.js#L105)

#### Stats Only

{% addedin "Image 1.1.0" %} Skips all image processing to return metadata. Doesn’t read files, doesn’t write files. Use this as an alternative to the separate `statsSync*` functions—this will use in-memory cache and de-duplicate requests.

* `statsOnly: false` (default)
* `statsOnly: true`

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


### Change the default Hash length

{% addedin "1.0.0" %} You can customize the length of the default filename format hash by using the `hashLength` property.

```js
const Image = require("@11ty/eleventy-img");

await Image("./test/bio-2017.jpg", {
  hashLength: 8 // careful, don’t make it _too_ short!
});
```

## Use this in your templates

### Asynchronous Usage

{% callout "info" %}The examples below use a <a href="/docs/languages/nunjucks/#asynchronous-shortcodes">Nunjucks</a> <code>async</code> shortcode (different from the traditional shortcode configuration method). The <a href="/docs/languages/javascript/#asynchronous-javascript-template-functions">JavaScript</a> and <a href="/docs/languages/liquid/#asynchronous-shortcodes">Liquid</a> template engines also work here and are asynchronous without additional changes. Note that <a href="https://mozilla.github.io/nunjucks/templating.html#macro">Nunjucks macros cannot use asynchronous shortcodes</a>. If you use macros, use Synchronous shortcodes described below.{% endcallout %}

<seven-minute-tabs>
  <div role="tablist" aria-label="Easy or DIY mode chooser">
    Choose one:
    <a href="#filter-easy" id="filter-easy-btn" role="tab" aria-controls="filter-easy" aria-selected="true">We generate the HTML</a>
    <a href="#filter-diy-img" id="filter-diy-img-btn" role="tab" aria-controls="filter-diy-img" aria-selected="false">Do it yourself: &lt;img&gt;</a>
    <a href="#filter-diy-picture" id="filter-diy-picture-btn" role="tab" aria-controls="filter-diy-picture" aria-selected="false">Do it yourself: &lt;picture&gt;</a>
  </div>
  <div id="filter-easy" role="tabpanel" aria-labelledby="filter-easy-btn">

{% addedin "Image 0.7.2" %}The `generateHTML` function is available in Eleventy Image v0.7.2 or higher.

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file! If one already exists, copy the content of the above into your existing `module.exports` function.{% endcallout %}

{% addedin "Image 0.7.3" %}You can use the `whitespaceMode` option to strip the whitespace from the output of the `<picture>` element (a must-have for use in markdown files).

```js
async function imageShortcode(src, alt, sizes) {
  // […]
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

// Don’t copy and paste this code block!
// Some code from the above example was removed for brevity.
```

  </div>
  <div id="filter-diy-img" role="tabpanel" aria-labelledby="filter-diy-img-btn">

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt) {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [600],
    formats: ["jpeg"]
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file! If one already exists, copy the content of the above into your existing `module.exports` function.{% endcallout %}

  </div>
  <div id="filter-diy-picture" role="tabpanel" aria-labelledby="filter-diy-picture-btn">

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw") {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ['webp', 'jpeg']
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file! If one already exists, copy the content of the above into your existing `module.exports` function.{% endcallout %}

  </div>
</seven-minute-tabs>

{% callout "info", "md" %}Read more about the [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) and [`decoding`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) HTML attributes.{% endcallout %}

Now you can use it in your templates:

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#shortcode-njk" id="shortcode-njk-btn" role="tab" aria-controls="shortcode-njk" aria-selected="true">Nunjucks</a>
    <a href="#shortcode-liquid" id="shortcode-liquid-btn" role="tab" aria-controls="shortcode-liquid" aria-selected="false">Liquid</a>
    <a href="#shortcode-11tyjs" id="shortcode-11tyjs-btn" role="tab" aria-controls="shortcode-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="shortcode-njk" role="tabpanel" aria-labelledby="shortcode-njk-btn">
    {% codetitle "sample.njk" %}
{%- highlight "html" %}{% raw %}
{% image "./src/images/cat.jpg", "photo of my cat" %}
{% image "./src/images/cat.jpg", "photo of my cat", "(min-width: 30em) 50vw, 100vw" %}
{% endraw %}{% endhighlight %}
    <p>The comma between arguments is <strong>required</strong> in Nunjucks templates.</p>
  </div>
  <div id="shortcode-liquid" role="tabpanel" aria-labelledby="shortcode-liquid-btn">
    {% codetitle "sample.liquid" %}
{%- highlight "html" %}{% raw %}
{% image "./src/images/cat.jpg", "photo of my cat" %}
{% image "./src/images/cat.jpg", "photo of my cat", "(min-width: 30em) 50vw, 100vw" %}
{% endraw %}{% endhighlight %}
    <p>The comma between arguments is <strong>optional</strong> in Liquid templates.</p>
  </div>
  <div id="shortcode-11tyjs" role="tabpanel" aria-labelledby="shortcode-11tyjs-btn">
    {% codetitle "sample.11ty.js" %}
{%- highlight "js" %}{% raw %}
module.exports = function() {
  return `<h1>${await this.image("./src/images/cat.jpg", "photo of my cat", "(min-width: 30em) 50vw, 100vw")}</h1>`;
};
{% endraw %}{% endhighlight %}
  </div>
</seven-minute-tabs>

And you’ll have the appropriate HTML generated for you (based on your specified Image options).

### Synchronous Usage

Use `Image.statsSync` to get the metadata of a source even if the image generation is not finished yet:

{% codetitle ".eleventy.js" %}

```js
const Image = require("@11ty/eleventy-img");
function imageShortcode(src, cls, alt, sizes, widths) {
  let options = {
    widths: widths,
    formats: ['jpeg'],
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
  // get metadata even the images are not fully generated
  let metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksShortcode("myImage", imageShortcode);
}
```

## Advanced Usage

### Caching

#### In-Memory Cache

{% addedin "Image 0.7.0" %} To prevent duplicate work and improve build performance, repeated calls to the same source image (remote or local) with the same options will return a cached results object. If a request in-progress, the pending promise will be returned. This in-memory cache is maintained across builds in watch/serve mode. If you quit Eleventy, the in-memory cache will be lost.

Images will be regenerated (and the cache ignored) if:

* The source image file size changes (on local image files)
* The [cache asset](/docs/plugins/cache/) duration expires (for remote images).

You can disable this behavior by using the `useCache` boolean option:

* `useCache: true` (default)
* `useCache: false` to bypass the cache and generate a new image every time.

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

#### Disk Cache

{% addedin "Image 1.0.0" %} Eleventy will skip processing files that are unchanged and already exist in the output directory. This requires the built-in hashing algorithm and is not yet supported with custom filenames. More background at <a href="https://github.com/11ty/eleventy-img/issues/51">Issue #51</a>.

New tip: [**Re-use and persist the disk cache across Netlify builds**](https://github.com/11ty/demo-eleventy-img-netlify-cache)

### Dry-Run

{% addedin "Image 0.7.0" %} If you want to try it out and not write any files (useful for testing), use the `dryRun` option.

* `dryRun: false` (default)
* `dryRun: true`

### Change Global Plugin Concurrency

```js
const Image = require("@11ty/eleventy-img");
Image.concurrency = 4; // default is 10
```

### Advanced control of Sharp image processor

[Extra options to pass to the Sharp constructor](https://sharp.pixelplumbing.com/api-constructor#parameters) or the [Sharp image format converter for webp](https://sharp.pixelplumbing.com/api-output#webp), [png](https://sharp.pixelplumbing.com/api-output#png), [jpeg](https://sharp.pixelplumbing.com/api-output#jpeg), or [avif](https://sharp.pixelplumbing.com/api-output#avif).

* `sharpOptions: {}` {% addedin "Image 0.4.0" %}
* `sharpWebpOptions: {}` {% addedin "Image 0.4.2" %}
* `sharpPngOptions: {}` {% addedin "Image 0.4.2" %}
* `sharpJpegOptions: {}` {% addedin "Image 0.4.2" %}
* `sharpAvifOptions: {}` {% addedin "Image 0.6.0" %}