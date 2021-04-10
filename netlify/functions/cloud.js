const path = require("path");
const fs = require("fs");
const Eleventy = require("@11ty/eleventy");
const UrlPattern = require("url-pattern");
const { builderFunction } = require("@netlify/functions");
const debug = require("debug");

// For the bundler
const Cache = require("@11ty/eleventy-cache-assets");

function getRootDir() {
  let paths = [
    // /var/task/src/netlify/functions/cloud/src/
    path.join(process.cwd(), `netlify/functions/cloud/`), // on netlify dev
    path.join(process.cwd(), `src/netlify/functions/cloud/`), // netlify function
  ];
  for(let path of paths) {
    if(fs.existsSync(path)) {
      return path;
    }
  }

  throw new Error(`No path found in ${paths}`);
}

function matchUrlPattern(map, path) {
  for(let url in map) {
    let pattern = new UrlPattern(url);
    let result = pattern.match(path);
    if(result) {
      return {
        pathParams: result,
        inputPath: map[url]
      };
    }
  }
  throw new Error(`No matching URL found for ${path} in ${JSON.stringify(map)}`);
}

async function getEleventyOutput(rootDir, lambdaPath, queryParams) {
  debug.enable("Eleventy*");

  let inputDir = path.join(rootDir, "src");
  let contentMap = require(path.join(rootDir, "map.json"));

  console.log( "path: ", lambdaPath );
  let { pathParams, inputPath } = matchUrlPattern(contentMap, lambdaPath);
  console.log( "Path params: ", pathParams );
  console.log( "Input path: ", inputPath );

  process.env.ELEVENTY_CLOUD = true;

  let elev = new Eleventy(inputPath, null, {
    config: function(eleventyConfig) {
      // Add the params to Global Data
      eleventyConfig.addGlobalData("params", {
        query: queryParams,
        path: pathParams
      });
    }
  });
  elev.setInputDir(inputDir);
  await elev.init();

  let json = await elev.toJSON();
  if(!json.length) {
    throw new Error("Couldn’t find any generated output from Eleventy.");
  }

  for(let entry of json) {
    if(entry.inputPath === inputPath) {
      console.log( "Content found", inputPath );
      // console.log( entry );
      return entry.content;
    }
  }

  console.log( json );
  throw new Error(`Couldn’t find any matching output from Eleventy for ${inputPath}`);
}

async function handler (event, context) {
  try {
    let rootDir = getRootDir();
    // console.log( event );

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8"
      },
      body: await getEleventyOutput(rootDir, event.path, event.queryStringParameters),
      isBase64Encoded: false
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
