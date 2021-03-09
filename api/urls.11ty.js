// Speedlify consumes this endpoint for the Eleventy Leaderboards
module.exports.data = function() {
	return {
		permalink: "/api/urls.json"
	}
}
module.exports.render = function(data) {
	let urls = [];
	for(let key in data.sites) {
		let site = data.sites[key];
		if(site.disabled || site.excludedFromLeaderboards) {
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
