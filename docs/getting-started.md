---
subtitle: Getting Started
menuSectionName: docs-getting-started
submenuSortOrder:
  - usage
  - local-installation
  - debugging
  - tutorials
  - quicktips
  - samples
tags:
  - docs
---
# {{ subtitle }}

Requires version 8 of Node.js or higher.

```bash
npm install -g @11ty/eleventy
```

Available [on npm](https://www.npmjs.com/package/@11ty/eleventy). Previously known as [`eleventy-cli`](https://www.npmjs.com/package/eleventy-cli). Read more about [local installation.](/docs/local-installation/)

## Run Eleventy

Make a directory with your project in it. Don’t include `~ $` when you run these commands.

```bash
~ $ mkdir eleventy-sample
~ $ cd eleventy-sample
```

Run `eleventy`:

```bash
~/eleventy-sample $ eleventy
Wrote 0 files in 0.02 seconds
```

Makes sense—this is an empty folder with no templates inside. So, let’s make a few templates.

```bash
~/eleventy-sample $ echo '<!doctype html><title>Page title</title>' > index.html
~/eleventy-sample $ echo '# Page header' > README.md
```

We’ve now created an HTML template and a markdown template. Now run `eleventy` again:

```bash
~/eleventy-sample $ eleventy
Writing _site/README/index.html from ./README.md
Writing _site/index.html from ./index.html
Wrote 2 files in 0.10 seconds
```

This will compile any content templates in the current directory or subdirectories into the output folder (defaults to `_site`). Congratulations—you made something with Eleventy! Now put it to work with templating syntax, front matter, and data files.

**➡ Continue: [Command Line Usage](/docs/usage/)**

