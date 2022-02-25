const EleventyFetch = require("@11ty/eleventy-fetch");
const fastglob = require("fast-glob");

module.exports = async function() {
	let returnData = {
		urls: {},
		data: {}
	};

	if(process.env.ELEVENTY_SERVERLESS) {
		return returnData;
	}

	let url = "https://www.speedlify.dev/api/urls.json";
	let urlsJson = await EleventyFetch(url, {
		duration: "1d",
		type: "json",
	});

	returnData.urls = urlsJson;

	let starters = await fastglob("./src/_data/starters/*.json", {
		caseSensitiveMatch: false
	});

	for(let site of starters) {
		let filename = site.split("/").pop();
		// TODO clear require cache
		let siteData = require(`./starters/${filename}`);

		let urlLookup = urlsJson[siteData.demo] || urlsJson[siteData.url];
		if(urlLookup && urlLookup.hash) {
			let data = await EleventyFetch(`https://www.speedlify.dev/api/${urlLookup.hash}.json`, {
				duration: process.env.NODE_ENV === "production" ? "1d" : "*",
				type: "json",
			});
			data.hash = urlLookup.hash;
			returnData.data[siteData.demo || siteData.url] = data;
		}
	}

	return returnData;
};
