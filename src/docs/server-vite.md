---
eleventyNavigation:
  key: Vite
  parent: Watch and Serve
---

# Vite {% indieavatar "https://vitejs.dev/" %}

{% tableofcontents %}

- [`eleventy-plugin-vite` on GitHub](https://github.com/11ty/eleventy-plugin-vite)

A plugin to use [Vite](https://vitejs.dev/) with Eleventy 2.0+.

- Runs Vite as Middleware in [Eleventy Dev Server](/docs/dev-server/) (try with Eleventy’s `--incremental`)
- Runs Vite build to postprocess your Eleventy build output

<div class="youtube-related">
  {%- youtubeEmbed "f0LsgyPV7j0", "Eleventy Vite Plugin (Weekly №5)", "96" -%}
</div>

## Related

- [`slinkity`](https://slinkity.dev/) by @Holben888: a much deeper and more comprehensive integration with Vite! Offers partial hydration and can use shortcodes to render framework components in Eleventy!
- [`vite-plugin-eleventy`](https://www.npmjs.com/package/vite-plugin-eleventy) by @Snugug: uses Eleventy as Middleware in Vite (instead of the post-processing approach used here)

## Installation

```
npm install @11ty/eleventy-plugin-vite
```

```js
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyVitePlugin);
};
```

<details>
<summary>Expand for full list of options</summary>

View the [full list of Vite Configuration options](https://vitejs.dev/config/).

```js
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		tempFolderName: ".11ty-vite", // Default name of the temp folder

		// Options passed to the Eleventy Dev Server
		// e.g. domdiff, enabled, etc.

		// Added in Vite plugin v2.0.0
		serverOptions: {},

		// Defaults are shown:
		viteOptions: {
			clearScreen: false,
			appType: "mpa", // New in v2.0.0

			server: {
				mode: "development",
				middlewareMode: true,
			},

			build: {
				mode: "production",
			},

			// New in v2.0.0
			resolve: {
				alias: {
					// Allow references to `node_modules` folder directly
					"/node_modules": path.resolve(".", "node_modules"),
				},
			},
		},
	});
};
```

See the full list of [`serverOptions` on the Dev Server documentation](/docs/dev-server/).

</details>
