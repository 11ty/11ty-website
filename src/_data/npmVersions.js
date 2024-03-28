import EleventyFetch from "@11ty/eleventy-fetch";

let NPM_PKG_NAME = "@11ty/eleventy";

async function getLatestVersions() {
	let url = `https://registry.npmjs.org/${NPM_PKG_NAME}`;
	let json = await EleventyFetch(url, {
		type: "json",
		duration: "1d",
		directory: ".cache/eleventy-fetch/",
		dryRun: false,
	});
	return json["dist-tags"];
}

export default async function () {
	try {
		return await getLatestVersions();
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log("Failed getting npm downloads count, returning 0");
		return {};
	}
}
