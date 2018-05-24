## Think Local, not Global

Rather than a global install, like so:

```bash
npm install -g @11ty/eleventy
```

You can install locally into your current project, like so:

```bash
npm install --save-dev @11ty/eleventy
```

Then use npx to run your local project version:

```bash
npx eleventy
```

Using a local installation is preferable as you’ll run into fewer interoperability issues when using Eleventy on multiple projects.