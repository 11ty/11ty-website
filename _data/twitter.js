// https://blog.npmjs.org/post/78719826768/download-counts-are-back
const fetch = require("node-fetch");
const flatcache = require("flat-cache");
const path = require("path");

function getDateKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

module.exports = async function() {
	let cache = flatcache.load("twitter-followers", path.resolve("./_datacache"));
	let key = getDateKey();
	let cachedData = cache.getKey(key);
	if(!cachedData) {
		console.log( "Fetching new twitter follower count…" );
		let newData = await fetch("https://twitter.com/eleven_ty/")
			.then(res => res.text())
			.then(text => {
				let match = text.match(/followers_count\&quot\;\:(\d+)/i);
				return {
					followers: match && match.length > 1 ? parseInt(match[1], 10) : undefined
				};
			});

		cache.setKey(key, newData);
		cache.save();
		return newData;
	}

	return cachedData;
};
