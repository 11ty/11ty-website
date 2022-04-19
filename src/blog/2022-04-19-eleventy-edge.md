---
newstitle: Use Eleventy Edge to deliver dynamic web sites on the Edge
eleventyNavigation:
  parent: Blog
  key: Eleventy Edge
homePageHighlight: true
---
I am very proud to introduce a brand new addition to Eleventy: Eleventy Edge.

Eleventy Edge is an exciting new way to add dynamic content to your Eleventy templates. With a simple Eleventy shortcode you can opt-in a part of your Eleventy template to run on an Edge server, allowing your site to use dynamic, user-specific content!

* **[Eleventy Edge Plugin documentation](/docs/plugins/edge/)**
* **[Eleventy Edge Demos](https://demo-eleventy-edge.netlify.app/)**

Here are a few ideas of things you could do with the new Eleventy Edge plugin:

* Any user personalized content (User accounts, premium-only content, AB testing)
* Accessing/setting HTTP Headers (e.g. Cookies, Save-Data, Client Hints, etc)
* Handling Forms
* Using Geolocation information to localize content

You can use Eleventy Edge with your existing projects and templates—render just a portion of your build template on the Edge:

```html
The content outside of the <code>edge</code> shortcode is generated with the Build.

{% raw %}{% edge %}
The content inside of the <code>edge</code> shortcode is generated on the Edge.

Use a query param value here.
Use a cookie value here.
All without clientside JS.
{% endedge %}{% endraw %}
```

This feature makes heavy use of [Netlify’s new Edge Functions feature](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/) to run Eleventy in Deno on Edge servers. It continues Eleventy’s architectural dedication to markup-first zero-clientside JavaScript solutions to deliver the fast and scalable dynamic web sites. Check out our [introductory demos](https://demo-eleventy-edge.netlify.app/) and watch for more content to come discussing this exciting new feature.

Check out this [more advanced example showing Eleventy Edge rendering a Dark mode/Light mode toggle](https://demo-eleventy-edge.netlify.app/appearance/), deferring to a system preference, without any clientside JavaScript