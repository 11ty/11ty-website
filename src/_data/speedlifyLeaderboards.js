const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	let url = "https://www.11ty.dev/speedlify/api/urls.json";
	let urlsJson = await CacheAsset(url, {
		duration: "1d",
		type: "json",
	});

	let returnData = {
		urls: urlsJson
	};

	return returnData;
};
