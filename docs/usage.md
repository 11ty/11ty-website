---
subtitle: Usage
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

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](docs/permalinks/).

```bash
# Automatically run when input template files change.
eleventy --watch
```

```bash
# Boot up a browsersync web server to automatically apply changes.
# We’ll --watch for you automatically.
eleventy --serve
```

```bash
# Override the default eleventy project config filename (.eleventy.js)
eleventy --config=myeleventyconfig.js
```

```bash
# Use only a subset of template types
eleventy --formats=md,html,ejs
```

```bash
# Find out the most up-to-date list of commands (there are more)
eleventy --help
```

### Example: Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

```bash
# Parse and write Markdown to HTML, respecting directory structure.
eleventy --input=. --output=. --formats=md
```

<div class="elv-callout elv-callout-warn">Careful with <code>--formats=html</code> here! If you run eleventy more than once, it’ll try to process the output files too. Read more at <a href="/docs/pitfalls/">Common Pitfalls</a>.

<!-- 
### Example: Process a Single File

```bash
eleventy --input=README.md --output=.
```

Writes to `./README/index.html`.
-->