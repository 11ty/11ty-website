const slugify = require("slugify");
const sortObject = require("sort-object");
const fs = require("fs-extra");
const fastglob = require("fast-glob");
const AvatarLocalCache = require("avatar-local-cache");

async function fetchAvatar(name, image, cacheName) {
	let slug = slugify(name).toLowerCase();
	let dir = `img/avatar-local-cache/${cacheName ? `${cacheName}/` : ""}`;
	await fs.ensureDir(dir);

	let outputSlugPath = `${dir}${slug}`;
	if(image) {
		let avatarCache = new AvatarLocalCache();
		avatarCache.width = 73;
		return avatarCache.fetchUrl(image, outputSlugPath);
	}

	return new Promise((resolve, reject) => {
		resolve([]);
	});
}

async function fetchAvatarsForDataSource(sourceName, entries, fetchCallbacks) {
	let map = {};
	let promises = [];

	await fs.ensureDir("_data/avatarmap/");

	for(let entry of entries) {
		promises.push(fetchAvatar(fetchCallbacks.name(entry), fetchCallbacks.image(entry), sourceName).then(function(files) {
			if( Array.isArray(files) && files.length ) {
				map[files[0].name] = files;
				console.log( `Wrote ${files.join(", ")}` );
			}
		}));
	}

	await Promise.all(promises);
	await fs.writeFile(`./_data/avatarmap/${sourceName}.json`, JSON.stringify(sortObject(map), null, 2));
	console.log( `Wrote ./_data/avatarmap/${sourceName}.json.` );
}

(async function() {
	// Open Collective
	let supporters = require("./_data/supporters.json").filter(entry => entry.role.toLowerCase() === "backer");
	fetchAvatarsForDataSource("opencollective", supporters, {
		name: supporter => supporter.name,
		image: supporter => supporter.image
	});

	// Twitter
	let twitters = new Set();
	let testimonials = require("./_data/testimonials.json").map(entry => entry.twitter);
	for(let twitter of testimonials) {
		twitters.add(twitter.toLowerCase());
	}
	let starters = require("./_data/starters.json").map(entry => entry.author);
	for(let twitter of starters) {
		twitters.add(twitter.toLowerCase());
	}
	let extras = require("./_data/extraAvatars.json").map(entry => entry.twitter);
	for(let twitter of extras) {
		twitters.add(twitter.toLowerCase());
	}

	let sites = await fastglob("./_data/sites/*.json", {
		caseSensitiveMatch: false
	});
	for(let site of sites) {
		let siteData = require(site);
		if(siteData.twitter) {
			twitters.add(siteData.twitter.toLowerCase());
		}
	}

	fetchAvatarsForDataSource("twitter", twitters, {
		name: twitter => twitter,
		image: twitter => `https://twitter.com/${twitter}/profile_image?size=bigger`
	});
})();
