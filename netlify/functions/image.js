const { builder } = require("@netlify/functions");
const eleventyImage = require("@11ty/eleventy-img")

function isFullUrl(url) {
  try {
    new URL(url);
    return true;
  } catch(e) {
    // invalid url OR local path
    return false;
  }
}

// Based on https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/13-returning-dynamic-images/functions/return-image.js
async function handler(event, context) {
  let { url, width, format } = event.queryStringParameters;

  try {
    if(!isFullUrl(url)) {
      throw new Error(`Invalid \`url\`: ${url}`);
    }

    if(!format) {
      format = "jpeg"
    }

    let metadata = await eleventyImage(url, {
      formats: [format],
      widths: [parseInt(width, 10) || 600], // 260-440 in layout
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

exports.handler = builder(handler);
