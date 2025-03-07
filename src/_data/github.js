import "dotenv/config";
import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "1w" : "1d";

export default async function () {
	try {
		// https://developer.github.com/v3/repos/#get
		let json = await EleventyFetch(
			"https://api.github.com/repos/11ty/eleventy",
			{
				type: "json",
				duration: CACHE_DURATION,
				directory: ".cache/eleventy-fetch/",
				dryRun: false,
				fetchOptions: {
					headers: {
						Authorization: `bearer ${process.env.GITHUB_READ_TOKEN}`,
					},
				},
			}
		);

		return {
			stargazers: json.stargazers_count,
		};
	} catch (e) {
		// if(process.env.NODE_ENV === "production") {
		// 	// Fail the build in production.
		// 	return Promise.reject(e);
		// }

		console.log("Failed getting GitHub stargazers count, returning 0");
		return {
			stargazers: "",
		};
	}
}
