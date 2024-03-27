import "dotenv/config";
import EleventyFetch from "@11ty/eleventy-fetch";
import { ActivityFeed } from "@11ty/eleventy-activity-feed";

export default async function () {
	let feed = new ActivityFeed();

	feed.setCacheDuration("1d"); // note that cache is persisted on CI server

	// The Eleventy Activity Feed
	feed.addSource("youtubeUser", "YouTube", "UCskGTioqrMBcw8pd14_334A"); // Eleventy
	feed.addSource("atom", "Blog", "https://www.11ty.dev/blog/feed.xml");
	feed.addSource(
		"atom",
		"Quick Tips",
		"https://www.11ty.dev/docs/quicktips/feed.xml"
	);
	feed.addSource("rss", "Mastodon", "https://fosstodon.org/users/eleventy.rss");
	// feed.addSource("twitterUser", "Twitter", "eleven_ty", "949639269433380864");

	if (process.env.NODE_ENV === "production") {
		// Warning: at time of writing Eleventy has 51 repos, beware if this grows beyond the max of 100
		const PER_PAGE = 100; // max: 100
		let githubOrgRepos = await EleventyFetch(
			`https://api.github.com/orgs/11ty/repos?per_page=${PER_PAGE}`,
			{
				type: "json",
				duration: "1d",
				directory: ".cache/eleventy-fetch/",
				fetchOptions: {
					headers: {
						Authorization: `bearer ${process.env.GITHUB_READ_TOKEN}`,
					},
				},
			}
		);

		for (let repository of githubOrgRepos) {
			if (repository.visibility === "public") {
				feed.addSource(
					"atom",
					`GitHub Releases [${repository.full_name}]`,
					`https://github.com/${repository.full_name}/releases.atom`
				);
			}
		}
	} else {
		// only use core for local dev
		feed.addSource(
			"atom",
			`GitHub Releases [11ty/eleventy]`,
			`https://github.com/11ty/eleventy/releases.atom`
		);
	}

	return feed;
}
