---
eleventyNavigation:
  parent: Getting Started
  key: Using a CMS
  order: 8
featuredCmses:
  - name: CloudCannon
    url: https://cloudcannon.com/eleventy-cms/?utm_campaign=11ty-partner&utm_source=official-sponsor
    tags: [ Git Based, CMS Partner ]
    class: sites-featured
    screenshotOverride:
      src: "/img/screenshot-fallbacks/cloudcannon-cms.png"
      alt: "The Eleventy CMS for Visual Editing, CloudCannon CMS"
cmses:
  - name: WordPress REST API
    url: https://developer.wordpress.org/rest-api/
    screenshotSize: medium
    tags: [ API ]
  - name: Strapi
    url: https://strapi.io/
    screenshotSize: medium
    tags: [ API ]
  - name: Contentful
    url: https://www.contentful.com/
    screenshotSize: medium
    tags: [ API ]
  - name: Sanity
    url: https://www.sanity.io/
    screenshotSize: medium
    tags: [ API ]
  - name: Notion
    url: https://developers.notion.com/
    screenshotSize: medium
    tags: [ API ]
  - name: DecapCMS
    url: https://decapcms.org/
    screenshotSize: medium
    tags: [ Git Based ]
  - name: Spinal
    url: https://spinalcms.com/
    screenshotSize: medium
    tags: [ Git Based ]
  - name: Wix Headless
    url: https://www.wix.com/developers/headless/
    tags: [ API ]
  - name: Storyblok
    url: https://www.storyblok.com/
    screenshotSize: medium
    tags: [ API ]
  - name: Webflow CMS
    url: https://webflow.com/cms
    tags: [ API ]
  - name: Prismic
    url: https://prismic.io/
    screenshotSize: medium
    tags: [ API ]
  - name: Ghost
    url: https://ghost.org/
    tags: [ API ]
  - name: Agility CMS
    url: https://agilitycms.com/
    screenshotSize: medium
    tags: [ API ]
  - name: Builder.io
    url: https://www.builder.io/
    screenshotSize: medium
    tags: [ API ]
  - name: Publii
    url: https://getpublii.com/
    screenshotSize: medium
    tags: [ Git Based ]
---
# Using a CMS

{% tableofcontents %}

_Content Management Systems_ (CMS) allow you to add a web-based interface to your web site to edit the content, allowing both technical and non-technical folks the ability to update your web site on-the-go.

Eleventy (like most site generators) is not tightly coupled to any CMS and offers the flexibility to work with a wide variety of available industry and community options! Content Management Systems decoupled in this way are known as Headless.

## Headless, not a Monolith

Headless CMS options provide a variety of benefits that will be immediately recognizable to developers familiar with more tightly-coupled/monolithic options (where the front-end and the back-end are co-dependent on each other).

Chief among those benefits: using Headless allows developers to have more control over their front-end. This alleviates pressure on front-end performance and accessibility common to monolithic options. (It should also be noted that traditionally tightly-coupled solutions like Drupal, Joomla, or WordPress are also starting to offer Headless options too.)

### Types of Headless

There are two main types of Headless CMS:

1. **Source Control**: checks files directly into your code repository (`git` is a very popular one). You may hear these referred to as a `git`-Based CMS. A few benefits of this approach:
	* Your data and content are already versioned.
	* No data migration is needed if you decide to swap providers—it’s [baked in (not fried)](http://www.aaronsw.com/weblog/000404).
	* Works as-is with your existing deployment process, including branch/test/pre-production deploy previews.
1. **API Based**: provide an external API that can be queried in your build or serverless functions. This approach gives you access to a powerful query language that can unlock access to complex data structures.

## Headless CMS Providers

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in featuredCmses %}
{% include "site-card.njk" %}
{%- endfor %}
{%- for site in cmses | shuffle %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>

_The list above is not meant to be exhaustive._

## Related

<div class="youtube-related">
  {%- youtubeEmbed "yXcxvBJuULU", " From Zero to CMS in 2 Minutes with CloudCannon and Eleventy" -%}
</div>

### From the Community

- {% indieweblink "CMS category on 11tybundle.dev", "https://11tybundle.dev/categories/cms/" %} curated by Bob Monsour
- {% indieweblink "Headless CMS List on Jamstack.org", "https://jamstack.org/headless-cms/" %}