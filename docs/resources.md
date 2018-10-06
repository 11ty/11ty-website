---
subtitle: Glossary
tags:
  - docs-overview
---

# {{ subtitle }} and Buzzwords

Bask in the warm glow of this _“Nobody ever got fired for buying IBM”_-style feel-good industry jargon.

Our industry can be particularly bad about inventing words for things that already exist. Hopefully this page will help you navigate the labyrinth.

_Work in progress: {% include "edit-on-github.njk" %}_

## Static Sites

A static site is a group of generated HTML files. Content is built into the HTML files rather than using a dynamic back end language to generate the content on-the-fly. A dynamic site can appear static when you add caching rules to make the content stickier. A static site can appear dynamic when you run your build quickly and often.

## JAMstack

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.—[jamstack.org](https://jamstack.org/)

Eleventy facilitates JAMstack sites—but you maintain full control over the JavaScript.

## Progressive Enhancement

<!-- You’re safe here. But a static site generator that is Progressive Enhancement friendly is only the beginning. -->

## Data-Driven

Make components and markup data-driven so that you don’t have a bunch of one-off copy-pasted HTML instances littered throughout your project.

## Serverless Friendly

> “You can take your front-end skills and do things that typically only a back-end can do. You can write a JavaScript function that you run and receive a response from by hitting a URL.”—[The Power of Serverless](https://thepowerofserverless.info/) from [Chris Coyier](https://twitter.com/chriscoyier)

Take care to make sure that <span class="buzzword">serverless</span> functions are <span class="buzzword">progressively enhanced</span>. That means they should either run at build time. If you call <span class="buzzword">serverless</span> functions in client-side JavaScript, they should be used for features that are outside the core functionality of the site.

## Lean Web

To be honest it’s kind of a stretch to relate Lean methodology to this project but the term just kinda feels right.

## Zero Config

Zero config means that Eleventy can run without any command line parameters or configuration files.

We’ve taken care to setup Eleventy so that that running the stock  `eleventy` command uses sensible defaults. Lower the barrier to entry for that first project build to get up and running faster.

## Convention over Configuration Routing

Can you believe that some frameworks require a centralized piece of configuration for routing? `eleventy` routes map the file system, unless you override with a `permalink`.

## They’re not Server Side Rendered, they’re Pre-rendered

With the rise of client side rendering of templates in JavaScript came significant performance problems, especially with users of less-capable (but none-the-less still modern) hardware. Did you know they’re selling new mobile devices that are pretty hardware-limited?

Many frameworks switched to Server Side Rendering, which meant running an application server with middleware that would render the markup on demand for each request. While this is valuable, static sites are different. The templates are all generated (some call this pre-rendering) at build time for maximum performance. This way the web server only needs to fetch the static file and send it back to the user.

## Hydration-less

Well, uh, we don’t inject or use any client-side JavaScript in Eleventy, so there’s nothing that needs hydration.

## Apps not App Servers

Application servers can be slow. Instead of PHP, Java, or even Node.js dynamically generating page responses on the fly when the request comes in, have your pre-rendered templates ready to go for delivery! Maximum performance.
