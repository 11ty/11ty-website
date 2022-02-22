---
eleventyNavigation:
  key: Deployment
  order: 7
---

# {{ subtitle }}

Deploying your Eleventy site is the **fine reward** you receive for crafting it. This section contains options for deploying your site, making it available for all those wishing to see your work.

When deploying your Eleventy site, the goal is to provide a web host with your **build output**, this is the result of running the `build` script from a `package.json` file.

## Production Builds

When deploying to production, use the `ELEVENTY_PRODUCTION=true` setting before your `eleventy` build command. This will generate a build that is **optimized and production ready**.

Your build script will look like the one below:

```bash
# Sets the build target to production
ELEVENTY_PRODUCTION=true eleventy
```

## Deployment Options

Take a look at the list below for some ideas on where to deploy your Eleventy project.

- [ZEIT Now](/docs/zeit-now/): Single command deployments.

> There are many options available for deploying your Eleventy project and this is not an exhaustive list.

➡ Start deploying! Deploy with [**ZEIT Now**](/docs/zeit-now/).
