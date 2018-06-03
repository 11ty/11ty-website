---
subtitle: Glossary
tags:
  - docs-overview
---

## {{ subtitle }} and Buzzwords

Bask in the warm glow of this _“Nobody ever got fired for buying IBM”_-style feel-good industry jargon.

### Static Sites

### JAMstack

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.—[jamstack.org](https://jamstack.org/)

Eleventy facilitates JAMstack sites—but you maintain full control over the JavaScript.

### Progressive Enhancement

### Data-Driven

### Serverless Friendly

> “You can take your front-end skills and do things that typically only a back-end can do. You can write a JavaScript function that you run and receive a response from by hitting a URL.”—[The Power of Serverless](https://thepowerofserverless.info/) from [Chris Coyier](https://twitter.com/chriscoyier)

Take care to make sure that <span class="buzzword">serverless</span> functions are <span class="buzzword">progressively enhanced</span>. That means they should either run at build time. If you call <span class="buzzword">serverless</span> functions in client-side JavaScript, they should be used for features that are outside the core functionality of the site.

### Lean Web

To be honest I’m not really sure how this relates but it seems marginally/tangentially related.

### Zero Config

Run `eleventy` out of the box with sensible defaults.

### Convention over Configuration Routing

Can you believe that some frameworks require a centralized piece of configuration for routing? `eleventy` routes map the file system, unless you override with a `permalink`.

### Pre-rendered Templates

### Not Server Side Rendered

### Hydration-less

Well, uh, we don’t inject or use any client-side JavaScript in Eleventy, so there’s nothing that needs hydration.

### Apps not App Servers

Application servers can be slow. Instead of PHP, Java, or even Node.js dynamically generating page responses on the fly when the request comes in, have your pre-rendered templates ready to go for delivery! Maximum performance.
