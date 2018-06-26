---
subtitle: Template and Directory Data Files
tags:
  - docs-data
---
# Template and Directory Specific Data Files

{% addedin "0.2.14" %}

While it is useful to have globally available data to all of your templates, you may want some of your data to be available locally only to one specific template or to a directory of templates. For that use, we also search for JSON data files in specific places in your directory structure.

_Important exception:_ Template and Directory Specific Data Files are **not** processed through a templating engine. Global Data files are.

For example, consider a template located at `posts/subdir/my-first-blog-post.md`. Eleventy will look for data in the following places (starting with highest priority, local data keys override global data):

1.  `posts/subdir/my-first-blog-post.json` (data only applied to `posts/my-first-blog-post.md`)
1.  `posts/subdir/subdir.json` (on all templates in `posts/subdir/*`)
1.  `posts/posts.json` (on all templates in `posts/**/*`, including subdirectories)
1.  `_data/*` (global data files available to all templates)

_(Changed in Eleventy `v0.2.15` to search parent directories for data files—specifically step 3 above was added in the sequence)_

## Apply a default layout to multiple templates

Try adding `{ "layout": "layouts/post.njk" }` to `posts/posts.json` to configure a layout for all of the templates inside of `posts/*`.

