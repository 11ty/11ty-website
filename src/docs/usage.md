---
eleventyNavigation:
  parent: Getting Started
  key: Command Line Usage
  order: 1
---
# Command Line Usage

These examples assume [local project installation](/docs/getting-started/) instead of [global installation](/docs/global-installation/).

```bash
# Searches the current directory, outputs to ./_site
npx @11ty/eleventy
```

{% callout "warn" %}Make sure you always use <code>npx @11ty/eleventy</code> (including the <code>@11ty/</code> prefix!). If you do not include the <code>@11ty/</code> prefix and you don’t already have Eleventy installed (locally or globally), it will execute the <strong><a href="https://www.npmjs.com/package/eleventy">wrong package</a></strong>. For consistency and accuracy always use <code>npx @11ty/eleventy</code>.{% endcallout %}

If you’re using a global install of Eleventy, remove `npx @11ty/` from the beginning of each command, like so:

```bash
# Global installation
eleventy
```

```bash
# `npx @11ty/eleventy` is the same as:
npx @11ty/eleventy --input=. --output=_site
```

Read more about [`--input`](/docs/config/#input-directory) and [`--output`](/docs/config/#output-directory). Note that setting the input and output directories via a [config](/docs/config/) file is more reliable, especially when using tools like [`netlify dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment).

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](/docs/permalinks/).

```bash
# Use only a subset of template types
npx @11ty/eleventy --formats=md,html,ejs
```

```bash
# Find out the most up-to-date list of commands (there are more)
npx @11ty/eleventy --help
```

### Re-run Eleventy when you save

```bash
# Boot up a Browsersync web server to apply changes and
# refresh automatically. We’ll also --watch for you.
npx @11ty/eleventy --serve
```

```bash
# Change the web server’s port—use localhost:8081
npx @11ty/eleventy --serve --port=8081
```

{% callout "info" %}<strong>Important Note</strong>: <a href="https://browsersync.io/docs/#requirements">Browsersync requires a <code>&lt;body&gt;</code> tag in your template</a> for live-reload to work properly.{% endcallout %}

```bash
# Automatically run when input template files change.
# Useful if you have your own web server.
npx @11ty/eleventy --watch
```

### `--quiet` if the Output is Too Noisy

```bash
# Shhhhh—Don’t log so much to the console
npx @11ty/eleventy --quiet
```

### `--dryrun` to do a Little Testing

Runs without writing to the file system. Useful when [debugging](/docs/debugging/).

```bash
# Run Eleventy but don’t write any files
npx @11ty/eleventy --dryrun
```

### `--config` to Change the Config file name

```bash
# Override the default eleventy project config filename (.eleventy.js)
npx @11ty/eleventy --config=myeleventyconfig.js
```

### `--to` can output JSON {% addedin "1.0.0" %}

```bash
# Output a JSON structure (does not write to the file system)
npx @11ty/eleventy --to=json

# Output a Newline Deliminated JSON structure (does not write to the file system)
npx @11ty/eleventy --to=ndjson

# Default behavior (Output to file system)
npx @11ty/eleventy --to=fs
```

Read more about [ndjson](http://ndjson.org/).


### `--incremental` for partial [incremental builds](/docs/usage/incremental/)

```bash
# Repeat builds only operate on files that have changed
npx @11ty/eleventy --incremental
```

Read more about [incremental builds](/docs/usage/incremental/).

### Using the Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

```bash
# Parse and write Markdown to HTML, respecting directory structure.
npx @11ty/eleventy --input=. --output=. --formats=md
```

{% callout "warn" %}Careful with <code>--formats=html</code> here! If you run eleventy more than once, it’ll try to process the output files too. Read more at the <a href="/docs/languages/html/#using-the-same-input-and-output-directories">HTML template docs</a>.{% endcallout %}

<!--
### Example: Process a Single File

```bash
npx @11ty/eleventy --input=README.md --output=.
```

Writes to `./README/index.html`.
-->
