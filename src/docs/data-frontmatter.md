---
eleventyNavigation:
  parent: Data Cascade
  key: Front Matter Data
  order: 1
---

# Front Matter Data

{% tableofcontents %}

Add data in your template front matter, like this:

{% codetitle "YAML", "Syntax" %}

```markdown
---
title: My page title
---

<!doctype html>
<html>
…
```

The above is using [YAML syntax](https://learnxinyminutes.com/docs/yaml/). You can [use other formats too](#alternative-front-matter-formats).

Locally assigned front matter values override things further up the layout chain. Note also that layouts can contain front matter variables that you can use in your local template. Leaf template front matter takes precedence over layout front matter. Read more about [Layouts](/docs/layouts/).

Note that only the [`permalink`](/docs/permalinks/) and [`eleventyComputed`](/docs/data-computed) front matter values can contain variables and shortcodes like you would use in the body of your templates. If you need to use variables or shortcodes in other front matter values, use `eleventyComputed` to set them.

## Template Configuration

<span id="user-defined-front-matter-customizations"></span>

Eleventy allows many options to control how your template works. The most popular is [`permalink`](/docs/permalinks/), which allows you to change where the file goes on the file system. You can set these options in your front matter, or anywhere else in the [Data Cascade](/docs/data-cascade/). [Read more about Template Configuration](/docs/data-configuration/).

## Sources of Data

{% include "datasources.md" %}

## Alternative Front Matter Formats

Eleventy uses the [`gray-matter` package](https://github.com/jonschlinkert/gray-matter) for front matter processing. `gray-matter` (and thus, Eleventy) includes support out of the box for `yaml`, `json`, and `js` for JavaScript object literals in front matter (some [aliases](https://github.com/jonschlinkert/gray-matter/blob/ce67a86dba419381db0dd01cc84e2d30a1d1e6a5/lib/engine.js) are also included).

### Change the default format project-wide {% addedin "0.9.0" %}

By default, `yaml` is used when a front matter syntax is not explicitly specified. You can change this project-wide with:

{% codetitle ".eleventy.js" %}

```js
module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		language: "json", // default is "yaml"
	});
};
```

### Add your own format {% addedin "0.9.0" %}

You can [customize Front Matter Parsing](/docs/data-frontmatter-customize/) in Eleventy to add your own custom format, and we provide examples for:

- [JavaScript in front matter](/docs/data-frontmatter-customize/#example-use-javascript-in-your-front-matter).
- [TOML in front matter](/docs/data-frontmatter-customize/#example-using-toml-for-front-matter-parsing).

### JSON Front Matter

```html
---json
{
  "title": "My page title"
}
---

<!DOCTYPE html>
<html>
	…
</html>
```

### JavaScript Object Front Matter <span id="javascript-front-matter"></span>

This method makes use of a JavaScript Object in front matter. You can also easily extend Eleventy to add [arbitrary JavaScript in your front matter too](/docs/data-frontmatter-customize/#example-use-javascript-in-your-front-matter)!

_Warning: while Nunjucks and Liquid syntax are similar, the following example will **not** work in Liquid. Liquid does not allow function execution in output (e.g. `{% raw %}{{ currentDate() }}{% endraw %}`)._

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```html
---js
{
  title: "My page title",
  currentDate: function() {
    // You can have a JavaScript function here!
    return (new Date()).toLocaleString();
  }
}
---

<h1>{{ title }}</h1>
<p>Published on {{ currentDate() }}</p>
```

{% endraw %}

## Advanced: Customize Front Matter Parsing {% addedin "0.9.0" %}

Configure [front matter for customized excerpts, TOML parsing, and more](/docs/data-frontmatter-customize/).

## From the Community

{% include "11tybundle.njk" %}
