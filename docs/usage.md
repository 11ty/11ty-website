---
subtitle: Command Line Usage
tags:
	- docs-getting-started
---
# Command Line Usage

```bash
# Defaults: searches the current directory, outputs to ./_site
eleventy
 
# Equivalent to
eleventy --input=. --output=_site
```

Read more about [`--input`](/docs/config/#input-directory) and [`--output`](/docs/config/#output-directory).

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](/docs/permalinks/).

```bash
# Use only a subset of template types
eleventy --formats=md,html,ejs
```

```bash
# Find out the most up-to-date list of commands (there are more)
eleventy --help
```

### Run Eleventy when you save

```bash
# Boot up a browsersync web server to apply changes and
# refresh automatically. We’ll also --watch for you.
eleventy --serve
eleventy --serve --port=8081
```

```bash
# Automatically run when input template files change.
# Useful if you have your own web server.
eleventy --watch
```

### `--quiet` if the Output is Too Noisy

```bash
# Shhhhh—Don’t log so much to the console
eleventy --quiet
```

### `--dryrun` to do a Little Testing

Runs without writing to the file system. Useful when [debugging](/docs/debugging/).

```bash
# Run Eleventy but don’t write any files
eleventy --dryrun
```

### `--config` to Change the Config file name

```bash
# Override the default eleventy project config filename (.eleventy.js)
eleventy --config=myeleventyconfig.js
```

## Examples

### Using the Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

```bash
# Parse and write Markdown to HTML, respecting directory structure.
eleventy --input=. --output=. --formats=md
```

<div class="elv-callout elv-callout-warn">Careful with <code>--formats=html</code> here! If you run eleventy more than once, it’ll try to process the output files too. Read more at the <a href="/docs/languages/html/#using-the-same-input-and-output-directories">HTML template docs</a>.

<!-- 
### Example: Process a Single File

```bash
eleventy --input=README.md --output=.
```

Writes to `./README/index.html`.
-->
