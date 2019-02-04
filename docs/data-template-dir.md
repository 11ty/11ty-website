---
subtitle: Template and Directory Data Files
tags:
  - docs-data
---
# Template and Directory Specific Data Files {% addedin "0.2.14" %}

While you can provide [global data files](/docs/data-global/) to supply data to all of your templates, you may want some of your data to be available locally only to one specific template or to a directory of templates. For that use, we also search for JSON and [JavaScript Data Files](/docs/data-js/) in specific places in your directory structure.

{% callout "info" %}<em>Important exception:</em> Template and Directory Specific Data Files are <strong>not</strong> <a href="/docs/data-preprocessing/">preprocessed through a templating engine</a>. <a href="/docs/data-global/">Global Data files</a> are.{% endcallout %}

For example, consider a template located at `posts/subdir/my-first-blog-post.md`. Eleventy will look for data in the following places (starting with highest priority, local data keys override global data):

1. [Content Template Front Matter Data](/docs/data-frontmatter/)
    * merged with any [Layout Front Matter Data](/docs/layouts/#front-matter-data-in-layouts)
1. Template Data File (data is only applied to `posts/subdir/my-first-blog-post.md`)
    * `posts/subdir/my-first-blog-post.11tydata.js` {% minilink "/docs/data-js" %}{% addedin "0.5.3" %}JavaScript Data Files{% endminilink %}
    * `posts/subdir/my-first-blog-post.11tydata.json` {% addedin "0.5.3" %}
    * `posts/subdir/my-first-blog-post.json`
1. Directory Data File (data applies to all templates in `posts/subdir/*`)
    * `posts/subdir/subdir.11tydata.js` {% minilink "/docs/data-js" %}{% addedin "0.5.3" %}JavaScript Data Files{% endminilink %}
    * `posts/subdir/subdir.11tydata.json` {% addedin "0.5.3" %}
    * `posts/subdir/subdir.json`
1. Parent Directory Data File (data applies to all templates in `posts/**/*`, including subdirectories) {% addedin "0.2.15" %}
    * `posts/posts.11tydata.js` {% minilink "/docs/data-js" %}{% addedin "0.5.3" %}JavaScript Data Files{% endminilink %}
    * `posts/posts.11tydata.json` {% addedin "0.5.3" %}
    * `posts/posts.json`
1. [Global Data Files](/docs/data-global/) in `_data/*` (available to all templates)

{% callout "info" %}Note that the name of the data file must match either the post or the directory it resides within.{% endcallout %}

### Change the `.11tydata.js` file suffix {% addedin "0.5.3" %}

Use the [Configuration API to change the file suffix](/docs/config/#change-file-suffix-for-template-and-directory-data-files) used to search for Eleventy data files.

## Example: Apply a default layout to multiple templates

Try adding `{ "layout": "layouts/post.njk" }` to `posts/posts.json` to configure a layout for all of the templates inside of `posts/*`.

## Sources of Data

{% include "datasources.md" %}
