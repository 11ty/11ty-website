const fastglob = require("fast-glob");
const fs = require("fs-extra");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

function run(urls = [], opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(async chrome => {
    opts.port = chrome.port;
    let results = [];
    let count = 0;
    for(let url of urls) {
      console.log( `Running (${++count} of ${urls.length}): ${url}` );
      results.push(await lighthouse(url, opts, config).then(results => results.lhr));
    }

    return chrome.kill().then(() => results);
  });
}

const opts = {
  onlyCategories: ["performance"]
};

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

  console.log( `Testing ${urls.size} sites:` );

  run(Array.from(urls), opts).then(results => {
    let finalResults = results.map(result => {
      return {
        url: result.requestedUrl,
        finalUrl: result.finalUrl,
        lighthouseScore: result.categories.performance.score,
        firstContentfulPaint: result.audits['first-contentful-paint'].numericValue,
        firstMeaningfulPaint: result.audits['first-meaningful-paint'].numericValue,
        speedIndex: result.audits['speed-index'].numericValue,
      };
    }).sort((a, b) => {
      if(b.lighthouseScore === a.lighthouseScore) {
        return a.speedIndex - b.speedIndex;
      }
      return b.lighthouseScore - a.lighthouseScore
    });

    finalResults = finalResults.map((entry, index) => {
      entry.rank = index + 1;
      return entry;
    });

    fs.writeFile("./_data/fastestSites.json", JSON.stringify(finalResults, null, 2));

    console.log( finalResults );
  });

})();
