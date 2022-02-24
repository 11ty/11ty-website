---
eleventyNavigation:
  parent: Pagination
  key: Pagination Navigation
  excerpt: Create a list of links to every paginated page on a pagination template.
tags: ["related-pagination"]
relatedTitle: "Create a list of Navigation Links for your Pagination."
---
# Pagination Navigation

How to create a list of links to every paginated page on a pagination template.

[[toc]]

## Paginating over an Array

Consider the following example paginating our `testdata` array:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```markdown
---
pagination:
  data: testdata
  size: 2
testdata:
 - item1
 - item2
 - item3
 - item4
 - item5
 - item6
---
{# pagination.items has the data for the current page #}
```
{% endraw %}

The above example would make three different output files from the template.

* Page 1 would have `pagination.items` set to `['item1', 'item2']`.
* Page 2 would have `pagination.items` set to `['item3', 'item4']`.
* Page 3 would have `pagination.items` set to `['item5', 'item6']`.

But to create a series of links to each of these paginated output templates, we’ll want to use our `pagination.pages` entries {% addedin "0.10.0" %}, an array of the `pagination.items` for each page.

A good way to think about it:

* `pagination.items` is the chunk of data for the _current_ page.
* `pagination.pages` is the chunked page data for _all_ of the pages.

{% callout "info" %}While the above example pages over an array of data, the code provided here will operate the same for any paginated data (including objects)!{% endcallout %}

## Starter Example

To create an accessible navigation structure, we want to do our research first!

