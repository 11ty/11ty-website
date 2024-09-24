---
eleventyNavigation:
  parent: Getting Started
  key: Programmatic API
  order: 6
---

# Programmatic API {% addedin "1.0.0" %}<!-- Beta 10 or Canary 50 -->

{% tableofcontents %}

You can run Eleventy in any arbitrary Node script.

## Write to the file system

Don’t forget to [install Eleventy into your local project first](/docs/#step-2-install-eleventy)!

Now create a file called `my-node-script.js` with the following contents:

{% include "programmatic/node-script.njk" %}

Then run your new script from the command line. _Don’t include `~ $` when you run this command._

{% codewithprompt "cmdhomedir" %}
node my-node-script.js
{% endcodewithprompt %}

## Don’t write to the file system

Using `.write()` will write your output to the file system. If, instead, you want to retrieve the content programmatically without writing, use `.toJSON()` or `.toNDJSON()`.

### JSON Output

{% include "programmatic/json-out.njk" %}

### ndjson Output

{% include "programmatic/ndjson-out.njk" %}

## Changing the Input and Output Directories

The first argument is the input directory. The second argument is the output directory.

{% include "programmatic/chdirs.njk" %}

## Full Options List

The third argument to Eleventy is an options object.

_(This documentation section is a work in progress but [you’re welcome to dig into the `Eleventy` class source code in `{% latestVersion versions, config %}` to learn more](https://github.com/11ty/eleventy/blob/{% latestVersion versions, config %}/src/Eleventy.js))_

{% include "programmatic/fullopts.njk" %}