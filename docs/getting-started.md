---
subtitle: Getting Started
menuSectionName: docs-getting-started
submenuSortOrder:
  - usage
  - local-installation
  - starter
  - debugging
  - tutorials
  - quicktips
tags:
  - docs
---
# {{ subtitle }}

Eleventy is [available on npm](https://www.npmjs.com/package/@11ty/eleventy) and **requires version 8 of [Node.js](https://nodejs.org/) or higher.**

_Don’t include `~ $` or `~/eleventy-sample $` when you run these commands (you can’t copy and paste that text anyway)._

## Step 1: Make a Project Directory

Make a directory with your project in it.

<div data-preprefix-cmdhomedir="all">

```bash
mkdir eleventy-sample
cd eleventy-sample
```

</div>

You’re now in your new project’s directory.

## Step 2: Install Eleventy

### Create a package.json

Installing Eleventy into our project requires a `package.json` file. Let’s create it with [`npm init`](https://docs.npmjs.com/cli/init). The `-y` parameter tells npm to skip all the questions and just use the defaults.

<div data-preprefix-eleventysample="first">

```bash
npm init -y
```

</div>

### Install Eleventy into package.json

Now we can install and save Eleventy into our project’s `package.json` by running:

<div data-preprefix-eleventysample="first">

```bash
npm install --save-dev @11ty/eleventy
```

</div>

Installing locally is preferred to [global installation](/docs/global-installation/).

## Step 3: Run Eleventy

We can use npx to run our local project version’s version of Eleventy. Let’s make sure our installation went okay and check what version we’re using:

<div data-preprefix-eleventysample="first">

```bash
npx @11ty/eleventy --version
{% latestVersion versions, config, "" %}
```

</div>

Do you see `{% latestVersion versions, config, "" %}`? Good! Now we can run Eleventy for real:

<div data-preprefix-eleventysample="first">

```bash
npx @11ty/eleventy
Processed 0 files in 0.02 seconds
```

</div>

This makes sense—we have an empty folder with no templates inside.

## Step 4: Create some templates

Let’s run two commands to create two new template files.

<div data-preprefix-eleventysample="all">

```bash
echo '<!doctype html><html><head><title>Page title</title></head><body><p>Hi</p></body></html>' > index.html
echo '# Page header' > README.md
```

</div>

We’ve now created an HTML template and a markdown template. Let’s run Eleventy again:

<div data-preprefix-eleventysample="first">

```bash
npx @11ty/eleventy
Writing _site/README/index.html from ./README.md
Writing _site/index.html from ./index.html
Processed 2 files in 0.10 seconds
```

</div>

This will compile any content templates in the current directory or subdirectories into the output folder (defaults to `_site`).

## Step 5: Look at your templates

Use `--serve` to start up a hot-reloading local web server.

<div data-preprefix-eleventysample="first">

```bash
npx @11ty/eleventy --serve
Writing _site/README/index.html from ./README.md
Writing _site/index.html from ./index.html
Processed 2 files in 0.10 seconds
Watching…

 (some output truncated)

[Browsersync] Serving files from: _site
```

</div>

Go to `http://localhost:8080/` or `http://localhost:8080/README/` to see your Eleventy site live! Make a change to your template files and save them—Eleventy using BrowserSync will refresh the browser with your new changes automatically.

Congratulations—you made something with Eleventy! Now put it to work with templating syntax, front matter, and data files.

**➡ Continue: [Command Line Usage](/docs/usage/)**

