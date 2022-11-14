module.exports = class {
	data() {
		return {
			permalink: "activity.rss",
			layout: false,
			eleventyExcludeFromCollections: true
		}
	}

	async render() {
		const { ActivityFeed } = await import("@11ty/eleventy-activity-feed");

		let feed = new ActivityFeed();

		feed.setCacheDuration("4h");

		// The Eleventy Activity Feed
		feed.addSource("youtubeUser", "YouTube", "UCskGTioqrMBcw8pd14_334A"); // Eleventy
		feed.addSource("atom", "Blog", "https://www.11ty.dev/blog/feed.xml");
		feed.addSource("rss", "Mastodon", "https://fosstodon.org/users/eleventy.rss");
		feed.addSource("twitterUser", "Twitter", "eleven_ty", "949639269433380864");

		return feed.toRssFeed({
			title: "Eleventy’s Activity Feed",
			language: "en",
			url: "https://www.11ty.dev/activity/",
			subtitle: "One centralized feed of Eleventy activity across the web.",
		});
	}
};
