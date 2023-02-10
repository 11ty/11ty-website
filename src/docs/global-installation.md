---
searchTitle: Install Eleventy Globally
---
# Install Eleventy Globally

{% callout "warn" %}Installing Eleventy globally is a quick way to get started but <strong>it is preferred to use <a href="/docs/getting-started/#step-2-install-eleventy-(optional)"><code>package.json</code> installation</a></strong>. <code>package.json</code> installation will avoid versioning issues if you come back to this project later or decide to use Eleventy on multiple projects.

If you’re planning on deploying your site using a [service like Netlify](/docs/deployment/) (running a build a deployment server), you <strong>must use <code>package.json</code> installation</strong> and **_not_** global installation.{% endcallout %}

_Don’t include `~ $` when you run these commands._

{% codewithprompt "cmdhomedir" %}
npm install -g @11ty/eleventy
{% endcodewithprompt %}

The above adds an `eleventy` command that you can use in any directory.

{% codewithprompt "cmdhomedir" %}
eleventy --version
{% latestVersion versions, config, "" %}
{% endcodewithprompt %}
