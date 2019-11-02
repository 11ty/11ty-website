---
subtitle: Pagination Navigation
tags: ["related-pagination"]
relatedTitle: "Create a list of Navigation Links for your Pagination."
---
# Pagination Navigation

How to create a list of links to every paginated page on a pagination template.

[[toc]]

## A Sample Template

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

But to create a series of links to each of these paginated output templates, we’ll want to use our `pagination.hrefs` entries, an array of the URLs for each paginated page.

{% callout "info" %}While the above example pages over an array of data, the code provided here will operate the same for any paginated data (including objects)!{% endcallout %}

## Starter Example

To create an accessible navigation structure, we want to do our research first!

* [Web Accessibility Tutorials from the w3c Web Accessibility Initiative: Menu Structure](https://www.w3.org/WAI/tutorials/menus/structure/)
* [MDN web docs: `<nav>`: The Navigation Section element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
* [Scott O’Hara with an Accessible Breadcrumb Navigation Pattern](https://scottaohara.github.io/a11y_breadcrumbs/)
* [Léonie Watson on _Using the aria-current attribute_.](https://tink.uk/using-the-aria-current-attribute/)

Alright, you definitely read all of those right? 😇 Here’s some accessible code you definitely would have written yourself after reading those wonderful resources:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
{%- for pageHref in pagination.hrefs %}
    <li><a href="{{ pageHref }}"{% if page.url == pageHref %} aria-current="page"{% endif %}>Page {{ loop.index }}</a></li>
{%- endfor %}
  </ol>
</nav>
```
{% endraw %}

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

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html/3,7
<nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
    <li>{% if pagination.previousPageHref %}<a href="{{ pagination.previousPageHref }}">Previous</a>{% else %}Previous{% endif %}</li>
{%- for pageHref in pagination.hrefs %}
    <li><a href="{{ pageHref }}"{% if page.url == pageHref %} aria-current="page"{% endif %}>Page {{ loop.index }}</a></li>
{%- endfor %}
    <li>{% if pagination.nextPageHref %}<a href="{{ pagination.nextPageHref }}">Next</a>{% else %}Next{% endif %}</li>
  </ol>
</nav>
```
{% endraw %}

## Add First and Last Links

For clarity here, we’re omitting the previous and next links from the previous section. Note the code below to show the links only if `pagination.firstPageHref` and `pagination.lastPageHref` don’t match the current `page.url`.

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html/3,7
<nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
    <li>{% if page.url != pagination.firstPageHref %}<a href="{{ pagination.firstPageHref }}">First</a>{% else %}First{% endif %}</li>
{%- for pageHref in pagination.hrefs %}
    <li><a href="{{ pageHref }}"{% if page.url == pageHref %} aria-current="page"{% endif %}>Page {{ loop.index }}</a></li>
{%- endfor %}
   <li>{% if page.url != pagination.lastPageHref %}<a href="{{ pagination.lastPageHref }}">Last</a>{% else %}Last{% endif %}</li>
  </ol>
</nav>
```
{% endraw %}

## Put It All Together

Here’s the final pagination navigation template code, pieced together:

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}
```html
<nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
    <li>{% if page.url != pagination.firstPageHref %}<a href="{{ pagination.firstPageHref }}">First</a>{% else %}First{% endif %}</li>
    <li>{% if pagination.previousPageHref %}<a href="{{ pagination.previousPageHref }}">Previous</a>{% else %}Previous{% endif %}</li>
{%- for pageHref in pagination.hrefs %}
    <li><a href="{{ pageHref }}"{% if page.url == pageHref %} aria-current="page"{% endif %}>Page {{ loop.index }}</a></li>
{%- endfor %}
    <li>{% if pagination.nextPageHref %}<a href="{{ pagination.nextPageHref }}">Next</a>{% else %}Next{% endif %}</li>
    <li>{% if page.url != pagination.lastPageHref %}<a href="{{ pagination.lastPageHref }}">Last</a>{% else %}Last{% endif %}</li>
  </ol>
</nav>
```
{% endraw %}

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
    <li><a href="/test/" aria-current="page">Page 1</a></li>
    <li><a href="/test/1/">Page 2</a></li>
    <li><a href="/test/2/">Page 3</a></li>
    <li><a href="/test/1/">Next</a></li>
    <li><a href="/test/2/">Last</a></li>
  </ol>
</nav>
```