import EleventyFetch from "@11ty/eleventy-fetch";
import fastglob from "fast-glob";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const URL = "https://eleventy-starters--speedlify.netlify.app/";
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "30d" : "1d";

export default async function () {
	let returnData = {
		urls: {},
		data: {},
	};

	let url = `${URL}api/urls.json`;
	let urlsJson = await EleventyFetch(url, {
		duration: CACHE_DURATION,
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
				duration: process.env.NODE_ENV === "production" ? CACHE_DURATION : "*",
				type: "json",
			});
			data.hash = urlLookup.hash;
			returnData.data[siteData.demo || siteData.url] = data;
		}
	}

	return returnData;
}
