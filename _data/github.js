const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	try {
		// https://developer.github.com/v3/repos/#get
		let json = await Cache("https://api.github.com/repos/11ty/eleventy", {
			duration: "1d",
			type: "json",
			dryRun: process.env.ELEVENTY_CLOUD ? true : false,
			directory: process.env.ELEVENTY_CLOUD ? "/tmp/.cache/" : ".cache/",
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

