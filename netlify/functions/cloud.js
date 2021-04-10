const path = require("path");
const fs = require("fs");
const debug = require("debug");
const walker = require("walker");
debug.enable("Eleventy:TemplateConfig");

const UrlPattern = require("url-pattern");
const { builderFunction } = require("@netlify/functions");
const Eleventy = require("@11ty/eleventy");

// For the bundler: Global Data
const Cache = require("@11ty/eleventy-cache-assets");

// For the bundler: Config file
const { DateTime } = require("luxon");
const HumanReadable = require("human-readable-numbers");
const commaNumber = require("comma-number");
const markdownIt = require("markdown-it");
const loadLanguages = require("prismjs/components/");
const slugify = require("slugify");
const fs = require("fs-extra");
const lodashGet = require("lodash/get");
const shortHash = require("short-hash");
const semver = require("semver");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const Terser = require("terser");


const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const navigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const eleventyImage = require("@11ty/eleventy-img");

function showFileSystem() {
  console.log( "Walking the file system" );
  walker(process.cwd())
    .on('dir', function(dir, stat) {
      if(dir.endsWith("/node_modules/") || dir.indexOf("/node_modules/") === -1) {
        console.log('Directory: ' + dir)
      }
    })
    .on('file', function(file, stat) {
      if(file.indexOf("/node_modules/") === -1) {
        console.log('File: ' + file)
      }
    })
    .on('error', function(er, entry, stat) {
      console.log('Error ' + er + ' on entry ' + entry)
    })
    .on('end', function() {
      console.log('Finished walking file system')
    });
}

function getProjectDir() {
  let paths = [
    // /var/task/src/netlify/functions/cloud/src/
    path.join(process.cwd(), "netlify/functions/cloud/"), // on netlify dev
    path.join(process.cwd(), "src/netlify/functions/cloud/"), // netlify function
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
    showFileSystem();

    let projectDir = getProjectDir();
    if(projectDir.startsWith("/var/task/")) {
      process.chdir(projectDir);
    }
    // console.log( event );

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
