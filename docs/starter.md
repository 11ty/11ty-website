---
eleventyNavigation:
  parent: Getting Started
  key: Starter Projects
  order: 2
---
# Starter Projects

Community contributions are in random order. [Lighthouse scores are updated daily](https://www.speedlify.dev/eleventy-starters/)! [Add your own](https://github.com/11ty/11ty-website/tree/master/_data/starters)!

<table class="starter-table">
	<thead>
		<tr>
			<th>Name</th>
			<th>Author</th>
			<th>Description</th>
			<th>Score</th>
		</tr>
	</thead>
	<tbody>
{%- for site in starters | sortObjectByOrder %}
{%- if site.disabled != true and site.official %}
		<tr>
			<td class="starter-name"><a href="{{ site.url }}">{{ site.name }}</a></td>
			<td class="starter-author"><strong>{% avatarlocalcache "twitter", site.author, site.author %} Official</strong></td>
			<td class="starter-description">{% if site.description %} {{ site.description}}{% endif %}</td>
			<td class="starter-score">
				{%- if speedlify.data[site.demo] or speedlify.data[site.url] -%}
					<speedlify-score raw-data='{{ (speedlify.data[site.demo] or speedlify.data[site.url]) | toJSON | safe }}'></speedlify-score>
				{%- endif -%}
			</td>
		</tr>
{%- endif %}
{%- endfor %}
{%- for name, site in starters | shuffle %}
{%- if site.disabled != true and not site.official %}
		<tr>
			<td class="starter-name"><a href="{{ site.url }}">{{ site.name }}</a></td>
			<td class="starter-author">{% authorLink authors, site.author %}</td>
			<td class="starter-description">{% if site.description %} {{ site.description }}{% endif %}</td>
			<td class="starter-score">
				{%- if speedlify.data[site.demo] or speedlify.data[site.url] -%}
					<speedlify-score raw-data='{{ (speedlify.data[site.demo] or speedlify.data[site.url]) | toJSON | safe }}'></speedlify-score>
				{%- endif -%}
			</td>
		</tr>
{%- endif %}
{%- endfor %}
		<tr>
			<td colspan="4"><a href="https://github.com/11ty/11ty-website/tree/master/_data/starters">Add your own!</a></td>
		</tr>
	</tbody>
</table>
<style>
.starter-author {
	white-space: nowrap;
	padding-right: 2em;
}
.starter-author,
.starter-description {
	font-size: 0.875em; /* 14px /16 */
}
@media (max-width: 43.6875em) { /* 699px */
	.starter-table thead {
		position: absolute;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
	}
	.starter-table tr {
		float: left;
		clear: left;
		width: calc(100% + 2rem);
		margin-left: -1rem;
		margin-right: -1rem;
		padding: 1rem;
	}
	.starter-table tr:nth-child(odd) {
		background-color: #303030;
	}
	.starter-table td {
		clear: left;
		float: left;
		border: none;
		padding-left: 0;
	}
	.starter-author {
		padding-left: 1em;
	}
	.starter-table td.starter-author {
		clear: none;
	}
	.starter-table td.starter-score {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: .5em;
	}
}
</style>

## Lists

* [{% avatarlocalcache "twitter", "stackbithq", "stackbithq" %}Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).