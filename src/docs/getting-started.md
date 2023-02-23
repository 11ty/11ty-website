---
eleventyNavigation:
  key: Getting Started
  order: 2
communityLinksKey: getting-started
overrideCommunityLinks: true
---
# Getting Started

Eleventy **requires [Node.js](https://nodejs.org/) version {% latestVersionNodeMinimum versions, config %} or higher.**

You can check whether or not you have Node installed by running `node --version` in a terminal window. ([_Well, wait—what is a Terminal window?_](/docs/terminal-window/))

If the command is not found or it reports a number lower than {% latestVersionNodeMinimum versions, config %}, you will need to [download and install Node.js](https://nodejs.org/en/download/) before moving on to the next step.

## <span class="numberflag"><span class="sr-only">Step</span> 1</span> Make a Project Directory

Create a directory for your project using the `mkdir` command (short for _make directory_):

```bash
mkdir eleventy-sample
```

Now move into that directory with the `cd` command (short for _change directory_):

```bash
cd eleventy-sample
```

## <span class="numberflag"><span class="sr-only">Step</span> 2</span> Install Eleventy

### Create a `package.json`

Installing Eleventy into a project requires a `package.json` file. The `npm` command (provided by Node.js) will create one for you with [`npm init -y`](https://docs.npmjs.com/cli/init). `-y` tells `npm` to use default values and skips the command line questionnaire.

```bash
npm init -y
```

### Install Eleventy

[`@11ty/eleventy` is published on npm](https://www.npmjs.com/package/@11ty/eleventy) and we can install and save it into our project’s `package.json` by running:

```bash
npm install @11ty/eleventy --save-dev
```

_You may also [install Eleventy globally](/docs/global-installation/) but the `package.json` installation method above is recommended._

## <span class="numberflag"><span class="sr-only">Step</span> 3</span> Run Eleventy

We can use the `npx` command (also provided by Node.js) to run our local project's version of Eleventy. Let’s make sure our installation went okay and try to run Eleventy:

```bash
npx @11ty/eleventy
```

Here’s what your command line might look like after you run Eleventy:

<style>
#getting-started-run .highlight-line:last-child,
#getting-started-run .highlight-line:last-child * {
  color: #0dbc79 !important;
}
</style>

{% codewithprompt "eleventysample", "getting-started-run" %}
npx @11ty/eleventy
[11ty] Wrote 0 files in 0.03 seconds ({% latestVersion versions, config %})
{% endcodewithprompt %}

If you see `({% latestVersion versions, config %})` in your output you know you’re using the newest version. However, Eleventy didn’t process any files! This is expected—we have an empty folder with no templates inside.

## <span class="numberflag"><span class="sr-only">Step</span> 4</span> Create some templates

A <dfn>template</dfn> is a content file written in a [format such as Markdown, HTML, Liquid, Nunjucks, and more](/docs/languages/), which Eleventy transforms into a page (or pages) when building our site.

Let’s run two commands to create two new template files.

```bash
echo '<!doctype html><title>Page title</title><p>Hi</p>' > index.html
```

```bash
echo '# Page header' > README.md
```

Alternatively, you can create these using any text editor—just make sure you save them into your project folder and they have the correct file extensions.

After you’ve created an HTML template and a Markdown template, let’s run Eleventy again with the following command:

```bash
npx @11ty/eleventy
```

The output might look like this:

<style>
#getting-started-build .highlight-line:last-child,
#getting-started-build .highlight-line:last-child * {
  color: #0dbc79 !important;
}
</style>

{% codewithprompt "eleventysample", "getting-started-build" %}
npx @11ty/eleventy
[11ty] Writing _site/README/index.html from ./README.md (liquid)
[11ty] Writing _site/index.html from ./index.html (liquid)
[11ty] Wrote 2 files in 0.04 seconds ({% latestVersion versions, config %})
{% endcodewithprompt %}

We’ve compiled our two content templates in the current directory into the output folder (`_site` is the default).

## <span class="numberflag"><span class="sr-only">Step</span> 5</span> Gaze upon your templates

Use `--serve` to start up a hot-reloading local web server.

```bash
npx @11ty/eleventy --serve
```

Your command line might look something like:

<style>
#getting-started-serve .highlight-line:first-child + br + .highlight-line + br + .highlight-line + br + .highlight-line,
#getting-started-serve .highlight-line:first-child + br + .highlight-line + br + .highlight-line + br + .highlight-line * {
  color: #0dbc79 !important;
}
#getting-started-serve .highlight-line:first-child + br + .highlight-line + br + .highlight-line + br + .highlight-line + br + .highlight-line + br + .highlight-line,
#getting-started-serve .highlight-line:first-child + br + .highlight-line + br + .highlight-line + br + .highlight-line + br + .highlight-line + br + .highlight-line * {
  color: #4c8bcf !important;
}
</style>

{% codewithprompt "eleventysample", "getting-started-serve" %}
npx @11ty/eleventy --serve
[11ty] Writing _site/index.html from ./index.html (liquid)
[11ty] Writing _site/README/index.html from ./README.md (liquid)
[11ty] Wrote 2 files in 0.04 seconds (v2.0.0)
[11ty] Watching…
[11ty] Server at http://localhost:8080/
{% endcodewithprompt %}

Open `http://localhost:8080/` or `http://localhost:8080/README/` in your favorite web browser to see your Eleventy site live! When you save your template files—Eleventy will refresh the browser with your new changes automatically!

## <span class="numberflag"><span class="sr-only">Step</span> 6</span> Put it online (optional)

The _easiest_ way to put your new site online is to head over to [Netlify Drop](https://app.netlify.com/drop) (no account sign-up required) and drag your new Eleventy-generated `_site` folder to the Netlify Drop web interface. In seconds, your new site will be online for anyone to see!

* Read up on a few [other deployment options](/docs/deployment/).

## <span class="numberflag"><span class="sr-only">Step</span> 7</span> Continue Learning…

Congratulations—you made something with Eleventy! Now put it to work:

* Add more content files: [HTML](/docs/languages/html/), [Markdown](/docs/languages/markdown/), [JavaScript](/docs/languages/javascript/), [WebC](/docs/languages/webc/), [Nunjucks](/docs/languages/nunjucks/), [Liquid](/docs/languages/liquid/), [Handlebars](/docs/languages/handlebars/), [Mustache](/docs/languages/mustache/), [EJS](/docs/languages/ejs/), [HAML](/docs/languages/haml/), [Pug](/docs/languages/pug/), or extend Eleventy with your own [custom file extension](/docs/languages/custom/).
* [Consume data from APIs](/docs/data-js/)
* Read a few [Quick Tips](/docs/quicktips/) for more ideas!
* Learn more [Eleventy command line options](/docs/usage/)
* Try one of our [Starter Projects](/docs/starter/)
* Try one of these excellent Community-contributed Getting Started [tutorials](/docs/tutorials/):

{%- if communityLinksKey %}
<div class="elv-community" id="community-resources">
  {%- include "community-contributed.njk" -%}
</div>
{%- endif %}