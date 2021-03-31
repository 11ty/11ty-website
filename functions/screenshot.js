const { builderFunction } = require("@netlify/functions");
const eleventyImage = require("@11ty/eleventy-img")
const chromium = require('chrome-aws-lambda');

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
  const browser = await chromium.puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      defaultViewport: { // Macbook 13″
        width: 1440,
        height: 900
      },
      headless: chromium.headless,
  });

  const page = await browser.newPage();

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

  return buffer;
}

// Based on https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/13-returning-dynamic-images/functions/return-image.js
async function handler(event, context) {
  let { url, js, width, format } = event.queryStringParameters;

  try {
    if(!isFullUrl(url)) {
      throw new Error(`Invalid \`url\`: ${url}`);
    }

    let buffer = await screenshot(url, js !== "false");
    let metadata = eleventyImage(buffer, {
      formats: [format || "jpeg"],
      widths: [width || 600], // 260-440 in layout
      dryRun: true,
      cacheOptions: {
        dryRun: true,
      }
    });

    let sources = metadata[format];

    if(!Array.isArray(sources) || sources.length === 0) {
      throw new Error(`Invalid \`format\`: ${format}`);
    }

    let source = sources[0];

    return {
      statusCode: 200,
      headers: {
        "content-type": source.soucceType
      },
      body: source.buffer.toString('base64'),
      isBase64Encoded: true
    }
  } catch (error) {
    console.log("Error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
}

exports.handler = builderFunction(handler);
