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

## Blockquotes

<div class="elv-sg-component">
    <blockquote>“Seriously can't remember enjoying using a Static Site Generator this much. Yes Hugo is rapid, but this is all so logical. It feels like it was designed by someone who has been through lots of pain and success using other SSGs.”—<a href="https://twitter.com/philhawksworth"><img src="/img/avatars/philhawksworth.jpg" alt="@philhawksworth">Phil Hawksworth</a></blockquote>
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

## Info Block

<div class="elv-sg-component">
    <div class="elv-info">ℹ️ This documentation is for an upcoming version of Eleventy. Go to the <a href="https://www.11ty.io/docs/">latest stable version of Eleventy docs</a> or check out the <a href="https://www.11ty.io/docs/versions/">full release history.</a></div>
</div>

<div class="elv-sg-component">
    <div class="elv-info elv-warning">⚠️ This documentation is for an older version. Go to the <a href="https://www.11ty.io/docs/">newest Eleventy docs</a> or check out the <a href="https://www.11ty.io/docs/versions/">full release history.</a></div>
</div>