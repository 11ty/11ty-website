---
newstitle: "Securely Publishing our Packages to npm"
eleventyNavigation:
  parent: Blog
---
As we harden our release practices in the wake of numerous recent vulnerabilities in npm packages amongst high profile authors, it seems worthwhile to celebrate a major milestone for 11ty core and our official suite of plugins: _we are now npm Access Token-free!_

The `@11ty/*` ecosystem on npm is now fully migrated to [Trusted Publishers](https://docs.npmjs.com/trusted-publishers).

If you’re interested in taking steps to improve your own security footprint, you can read more about the steps we took at [_No more tokens! Locking down npm Publish Workflows_](ttps://www.zachleat.com/web/npm-security/)

<a href="https://www.zachleat.com/web/npm-security/" style="display: block; max-width: 16em;">{% getScreenshotHtml "No more tokens! Locking down npm Publish Workflows", "https://www.zachleat.com/web/npm-security/" %}</a>
