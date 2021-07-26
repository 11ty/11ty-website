---
eleventyNavigation:
  parent: Getting Started
  key: Debugging
  order: 3
---
# Debugging

Having trouble? Want to see what Eleventy is doing behind the scenes? Use `DEBUG` mode. We’re taking advantage of the [excellent `debug` package](https://www.npmjs.com/package/debug) for this.

`debug` will tell you exactly what directories Eleventy is using for data, includes, input, and output. It’ll tell you what search globs it uses to find your templates and what templates it finds. If you’re having trouble, enable this.

This makes use of something called Environment variables to enable, specifically the `DEBUG` environment variable. In this case we’re just putting some text before the command we use to run Eleventy.

## Commands

### Mac OS (or Linux, etc)

What is the difference between Local and [Global installation](/docs/global-installation/)?

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-h: 1em; --lo-margin-v: .5em">
	<div class="lo-c">Installed Globally</div>
	<div class="lo-c lo-maxgrow">{% highlight "bash" %}DEBUG=Eleventy* eleventy{% endhighlight %}</div>
</div>

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-h: 1em; --lo-margin-v: .5em">
	<div class="lo-c">Installed Locally</div>
	<div class="lo-c lo-maxgrow">{% highlight "bash" %}DEBUG=Eleventy* npx @11ty/eleventy{% endhighlight %}</div>
</div>

### Windows

What is the difference between Local and [Global installation](/docs/global-installation/)?

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-h: 1em; --lo-margin-v: .5em">
	<div class="lo-c">Installed Locally</div>
	<div class="lo-c lo-maxgrow">{% highlight "bash" %}set DEBUG=Eleventy* & npx @11ty/eleventy{% endhighlight %}</div>
</div>

<div class="lo" style="--lo-stackpoint: 30em; --lo-margin-h: 1em; --lo-margin-v: .5em">
	<div class="lo-c">Installed Globally</div>
	<div class="lo-c lo-maxgrow">{% highlight "bash" %}set DEBUG=Eleventy* & eleventy{% endhighlight %}</div>
</div>

Read more about [Windows environment variables](https://www.npmjs.com/package/debug#windows-command-prompt-notes).

## Learn More

Read more at the [`debug` package documentation](https://www.npmjs.com/package/debug).

### Try with `--dryrun`

{% addedin "0.3.0" %} Works great with `--dryrun` if you want to run Eleventy but not actually write any files.

### View all messages

The commands above limit the messages from `debug` to Eleventy specific things with `DEBUG=Eleventy*` but you can view all of the messages from any dependency with `DEBUG=*`.

### Analyze Performance

{% addedin "0.11.0" %} Read more about how to [use `debug` to analyze the performance of your Eleventy build](/docs/debug-performance/).

## Debug individual variables

{% addedin "0.11.0" %} In addition to using `debug`, you can use the global filter [`log`](/docs/filters/log) to `console.log` anything from inside a template file.