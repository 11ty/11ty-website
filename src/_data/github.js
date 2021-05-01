const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	try {
		// https://developer.github.com/v3/repos/#get
		let json = await Cache("https://api.github.com/repos/11ty/eleventy", {
			duration: process.env.ELEVENTY_CLOUD ? "*" : "1d",
			type: "json",
			directory: process.env.ELEVENTY_CLOUD ? "cache/" : ".cache/eleventy-cache-assets/",
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

