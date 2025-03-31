---
eleventyNavigation:
  parent: Eleventy Projects
  key: Template Languages
  order: 3
---
# Template Languages

Eleventy’s super power is that it is built on an extensible architecture that can work with one or more template syntaxes in the same project.

{% templatelangs templatetypes, page %}

<style>
.elv-page-toc-asterisk:before,
.elv-page-toc ul ul li:after,
.elv-page-toc li:has(a[href="/docs/languages/handlebars/"]):after,
.elv-page-toc li:has(a[href="/docs/languages/mustache/"]):after,
.elv-page-toc li:has(a[href="/docs/languages/ejs/"]):after,
.elv-page-toc li:has(a[href="/docs/languages/haml/"]):after,
.elv-page-toc li:has(a[href="/docs/languages/pug/"]):after,
.elv-page-toc li:has(a[href="/docs/languages/webc/"]):after {
	content: "*";
	color: #f00;
	margin-inline: .15em;
}
</style>
<div class="elv-page-toc">

{{ eleventyNavigation.key | navFiltered | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}

</div>

<em class="elv-page-toc-asterisk">These template types require plugin installation.</em>