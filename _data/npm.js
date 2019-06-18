// https://blog.npmjs.org/post/78719826768/download-counts-are-back
const fetch = require("node-fetch");
const flatcache = require("flat-cache");
const path = require("path");

function getCacheKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function pad(num) {
	return `${num < 10 ? "0" : ""}${num}`;
}
function getDateRange(daysOffset) {
	let date = new Date();
	if(daysOffset) {
		date.setTime(date.getTime() + daysOffset*1000*60*60*24);
	}
	return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

module.exports = async function() {
	let cache = flatcache.load("npm-downloads", path.resolve("./_datacache"));
	let key = getCacheKey();
	let cachedData = cache.getKey(key);
	if(!cachedData) {
		console.log( "Fetching new npm download count…" );
		try {
			// let newData = await fetch("https://api.npmjs.org/downloads/point/last-month/@11ty/eleventy")
			let newData = await fetch(`https://api.npmjs.org/downloads/point/${getDateRange(-365)}:${getDateRange()}/@11ty/eleventy`)
				.then(res => res.json())
				.then(json => {
					return {
						downloads: json.downloads
					};
				});

			cache.setKey(key, newData);
			cache.save();
			return newData;
		} catch(e) {
			console.log( "Failed, returning 0" );
			return {
				downloads: 0
			};
		}
	}

	return cachedData;
};
