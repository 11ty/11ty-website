const activity = require("../config/activity.js");

module.exports.data = async function() {
	const feed = await activity();
	const entries = await feed.getEntries();

	return {
		pagination: {
			data: "activity",
			size: 30,
			alias: "entries"
		},
		activity: entries,
		layout: "layouts/docs.njk"
	}
};

// TODO add reference to feed for RSS

module.exports.render = async function({pagination, entries, page}) {
	let paginationNavigationHtml = `	<ol class="inlinelist">
	<li class="inlinelist-item${pagination.href.first === page.url ? " active" : (!pagination.href.first ? " inert" : "")}">${pagination.href.first ? `<a href="${pagination.href.first}">&laquo; First</a>` : "&laquo; First"}</li>
	<li class="inlinelist-item${pagination.href.previous === page.url ? " active" : (!pagination.href.previous ? " inert" : "")}">${pagination.href.previous ? `<a href="${pagination.href.previous}">Previous</a>` : "Previous"}</li>
	<li class="inlinelist-item${pagination.href.next === page.url ? " active" : (!pagination.href.next ? " inert" : "")}">${pagination.href.next ? `<a href="${pagination.href.next}">Next</a>` : "Next"}</li>
	<li class="inlinelist-item${pagination.href.last === page.url ? " active" : (!pagination.href.last ? " inert" : "")}">${pagination.href.last ? `<a href="${pagination.href.last}">Last &raquo;</a>` : "Last &raquo;"}</li>
	<li class="inlinelist-item inert">Page ${pagination.pageNumber+1} of ${pagination.hrefs.length}</li>
	</ol>`;

	return `
<h1>Eleventy Activity Firehose</h1>

<p>This page shows an ordered list (recent first) of our: Blog, Quick Tips, ouru YouTube channel, our Mastodon account, our (now dormant) Twitter feed, and releases across all of our repositories on GitHub.</p>

<strong><a href="/follow/follow.rss">Subscribe to the Firehose RSS feed.</a></strong>

<nav aria-labelledby="activity-pagination-top">
	<h2 id="activity-pagination-top" class="sr-only">View more:</h2>
	${paginationNavigationHtml}
</nav>

<style>
.activity-feed .elv-callout-box { max-width: 35em; }
</style>

<div class="activity-feed">
${entries.map(entry => {
	let content = entry.type === "tweet" || entry.title.startsWith("Mastodon: ") ? entry.content || "" : "";
	if(entry.title.startsWith("YouTube") && entry.url.startsWith("https://www.youtube.com/watch?v=")) {
		// TODO support startTime in URL
		let slug = entry.url.slice("https://www.youtube.com/watch?v=".length);

		let startTime = 0;
		content = this.youtubeEmbed(slug, entry.title, startTime);
	}
	return this.callout(content, "box", "html", `<a href="${entry.url}">${entry.title}</a>`);
}).join("\n")}
</div>

<nav aria-labelledby="activity-pagination-bottom">
	<h2 id="activity-pagination-bottom" class="sr-only">View more:</h2>
	${paginationNavigationHtml}
</nav>`;
};
