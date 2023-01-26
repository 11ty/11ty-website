const activity = require("../config/activity.js");

function getSlugFromTitle(str) {
	if(str.startsWith("GitHub Releases [")) {
		return "github";
	}
	if(str.includes(": ")) {
		return str.split(": ")[0].replace(/\s/g, "-").toLowerCase();
	}
	return "";
}

module.exports.data = async function() {
	const feed = await activity();
	const entries = await feed.getEntries();

	return {
		entries: entries,
		layout: "layouts/docs.njk"
	}
};

module.exports.render = async function({entries}) {
	return `
<h1>Eleventy Activity Firehose</h1>

<p>This page shows entries from the <a href="/blog/">Eleventy Blog</a>, <a href="/docs/quicktips/">Quick Tips</a>, <a href="https://11ty.dev/youtube">YouTube channel</a>, <a href="https://11ty.dev/mastodon">Mastodon account</a>, <a href="https://11ty.dev/twitter">Twitter feed</a> (currently dormant), and <em>all</em> GitHub releases (all of <a href="https://github.com/11ty/"><code>11ty</code> org</a> repositories).</p>

<p><strong><a href="/follow/follow.rss">Subscribe to the Firehose RSS feed.</a></strong></p>

<style>
.activity-feed .elv-callout-box { max-width: 35em; }
.activity-feed .filter-type--hide { display: none; }
.activity-feed form { margin: 1em 0; }
</style>

<div class="activity-feed">
	<filter-container oninit>
		<form>
			<strong>Filter:</strong>
			<label>
				<input type="checkbox" value="mastodon" data-filter-key="type" checked>
				Mastodon
			</label>
			<label>
				<input type="checkbox" value="twitter" data-filter-key="type">
				Twitter
			</label>
			<label>
				<input type="checkbox" value="youtube" data-filter-key="type" checked>
				YouTube
			</label>
			<label>
				<input type="checkbox" value="github" data-filter-key="type" checked>
				GitHub
			</label>
			<label>
				<input type="checkbox" value="blog" data-filter-key="type" checked>
				Blog
			</label>
			<label>
				<input type="checkbox" value="quick-tips" data-filter-key="type" checked>
				Quick Tips
			</label>
			<p data-filter-results="result/results" aria-live="polite"></p>
		</form>
${entries.map(entry => {
	let content = entry.type === "tweet" || entry.title.startsWith("Mastodon: ") ? entry.content || "" : "";
	if(entry.title.startsWith("YouTube") && entry.url.startsWith("https://www.youtube.com/watch?v=")) {
		// TODO support startTime in URL
		let slug = entry.url.slice("https://www.youtube.com/watch?v=".length);

		let startTime = 0;
		content = this.youtubeEmbed(slug, entry.title, startTime);
	}
	return `<div data-filter-type="${getSlugFromTitle(entry.title)}">${this.callout(content, "box", "html", `<a href="${entry.url}">${entry.title}</a>`)}</div>`;
}).join("\n")}

	</filter-container>
</div>`;
};
