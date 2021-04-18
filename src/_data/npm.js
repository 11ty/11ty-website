// https://blog.npmjs.org/post/78719826768/download-counts-are-back
const Cache = require("@11ty/eleventy-cache-assets");

function pad(num) {
	return `${num < 10 ? "0" : ""}${num}`;
}
function getDateRange(daysOffset) {
	let date = new Date();
	if(daysOffset) {
		date.setTime(date.getTime() + daysOffset*1000*60*60*24);
	}
	return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

module.exports = async function() {
	try {
		// let newData = await fetch("https://api.npmjs.org/downloads/point/last-month/@11ty/eleventy")
		let url = `https://api.npmjs.org/downloads/point/${getDateRange(-365)}:${getDateRange()}/@11ty/eleventy`;
		let json = await Cache(url, {
			duration: "1d",
			type: "json"
		});

		return {
			downloads: json.downloads
		};
	} catch(e) {
		console.log( "Failed getting npm downloads count, returning 0" );
		return {
			downloads: 0
		};
	}
};
