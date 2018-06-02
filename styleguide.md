---
title: 11ty.io Style Guide
layout: layouts/docs.njk
---

## Headers

### Home Header

<div class="elv-sg-component">
{% set headerClass = "elv-header-default" %}
{% set title = "Home Header" %}
{% include "header.njk" %}
</div>

### Docs Header

<div class="elv-sg-component">
{% set headerClass = "elv-header-docs" %}
{% set title = "Docs Header" %}
{% include "header.njk" %}
</div>

## Lists

<div class="elv-sg-component">
<ul class="inlinelist">
  <li><a href="/docs/resources/#static-sites">Static Sites</a></li>
  <li><a href="/docs/resources/#jamstack">JAMstack</a></li>
</ul>
</div>

## Buzzwords

### Inline Buzzwords

<div class="elv-sg-component">
<h2>This <a href="#" class="buzzword">Buzzword</a> is in a header</h2>
<h3>This <a href="#" class="buzzword">Buzzword</a> is in a header</h3>
<div><a href="#" class="buzzword">Buzzword</a></div>
<p><span class="buzzword">Buzzword</span></p>
</div>

### Buzzword Lists

<div class="elv-sg-component">
<ul class="buzzword-list">
  <li><a href="/docs/resources/#static-sites">Static Sites</a></li>
  <li><a href="/docs/resources/#jamstack">JAMstack</a></li>
</ul>
</div>
