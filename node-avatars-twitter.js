const slugify = require("slugify");
const fs = require("fs-extra");
const fastglob = require("fast-glob");
const eleventyImg = require("@11ty/eleventy-img");
const cleanName = require("./config/cleanAuthorName");

eleventyImg.concurrency = 5;

async function fetch(name) {
	if(!name) {
		return;
	}

	let slug = slugify(name).toLowerCase();
	let dir = `./avatars/twitter/`;
	await fs.ensureDir(dir);

	let path = `${dir}${slug}.json`;
	let stats = await eleventyImg(`https://unavatar.now.sh/twitter/${name}`, { // ?fallback=false
		formats: ["webp", "jpeg"],
		widths: [90],
		urlPath: "/img/avatars/twitter/",
		outputDir: "img/avatars/twitter/",
		cacheOptions: {
			duration: "7d",
		}
	});

	return fs.writeFile(path, JSON.stringify(stats, null, 2));
}

(async function() {
	let twitterUsernames = new Set();

	// Twitter
	let testimonials = require("./_data/testimonials.json").map(entry => entry.twitter);
	for(let twitter of testimonials) {
		twitterUsernames.add(cleanName(twitter).toLowerCase());
	}

	// Starters
	let starters = await fastglob("./_data/starters/*.json", {
		caseSensitiveMatch: false
	});
	for(let site of starters) {
		let siteData = require(site);
		if(siteData.author) {
			twitterUsernames.add(cleanName(siteData.author).toLowerCase());
		}
	}

	// Plugins
	let plugins = await fastglob("./_data/plugins/*.json", {
		caseSensitiveMatch: false
	});
	for(let plugin of plugins) {
		let pluginData = require(plugin);
		if(pluginData.author) {
			twitterUsernames.add(cleanName(pluginData.author).toLowerCase());
		}
	}

	// Extras
	let extras = require("./_data/extraAvatars.json").map(entry => entry.twitter);
	for(let twitter of extras) {
		twitterUsernames.add(cleanName(twitter).toLowerCase());
	}

	let sites = await fastglob("./_data/sites/*.json", {
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
	let sorted = Array.from(twitterUsernames).sort();
	for(let name of sorted) {
		await fetch(name);
	}
})();
