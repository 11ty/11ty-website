// Speedlify consumes this endpoint
module.exports.data = function() {
	return {
		permalink: "/api/starters.json"
	}
}
module.exports.render = function(data) {
	let urls = [];
	for(let key in data.starters) {
		let site = data.starters[key];
		if(site.disabled || site.excludedFromLeaderboards) {
			continue;
		}

		if(!site.demo) {
			// console.log( "Missing url for", site );
		} else {
			urls.push(site.demo);
		}
	}
	return JSON.stringify(urls, null, 2);
};