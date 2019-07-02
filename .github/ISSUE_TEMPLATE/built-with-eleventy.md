---
name: Built with Eleventy
about: I built something with Eleventy and want to add it to 11ty.io!
title: I built a site with Eleventy!
labels: new-site!
assignees: ''

---

Please supply the following information:

* URL of the live site
* Name of the site
* A text description of the site
* Twitter avatar of either the site or the author
* _Optional_: URL to the source code

---

Sometimes it can take a little bit to get all of these on the live site. If you want a faster turnaround (or want to be nice to our lovely maintainers ❤️), please open a pull request instead!

Build with Eleventy sites each have a separate file in `_data/sites/*.json` with this format: (the `source_url` field is optional)

```json
{
	"url": "https://www.zachleat.com/",
	"name": "Zach Leatherman",
	"description": "A 10+ years-running blog about web development.",
	"twitter": "zachleat",
	"source_url": "https://github.com/zachleat/zachleat.com"
}
```
