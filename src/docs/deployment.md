---
eleventyNavigation:
  parent: Getting Started
  key: Deployment
  order: 2.5
hosts:
  - name: Netlify
    url: https://www.netlify.com/
    screenshotSize: medium
  - name: Vercel
    url: https://vercel.com/
    screenshotSize: medium
  - name: GitHub Pages
    url: https://pages.github.com/
    screenshotSize: medium
  - name: Cloudflare Pages
    url: https://pages.cloudflare.com/
    iconUrl: https://www.cloudflare.com/
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
---
# Deployment

Now that you’ve built a web site with Eleventy _(even if it’s one HTML page!)_ you might be ready to put it on the web for everyone to see! There are a bunch of different ways to do it!

When deploying your Eleventy site, the goal is to provide your chosen with your project’s **build output** (the `_site` folder by default). The command you run is usually configured via a _build script_ in your `package.json` file. It might look like this:

{% codetitle "package.json" %}

```js
{
  "scripts": {
    "build": "npx @11ty/eleventy"
  }
}
```

## Production Builds

A standard Eleventy build is a production-ready build. Eleventy doesn’t change its build behavior internally for development versus production.

However, if you want to customize Eleventy to do your own optimizations, you may do so with [environment variables](/docs/environment-vars/).

## Deployment Options

Take a look at the list below for some ideas on where to deploy your Eleventy project. There are many deployment options available and this is not an exhaustive list.

<div class="sites-vert sites-vert--lg">
  <div class="lo-grid" style="--lo-margin-v: 5em;">
{%- for site in hosts %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>


### Tutorials

- {% indieweblink "GitHub Pages Tutorial", "https://snook.ca/archives/servers/deploying-11ty-to-gh-pages" %} by {% avatarlocalcache "twitter", "snookca" %}Jonathan Snook
- {% indieweblink "GitLab Pages Sample Project", "https://gitlab.com/bkmgit/11ty" %} by Benson Muite
- {% indieweblink "Azure Static Web Apps Tutorial", "https://squalr.us/2021/05/deploying-an-11ty-site-to-azure-static-web-apps/" %} by {% avatarlocalcache "twitter", "chadschulz" %} Chad Schulz