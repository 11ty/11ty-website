const slugify = require("slugify");
const fs = require("fs-extra");
const fastglob = require("fast-glob");
const eleventyImg = require("@11ty/eleventy-img");
const cleanName = require("./config/cleanAuthorName");
const getTwitterAvatarUrl = require("twitter-avatar-url");

eleventyImg.concurrency = 5;

async function fetch(entry) {
  let name = entry.username;
  let url = entry.url.large;

	if(!name || !url) {
		return;
	}

	let slug = slugify(name).toLowerCase();
	let dir = `./avatars/twitter/`;
	await fs.ensureDir(dir);

	let path = `${dir}${slug}.json`;
	try {
    console.log( "Fetching", name, url );
    // let url = `https://unavatar.now.sh/twitter/${name}?fallback=false`;
		let stats = await eleventyImg(url, {
			formats: ["avif", "webp", "jpeg"],
			widths: [90],
			urlPath: "/img/avatars/twitter/",
			outputDir: "./src/img/avatars/twitter/",
			cacheOptions: {
				duration: "30d",
			}
		});

		return fs.writeFile(path, JSON.stringify(stats, null, 2));
	} catch(e) {
		console.log( "Error: ", e );
		// return fs.unlink(path);
	}
}

(async function() {
	let twitterUsernames = new Set();

	// Twitter
	let testimonials = require("./src/_data/testimonials.json").map(entry => entry.twitter);
	for(let twitter of testimonials) {
		twitterUsernames.add(cleanName(twitter).toLowerCase());
	}

	// Starters
	let starters = await fastglob("./src/_data/starters/*.json", {
		caseSensitiveMatch: false
	});
	for(let site of starters) {
		let siteData = require(site);
		if(siteData.author) {
			twitterUsernames.add(cleanName(siteData.author).toLowerCase());
		}
	}

	// Plugins
	let plugins = await fastglob("./src/_data/plugins/*.json", {
		caseSensitiveMatch: false
	});
	for(let plugin of plugins) {
		let pluginData = require(plugin);
		if(pluginData.author) {
			twitterUsernames.add(cleanName(pluginData.author).toLowerCase());
		}
	}

	// Extras
	let extras = require("./src/_data/extraAvatars.json").map(entry => entry.twitter);
	for(let twitter of extras) {
		twitterUsernames.add(cleanName(twitter).toLowerCase());
	}

	let sites = await fastglob("./src/_data/sites/*.json", {
		caseSensitiveMatch: false
	});

	for(let site of sites) {
		let siteData = require(site);
		if(siteData.twitter) {
			twitterUsernames.add(cleanName(siteData.twitter).toLowerCase());
		}
		if(siteData.authoredBy) {
			for(let author of siteData.authoredBy) {
				twitterUsernames.add(cleanName(author).toLowerCase());
			}
		}
	}

  console.log( "Found", twitterUsernames.size, "usernames" );

  let allTwitterUrls = await getTwitterAvatarUrl(Array.from(twitterUsernames), {
		twitterApiVersion: 1
	});
	for(let entry of allTwitterUrls) {
		await fetch(entry);
	}
})();
