---
eleventyNavigation:
  parent: Advanced
  key: Release History
  pinned: true
---
# Release History

You can also browse the latest releases [on npm](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions) or [on GitHub](https://github.com/11ty/eleventy/releases).

## Major Branches

<ul>
	<li class="inlinelist-item"><a href="https://www.11ty.dev/docs/"><code>www.11ty.dev</code></a> for <code>v3</code> (Latest, stable)</li>
	<li class="inlinelist-item"><a href="https://v2.11ty.dev/docs/"><code>v2.11ty.dev</code></a></li>
	<li class="inlinelist-item"><a href="https://v1.11ty.dev/docs/"><code>v1.11ty.dev</code></a></li>
	<li class="inlinelist-item"><a href="https://v0.11ty.dev/docs/"><code>v0.11ty.dev</code></a></li>
</ul>

## Full Release History

_×{{ versions.length }} releases total since [November 26, 2017](https://github.com/11ty/eleventy/commit/00ad9192605d5d501de6aae193701c5a2297ef2c)_

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Docs</th>
			<th>Date</th>
      <th>More…</th>
    </tr>
  </thead>
  <tbody>
{%- for v in versions %}
{%- set releaseInfo = githubReleases[ v.tag | normalizeVersion ] %}
    <tr>
      <td><code>{{ v.tag }}</code>{% if v.prerelease %} <span class="minilink">Prerelease</span>{% endif %}</td>
			<td>{% if not v.prerelease and not v.tagOnly %}<a href="{% if v.docs_url %}{{ v.docs_url }}{% else %}https://github.com/11ty/eleventy/blob/{{ v.tag }}/README.md{% endif %}"><strong>Docs</strong></a>{% endif %}</td>
			<td>{% if releaseInfo.date %}<em>{{ releaseInfo.date | newsDate("yyyy LLL dd") }}</em>{% endif %}</td>
			<td>{% if not v.ignore_release_notes %}<a href="https://github.com/11ty/eleventy/releases/tag/{{ v.tag }}">{% if v.tagOnly %}GitHub Tag{% else %}GitHub Release{% endif %}</a>{% endif %}</td>
    </tr>
{%- endfor -%}
  </tbody>
</table>