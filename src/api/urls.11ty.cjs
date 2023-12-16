// Speedlify consumes this endpoint for the Eleventy Leaderboards
module.exports.data = function() {
	return {
		permalink: "/api/urls.json"
	}
}
module.exports.render = function(data) {
	let urls = [];
	for(let key in data.builtwith) {
		let site = data.builtwith[key];
		if(site.disabled || site.leaderboard_excluded) {
			continue;
		}
		if(!site.url) {
			// console.log( "Missing url for", site );
		} else {
			urls.push(site.url);
		}
	}
	return JSON.stringify(urls, null, 2);
};
