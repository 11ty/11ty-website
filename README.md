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

### Performance Rankings

_TODO: make this better_

1. Run `node node-performance-rank`
2. Run `node node-screenshots`
3. Run `node node-avatars`
4. Copy `_data/fastestSites.json` to `leaderboard/history/____-weekX.json`
5. Update `leaderboard/history/node-history` to have a new maximumWeekNumber
6. Run `leaderboard/history/node node-history`
7. Run npx @11ty/eleventy