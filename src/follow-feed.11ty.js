const activity = require("../config/activity.js");

module.exports = class {
	data() {
		return {
			permalink: "/follow/follow.rss",
			layout: false,
			eleventyExcludeFromCollections: true
		}
	}

	async render() {
		const feed = await activity();

		return feed.toRssFeed({
			title: "Eleventy’s Activity Feed",
			language: "en",
			url: "https://www.11ty.dev/activity.rss",
			subtitle: "One centralized feed of Eleventy activity across the web.",
		});
	}
};
