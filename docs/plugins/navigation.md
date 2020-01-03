---
eleventyNavigation:
  key: Navigation
  order: 3
  excerpt: A plugin for creating hierarchical navigation in Eleventy projects. Supports breadcrumbs too!
---
# Navigation Plugin

A plugin for creating hierarchical navigation in Eleventy projects. Supports breadcrumbs too! Used in production on this very website!

* This documentation is for `eleventy-navigation` `v0.1.3`.
* [GitHub](https://github.com/11ty/eleventy-navigation).

## Contents

[[toc]]

## Template Compatibility

* Any template language can add to navigation.
* Nunjucks is required for rendering the navigation menu.

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-navigation).

```
npm install @11ty/eleventy-navigation --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
};
```

Read more about [Eleventy plugins.](/docs/plugins/)

## Adding Templates to the Navigation

Add the `eleventyNavigation` object to your front matter data (or in a [data directory file](https://www.11ty.io/docs/data-template-dir/)). Assign a unique string to the `key` property inside of `eleventyNavigation`.

### Example

#### mammals.md

```yaml
---
eleventyNavigation:
  key: Mammals
---
```

This gives us:

* Mammals

#### humans.md

To nest a template inside of the Mammals template, use `parent: Mammals`:

```yaml
---
eleventyNavigation:
  key: Humans
  parent: Mammals
---
```

Any templates that do not have `parent` will be assumed to be at the top level.

Now our navigation structure looks like:

* Mammals
    - Humans

#### bats.md

```yaml
---
eleventyNavigation:
  key: Bats
  parent: Mammals
---
```

Now our navigation structure looks like:

* Mammals
    - Humans
    - Bats

You can nest these as deep as you want! Want to put something under Humans or Bats? Use `parent: Humans` or `parent: Bats`. If you want to add another root template, leave out `parent`.

### Use alternate text for the navigation link

If you want your key and your link text to be different, use the `title` property:

```yaml
---
eleventyNavigation:
  key: Mammals
  title: All of the Mammals
---
```

### Re-Ordering Items

To ensure that Humans comes first before Bats, use the `order` property. It can have an arbitrary number. If omitted, `order: 0` is the default.

```yaml
---
eleventyNavigation:
  key: Humans
  parent: Mammals
  order: 1
---
```

```yaml
---
eleventyNavigation:
  key: Bats
  parent: Mammals
  order: 2
---
```

## Rendering the Navigation Bar (Nunjucks-only)

Currently only Nunjucks support is available for this plugin. More to come!

### Just Give Me Some Code

If you’re tired of reading, just use the following:

{% raw %}
```
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml | safe }}
```
{% endraw %}

This is using [the Nunjucks filters documented below](#render-with-a-filter). If you want more control or need additional customization, keep reading!

### Fetch the Structure

The `eleventyNavigation` filter returns a _sorted_ array of objects with `url` and `title` properties (sorted using `order`, as noted above). If an entry has nested children, it will also include a `children` property with an array of similar objects (and those may contain `children` too, and so on).

#### Example

For our documented templates above with the following Nunjucks template:

{% raw %}
```
{% set navPages = collections.all | eleventyNavigation %}
{{ navPages | dump | safe }}
```
{% endraw %}

{% callout "info" %}Note that you can also pass any collection into <code>eleventyNavigation</code>. It doesn’t have to be <code>collections.all</code>!{% endcallout %}

Shows that `navPages` has the following structure:

```json
[
  {
    "key": "Mammals",
    "url": "/mammals/",
    "title": "Mammals",
    "children": [
      {
        "key": "Humans",
        "parentKey": "Mammals",
        "url": "/humans/",
        "title": "Humans"
      },
      {
        "key": "Bats",
        "parentKey": "Mammals",
        "url": "/bats/",
        "title": "Bats"
      }
    ]
  }
]
```

#### Get just one Branch

Just show the children of a specific key, pass a key to `eleventyNavigation`:

{% raw %}
```
{% set navPages = collections.all | eleventyNavigation("Mammals") %}
{{ navPages | dump | safe }}
```
{% endraw %}

```json
[
  {
    "key": "Humans",
    "parentKey": "Mammals",
    "url": "/humans/",
    "title": "Humans"
  },
  {
    "key": "Bats",
    "parentKey": "Mammals",
    "url": "/bats/",
    "title": "Bats"
  }
]
```

#### Breadcrumbs

You can also render only the parents of a specific key too, to make breadcrumb navigation. Pass a key to `eleventyNavigationBreadcrumb` like this:

{% raw %}
```
{% set navPages = collections.all | eleventyNavigationBreadcrumb("Bats") %}
{{ navPages | dump | safe }}
```
{% endraw %}

And an array of all the parents of the Bats entry will be returned (top-most parent is first):

```json
[
  {
    "key": "Mammals",
    "url": "/mammals/",
    "title": "Mammals"
  }
]
```

### Render the Structure

There are a couple of methods for rendering:

1. Copy and Paste templates give you full control of the markup. Use this if your navigation will have one level/tier of items.
2. A `eleventyNavigationToHtml` filter that will render the full navigation tree. Use this if you want to easily scale to an unlimited number of tiers/levels in your navigation.

#### Copy and Paste Templates

This template will render a single tier of items (no children).

{% raw %}
```html
{% set navPages = collections.all | eleventyNavigation %}
<ul>
{%- for entry in navPages %}
  <li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
    <a href="{{ entry.url | url }}">{{ entry.title }}</a>
  </li>
{%- endfor %}
</ul>
```
{% endraw %}

You _can_ use a Nunjucks macro to recursively render list items of any depth but the code isn’t quite as clean:

<details>
  <summary><strong>Nunjucks Macro Code for Rendering Unlimited Child Levels:</strong></summary>

{% raw %}
```html
{% set navPages = collections.all | eleventyNavigation %}
{% macro renderNavListItem(entry) -%}
<li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
  <a href="{{ entry.url | url }}">{{ entry.title }}</a>
{%- if entry.children.length -%}
  <ul>
    {%- for child in entry.children %}{{ renderNavListItem(child) }}{% endfor -%}
  </ul>
{%- endif -%}
</li>
{%- endmacro %}

<ul>
{%- for entry in navPages %}{{ renderNavListItem(entry) }}{%- endfor -%}
</ul>
```
{% endraw %}

</details>

#### Render with a Filter

With the Navigation structure returned from `eleventyNavigation` or `eleventyNavigationBreadcrumb`, we can render the navigation HTML. Pass the object to the  `eleventyNavigationToHtml` filter to automatically output the full HTML menu:

{% raw %}
```
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml | safe }}
```

```
{{ collections.all | eleventyNavigationBreadcrumb("Bats") | eleventyNavigationToHtml | safe }}
```
{% endraw %}

##### Showing excerpts

You can also use this to display a longer list of navigation items with description text. This is useful for category/index pages. Add `excerpt` to the `eleventyNavigation` object.

```yaml
---
eleventyNavigation:
  key: Mammals
  excerpt: Vertebrate animals of the class Mammalia.
---
```

When you render a navigation list, pass `showExcerpt: true` to the `eleventyNavigationToHtml` filter, like so:

{% raw %}
```
{{ collections.all | eleventyNavigation("Humans") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
```
{% endraw %}

##### Advanced: All Rendering Options for `eleventyNavigationToHtml`

You can change the HTML elements, classes on the list and list items, and add an additional class for the current page’s navigation entry!

{% raw %}
```
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml({
    listElement: "ul",            // Change the top level tag
    listItemElement: "li",        // Change the item tag

    listClass: "",                // Add a class to the top level
    listItemClass: "",            // Add a class to every item
    listItemHasChildrenClass: "", // Add a class if the item has children
    activeListItemClass: "",      // Add a class to the current page’s item

    anchorClass: "",              // Add a class to the anchor
    activeAnchorClass: "",        // Add a class to the current page’s anchor

    // If matched, `activeListItemClass` and `activeAnchorClass` will be added
    activeKey: "",
    // It’s likely you want to pass in `eleventyNavigation.key` here, e.g.:
    // activeKey: eleventyNavigation.key

    // Show excerpts (if they exist in data, read more above)
    showExcerpt: false
}) | safe }}
```
{% endraw %}

These work with `eleventyNavigationBreadcrumb | eleventyNavigationToHtml` too.

If you find yourself using a lot of these `class` options, maybe you should use the _Advanced: Unlimited Child Levels_ example above and have full control of your HTML!

