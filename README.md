<p align="center"><img src="https://www.11ty.dev/img/logo-github.png" alt="eleventy Logo"></p>

# 11ty.dev 🕚⚡️🎈🐀

* https://www.11ty.dev/

The website and documentation for the [Eleventy static site generator](https://github.com/11ty/eleventy/).

## Running Locally

```
npm install
npx @11ty/eleventy --serve
```

Browse to http://localhost:8080/ (8080 is the default but it’ll bump to a new port if that one is taken, so use whatever port shows up when you run the `--serve` command).

* Refresh Avatars: `npm run get-new-avatars`
* Refresh Supporters: `npm run get-new-supporters`

## Third-party Integrations

* [IFTTT](https://ifttt.com/) daily web hook to build the site once a day to update stats and counts in footer.
* [Zapier](https://zapier.com/) (Open Collective + Netlify integration) to run a new production build when a new contributor joins Open Collective. _Warning: while avatar will show on the site, there is still a manual step to send the Netlify Identity invitation for the Eleventy Contributor Account._

## Contributed Data

* `cd _data/sites` and `find . -iregex "./[a-z]*\.[a-z]*.json"` Find global data files with a `.` in the name.