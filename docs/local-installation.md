---
subtitle: Install Locally
tags:
  - docs-getting-started
---
# Think Local, not Global

Rather than using a global install, like so:

```bash
# this is not preferable
npm install -g @11ty/eleventy

# but it does allow you to use `eleventy` anywhere
eleventy
```

Instead, you should install Eleventy locally into your current project. This requires that your project has a `package.json`. If you do not have a `package.json` in your project, use `npm init` to create one.

With a `package.json`, you can install packages locally. For example, this install command will save `@11ty/eleventy` into your project’s `package.json`:

```bash
npm install --save-dev @11ty/eleventy
```

Then use npx to run your local project version:

```bash
npx eleventy
```

Using a local installation is preferable as you’ll run into fewer interoperability issues when using Eleventy on multiple projects. When Eleventy eventually bumps to a new major version, you’ll want the project specific version of Eleventy installed locally.

{% callout "info" %}If you’re planning on deploying your site using a service like Netlify (that will run your build on their servers), you <strong>must use the local installation method</strong> above.{% endcallout %}