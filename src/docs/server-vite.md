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

{% include "snippets/serve/vite.njk" %}

<details>
<summary>Expand for full list of options</summary>

View the [full list of Vite Configuration options](https://vitejs.dev/config/).

{% include "snippets/serve/vite-options.njk" %}

See the full list of [`serverOptions` on the Dev Server documentation](/docs/dev-server/).

</details>
