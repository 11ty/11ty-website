const slugify = require("slugify");
const fs = require("fs-extra");
const eleventyImg = require("@11ty/eleventy-img");

eleventyImg.concurrency = 5;

async function fetch(name, opencollectUsername, imageUrl, website) {
  if(!name) {
    return;
  }
  if(!imageUrl && !website) {
    return;
  }

  // TODO bail if the website pathname is a deep path?

  let dir = `./src/avatars/opencollective/`;
  await fs.ensureDir(dir);

  // if website exists but no avatar image exists, try to find based on website hostname
  if(!imageUrl && website) {
    let websiteUrl = new URL(website);
    imageUrl = `https://unavatar.now.sh/${websiteUrl.hostname}?fallback=false`;
  }

  try {
    let slug = slugify(name).toLowerCase();
    if(imageUrl === `https://images.opencollective.com/${opencollectUsername}/avatar.png`) {
      // bail, it’s the default generated avatar from opencollective with generic initials.
      return;
    }

    let stats = await eleventyImg(imageUrl, {
      formats: ["avif", "webp", "jpeg"],
      widths: [90],
      urlPath: "/img/avatars/opencollective/",
      outputDir: "./src/img/avatars/opencollective/",
      cacheOptions: {
        duration: "1d",
      },
      filenameFormat: function(id, src, width, format, options) {
        return `${slug}.${format}`;
      }
    });

    let path = `${dir}${slug}.json`;
    stats.slug = slug;
    await fs.writeFile(path, JSON.stringify(stats, null, 2));
    return stats;
  } catch(e) {
    console.log( `Image error (${name}) with`, imageUrl, e );
  }
}

(async function() {
  let promises = [];

  let getOpenCollectiveData = require("./src/_data/opencollective");
  let opencollective = await getOpenCollectiveData();

  for(let supporter of opencollective.supporters) {
    if(!supporter.hasDefaultAvatar) {
      promises.push(fetch(supporter.name, supporter.slug, supporter.image, supporter.website));
    }
  }

  await Promise.all(promises);
})();
