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

If you’re using a global install of Eleventy, remove `npx @11ty/` from the beginning of each command, like so:

```bash
# Global installation
eleventy
```

{% codewithprompt "npxeleventy", "last" %}
# `npx @11ty/eleventy` is the same as:
--input=. --output=_site
{% endcodewithprompt %}

Read more about [`--input`](/docs/config/#input-directory) and [`--output`](/docs/config/#output-directory).

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](/docs/permalinks/).

{% codewithprompt "npxeleventy", "last" %}
# Use only a subset of template types
--formats=md,html,ejs
{% endcodewithprompt %}

{% codewithprompt "npxeleventy", "last" %}
# Find out the most up-to-date list of commands (there are more)
--help
{% endcodewithprompt %}

### Re-run Eleventy when you save

{% codewithprompt "npxeleventy", "last" %}
# Boot up a Browsersync web server to apply changes and
# refresh automatically. We’ll also --watch for you.
--serve
{% endcodewithprompt %}

{% codewithprompt "npxeleventy", "last" %}
# Change the web server’s port—use localhost:8081
--serve --port=8081
{% endcodewithprompt %}

{% callout "info" %}<strong>Important Note</strong>: <a href="https://browsersync.io/docs/#requirements">Browsersync requires a <code>&lt;body&gt;</code> tag in your template</a> for live-reload to work properly.{% endcallout %}

{% codewithprompt "npxeleventy", "last" %}
# Automatically run when input template files change.
# Useful if you have your own web server.
--watch
{% endcodewithprompt %}

### `--quiet` if the Output is Too Noisy

{% codewithprompt "npxeleventy", "last" %}
# Shhhhh—Don’t log so much to the console
--quiet
{% endcodewithprompt %}

### `--dryrun` to do a Little Testing

Runs without writing to the file system. Useful when [debugging](/docs/debugging/).

{% codewithprompt "npxeleventy", "last" %}
# Run Eleventy but don’t write any files
--dryrun
{% endcodewithprompt %}

### `--config` to Change the Config file name

{% codewithprompt "npxeleventy", "last" %}
# Override the default eleventy project config filename (.eleventy.js)
--config=myeleventyconfig.js
{% endcodewithprompt %}

## Examples

### Using the Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

{% codewithprompt "npxeleventy", "last" %}
# Parse and write Markdown to HTML, respecting directory structure.
--input=. --output=. --formats=md
{% endcodewithprompt %}

<div class="elv-callout elv-callout-warn">Careful with <code>--formats=html</code> here! If you run eleventy more than once, it’ll try to process the output files too. Read more at the <a href="/docs/languages/html/#using-the-same-input-and-output-directories">HTML template docs</a>.

<!-- 
### Example: Process a Single File

{% codewithprompt "npxeleventy", "last" %}
--input=README.md --output=.
{% endcodewithprompt %}

Writes to `./README/index.html`.
-->
