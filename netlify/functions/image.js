const { builder } = require("@netlify/functions");
const eleventyImage = require("@11ty/eleventy-img");

/* Works with _redirects (:width and :format are optional)

/api/image/:url/ /.netlify/functions/image 200!
/api/image/:url/:width/ /.netlify/functions/image 200!
/api/image/:url/:width/:format/ /.netlify/functions/image 200!

*/

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
  // Links have the format /api/image/:url/:width/:format/
  // Where :dimensions are the viewport dimensions of the browser doing the screenshot
  // e.g. /api/image/https%3A%2F%2Fwww.11ty.dev%2F/420x580/
  let pathSplit = event.path.split("/").filter(entry => !!entry);
  let [,, url, width, format] = pathSplit;

  url = decodeURIComponent(url);
  width = parseInt(width, 10);

  try {
    if(!isFullUrl(url)) {
      // it’s a path instead
      url = `https://www.11ty.dev${url}`;
    }

    let metadata = await eleventyImage(url, {
      formats: [format || "auto"],
      widths: [width || "auto"],
      dryRun: true,
      cacheOptions: {
        dryRun: true,
      }
    });

    if(!format) {
      format = Object.keys(metadata).pop();
    }

    let sources = metadata[format];
    if(!Array.isArray(sources) || sources.length === 0) {
      throw new Error(`Invalid \`format\`: ${format}`);
    }

    return {
      statusCode: 200,
      headers: {
        "content-type": sources[0].sourceType
      },
      body: sources[0].buffer.toString('base64'),
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
