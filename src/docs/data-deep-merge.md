---
eleventyNavigation:
  parent: Data Cascade
  key: Data Deep Merge
  order: 4
---
# Data Deep Merge {% addedin "0.6.0" %}

Use a full deep merge when combining the Data Cascade. This will use something similar to [`lodash.mergewith`](https://docs-lodash.com/v4/merge-with/) to combine Arrays and deep merge Objects, rather than a simple top-level merge using `Object.assign`.

Read more at [Issue #147](https://github.com/11ty/eleventy/issues/147). As of Eleventy 1.0 this defaults to enabled (but API still exists for opt-out).

{% codetitle ".eleventy.js" %}

```js
module.exports = function(eleventyConfig) {
  // defaults to true in 1.0, use false to opt-out
  eleventyConfig.setDataDeepMerge(false);

  // requires opt-in for 0.x
  eleventyConfig.setDataDeepMerge(true);
};
```

Note that all data stored in the `pagination` variable is exempted from this behavior (we don’t want `pagination.items` to be merged together).

## Example

{% codetitle "my-template.md" %}

```yaml
---
title: This is a Good Blog Post
tags:
  - CSS
  - HTML
layout: my-layout.njk
eleventyNavigation:
  key: my-key
---
```

{% codetitle "_includes/my-layout.njk" %}

```yaml
---
title: This is a Very Good Blog Post
author: Zach
tags:
  - JavaScript
eleventyNavigation:
  parent: test
---
```

### Without Deep Data Merge

Results in the following data available in `my-template.md`:

{% codetitle "JavaScript", "Syntax" %}

```json
{
  "title": "This is a Good Blog Post",
  "author": "Zach",
  "tags": [
    "CSS",
    "HTML"
  ],
  "eleventyNavigation": {
    "key": "my-key"
  }
}
```

### With Data Deep Merge

With this enabled, your data structure will look like this when `my-template.md` is rendered:

{% codetitle "JavaScript", "Syntax" %}

```json
{
  "title": "This is a Good Blog Post",
  "author": "Zach",
  "tags": [
    "CSS",
    "HTML",
    "JavaScript"
  ],
  "eleventyNavigation": {
    "key": "my-key",
    "parent": "test"
  }
}
```

## Using the `override:` prefix

Use the `override:` prefix on any data key to opt-out of this merge behavior for specific values or nested values.

{% codetitle "posts/posts.json" %}

```json
{
  "tags": ["posts"]
}
```

{% codetitle "posts/firstpost.md" %}

```markdown
---
override:tags: []
---
```

Even though normally the `posts/firstpost.md` file would inherit the `posts` tag from the directory data file (per normal [data cascade rules](/docs/data/)), we can override the `tags` value to be an empty array to opt-out of this behavior.
