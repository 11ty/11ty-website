// https://opencollective.com/11ty/members/all.json
const fetch = require("node-fetch");
const slugify = require("slugify");
const fs = require("fs-extra");
const flatcache = require("flat-cache");
const path = require("path");
const AvatarLocalCache = require("avatar-local-cache");

function getCacheKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

module.exports = async function() {
	let avatarCache = new AvatarLocalCache();

	let cache = flatcache.load("opencollective-backers", path.resolve("./_datacache"));
	let key = getCacheKey();
	let cachedData = cache.getKey(key);
	if(!cachedData || process.env.ELEVENTY_AVATARS) {
		console.log( "Fetching new opencollective backers…" );
		try {
			let newDataJson = await fetch("https://opencollective.com/11ty/members/all.json").then(res => res.json());

			if( process.env.ELEVENTY_AVATARS ) {
				newDataJson = newDataJson.map(function(entry) {
					let slug = slugify(entry.name).toLowerCase();
					let path = `img/avatar-local-cache/${slug}`;
					if(entry.image) {
						avatarCache.fetchUrl(entry.image, path).then(function(files) {
							console.log( `Wrote ${path}.{webp,png,jpg}` );
						});
					}
					return entry;
				});
			}

			newDataJson.sort(function(a, b) {
				// Sort by total amount donated (desc)
				return b.totalAmountDonated - a.totalAmountDonated;
			});

			await fs.writeFile("./_data/supporters.json", JSON.stringify(newDataJson, null, 2));

			let backers = newDataJson.filter(function(entry) {
				return entry.role.toLowerCase() === "backer";
			}).length;

			let newData = {
				backers: backers
			};

			cache.setKey(key, newData);
			cache.save();
			return newData;
		} catch(e) {
			console.log( "Failed, returning 0 opencollective backers." );
			return {
				backers: 0
			};
		}
	}

	return cachedData;
};
