import EleventyFetch from "@11ty/eleventy-fetch";
import fastglob from "fast-glob";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const URL = "https://eleventy-starters--speedlify.netlify.app/";

export default async function () {
	let returnData = {
		urls: {},
		data: {},
	};

	let url = `${URL}api/urls.json`;
	let urlsJson = await EleventyFetch(url, {
		duration: "1d",
		type: "json",
	});

	returnData.urls = urlsJson;

	let starters = await fastglob("./src/_data/starters/*.json", {
		caseSensitiveMatch: false,
	});

	for (let site of starters) {
		let filename = site.split("/").pop();
		// TODO clear require cache
		let siteData = require(`./starters/${filename}`);

		let urlLookup = urlsJson[siteData.demo] || urlsJson[siteData.url];
		if (urlLookup && urlLookup.hash) {
			let data = await EleventyFetch(`${URL}api/${urlLookup.hash}.json`, {
				duration: process.env.NODE_ENV === "production" ? "1d" : "*",
				type: "json",
			});
			data.hash = urlLookup.hash;
			returnData.data[siteData.demo || siteData.url] = data;
		}
	}

	return returnData;
}
