require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	try {
		// https://developer.github.com/v3/repos/#get
		let json = await EleventyFetch("https://api.github.com/repos/11ty/eleventy", {
			type: "json",
			duration: process.env.ELEVENTY_SERVERLESS ? "*" : "1d",
			directory: ".cache/eleventy-fetch/",
			dryRun: process.env.ELEVENTY_SERVERLESS ? true : false,
			headers: {
				"Authorization": `bearer ${process.env.GITHUB_READ_TOKEN}`
			},
		});

		return {
			stargazers: json.stargazers_count
		};
	} catch(e) {
		// if(process.env.NODE_ENV === "production") {
		// 	// Fail the build in production.
		// 	return Promise.reject(e);
		// }

		console.log( "Failed getting GitHub stargazers count, returning 0" );
		return {
			stargazers: ""
		};
	}
};

