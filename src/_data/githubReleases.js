//  /repos/{owner}/{repo}/releases

import "dotenv/config";
import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "1w" : "1d";

export default async function () {
	try {
		// https://developer.github.com/v3/repos/#get
		let json = await EleventyFetch(
			"https://api.github.com/repos/11ty/eleventy/releases?per_page=100",
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

		let releases = json.filter(entry => {
			// no drafts
			return entry.draft !== true;
		}).map(entry => {
			return {
				version: entry.tag_name,
				date: entry.created_at,
				prerelease: entry.prerelease,
			}
		});

		let lookupObj = {};
		for(let release of releases) {
			let key = release.version;
			if(key.startsWith("v")) {
				key = key.slice(1);
			}
			lookupObj[key] = release;
		}

		return lookupObj;
	} catch (e) {
		console.log("Failed getting GitHub releases, returning []");
		return [];
	}
}
