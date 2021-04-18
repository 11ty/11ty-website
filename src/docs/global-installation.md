---
searchTitle: Install Eleventy Globally
---
# Install Eleventy Globally

{% callout "warn" %}Installing globally is a quick way to get started but <strong>it is preferred to use <a href="/docs/getting-started/">local project installation</a> instead</strong>. Local installation will cause fewer interoperability issues later if you use Eleventy on multiple projects that may want to use different Eleventy versions.{% endcallout %}

_Don’t include `~ $` when you run these commands._

{% codewithprompt "cmdhomedir", "first" %}
npm install -g @11ty/eleventy
{% endcodewithprompt %}

The above adds an `eleventy` command that you can use in any directory.

{% codewithprompt "cmdhomedir", "first" %}
eleventy --version
{% latestVersion versions, config, "" %}
{% endcodewithprompt %}

{% callout "info" %}If you’re planning on deploying your site using a service like Netlify (that will run your build on their servers), you <strong>must use the local installation method</strong> and not global installation.{% endcallout %}

## Old, outdated `eleventy-cli`

If you see `0.1.9` after you run `eleventy --version` you have installed the deprecated [`eleventy-cli`](https://www.npmjs.com/package/eleventy-cli) instead. We renamed Eleventy to use our `@11ty` npm organization a long time ago. You will need to uninstall `eleventy-cli`:

{% codewithprompt "cmdhomedir", "first" %}
npm uninstall -g eleventy-cli
{% endcodewithprompt %}
