---
subtitle: Command Line Usage
tags:
	- docs-getting-started
---
# {{ subtitle }}

These examples assume [local project installation](/docs/getting-started/) instead of [global installation](/docs/global-installation/).

```bash
# Searches the current directory, outputs to ./_site
npx @11ty/eleventy
```

If you’re using a global install of Eleventy, remove `npx @11ty/` from the beginning of each command, like so:

```bash
# Global installation
eleventy
```

<div data-preprefix-npxeleventy="last">

```bash
# `npx @11ty/eleventy` is the same as:
--input=. --output=_site
```

Read more about [`--input`](/docs/config/#input-directory) and [`--output`](/docs/config/#output-directory).

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](/docs/permalinks/).

```bash
# Use only a subset of template types
--formats=md,html,ejs
```

```bash
# Find out the most up-to-date list of commands (there are more)
--help
```

### Re-run Eleventy when you save

```bash
# Boot up a Browsersync web server to apply changes and
# refresh automatically. We’ll also --watch for you.
--serve
```

```bash
# Change the web server’s port—use localhost:8081
--serve --port=8081
```

{% callout "info" %}<strong>Important Note</strong>: <a href="https://browsersync.io/docs/#requirements">Browsersync requires a <code>&lt;body&gt;</code> tag in your template</a> for live-reload to work properly.{% endcallout %}

```bash
# Automatically run when input template files change.
# Useful if you have your own web server.
--watch
```

### `--quiet` if the Output is Too Noisy

```bash
# Shhhhh—Don’t log so much to the console
--quiet
```

### `--dryrun` to do a Little Testing

Runs without writing to the file system. Useful when [debugging](/docs/debugging/).

```bash
# Run Eleventy but don’t write any files
--dryrun
```

### `--config` to Change the Config file name

```bash
# Override the default eleventy project config filename (.eleventy.js)
--config=myeleventyconfig.js
```

## Examples

### Using the Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

```bash
# Parse and write Markdown to HTML, respecting directory structure.
--input=. --output=. --formats=md
```

<div class="elv-callout elv-callout-warn">Careful with <code>--formats=html</code> here! If you run eleventy more than once, it’ll try to process the output files too. Read more at the <a href="/docs/languages/html/#using-the-same-input-and-output-directories">HTML template docs</a>.

<!-- 
### Example: Process a Single File

```bash
--input=README.md --output=.
```

Writes to `./README/index.html`.
-->

</div>
