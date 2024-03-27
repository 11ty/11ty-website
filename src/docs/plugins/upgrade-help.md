---
eleventyNavigation:
  key: Upgrade Helper
  order: 1
  excerpt: A plugin to help you upgrade your Eleventy project between major version releases.
---

# Major Version Upgrade Helper

{% tableofcontents %}

- [Source code on GitHub](https://github.com/11ty/eleventy-upgrade-help)
- [Sample project using the Upgrade Helper plugin](https://github.com/11ty/demo-eleventy-upgrade-help)

## Usage

### <span class="numberflag"><span class="sr-only">Step</span> 1</span> Upgrade Eleventy

Upgrade your project’s version of Eleventy with `npm` _before_ using this helper plugin.

```bash
# Upgrading from Eleventy v0 to v1
npm install @11ty/eleventy@1

# Or, upgrading from Eleventy v1 to v2
npm install @11ty/eleventy@2
```

### <span class="numberflag"><span class="sr-only">Step</span> 2</span> Install the Helper

Then, install the helper plugin. The major version will match the version of Eleventy that you’re upgrading to.

```bash
# Upgrading from Eleventy v0 to v1
npm install @11ty/eleventy-upgrade-help@1

# Or, upgrading from Eleventy v1 to v2
npm install @11ty/eleventy-upgrade-help@2
```

### <span class="numberflag"><span class="sr-only">Step</span> 3</span> Add to Configuration File

Add to your configuration file (probably `.eleventy.js` or `eleventy.config.js`):

{% codetitle ".eleventy.js" %}

```js
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = function (eleventyConfig) {
	// If you have other `addPlugin` calls, it’s important that UpgradeHelper is added last.
	eleventyConfig.addPlugin(UpgradeHelper);
};
```

### <span class="numberflag"><span class="sr-only">Step</span> 4</span> Run your Build

Run your usual build command (e.g. `npm run build`) and pay attention to the output.
Address any violations and warnings.

### <span class="numberflag"><span class="sr-only">Step</span> 5</span> Remove the plugin

Once you’ve removed all of the violations/warnings from your output, run `npm uninstall @11ty/eleventy-upgrade-help` to remove the plugin and delete the plugin code from your Eleventy configuration file.
