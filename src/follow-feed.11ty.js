module.exports = class {
	data() {
		return {
			permalink: "/follow/follow.rss",
			layout: false,
			eleventyExcludeFromCollections: true
		}
	}

	async render() {
		const { ActivityFeed } = await import("@11ty/eleventy-activity-feed");

		let feed = new ActivityFeed();

		feed.setCacheDuration("1h"); // cache is persisted now, so we’ll update this at maximum once per hour

		// The Eleventy Activity Feed
		feed.addSource("youtubeUser", "YouTube", "UCskGTioqrMBcw8pd14_334A"); // Eleventy
		feed.addSource("atom", "Blog", "https://www.11ty.dev/blog/feed.xml");
		feed.addSource("rss", "Mastodon", "https://fosstodon.org/users/eleventy.rss");
		feed.addSource("twitterUser", "Twitter", "eleven_ty", "949639269433380864");

		return feed.toRssFeed({
			title: "Eleventy’s Activity Feed",
			language: "en",
			url: "https://www.11ty.dev/activity.rss",
			subtitle: "One centralized feed of Eleventy activity across the web.",
		});
	}
};
