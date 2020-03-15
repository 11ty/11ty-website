const fastglob = require("fast-glob");
const fs = require("fs-extra");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const NUMBER_OF_RUNS = 3;

function mapResultData(result) {
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

function sortResultData(a, b) {
  if(b.lighthouseScore === a.lighthouseScore) {
    return a.speedIndex - b.speedIndex;
  }
  return b.lighthouseScore - a.lighthouseScore
}

async function runLighthouse(url, opts, config) {
  let results = [];
  for(let j = 0; j < NUMBER_OF_RUNS; j++) {
    results.push(await lighthouse(url, opts, config).then(results => mapResultData(results.lhr)));
  }
  results.sort(sortResultData);
  return results[Math.floor(NUMBER_OF_RUNS / 2)];
}

function run(urls, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(async chrome => {
    opts.port = chrome.port;
    let results = [];
    let count = 0;
    for(let url of urls) {
      console.log( `Running (${++count} of ${urls.length}): ${url}` );
      results.push(await runLighthouse(url, opts, config));
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

  let finalUrls = Array.from(urls); //.slice(0, 3);
  console.log( `Testing ${finalUrls.length} sites:` );

  run(finalUrls, opts).then(results => {
    let finalResults = results.sort(sortResultData);

    finalResults = finalResults.map((entry, index) => {
      entry.rank = index + 1;
      return entry;
    });

    fs.writeFile("./_data/fastestSites.json", JSON.stringify(finalResults, null, 2));

    console.log( finalResults );
  });

})();
