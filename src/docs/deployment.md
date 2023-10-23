---
eleventyNavigation:
  parent: Getting Started
  key: Deployment
  order: 7
featuredHosts:
  - name: "Want your logo here? Contact us!"
    url: ""
    tags: [ Hosting Partner ]
    class: sites-featured
    screenshotSize: opengraph
hosts:
  - name: Cloudflare Pages
    url: https://pages.cloudflare.com/
    iconUrl: https://www.cloudflare.com/
    screenshotSize: medium
  - name: Netlify
    url: https://app.netlify.com/
    screenshotSize: medium
  - name: Netlify Drop
    url: https://app.netlify.com/drop
    screenshotSize: medium
  - name: Vercel
    url: https://vercel.com/signup
    screenshotSize: medium
  - name: GitHub Pages
    url: https://pages.github.com/
    screenshotSize: medium
  - name: GitLab Pages
    url: https://docs.gitlab.com/ee/user/project/pages/
    screenshotSize: medium
  - name: Render
    url: https://render-web.onrender.com/
    screenshotSize: medium
  - name: Azure Static Web Apps
    url: https://azure.microsoft.com/en-us/services/app-service/static/
    screenshotSize: medium
  - name: Layer0
    url: https://docs.layer0.co/guides/eleventy
    screenshotSize: medium
  - name: Begin
    url: https://begin.com/
    screenshotSize: medium
  - name: Digital Ocean
    url: https://www.digitalocean.com/community/tutorials/how-to-create-and-deploy-your-first-eleventy-website
    screenshotSize: medium
  - name: Codeberg Pages
    url: https://codeberg.page/
    screenshotSize: medium
  - name: Kinsta
    url: https://kinsta.com/
    screenshotSize: medium
clis:
  - name: Netlify CLI
    url: https://www.netlify.com/products/cli/
    screenshotSize: medium
  - name: Vercel CLI
    url: https://vercel.com/cli
    screenshotSize: medium
webides:
  - name: Glitch
    url: https://glitch.com/
    screenshotSize: medium
    hideRelatedLinks: true
---
# Deployment

{% tableofcontents %}

Now that you’ve built a web site with Eleventy _(even if it’s one HTML page!)_ you might be ready to put it on the web for everyone to see! There are a bunch of different ways to do it!

## Use a Build Script

When deploying your Eleventy site, the goal is to provide your chosen host with your project’s **build output** (the `_site` folder by default). The command you run is usually configured via a _build script_ in your `package.json` file. It might look like this:

{% codetitle "package.json" %}

```js
{
  "scripts": {
    "build": "npx @11ty/eleventy"
  }
}
```

### Production Builds

A standard Eleventy build is a production-ready build. Eleventy doesn’t change its build behavior internally for development versus production.

However, if you want to customize Eleventy to do your own optimizations, you may do so with [environment variables](/docs/environment-vars/).

## Providers

Take a look at the list below for some ideas on where to deploy your Eleventy project. There are many deployment options available and this is not meant to be an exhaustive list.

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in featuredHosts %}
{% include "site-card.njk" %}
{%- endfor %}
{%- for site in hosts | shuffle %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>

### Edit on the Web

There are some great Web editors popping up that you can use to run and edit Eleventy projects online! Here are some options:

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in webides %}
{% set hideRelatedLinks = site.hideRelatedLinks %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>


## Related

<div class="youtube-related">
  {%- youtubeEmbed "JCQQgtOcjH4", "New deployment docs (Weekly №2)", "72" -%}
</div>

## Community Resources

- {% indieweblink "GitHub Pages Tutorial", "https://snook.ca/archives/servers/deploying-11ty-to-gh-pages" %} by {% avatarlocalcache "twitter", "snookca" %}Jonathan Snook
- [GitLab Pages Sample Project](https://gitlab.com/bkmgit/11ty) by Benson Muite
- {% indieweblink "Azure Static Web Apps Tutorial", "https://squalr.us/2021/05/deploying-an-11ty-site-to-azure-static-web-apps/" %} by {% avatarlocalcache "twitter", "chadschulz" %} Chad Schulz
- {% indieweblink "Hosting Eleventy on GitHub Pages", "https://quinndombrowski.com/blog/2022/05/07/hosting-eleventy-on-github-pages/" %} by {% avatarlocalcache "twitter", "quinnanya" %}Quinn Dombrowski
- {% indieweblink "Deploying Eleventy using Buddy CI/CD", "https://buddy.works/guides/buddy-eleventy" %} by {% avatarlocalcache "twitter", "palmiak_fp" %}Maciek Palmowski
- [GitHub Action for Eleventy](https://github.com/marketplace/actions/eleventy-action) by {% communityavatar "TartanLlama", "Sy Brand" %}@TartanLlama
