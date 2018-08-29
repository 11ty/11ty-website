---
subtitle: Template and Directory Data Files
tags:
  - docs-data
---
# Template and Directory Specific Data Files

{% addedin "0.2.14" %}

While you can provide [global data files](/docs/data-global/) to supply data to all of your templates, you may want some of your data to be available locally only to one specific template or to a directory of templates. For that use, we also search for JSON and [JavaScript data files](/docs/data-js/) in specific places in your directory structure.

_Important exception:_ Template and Directory Specific Data Files are **not** [preprocessed through a templating engine](/docs/data-preprocessing/). [Global Data files](/docs/data-global/) are.

For example, consider a template located at `posts/subdir/my-first-blog-post.md`. Eleventy will look for data in the following places (starting with highest priority, local data keys override global data):

1. [Template Front Matter Data](/docs/data-frontmatter/)
1. Template Data File (data is only applied to `posts/subdir/my-first-blog-post.md`)
    * `posts/subdir/my-first-blog-post.11tydata.js` {% addedin "0.5.3", "span" %}
    * `posts/subdir/my-first-blog-post.11tydata.json` {% addedin "0.5.3", "span" %}
    * `posts/subdir/my-first-blog-post.json`
1. Directory Data File (data applies to all templates in `posts/subdir/*`)
    * `posts/subdir/subdir.11tydata.js` {% addedin "0.5.3", "span" %}
    * `posts/subdir/subdir.11tydata.json` {% addedin "0.5.3", "span" %}
    * `posts/subdir/subdir.json`
1. Parent Directory Data File (data applies to all templates in `posts/**/*`, including subdirectories)
    * `posts/posts.11tydata.js` {% addedin "0.5.3", "span" %}
    * `posts/posts.11tydata.json` {% addedin "0.5.3", "span" %}
    * `posts/posts.json`
1. [Global Data Files](/docs/data-global/) in `_data/*` (available to all templates)

_(Changed in Eleventy `v0.2.15` to search parent directories for data files—specifically step 4 above was added in the sequence)_

### Change the `.11tydata.js` file suffix

{% addedin "0.5.3", "span" %} Use the [Configuration API to change the file suffix](/docs/config/#change-file-suffix-for-template-and-directory-data-files) used to search for Eleventy data files.

## Example: Apply a default layout to multiple templates

Try adding `{ "layout": "layouts/post.njk" }` to `posts/posts.json` to configure a layout for all of the templates inside of `posts/*`.

{% include "datasources.md" %}