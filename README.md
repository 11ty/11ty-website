# 11ty.dev

* https://www.11ty.dev/
* https://www.11ty.dev/docs/

The website and documentation for the [Eleventy static site generator](https://github.com/11ty/eleventy/).

## Running Locally

```
npm install
npx @11ty/eleventy --serve
```

Browse to http://localhost:8080/ (8080 is the default but it’ll bump to a new port if that one is taken, so use whatever port shows up when you run the `--serve` command).

* Refresh Screenshots: `npm run get-new-screenshots`
* Refresh Avatars: `npm run get-new-avatars`
* Refresh Supporters: `npm run get-new-supporters`

## Third-party Integrations

* [IFTTT](https://ifttt.com/) daily web hook to build the site once a day to update stats and counts in footer.
* [Zapier](https://zapier.com/) (Open Collective + Netlify integration) to run a new production build when a new contributor joins Open Collective. _Warning: while avatar will show on the site, there is still a manual step to send the Netlify Identity invitation for the Eleventy Contributor Account._