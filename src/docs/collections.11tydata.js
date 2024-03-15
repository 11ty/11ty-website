import EleventyFetch from "@11ty/eleventy-fetch";

async function getData() {
	let url = `https://11tybundle.dev/api/collections.json`;
	let json = await EleventyFetch(url, {
		type: "json",
		duration: "1d",
		directory: ".cache/eleventy-fetch/",
		dryRun: false,
	});

	let urls = {};
	// remove duplicates
	json = json.filter((entry) => {
		if (!urls[entry.Link]) {
			urls[entry.Link] = true;
			return true;
		}
		return false;
	});

	return json;
}

export default async function () {
	try {
		return {
			bundle: await getData(),
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log("Failed getting CMS resources from 11tybundle.dev.");
		return { bundle: [] };
	}
}