* [Web Accessibility Tutorials from the w3c Web Accessibility Initiative: Menu Structure](https://www.w3.org/WAI/tutorials/menus/structure/)
* [MDN web docs: `<nav>`: The Navigation Section element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
* [Scott O’Hara with an Accessible Breadcrumb Navigation Pattern](https://scottaohara.github.io/a11y_breadcrumbs/)
* [Léonie Watson on _Using the aria-current attribute_.](https://tink.uk/using-the-aria-current-attribute/)

Alright, you definitely read all of those right? 😇 Here’s some accessible code you definitely would have written yourself after reading those wonderful resources:

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#paged-nav-starter-njk" id="paged-nav-starter-njk-btn" role="tab" aria-controls="paged-nav-starter-njk" aria-selected="true">Nunjucks</a>
    <a href="#paged-nav-starter-11tyjs" id="paged-nav-starter-11tyjs-btn" role="tab" aria-controls="paged-nav-starter-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="paged-nav-starter-njk" role="tabpanel" aria-labelledby="paged-nav-starter-njk-btn">
    {%- codetitle "starter.njk" %}
    {%- highlight "html" %}
    {%- include "examples/pagination/nav/starter.njk" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-starter-11tyjs" role="tabpanel" aria-labelledby="paged-nav-starter-11tyjs-btn">
    {%- codetitle "starter.11ty.js" %}
    {%- highlight "js" %}
    {%- include "examples/pagination/nav/starter.11ty.js" %}
    {%- endhighlight %}
  </div>
</seven-minute-tabs>

* `pagination.pages` was added in `0.10.0`. For previous versions, iterate over `pagination.hrefs` (although you won’t have access to the paginated items to show data about the pages).

For our example, this code will output the following markup for our example (on the first page):

{% codetitle "HTML", "Syntax" %}

```html
<nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
    <li><a href="/test/" aria-current="page">Page 1</a></li>
    <li><a href="/test/1/">Page 2</a></li>
    <li><a href="/test/2/">Page 3</a></li>
  </ol>
</nav>
```

{% callout "info" %}<strong>HTML tip</strong>: make sure the <code>id</code> attribute used on your heading (<code>id="my-pagination"</code>) is unique to your page!{% endcallout %}

### Accessing the Original Paginated Content

Say you want to output something from the paginated data instead of bland `Page 1, Page 2, etc.` links. For that we need to access the original data!

#### When Paginating Arrays

{% codetitle "YAML", "Syntax" %}

```yaml
testdata:
  - item1
  - item2
  - item3
  - item4
  - item5
  - item6
```

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<!-- Don’t copy this code, it’s been simplified for clarity -->
{% for pageEntry in pagination.pages %}
<a href="{{ pagination.hrefs[ loop.index0 ] }}">Page {{ loop.index }}</a>
{% endfor %}
```
{% endraw %}

* When `size` is set to 2, `pagination.pages` will look like: `[['item1', 'item2'], ['item3', 'item4'], ['item5', 'item6']]`
  - Use `pageEntry[0]` and `pageEntry[1]` to access the original content.
* When `size` is set to 1, `pagination.pages` will be the same as the original data: `['item1', 'item2', 'item3', 'item4', 'item5', 'item6']`
  - Use `pageEntry` to access the original content.

#### When Paginating Object Literals

{% codetitle "YAML", "Syntax" %}

```yaml
testdata:
  key1: item1
  key2: item2
  key3: item3
  key4: item4
  key5: item5
  key6: item6
```

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<!-- Don’t copy this code, it’s been simplified for clarity -->
{% for pageKey in pagination.pages %}
<a href="{{ pagination.hrefs[ loop.index0 ] }}">Page {{ loop.index }}</a>
{% endfor %}
```
{% endraw %}

* When `size` is set to 2, `pagination.pages` will look like: `[['key1', 'key2'], ['key3', 'key4'], ['key5', 'key6']]`
  - Use `testdata[ pageKey[0] ]` and `testdata[ pageKey[1] ]` to access the original content.
* When `size` is set to 1, `pagination.pages` will be the keys of the object: `['key1', 'key2', 'key3', 'key4', 'key5', 'key6']`
  - Use `testdata[ pageKey ]` to access the original content.

### Visually Style the Current Page Link

You’ll probably also want to add some kind of visual styling to indicate that the user is on the current page. For this let’s use a light `background-color`.

{% codetitle "CSS", "Syntax" %}

```css
[aria-current] {
  background-color: #eee;
}
```

{% callout "info" %}<strong id="annoy-zach">A Tip to avoid something that annoys Zach™</strong>: If you use something like <code>font-weight</code> here make sure the change in text size for the current page doesn’t make your navigation shift around between pages! This is especially important if your navigation links are displayed side-by-side on the same line.{% endcallout %}

## Add Previous and Next Links

Note that if the current page (`page.url`) is the first or last in the set, we won’t output links.

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#paged-nav-nextprev-njk" id="paged-nav-nextprev-njk-btn" role="tab" aria-controls="paged-nav-nextprev-njk" aria-selected="true">Nunjucks</a>
    <a href="#paged-nav-nextprev-11tyjs" id="paged-nav-nextprev-11tyjs-btn" role="tab" aria-controls="paged-nav-nextprev-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="paged-nav-nextprev-njk" role="tabpanel" aria-labelledby="paged-nav-nextprev-njk-btn">
    {%- codetitle "nextprev.njk" %}
    {%- highlight "html 3,7" %}
    {%- include "examples/pagination/nav/nextprev.njk" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-nextprev-11tyjs" role="tabpanel" aria-labelledby="paged-nav-nextprev-11tyjs-btn">
    {%- codetitle "nextprev.11ty.js" %}
    {%- highlight "js" %}
    {%- include "examples/pagination/nav/nextprev.11ty.js" %}
    {%- endhighlight %}
  </div>
</seven-minute-tabs>

* `pagination.href.previous` and `pagination.href.next` are added in `0.10.0`. Use `pagination.previousPageHref` or `pagination.nextPageHref` in previous versions.

## Add First and Last Links

For clarity here, we’re omitting the previous and next links from the previous section. Note the code below to show the links only if `pagination.href.first` and `pagination.href.last` don’t match the current `page.url`.

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#paged-nav-firstlast-njk" id="paged-nav-firstlast-njk-btn" role="tab" aria-controls="paged-nav-firstlast-njk" aria-selected="true">Nunjucks</a>
    <a href="#paged-nav-firstlast-11tyjs" id="paged-nav-firstlast-11tyjs-btn" role="tab" aria-controls="paged-nav-firstlast-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="paged-nav-firstlast-njk" role="tabpanel" aria-labelledby="paged-nav-firstlast-njk-btn">
    {%- codetitle "firstlast.njk" %}
    {%- highlight "html 3,7" %}
    {%- include "examples/pagination/nav/firstlast.njk" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-firstlast-11tyjs" role="tabpanel" aria-labelledby="paged-nav-firstlast-11tyjs-btn">
    {%- codetitle "firstlast.11ty.js" %}
    {%- highlight "js" %}
    {%- include "examples/pagination/nav/firstlast.11ty.js" %}
    {%- endhighlight %}
  </div>
</seven-minute-tabs>

* `pagination.href.first` and `pagination.href.last` are added in `0.10.0`. Use `pagination.firstPageHref` or `pagination.lastPageHref` in previous versions.

## Put It All Together

Here’s the final pagination navigation template code, pieced together:

<seven-minute-tabs>
  <div role="tablist" aria-label="Template Language Chooser">
    Language:
    <a href="#paged-nav-combined-njk" id="paged-nav-combined-njk-btn" role="tab" aria-controls="paged-nav-combined-njk" aria-selected="true">Nunjucks</a>
    <a href="#paged-nav-combined-11tyjs" id="paged-nav-combined-11tyjs-btn" role="tab" aria-controls="paged-nav-combined-11tyjs" aria-selected="false">11ty.js</a>
  </div>
  <div id="paged-nav-combined-njk" role="tabpanel" aria-labelledby="paged-nav-combined-njk-btn">
    {%- codetitle "combined.njk" %}
    {%- highlight "html" %}
    {%- include "examples/pagination/nav/combined.njk" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-combined-11tyjs" role="tabpanel" aria-labelledby="paged-nav-combined-11tyjs-btn">
    {%- codetitle "combined.11ty.js" %}
    {%- highlight "js" %}
    {%- include "examples/pagination/nav/combined.11ty.js" %}
    {%- endhighlight %}
  </div>
</seven-minute-tabs>

Alright, you’ve copied the above—but don’t leave yet—*your work is not done (sorry)!* You still need to:

* Change `my-pagination` to a better `id` attribute for your use case and update it in `aria-labelledby` too.
* Update the `This is my Pagination` text to make more sense for your use case.
* Think about maybe changing the `<h2>` to better suit your document structure.
* Add some [CSS to highlight the current page in the navigation, visually](#visually-style-the-current-page-link).

{% callout "info" %}<strong>HTML tip</strong>: You might be tempted to use <code>role="navigation"</code> here, but it’s superfluous when using <code>&lt;nav&gt;</code>.{% endcallout %}

{% callout "info" %}<strong>Accessibility tip</strong>: if you style this list with <code>list-style-type: none</code>, read <a href="https://unfetteredthoughts.net/2017/09/26/voiceover-and-list-style-type-none/">this article about VoiceOver</a>{% endcallout %}

All of the above will output the following HTML for our example (on the first page of the set):

{% codetitle "HTML", "Syntax" %}

```html
<nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
    <li>First</li>
    <li>Previous</li>
    <li><a href="/test-array/" aria-current="page">Page 1</a></li>
    <li><a href="/test-array/1/">Page 2</a></li>
    <li><a href="/test-array/2/">Page 3</a></li>
    <li><a href="/test-array/1/">Next</a></li>
    <li><a href="/test-array/2/">Last</a></li>
  </ol>
</nav>
```
