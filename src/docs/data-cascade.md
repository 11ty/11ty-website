---
eleventyNavigation:
  parent: Using Data
  key: Data Cascade
  order: 1
communityLinksKey: "data-cascade"
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
    "HTML",
    "JavaScript"
  ],
  "layout": "my-layout.njk"
}
```

By default in v1.0, Eleventy does a deep data merge to combine Object literals and Arrays. If you want to opt-out of this behavior and revert to a simple top level merge (`Object.assign`) from the different data sources, you can turn off [Data Deep Merge](/docs/data-deep-merge/). You can override this on a per-property basis too—read more at the [Data Deep Merge documentation](/docs/data-deep-merge/).