---
eleventyNavigation:
  parent: Deployment
  key: ZEIT Now
  order: 1
---

# ZEIT Now

ZEIT Now is a cloud platform for websites and serverless APIs, that you can use to deploy your Eleventy projects to your personal domain (or a free .now.sh suffixed URL).

This guide will show you how to get started in a few quick steps:

## Step 1: Installing Now CLI

To install their command-line interface with npm, run the following command:

```bash
# Globally installs Now CLI
npm install -g now
```

## Step 2: Deploying

You can deploy your application by running the following command in the root of the project directory:

```bash
# Deploys Eleventy sites with a single command
now
```

Alternatively, you can also use their integrations for GitHub, GitLab, or Bitbucket.

That's all!

Your site will deploy, and you will receive a link similar to the following: <https://eleventy.now-examples.now.sh>
