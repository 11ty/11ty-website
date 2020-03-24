---
name: Built with Eleventy
about: I built something with Eleventy and want to add it to 11ty.dev!
title: I built a site with Eleventy!
labels: new-site!
assignees: ''

---
If you want to list your site on 11ty.dev you must create a Pull Request. Unfortunately we can no longer keep up with the scale of creating these files manually from GitHub issues.

To do this, create a new file in `_data/sites/*.json` with this format: (the `source_url` field is optional)

```json
{
	"url": "https://www.zachleat.com/",
	"name": "Zach Leatherman’s Blog",
	"description": "A 10+ years-running blog about web development.",
	"twitter": "zachleat",
	"authoredBy": [""],
	"source_url": "https://github.com/zachleat/zachleat.com"
}
```

* `url`: The site’s production URL
* `name`: Name of the site
* `description`: A short text description of the site
* `twitter`: Twitter username for the site or the site’s author.
* `authoredBy`: An array of Twitter usernames of the site’s authors. Supplements the `twitter` entry. (Optional)
* `source_url`: URL to the source code (Optional)
