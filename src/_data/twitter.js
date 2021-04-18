const RemoteCache = require("@11ty/eleventy-cache-assets");
const AssetCache = RemoteCache.AssetCache;

module.exports = async function() {
	try {
		let asset = new AssetCache("twitter-followers-eleven_ty");
		if(asset.isCacheValid("1d")) {
			return asset.getCachedValue();
		}

		let html = await RemoteCache("https://twitter.com/eleven_ty/", {
			duration: "1d",
			type: "text"
		});

		let match = html.match(/followers_count\&quot\;\:(\d+)/i);
		let followers = {
			followers: match && match.length > 1 ? parseInt(match[1], 10) : undefined
		};

		asset.save(followers, "json");

		return followers;
	} catch(e) {
		console.log( "Failed getting @eleven_ty twitter followers, returning 0" );
		return {
			followers: 0
		};
	}
};

