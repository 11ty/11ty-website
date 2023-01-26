const activity = require("../config/activity.js");

const PERMALINK = "/firehose/firehose.rss";

module.exports = class {
	data() {
		return {
			permalink: PERMALINK,
			layout: false,
			eleventyExcludeFromCollections: true
		}
	}

	async render() {
		const feed = await activity();

		return feed.toRssFeed({
			title: "The Eleventy Firehose",
			language: "en",
			url: `https://www.11ty.dev${PERMALINK}`,
			subtitle: "One centralized feed of Eleventy activity across the web.",
		});
	}
};
