---
eleventyNavigation:
  key: Overview
  title: Why Eleventy?
  order: 1
permalink: /docs/
---

# {{ "Eleventy is a simpler static site generator." | orphanWrap | safe }}

Eleventy quickly builds speedy web sites. Originally pitched as the JavaScript alternative to Jekyll, Eleventy has matured into a [popular](/blog/three-million/) modern web site generator.

* Eleventy is **production ready** and trusted by: {% include "logos.njk" %}
* Eleventy is **<a href="/docs/glossary/#zero-config" class="buzzword">zero-config</a>** (by default) with flexible configuration options.
* Eleventy uses **independent template languages**. We don’t want to hold your content hostage with a custom format. If you decide to use a different syntax later, having your content decoupled in this way will make migration easier.
* Eleventy **works with multiple template languages**. You can pick one or use them all together in a single project:

{% templatelangs templatetypes, page %}

* Eleventy is **not a JavaScript framework**—that means *zero boilerplate client-side JavaScript*. We’re **thinking long-term** to opt-out of the framework rat race. The tool chain, modules, and components you use in your front end stack are decoupled from this tool. Work from a solid foundation of <a href="/docs/glossary/#pre-rendered-templates-by-default" class="buzzword">pre-rendered templates</a> that suit your project’s <a href="/docs/glossary/#progressive-enhancement" class="buzzword">progressive enhancement</a> baseline requirements.
* Eleventy **works with your project’s existing directory structure** and allows **incremental adoption**. You don’t need to start an Eleventy project from scratch. Eleventy is flexible enough to allow conversion of only a few templates at a time. Migrate as fast or as slow as you’d like.
* Eleventy **works great with data**—use front matter and/or load from an API using data files to inject into your templates.

Read more about [**Eleventy’s project goals**.](https://www.zachleat.com/web/introducing-eleventy/)

➡ Keep going! Read [**Getting Started**](/docs/getting-started/).

## Don’t just take my word for it 🌈

There are a bunch of [sites built using Eleventy](/speedlify/). But listen to what these [happy developers](/docs/testimonials/) are saying about Eleventy:

{% include "testimonials.md" %}

## Competitors

This project aims to directly compete with all other Site Generators. We encourage you to try out our competition:

* [Jekyll](https://jekyllrb.com/) (Ruby)
* [Hugo](https://gohugo.io/) (Go)
* [Hexo](https://hexo.io/) (JavaScript)
* [Gatsby](https://www.gatsbyjs.org/) (JavaScript using React)
* [Nuxt](https://nuxtjs.org/) (JavaScript using Vue)
* [Next.js](https://nextjs.org/) (JavaScript using React)
* [Bridgetown](https://www.bridgetownrb.com/) (Ruby)
* [Astro](https://astro.build/) (JavaScript)
* [Remix](https://remix.run/) (JavaScript using React)
* [SvelteKit](https://kit.svelte.dev/) (JavaScript using Svelte)
* _More at [jamstack.org](https://jamstack.org/generators/)_
