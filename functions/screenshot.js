const puppeteer = require("puppeteer");
const eleventyImage = require("@11ty/eleventy-img");

const DEVICE_NAME = 'iPad landscape';

function isFullUrl(url) {
  try {
    new URL(url);
    return true;
  } catch(e) {
    // invalid url OR local path
    return false;
  }
}

async function screenshot(url, withJs = true) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices[DEVICE_NAME]);

  if(!withJs) {
    page.setJavaScriptEnabled(false);
  }

  await page.goto(url, {
    waitUntil: ["load", "networkidle0"]
  });

  let buffer = await page.screenshot({
    type: "jpeg",
    quality: 100,
  });

  await browser.close();

  let metadata = await eleventyImage(buffer, {
    sourceUrl: url,
    formats: [format],
    widths: [width],
    dryRun: true,
    cacheOptions: {
      dryRun: true,
    }
  });

  if(!metadata[format]) {
    throw new Error(`Invalid \`format\`: ${format}`);
  }

  return metadata[format][0];
}

// Based on https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/13-returning-dynamic-images/functions/return-image.js
exports.handler = async (event, context) => {
  let { url } = event.queryStringParameters;
  let source;

  try {
    if(!isFullUrl(url)) {
      throw new Error(`Invalid \`url\`: ${url}`);
    }

    source = await screenshot(url);
  } catch (error) {
    console.log("Error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': source.sourceType
    },
    body: source.buffer.toString('base64'),
    isBase64Encoded: true
  }
}
