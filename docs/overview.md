---
subtitle: Overview
menuSectionName: docs-overview
submenuSortOrder:
  - resources
  - testimonials
  - sites
  - supporters
tags:
  - docs
permalink: /docs/
---

# {{ "Eleventy is a simpler static site generator." | orphanWrap | safe }}

Eleventy was created to be a JavaScript alternative to Jekyll. It’s <a href="/docs/resources/#zero-config" class="buzzword">zero-config</a> by default but has flexible configuration options. Eleventy **works with your project’s existing directory structure.**

Eleventy uses **independent template engines**. We don’t want to hold your content hostage. If you decide to use something else later, having your content decoupled in this way will make migration easier.

Eleventy **works with multiple template languages**. You can pick one or use them all together in a single project:

{% templatelangs templatetypes, page %}

Eleventy is **not a JavaScript framework**—that means *zero boilerplate client-side JavaScript*. We’re thinking long term and opting out of the framework rat race. The tool chain, code conventions, and modules you use in your front end stack are decoupled from this tool. Work from a solid foundation of <a href="/docs/resources/#pre-rendered-templates" class="buzzword">pre-rendered templates</a> that suit your project’s <a href="/docs/resources/#progressive-enhancement" class="buzzword">progressive enhancement</a> baseline requirements.

Eleventy is **incremental**. You don’t need to start an Eleventy project from scratch. Eleventy is flexible enough to allow conversion of only a few templates at a time. Migrate as fast or as slow as you’d like.

Eleventy **works great with data**—use both front matter and external data files to inject content into templates.

Read more about [**Eleventy’s project goals**.](https://www.zachleat.com/web/introducing-eleventy/)

➡ Keep going! Read [**Getting Started**](/docs/getting-started/).

## Don’t just take my word for it 🌈

There are a bunch of [sites built using Eleventy](/docs/sites/). But listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

## Competitors

This project aims to directly compete with all other Static Site Generators. We encourage you to try out our competition:

* [Jekyll](https://jekyllrb.com/) (Ruby)
* [Hugo](http://gohugo.io/) (Go)
* [Hexo](https://hexo.io/) (JavaScript)
* [Gatsby](https://www.gatsbyjs.org/) (JavaScript using React)
* [Nuxt](https://www.staticgen.com/nuxt) (JavaScript using Vue)
* _More at [staticgen.com](https://www.staticgen.com/)_
