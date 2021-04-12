const path = require("path");
const fs = require("fs");
const debug = require("debug");
// debug.enable("Eleventy:TemplateConfig");

const UrlPattern = require("url-pattern");
const { builderFunction } = require("@netlify/functions");
const Eleventy = require("@11ty/eleventy");

// Bundler extras
const extraModules = require("./serverless-required-modules");

function getProjectDir() {
  let paths = [
    path.join(process.cwd(), "netlify/functions/cloud/"), // netlify dev
    "/var/task/src/netlify/functions/cloud/", // netlify function absolute path
  ];

  for(let path of paths) {
    if(fs.existsSync(path)) {
      return path;
    }
  }

  throw new Error(`Couldn’t find the "netlify/functions/cloud" directory. Searched: ${paths}`);
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

async function getEleventyOutput(projectDir, lambdaPath, queryParams) {
  let inputDir = path.join(projectDir, "src");
  let configPath = path.join(projectDir, "eleventy.config.js");
  console.log( "Current dir:", process.cwd() );
  console.log( "Project dir:", projectDir );
  console.log( "Input dir:", inputDir );
  console.log( "Requested URL: ", lambdaPath );
  console.log( "Config path: ", configPath );

  let contentMap = require(path.join(projectDir, "map.json"));

  let { pathParams, inputPath } = matchUrlPattern(contentMap, lambdaPath);
  console.log( "Path params: ", pathParams );
  console.log( "Input path: ", inputPath );

  process.env.ELEVENTY_CLOUD = true;

  let elev = new Eleventy(inputPath, null, {
    configPath,
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
    let projectDir = getProjectDir();

    // TODO is this necessary?
    if(projectDir.startsWith("/var/task/")) {
      process.chdir(projectDir);
    }

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8"
      },
      body: await getEleventyOutput(projectDir, event.path, event.queryStringParameters),
      isBase64Encoded: false
    };
  } catch (error) {
    console.log("Error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}

// exports.handler = handler;
exports.handler = builderFunction(handler);

// For local testing
// (async function() {
//   let projectDir = path.join(process.cwd(), "netlify/functions/cloud/");
//   let content = await getEleventyOutput(projectDir, "/authors/smthdotuk/");
//   console.log( content.length, content.substr(0, 500) );
//   // console.log( content );
// })();
