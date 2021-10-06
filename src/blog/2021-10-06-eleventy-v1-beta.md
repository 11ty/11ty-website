---
newstitle: "The very first Eleventy 1.0 Beta Release"
eleventyNavigation:
  parent: Blog
---
It is my absolute honor to announce that the very first Eleventy 1.0 Beta release is now available on the beta channel. You can try it out now:

{% highlight "bash" %}
# Local project
npm install @11ty/eleventy@beta

# Global install
npm install @11ty/eleventy@beta -g
{% endhighlight %}

## The Big Features:

* Requires Node 12+
* [Eleventy Serverless](https://www.11ty.dev/docs/plugins/serverless/), a fantastic way to do dynamic server side rendering on request or lazily via Distributed Persistent Rendering.
* A plugin to help you upgrade from `0.x` to `1.x`: https://github.com/11ty/eleventy-upgrade-help
* Support for CLI arguments to do JSON and NDJSON output (instead of writing to the file system). Use `--to=json` and `--to=ndjson`.
* [Custom File Extension Handlers!](https://github.com/11ty/eleventy/issues/117) Plugins can now add their own template types and tie them to a file extension.
* Enables the [Data Deep Merge feature by default](https://www.11ty.dev/docs/data-deep-merge/).
* Upgrades to internal template language plugins for: `ejs`, `mustache`, `liquid`. Removes `jstl` (use `11ty.js` instead)
* And more! [Check out the full list of 135+ issues in the GitHub milestone.](https://github.com/11ty/eleventy/milestone/32?closed=1)