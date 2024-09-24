---
eleventyNavigation:
  parent: Getting Started
  key: Command Line Usage
  order: 1
---

# Command Line Usage

{% callout "info", "md-block", "Prerequisites" %}
1. Eleventy runs in a Terminal application. [_Well, wait—what is a Terminal?_](/docs/terminal-window/)
1. Have you already [installed Eleventy](/docs/#step-2-install-eleventy)?
{% endcallout %}

Here’s the first command you can enter in your Terminal application to run Eleventy:

{% set usageCode %}
# Searches the current directory, outputs to ./_site
npx @11ty/eleventy

# `npx @11ty/eleventy` is the same as:
npx @11ty/eleventy --input=. --output=_site
{% endset %}
<script type="module" src="/js/seven-minute-tabs.js"></script>
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-npm" role="tabpanel">{% highlight "bash" %}{{ usageCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-yarn" role="tabpanel">{% highlight "bash" %}{{ usageCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

Read more about [`--input`](/docs/config/#input-directory) and [`--output`](/docs/config/#output-directory). Note that setting the input and output directories via [config](/docs/config/) file is preferred.

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](/docs/permalinks/).

{% set usageFormatsCode %}
# Use only a subset of template types
npx @11ty/eleventy --formats=md,html,ejs

# Find out the most up-to-date list of commands (there are more)
npx @11ty/eleventy --help
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-formats-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-formats-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-formats-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-formats-npm" role="tabpanel">{% highlight "bash" %}{{ usageFormatsCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-formats-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageFormatsCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-formats-yarn" role="tabpanel">{% highlight "bash" %}{{ usageFormatsCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

### Re-run Eleventy when you save

{% set usageServeCode %}
# Add a web server to apply changes and
# refresh automatically. We’ll also --watch for you.
npx @11ty/eleventy --serve

# Change the web server’s port—use localhost:8081
npx @11ty/eleventy --serve --port=8081

# Watch and re-run when files change, without the web server.
npx @11ty/eleventy --watch
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-serve-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-serve-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-serve-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-serve-npm" role="tabpanel">{% highlight "bash" %}{{ usageServeCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-serve-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageServeCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-serve-yarn" role="tabpanel">{% highlight "bash" %}{{ usageServeCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

### `--quiet` if the Output is Too Noisy

{% set usageQuietCode %}
# Shhhhh—Don’t log so much to the console
npx @11ty/eleventy --quiet
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-quiet-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-quiet-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-quiet-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-quiet-npm" role="tabpanel">{% highlight "bash" %}{{ usageQuietCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-quiet-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageQuietCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-quiet-yarn" role="tabpanel">{% highlight "bash" %}{{ usageQuietCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

### `--dryrun` to do a Little Testing

Runs without writing to the file system. Useful when [debugging](/docs/debugging/).

{% set usageDryCode %}
# Run Eleventy but don’t write any files
npx @11ty/eleventy --dryrun
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-dry-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-dry-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-dry-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-dry-npm" role="tabpanel">{% highlight "bash" %}{{ usageDryCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-dry-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageDryCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-dry-yarn" role="tabpanel">{% highlight "bash" %}{{ usageDryCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

### `--config` to Change the Config file name

{% set usageCfgCode %}
# Override the default eleventy project config filename (.eleventy.js)
npx @11ty/eleventy --config=myeleventyconfig.js
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-cfg-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-cfg-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-cfg-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-cfg-npm" role="tabpanel">{% highlight "bash" %}{{ usageCfgCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-cfg-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageCfgCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-cfg-yarn" role="tabpanel">{% highlight "bash" %}{{ usageCfgCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

Read more about [Configuration files](/docs/config.md).

### `--to` can output JSON {% addedin "1.0.0" %}

{% set usageJsonCode %}
# Output a JSON structure (does not write to the file system)
npx @11ty/eleventy --to=json

# Output a Newline Deliminated JSON structure (does not write to the file system)
npx @11ty/eleventy --to=ndjson

# Default behavior (Output to file system)
npx @11ty/eleventy --to=fs
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-json-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-json-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-json-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-json-npm" role="tabpanel">{% highlight "bash" %}{{ usageJsonCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-json-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageJsonCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-json-yarn" role="tabpanel">{% highlight "bash" %}{{ usageJsonCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

Read more about [ndjson](https://github.com/ndjson/ndjson-spec).

### `--incremental` for Partial Incremental Builds

{% set usageIncrementalCode %}
# *Repeat* builds only operate on files that have changed
npx @11ty/eleventy --watch --incremental
npx @11ty/eleventy --serve --incremental

# Skip the initial full build with `--ignore-initial`
npx @11ty/eleventy --serve --incremental --ignore-initial
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-inc-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-inc-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-inc-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-inc-npm" role="tabpanel">{% highlight "bash" %}{{ usageIncrementalCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-inc-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageIncrementalCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-inc-yarn" role="tabpanel">{% highlight "bash" %}{{ usageIncrementalCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

Read more about [incremental builds](/docs/usage/incremental/).

### `--ignore-initial` to run Eleventy without an Initial Build {% addedin "2.0.0-canary.25" %}

Be wary of any file changes that happened while Eleventy wasn’t running!

{% set usageInitialCode %}
# Don’t build when Eleventy starts, only build on file changes
npx @11ty/eleventy --watch --ignore-initial
npx @11ty/eleventy --serve --ignore-initial

# Works great with Incremental
npx @11ty/eleventy --serve --incremental --ignore-initial
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-initial-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-initial-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-initial-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-initial-npm" role="tabpanel">{% highlight "bash" %}{{ usageInitialCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-initial-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageInitialCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-initial-yarn" role="tabpanel">{% highlight "bash" %}{{ usageInitialCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

### Using the Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

{% set usageSameDirsCode %}
# Parse and write Markdown to HTML, respecting directory structure.
npx @11ty/eleventy --input=. --output=. --formats=md
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right tabs-firstonly" persist sync>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-same-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-same-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-same-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-same-npm" role="tabpanel">{% highlight "bash" %}{{ usageSameDirsCode | packageManagerCodeTransform("npm") }}{% endhighlight %}</div>
	<div id="usage-same-pnpm" role="tabpanel">{% highlight "bash" %}{{ usageSameDirsCode | packageManagerCodeTransform("pnpm") }}{% endhighlight %}</div>
	<div id="usage-same-yarn" role="tabpanel">{% highlight "bash" %}{{ usageSameDirsCode | packageManagerCodeTransform("yarn") }}{% endhighlight %}</div>
</seven-minute-tabs>

{% callout "warn" %}Careful with <code>--formats=html</code> here! If you run eleventy more than once, it’ll try to process the output files too. Read more at the <a href="/docs/languages/html/#using-the-same-input-and-output-directories">HTML template docs</a>.{% endcallout %}

<!--
### Example: Process a Single File

```bash
npx @11ty/eleventy --input=README.md --output=.
```

Writes to `./README/index.html`.
-->
