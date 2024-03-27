---
newstitle: "The Stability of Eleventy"
eleventyNavigation:
  parent: Blog
---

In [_The Need for Speed: Why Eleventy Leaves Bundlers Behind_](/blog/newstack/), we discussed the stability of Eleventy.

> “Stability is kind of a hard thing to sell, but our track record of being a five or six-year-old project now and really delivering value to folks over those five or six years speaks for itself,” he added.

And Eleventy _is_ stable. At time of writing, we’ve shipped 56 releases dating back December 2017 and only two of those releases have had Eleventy-specific breaking changes.

Eric Bailey touched on his experience with Eleventy on the [a11yproject.com project](https://www.a11yproject.com/).

> a11yproject.com launched with version 1.0.0 of Eleventy. […] It's been a little under three years and I haven't had to make any adjustments to its dependencies, and it can still install and run from a cold start with no complications. When I update the site to use version 2.0.0 I'll actually be removing dependencies, and not adding more. […] That's rare and special.—[Eric Bailey](https://social.ericwbailey.website/@eric/109914908787346813)

But how best can we communicate and demonstrate stability? In the following video we tackle this complex question with two scenarios:

1. What happens when you return to an old project and want to get it up and running again without making any changes? Here we take our [6 Minute Blog from Scratch](https://www.youtube.com/watch?v=kzf9A9tkkl4) code and see how far back we can take the Eleventy version.
1. What happens when you return to an old project and want to upgrade it to the latest versions of your dependencies? Here we take our [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) starter project (currently at `v8`) and revert the application code to older and older versions to see if they will run with the latest version of Eleventy (`v2.0.1`).

See how it went:

{% youtubeEmbed "bPtQmsjXMuo" %}
