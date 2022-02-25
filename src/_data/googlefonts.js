const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	if(process.env.ELEVENTY_SERVERLESS) {
		return "";
	}

	try {
		// https://developer.github.com/v3/repos/#get
		let css = await EleventyFetch("https://fonts.googleapis.com/css?family=Roboto+Mono:400&display=swap", {
			duration: "1d",
			type: "text",
			directory: ".cache/eleventy-fetch/",
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
