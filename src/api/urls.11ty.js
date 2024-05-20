// Speedlify consumes this endpoint for the Eleventy Leaderboards
function data() {
	return {
		permalink: "/api/urls.json",
	};
}
function render(data) {
	let urls = [];
	for (let key in data.builtwith) {
		let site = data.builtwith[key];
		if (site.disabled || site.leaderboard_excluded) {
			continue;
		}
		if (!site.url) {
			// console.log( "Missing url for", site );
		} else {
			urls.push(site.url);
		}
	}
	return JSON.stringify(urls, null, 2);
}

export { data, render };
