---
eleventyNavigation:
  parent: Using Data
  key: Environment Variables
  order: 1.5
---
# Environment Variables

You can set and use your own environment variables in your projects. They will be available in your code via [Node.js’ `process.env` property](https://nodejs.org/api/process.html#process_process_env).

These are typically used for setting your deployment context and private API keys. This is also the approach used to [enable `DEBUG` mode](/docs/debugging/).

[[toc]]

## Setting your own

### Via `.env` file

For private keys and other sensitive information, you’ll want to create a `.env` file and use [the `dotenv` package](https://github.com/motdotla/dotenv) to setup those values.

{% callout "warn", "md" %}**Make sure you add `.env` to your `.gitignore` file. Do _not_ commit your `.env` file to your repository!!**{% endcallout %}

### Via the command line

#### Mac OS (or Linux, etc)

```bash
MY_ENVIRONMENT=production npx @11ty/eleventy
```

#### Windows cmd.exe

```bash
set MY_ENVIRONMENT=production & npx @11ty/eleventy
```

#### Windows Powershell (VS Code default)

```bash
$env:MY_ENVIRONMENT="production"; npx @11ty/eleventy
```

### Via an npm script

You can also use the above commands in an npm script in your project’s `package.json` file.

{% codetitle "package.json" %}

```js
{
  "scripts": {
    "build:prod": "MY_ENVIRONMENT=production npx @11ty/eleventy"
  }
}
```

## Use Case Ideas

* [Expose Environment Variables to your templates using JavaScript Data Files](/docs/data-js/#example-exposing-environment-variables).
* [Opt-in to `git Last Modified` only in production](/docs/dates/)
* [Only perform Eleventy Serverless plugin copy (via `copyEnabled`) in production](/docs/plugins/serverless/#bundler-options)
* Use fewer image formats in the [Image plugin](/docs/plugins/image/) to speed up local development

## Eleventy Supplied {% addedin "1.0.0" %}

[Node.js exposes environment variables under `process.env`](https://nodejs.org/api/process.html#process_process_env).

Eleventy also supplies its own Eleventy-specific environment variables, usually intended for more advanced use cases. You can use these in your configuration or in data files as needed.

* `process.env.ELEVENTY_ROOT` the absolute path to the directory in which you’ve run the Eleventy command.
* `process.env.ELEVENTY_SOURCE` is the method in which Eleventy has run, current either `cli` or `script`.
* `process.env.ELEVENTY_SERVERLESS` is set to `true` (String) if Eleventy is running in [serverless mode](/docs/plugins/serverless/). If Eleventy is _not_ running in serverless mode—due to Node forcing environment variables to be strings—this variable will not exist.
