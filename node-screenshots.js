const puppeteer = require("puppeteer");
const fastglob = require("fast-glob");
const eleventyImage = require("@11ty/eleventy-img");

// only generate superfeatured screenshots
const superFeaturedOnly = false;
const withJs = false;
const deviceName = 'iPad landscape';
const waitAfterLoad = 1000;

const eleventyImageOptions = {
  formats: ["avif", "webp", "jpeg"],
  widths: [300, 600], // 260-440 in layout
  outputDir: "./img/sites/"
};

async function pause(time) {
  let p = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

  await p;
}

async function screenshot(url, fileSlug) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices[deviceName]);
  // await page.setViewport({
  // 	width: 1024,
  // 	height: 768,
  // 	deviceScaleFactor: 1,
  // });

  // be nice, superfeatured ones go on the home page
  // disable on foursquare because it has a captcha
  if(!withJs) {
    page.setJavaScriptEnabled(false);
  }

  await page.goto(url, {
    waitUntil: ["load", "networkidle0"]
  });
  await pause(waitAfterLoad);


  let buffer = await page.screenshot({
    type: "jpeg",
    quality: 100,
    // encoding: "binary" // defaults to binary
  });
  let options = Object.assign({
    sourceUrl: url,
    filenameFormat: function(id, src, width, format) {
      return `${fileSlug}-${width}${withJs ? "-js" : ""}.${format}`;
    }
  }, eleventyImageOptions);

  await eleventyImage(buffer, options);
  await browser.close();
}

(async () => {
  let sites = await fastglob("./_data/sites/*.json", {
    caseSensitiveMatch: false
  });

  let i = 0;
  for(let site of sites) {
    i++;
    let siteData = require(site);
    if(siteData.url && !siteData.disabled && (!superFeaturedOnly || siteData.superfeatured)) {
      let filename = site.split("/").pop().replace(/\.json/, "");
      console.log( `${i} of ${sites.length}`, "Fetching", siteData.url, "to", filename );
      try {
        await screenshot(siteData.url, filename);
      } catch(e) {
        console.log( ">>> Error:", e );
      }
    } else {
      console.log( `${i} of ${sites.length}`, "Skipping", siteData.url );
    }
  }
})();
