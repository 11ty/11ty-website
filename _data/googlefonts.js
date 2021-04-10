const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	try {
		// https://developer.github.com/v3/repos/#get
		let css = await Cache("https://fonts.googleapis.com/css?family=Roboto+Mono:400&display=swap", {
			duration: "1d",
			type: "text",
			dryRun: process.env.ELEVENTY_CLOUD ? true : false,
			directory: process.env.ELEVENTY_CLOUD ? "/tmp/.cache/" : ".cache/",
			fetchOptions: {
				headers: {
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
				}
			}
		});

		return css;
	} catch(e) {
		console.log( "Failed getting Google Fonts CSS, returning ''" );
		return "";
	}
};
