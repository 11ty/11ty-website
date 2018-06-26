---
subtitle: Debugging
tags:
  - docs-getting-started
---
# Debugging

Having trouble? Want to see what Eleventy is doing behind the scenes? Use `DEBUG` mode. We’re taking advantage of the [excellent `debug` package](https://www.npmjs.com/package/debug) for this. Enable with the `DEBUG` env variable, either specific to eleventy (`DEBUG=Eleventy*`) or globally (`DEBUG=*`):

```bash
DEBUG=Eleventy* eleventy
```

It’s [different if you’re on Windows](https://www.npmjs.com/package/debug#windows-note).

This will tell you exactly what directories Eleventy is using for data, includes, input, and output. It’ll tell you what search globs it uses to find your templates and what templates it finds. If you’re having trouble, enable this.

{% addedin "0.3.0", "span" %} Works great with `--dryrun` if you want to run Eleventy but not actually write any files.

Read more at the [`debug` package documentation](https://www.npmjs.com/package/debug).