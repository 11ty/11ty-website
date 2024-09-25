---
eleventyNavigation:
  key: Watch and Serve
  parent: Configuration
  order: 11
---

# Watch and Serve Configuration

{% tableofcontents %}

<div id="browsersync"></div>
<div id="swap-back-to-browsersync"></div>

## Eleventy Dev Server {% addedin "2.0.0" %}

Starting in Eleventy v2.0, we bundle a [dedicated Development Server](/docs/dev-server/). The previous development server used [Browsersync, which you can still use with Eleventy if you’d like](/docs/server-browsersync/).

## Add Your Own Watch Targets {% addedin "0.10.0" %}

The `addWatchTarget` config method allows you to manually add a file or directory for Eleventy to watch. When the file or the files in this directory change Eleventy will trigger a build. This is useful if Eleventy is not directly aware of any external file dependencies.

{% set codeContent %}
export default function(eleventyConfig) {
	eleventyConfig.addWatchTarget("./src/scss/");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

**Advanced usage note:** This works with [`chokidar` under the hood](https://github.com/paulmillr/chokidar#api) and chokidar uses [`picomatch` for globbing](https://github.com/micromatch/picomatch):

- Both `**/*.(png|jpeg)` and `**/*.{png,jpeg}` are valid globs to matches any `png` or `jpeg` file in your project.

## Ignore Watching Files

### `.gitignore`

Eleventy will ignore changes to files or folders listed in your `.gitignore` file by default, [unless `setUseGitIgnore` is turned off](/docs/ignores/#opt-out-of-using-.gitignore).

### Configuration API {% addedin "2.0.0-canary.18" %}

Previously, [the configuration API ignores for template processing](/docs/ignores/#configuration-api) were also used as ignores for watching (e.g. `eleventyConfig.ignores.add("README.md")`).

New in {{ "2.0.0-canary.18" | coerceVersion }}, watch target ignores now have their own dedicated API:

{% set codeContent %}
export default function(eleventyConfig) {
	// Do not rebuild when README.md changes (You can use a glob here too)
	eleventyConfig.watchIgnores.add("README.md");

	// Or delete entries too
	eleventyConfig.watchIgnores.delete("README.md");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

The `watchIgnores` Set starts with a default `**/node_modules/**` entry.

## Watch JavaScript Dependencies {% addedin "0.7.0" %}

When in `--watch` mode, Eleventy will spider the dependencies of your [JavaScript Templates](/docs/languages/javascript/) (`.11ty.js`), [JavaScript Data Files](/docs/data-js/) (`.11tydata.js` or `_data/**/*.js`), or Configuration File (usually `eleventy.config.js`) to watch those files too. Files in `node_modules` directories are ignored. This feature is _enabled by default_.

{% set codeContent %}
export default function(eleventyConfig) {
	// Enabled by default
	eleventyConfig.setWatchJavaScriptDependencies(false);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Add delay before re-running {% addedin "0.11.0" %}

A hardcoded amount of time Eleventy will wait before triggering a new build when files have changes during `--watch` or `--serve` modes. You probably won’t need this, but is useful in some edge cases with other task runners (Gulp, Grunt, etc).

{% set codeContent %}
export default function(eleventyConfig) {
	// default is 0
	eleventyConfig.setWatchThrottleWaitTime(100); // in milliseconds
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Advanced `chokidar` Configuration

Advanced [`chokidar` options](https://github.com/paulmillr/chokidar) can be defined using the `setChokidarConfig` configuration API method:

{% set codeContent %}
export default function(eleventyConfig) {
	eleventyConfig.setChokidarConfig({
		usePolling: true,
		interval: 500,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "warn", "md" %}If you’re using [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/) and your project exists _outside_ of your home directory (`~`), you will likely want to use the `usePolling` feature to ensure watching works correctly. This is a WSL limitation.{% endcallout %}
