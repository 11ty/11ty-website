const fastglob = require("fast-glob");
const fs = require("fs-extra");
const PerformanceLeaderboard = require("performance-leaderboard");

(async () => {
  let urls = new Set();
  let sites = await fastglob("./_data/sites/*.json", {
    caseSensitiveMatch: false
  });

  for(let site of sites) {
    let siteData = require(site);
    if(!siteData.disabled && siteData.url && !siteData.excludedFromLeaderboards) {
      urls.add(siteData.url);
    }
  }

  let previousResults = require("./_data/fastestSites.json");
  let leaderboardUrls = Array.from(urls);
  // let results = await PerformanceLeaderboard(leaderboardUrls, 5, {readFromLogDirectory: true});
  let results = await PerformanceLeaderboard(leaderboardUrls, 5);

  for(let result of results) {
    let previousResult = previousResults.filter(entry => entry.url === result.url);
    result.previousRank = previousResult.length ? previousResult[0].rank : undefined;
    result.previousAccessibilityRank = previousResult.length ? previousResult[0].accessibilityRank : undefined;
  }
  fs.writeFile("./_data/fastestSites.json", JSON.stringify(results, null, 2));
  fs.writeFile("./_data/fastestSitesMeta.json", JSON.stringify({
    generated: Date.now()
  }, null, 2));

  console.log( results );
})();
