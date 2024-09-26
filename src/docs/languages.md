---
eleventyNavigation:
  key: Template Languages
  order: 7
---

# Template Languages

{% templatelangs templatetypes, page %}

## Virtual Templates {% addedin "3.0.0-alpha.15" %}

In addition to template files in your input directory, Eleventy can also process virtual templates defined in your configuration file (or plugins). Related [GitHub #1612](https://github.com/11ty/eleventy/issues/1612).

The [RSS plugin offers a virtual template](/docs/plugins/rss.md#virtual-template) to add feeds to your project.

### API

```js
eleventyConfig.addTemplate(virtualPath, content, data = {});
```

* `virtualPath`: used to determine the template language and data cascade for this template. This path is relative to your project’s input directory.
* `content`: usually a string, but maybe JavaScript (if using an `11ty.js` template). Can include front matter if the template language supports it.
* `data`: a data object tied to the template. A little more ergonomic than front matter but functionally the same.

### Example

{% set codeContent %}
export default function(eleventyConfig) {
	// Create content templates Files
	eleventyConfig.addTemplate("virtual.md", `# Hello`, {
        	layout: "virtual.html"
	});

	// Works great with Layouts too
	eleventyConfig.addTemplate("_includes/virtual.html", `<!-- Layout -->{% raw %}{{ content }}{% endraw %}`);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Overriding the Template Language {% addedin "0.2.14" %}

There are a couple of different ways you can tell Eleventy how you want to process a file:

1. The file extension (importantly, this is also used to find files to process).
2. [Configuration options](/docs/config/):
   - `markdownTemplateEngine`: The default global template engine to pre-process markdown files. Use `false` to avoid pre-processing and only transform markdown.
   - `htmlTemplateEngine`: The default global template engine to pre-process HTML files. Use `false` to avoid pre-processing and passthrough copy the content (HTML is not transformed, so technically this could be any plaintext).
3. `templateEngineOverride` in the template’s front matter. Should be _one_ templating engine (`liquid`) or markdown paired with another templating engine (`liquid,md`). See examples below.

### `templateEngineOverride` Examples

#### Replace with a single templating engine

If your file is called `example.liquid`—instead of `liquid`, this will be parsed as a `njk` Nunjucks template:

{% codetitle "example.liquid" %}

```markdown
---
templateEngineOverride: njk
---
```

#### Special case: pairing a templating engine with `md` Markdown

Remember that—by default—Markdown files are processed with an additional preprocessor template engine set globally with the `markdownTemplateEngine` configuration option. So, when using `templateEngineOverride` on markdown files be sure to list each templating engine you’d like to use.

For example, you may want to process `njk` Nunjucks first and then `md` markdown afterwards. Markdown is supported either by itself or with another engine. No other templating engines can be combined in this way—Markdown is the exception here. Any other combination attempt will throw an error.

##### Markdown and nothing else

```markdown
---
templateEngineOverride: md
---
```

##### Nunjucks and then Markdown

```markdown
---
templateEngineOverride: njk,md
---
```

##### Use nothing (no transformations)

Any falsy value here will just copy the template content without transformation.

```markdown
---
templateEngineOverride: false
---
```
