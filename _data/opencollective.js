// https://opencollective.com/11ty/members/all.json
const fetch = require("node-fetch");
const flatcache = require("flat-cache");
const path = require("path");

function getCacheKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

module.exports = async function() {
	let cache = flatcache.load("opencollective-backers", path.resolve("./_datacache"));
	let key = getCacheKey();
	let cachedData = cache.getKey(key);
	if(!cachedData) {
		console.log( "Fetching new opencollective backer count…" );
		try {
			let newData = await fetch("https://opencollective.com/11ty/members/all.json")
				.then(res => res.json())
				.then(json => {
					let backers = json.filter(function(entry) {
						return entry.role.toLowerCase() === "backer";
					}).length;

					return {
						backers: backers
					};
				});

			cache.setKey(key, newData);
			cache.save();
			return newData;
		} catch(e) {
			console.log( "Failed, returning 0" );
			return {
				backers: 0
			};
		}
	}

	return cachedData;
};
