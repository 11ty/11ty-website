import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "1w" : "1d";

export default async function () {
	try {
		let css = await EleventyFetch(
			"https://fonts.googleapis.com/css?family=Roboto+Mono:400&display=swap",
			{
				duration: CACHE_DURATION,
				type: "text",
				directory: ".cache/eleventy-fetch/",
				fetchOptions: {
					headers: {
						"user-agent":
							"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
					},
				},
			}
		);
		return css;
	} catch (e) {
		console.log("Failed getting Google Fonts CSS, returning ''");
		return "";
	}
}
