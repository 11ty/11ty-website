const fetch = require("node-fetch");
const flatcache = require("flat-cache");
const path = require("path");

function getCacheKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

module.exports = async function() {
	let cache = flatcache.load("google-fonts-roboto-mono", path.resolve("./_datacache"));
	let key = getCacheKey();
	let cachedData = cache.getKey(key);
	if(!cachedData) {
		console.log( "Fetching new Roboto Mono CSS…" );
		try {
			// let fontSrcUrl = "https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap";
			let fontSrcUrl = "https://fonts.googleapis.com/css?family=Roboto+Mono:400,700&display=swap";
			let newData = await fetch(fontSrcUrl, {
					headers: {
						"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
					}
				})
				.then(res => res.text());

			cache.setKey(key, newData);
			cache.save();
			return newData;
		} catch(e) {
			console.log( "Failed, returning ''" );
			return "";
		}
	}

	return cachedData;
};
