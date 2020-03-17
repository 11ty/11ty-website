const fastglob = require("fast-glob");
const fs = require("fs-extra");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const NUMBER_OF_RUNS = 3;

async function runLighthouse(urls) {
  let opts = {
    onlyCategories: ["performance"]
  };
  let config = null;
  let resultLog = new ResultLogger();

  // SpeedIndex was much lower on repeat runs if we don’t
  // kill the chrome instance between runs of the same site
  for(let j = 0; j < NUMBER_OF_RUNS; j++) {
    let count = 0;
    let chrome = await chromeLauncher.launch({chromeFlags: opts.chromeFlags});
    opts.port = chrome.port;

    for(let url of urls) {
      console.log( `(Site ${++count} of ${urls.length}, run ${j+1} of ${NUMBER_OF_RUNS}): ${url}` );
      let rawResult = await lighthouse(url, opts, config).then(results => results.lhr);
      resultLog.add(url, rawResult);
    }

    await chrome.kill();
  }

  return resultLog.getFinalSortedResults();
}

class ResultLogger {
  constructor() {
    this.results = {};
  }

  static sortResultData(a, b) {
    if(b.lighthouseScore === a.lighthouseScore) {
      return a.speedIndex - b.speedIndex;
    }
    return b.lighthouseScore - a.lighthouseScore
  }


  add(url, rawResult) {
    if(!this.results[url]) {
      this.results[url] = [];
    }
    this.results[url].push(this.mapResult(rawResult));
  }

  mapResult(result) {
    if(result.requestedUrl.startsWith("https://github.com/")) {
      return {
        url: result.requestedUrl
      };
    }

    return {
      url: result.requestedUrl,
      finalUrl: result.finalUrl,
      lighthouseScore: result.categories.performance.score,
      firstContentfulPaint: result.audits['first-contentful-paint'].numericValue,
      firstMeaningfulPaint: result.audits['first-meaningful-paint'].numericValue,
      speedIndex: result.audits['speed-index'].numericValue,
    };
  }

  getMedianResultForUrl(url) {
    if(this.results[url] && this.results[url].length) {
      // Log all runs
      // console.log( this.results[url] );
      return this.results[url].filter(() => true).sort(ResultLogger.sortResultData)[Math.floor(this.results[url].length / 2)];
    }
  }

  getFinalSortedResults() {
    let finalResults = [];
    for(let url in this.results) {
      finalResults.push(this.getMedianResultForUrl(url));
    }
    finalResults.sort(ResultLogger.sortResultData).map((entry, index) => {
      entry.rank = index + 1;
      return entry;
    });

    return finalResults;
  }
}

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

  let finalUrls = Array.from(urls);
  console.log( `Testing ${finalUrls.length} sites:` );

  let results = await runLighthouse(finalUrls);
  fs.writeFile("./_data/fastestSites.json", JSON.stringify(results, null, 2));
  fs.writeFile("./_data/fastestSitesMeta.json", JSON.stringify({
    generated: Date.now()
  }, null, 2));

  console.log( results );
})();
