---
eleventyNavigation:
  key: Navigation
  order: 3
  excerpt: A plugin for creating hierarchical navigation in Eleventy projects. Supports breadcrumbs too!
---
# Navigation Plugin

A plugin for creating hierarchical navigation in Eleventy projects. Supports breadcrumbs too! Used in production on this very website!

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

Read more about [Eleventy plugins.](https://www.11ty.io/docs/plugins/)

## Adding Templates to the Navigation

Add the `eleventyNavigation` object to your front matter data (or in a [data directory file](https://www.11ty.io/docs/data-template-dir/)). Assign a unique string to the `key` property inside of `eleventyNavigation`:

### `mammals.md`:

```yaml
---
eleventyNavigation:
  key: Mammals
---
```

This gives us:

* Mammals

### `humans.md`

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

### `bats.md`

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

## Use alternate text for the navigation link

If you want your key and your link text to be different, use the `title` property:

```yaml
---
eleventyNavigation:
  key: Mammals
  title: All of the Mammals
---
```

## Re-ordering Items

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

## Rendering the Navigation Bar (Nunjucks)

Currently only Nunjucks support is available for this plugin. More to come!

### Full Navigation Tree

{% raw %}
```
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml | safe }}
```
{% endraw %}

### Just one Branch

Just show the children of a specific key, passing a key to `eleventyNavigation`:

{% raw %}
```
{{ collections.all | eleventyNavigation("Humans") | eleventyNavigationToHtml | safe }}
```
{% endraw %}

### Breadcrumbs

You can also render only the parents of a specific key too, to make breadcrumb navigation. Pass a key to `eleventyNavigationBreadcrumb` like this:

{% raw %}
```
{{ collections.all | eleventyNavigationBreadcrumb("Bats") | eleventyNavigationToHtml | safe }}
```
{% endraw %}

### Showing excerpts

You can also use this to display a longer list of navigation items with description text. Add `excerpt` to the `eleventyNavigation` object.

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

### Advanced Rendering Options for `eleventyNavigationToHtml`

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

    // If matched, `activeListItemClass` will be added to the item
    activeKey: "",
    // It’s likely you want to pass in `eleventyNavigation.key` here, e.g.:
    // activeKey: eleventyNavigation.key

    // Show excerpts (if they exist in data, read more above)
    showExcerpt: false
}) | safe }}
```
{% endraw %}

These work with `eleventyNavigationBreadcrumb | eleventyNavigationToHtml` too.

If you need _even more_ power than this filter provides, you can look at the JSON structure returned from `eleventyNavigation` and `eleventyNavigationBreadcrumb` and write your own filter to output HTML!