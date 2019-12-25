// https://opencollective.com/11ty/members/all.json
const fetch = require("node-fetch");
const fs = require("fs-extra");
const flatcache = require("flat-cache");
const path = require("path");

function getCacheKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function isMonthlyBacker(backer) {
	return backer.role === "BACKER" && backer.tier;
}

module.exports = async function() {
	let cache = flatcache.load("opencollective-backers", path.resolve("./_datacache"));
	let key = getCacheKey();
	let cachedData = cache.getKey(key);
	if(!cachedData || process.env.ELEVENTY_AVATARS) {
		console.log( "Fetching new opencollective backers…" );
		try {
			let newDataJson = await fetch("https://opencollective.com/11ty/members/all.json").then(res => res.json());

			newDataJson.sort(function(a, b) {
				// Sort by total amount donated (desc)
				return b.totalAmountDonated - a.totalAmountDonated;
			});

			let monthlyBackers = {};
			for(let backer of newDataJson) {
				if(isMonthlyBacker(backer)) {
					monthlyBackers[backer.profile] = true;
				}
			}

			newDataJson = newDataJson.filter(backer => isMonthlyBacker(backer) || !monthlyBackers[backer.profile]);

			await fs.writeFile("./_data/supporters.json", JSON.stringify(newDataJson, null, 2));

			let backers = newDataJson.filter(function(entry) {
				return entry.role.toLowerCase() === "backer";
			}).length;

			let newData = {
				backers: backers
			};

			cache.setKey(key, newData);
			cache.save();
			return newData;
		} catch(e) {
			console.log( "Failed, returning 0 opencollective backers.", e );
			return {
				backers: 0
			};
		}
	}

	return cachedData;
};
