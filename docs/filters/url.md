---
eleventyNavigation:
  parent: Filters
  key: url Filter
  title: '<code>url</code> Filter'
  order: 1
  excerpt: Normalize absolute paths in your content, allows easily changing deploy subdirectories for your project.
---

# `url` Universal Filter

Works with the `pathPrefix` configuration option to properly normalize absolute paths in your content with the `pathPrefix` added. Useful if you host your site on GitHub Pages, which normally live in a subdirectory, e.g. `https://11ty.github.io/eleventy-base-blog/`. We set `pathPrefix: "/eleventy-base-blog/"` and our absolute links all have this prepended to the beginning.

_If you don’t need `pathPrefix` (or don’t ever plan on moving your site’s top-level directory structure), you probably don’t need to use the `url` filter._

{% raw %}
```html
<a href="{{ '/myDir/' | url }}">Liquid or Nunjucks Link (from string)</a>
<a href="{{ post.url | url }}">Liquid or Nunjucks Link (from variable)</a>
```
{% endraw %}

##### Sample URL Transformations

| Sample URL   | `pathPrefix` | Return value                                                                           |
| ------------ | ------------ | -------------------------------------------------------------------------------------- |
| `''`         | `'/'`        | `'.'` ⚠️ This style is probably not what you want—careful!                              |
| `'/'`        | `'/'`        | `'/'`                                                                                  |
| `'./'`       | `'/'`        | `'./'`                                                                                 |
| `'..'`       | `'/'`        | `'..'`                                                                                 |
| `'myDir'`    | `'/'`        | `'myDir'` ⚠️ This style is not safe for globally linking to other content. Be careful!  |
| `'/myDir/'`  | `'/'`        | `'/myDir/'`                                                                            |
| `'./myDir/'` | `'/'`        | `'myDir/'` ⚠️ This style is not safe for globally linking to other content. Be careful! |
| `'../myDir/'` | `'/'`       | `'../myDir/'`                                                                          |

| Sample URL   | `pathPrefix`  | Return value                                                   |
| ------------ | ------------- | -------------------------------------------------------------- |
| `''`         | `'/rootDir/'` | `'.'` ⚠️ This style is probably not what you want—careful!      |
| `'/'`        | `'/rootDir/'` | `'/rootDir/'`                                                  |
| `'./'`       | `'/rootDir/'` | `'./'`                                                         |
| `'..'`       | `'/rootDir/'` | `'..'`                                                         |
| `'myDir'`    | `'/rootDir/'` | `'myDir'` ⚠️ This style is probably not what you want—careful!  |
| `'/myDir/'`  | `'/rootDir/'` | `'/rootDir/myDir/'`                                            |
| `'./myDir/'` | `'/rootDir/'` | `'myDir/'` ⚠️ This style is probably not what you want—careful! |
| `'../myDir/'` | `'/rootDir/'` | `'../myDir/'`                                                 |

* [← Back to Filters documentation.](/docs/filters/)
