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
    if(!siteData.disabled && siteData.url) {
      urls.add(siteData.url);
    }
  }

  let results = await PerformanceLeaderboard(Array.from(urls));

  fs.writeFile("./_data/fastestSites.json", JSON.stringify(results, null, 2));
  fs.writeFile("./_data/fastestSitesMeta.json", JSON.stringify({
    generated: Date.now()
  }, null, 2));

  console.log( results );
})();
