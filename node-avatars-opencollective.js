const slugify = require("slugify");
const fs = require("fs-extra");
const eleventyImg = require("@11ty/eleventy-img");

eleventyImg.concurrency = 5;

async function fetch(name, imageUrl, website) {
	if(!name) {
		return;
	}
	if(!imageUrl && !website) {
		return;
	}
	// TODO bail if the website pathname is a deep path?

	let dir = `./avatars/opencollective/`;
	await fs.ensureDir(dir);

	// if website exists but no avatar image exists, try to find based on website hostname
	if(!imageUrl && website) {
		let websiteUrl = new URL(website);
		imageUrl = `https://unavatar.now.sh/${websiteUrl.hostname}?fallback=false`;
	}

	try {
		let stats = await eleventyImg(imageUrl, {
			// formats: ["webp", "jpeg"],
			formats: ["jpeg"],
			widths: [90],
			urlPath: "/img/avatars/opencollective/",
			outputDir: "img/avatars/opencollective/",
			cacheOptions: {
				duration: "1d",
			}
		});

		let slug = slugify(name).toLowerCase();
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
	let avatarPaths = {};

	let getOpenCollectiveData = require("./_data/opencollective");
	let opencollective = await getOpenCollectiveData();
	for(let supporter of opencollective.supporters) {
		promises.push(fetch(supporter.name, supporter.image, supporter.website));
  }
  // hardcode me
  promises.push(fetch("Zach Leatherman", "https://unavatar.now.sh/twitter/zachleat", "https://www.zachleat.com/"));

	let all = await Promise.all(promises);
	for(let stats of all) {
		if(stats) {
			avatarPaths[stats.slug] = stats.jpeg[0].url;
		}
	}

	let avatarMapPath = "./functions/utils/avatarmap.json";
	await fs.writeFile(avatarMapPath, JSON.stringify(avatarPaths, null, 2));
	console.log( "Wrote", avatarMapPath );
})();
