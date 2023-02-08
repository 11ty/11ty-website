---
eleventyNavigation:
  key: Getting Started
  order: 2
communityLinksKey: getting-started
overrideCommunityLinks: true
---
# Getting Started

Eleventy **requires version {% latestVersionNodeMinimum versions, config %} of [Node.js](https://nodejs.org/) or higher.**

_Don’t include `~ $` or `~/eleventy-sample $` when you run these commands._

## <span class="numberflag"><span class="sr-only">Step</span> 1</span> Make a Project Directory

Make a directory for your project using `mkdir`.

{% codewithprompt "cmdhomedir" %}
mkdir eleventy-sample
{% endcodewithprompt %}

Now move into that directory with the `cd` command:

{% codewithprompt "cmdhomedir" %}
cd eleventy-sample
{% endcodewithprompt %}

## <span class="numberflag"><span class="sr-only">Step</span> 2</span> Install Eleventy (Optional)

_While installation of Eleventy is optional (you could skip to step 3), it is recommended so that your project uses the same version of Eleventy the next time you come back to it. `package.json` installation (shown here) is preferred to [global installation](/docs/global-installation/)._

### Create a `package.json`

Installing Eleventy into a project requires a `package.json` file. npm (included with Node.js) will create one for you with [`npm init -y`](https://docs.npmjs.com/cli/init). `-y` tells npm to use default values and skips the command line questionnaire.

{% codewithprompt "eleventysample" %}
npm init -y
{% endcodewithprompt %}

### Install Eleventy into the `package.json`

[`@11ty/eleventy` is published on npm](https://www.npmjs.com/package/@11ty/eleventy) and we can install and save it into our project’s `package.json` by running:

{% codewithprompt "eleventysample" %}
npm install @11ty/eleventy --save-dev
{% endcodewithprompt %}

## <span class="numberflag"><span class="sr-only">Step</span> 3</span> Run Eleventy

We can use npx to run our local project's version of Eleventy. Let’s make sure our installation went okay and try to run Eleventy:

{% codewithprompt "eleventysample" %}
npx @11ty/eleventy
Wrote 0 files in 0.03 seconds ({% latestVersion versions, config %})
{% endcodewithprompt %}

Make sure that you see `({% latestVersion versions, config %})` in your output. This lets you know you’re using the newest version. However, Eleventy didn’t process any files! This is expected—we have an empty folder with no templates inside.

## <span class="numberflag"><span class="sr-only">Step</span> 4</span> Create some templates

A <dfn>template</dfn> is a content file written in a [format such as Markdown, HTML, Liquid, Nunjucks, and more](/docs/languages/), which Eleventy transforms into a page (or pages) when building our site.

Let’s run two commands to create two new template files.

{% codewithprompt "eleventysample" %}
echo '<!doctype html><title>Page title</title><p>Hi</p>' > index.html
{% endcodewithprompt %}

{% codewithprompt "eleventysample" %}
echo '# Page header' > README.md
{% endcodewithprompt %}

We’ve now created an HTML template and a markdown template. Let’s run Eleventy again:

<style>
#getting-started-build .highlight-line:first-child + br + .highlight-line + br + .highlight-line + br + .highlight-line,
#getting-started-build .highlight-line:first-child + br + .highlight-line + br + .highlight-line + br + .highlight-line * {
  color: #0dbc79 !important;
}
</style>

{% codewithprompt "eleventysample", "getting-started-build" %}
npx @11ty/eleventy
[11ty] Writing _site/README/index.html from ./README.md (liquid)
[11ty] Writing _site/index.html from ./index.html (liquid)
[11ty] Wrote 2 files in 0.04 seconds ({% latestVersion versions, config %})
{% endcodewithprompt %}

This will compile any content templates in the current directory or subdirectories into the output folder (defaults to `_site`).

## <span class="numberflag"><span class="sr-only">Step</span> 5</span> Gaze upon your templates

Use `--serve` to start up a hot-reloading local web server.

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

Go to `http://localhost:8080/` or `http://localhost:8080/README/` to see your Eleventy site live! When you save your template files—Eleventy will refresh the browser with your new changes automatically!

## <span class="numberflag"><span class="sr-only">Step</span> 6</span> Continue Learning…

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