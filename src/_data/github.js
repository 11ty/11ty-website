const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	try {
		// https://developer.github.com/v3/repos/#get
		let json = await EleventyFetch("https://api.github.com/repos/11ty/eleventy", {
			type: "json",
			duration: process.env.ELEVENTY_SERVERLESS ? "*" : "1d",
			directory: process.env.ELEVENTY_SERVERLESS ? "cache/" : ".cache/eleventy-fetch/",
		});

		return {
			stargazers: json.stargazers_count
		};
	} catch(e) {
		console.log( "Failed getting GitHub stargazers count, returning 0" );
		return {
			stargazers: 0
		};
	}
};

