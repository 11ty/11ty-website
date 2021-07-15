---
eleventyNavigation:
  parent: Using Data
  key: Data Cascade
  order: 1
communityLinks:
- url: https://benmyers.dev/blog/eleventy-data-cascade/
  title: I Finally Understand Eleventy’s Data Cascade
  author: BenDMyers
---
# The Data Cascade

In Eleventy, data is merged from multiple different sources before the template is rendered. The data is merged in what Eleventy calls the Data Cascade.

## Sources of Data

{% include "datasources.md" %}

## Example

{% codetitle "my-template.md" %}

```yaml
---
title: This is a Good Blog Post
tags:
  - CSS
  - HTML
layout: my-layout.njk
---
```

{% codetitle "_includes/my-layout.njk" %}

```yaml
---
title: This is a Very Good Blog Post
author: Zach
tags:
  - JavaScript
---
```

Note that when `my-template.md` and `my-layout.njk` share data with the same object key (`title` and `tags`), the “leaf template” `my-template.md` takes precedence.

The data cascade results in the following data when `my-template.md` is rendered:

{% codetitle "JavaScript", "Syntax" %}

```json
{
  "title": "This is a Good Blog Post",
  "author": "Zach",
  "tags": [
    "CSS",
    "HTML"
  ],
  "layout": "my-layout.njk"
}
```

By default, Eleventy does a simple top level merge (`Object.assign`) from the different data sources. It doesn’t dive any deeper to merge Object literals or Arrays in the data. If you’d like Eleventy to perform deeper data merging, you need to enable the [Data Deep Merge](/docs/data-deep-merge/) option.
