// https://opencollective.com/11ty/members/all.json
const Cache = require("@11ty/eleventy-cache-assets");
const FilteredProfiles = [
	"https://opencollective.com/bca-account1", // website is buycheapaccounts.com
	"https://opencollective.com/baocasino", // gambling
	"https://opencollective.com/woorke", // sells social media accounts
	"https://opencollective.com/suominettikasinot24", // gambling
]

function isMonthlyBacker(backer) {
	// Hardcoded to workaround https://github.com/opencollective/opencollective-api/issues/4585
	if(backer.name === "Piccalilli" && backer.tier === "Gold Sponsor") {
		return true;
	}
	return backer.role === "BACKER" && backer.tier && backer.isActive;
}

function hasMonthlyBackerProfile(backers, compareBacker) {
	for(let backer of backers) {
		if(isMonthlyBacker(backer) && backer.profile === compareBacker.profile) {
			return true;
		}
	}
	return false;
}

function getUniqueNonMonthlyEntries(backers) {
	let nonMonthlyBackers = {};
	for(let backer of backers) {
		if(!isMonthlyBacker(backer)) {
			nonMonthlyBackers[backer.profile] = backer;
		}
	}
	return backers.filter(backer => isMonthlyBacker(backer)).concat(Object.values(nonMonthlyBackers));
}

module.exports = async function() {
	try {
		let url = `https://opencollective.com/11ty/members/all.json`;
		let json = await Cache(url, {
			duration: process.env.ELEVENTY_AVATARS ? "0s" : "1d",
			type: "json"
		});

		// if(process.env.ELEVENTY_PRODUCTION) {
		// 	console.log( "Pre-filtered supporters list:" );
		// 	for(let supporter of json) {
		// 		console.log( ` * ${supporter.name} (${supporter.role} ${supporter.tier} ${supporter.isActive})` );
		// 	}
		// }

		json = json.filter(backer => {
			return FilteredProfiles.indexOf(backer.profile) === -1;
		});

		json = getUniqueNonMonthlyEntries(json);

		json.sort(function(a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		// is monthly backer or has no other monthly backer profile
		let allBackers = json.filter(() => true);
		json = json.filter(backer => isMonthlyBacker(backer) || !hasMonthlyBackerProfile(allBackers, backer));

		let backers = json.filter(function(entry) {
			return entry.role.toLowerCase() === "backer";
		}).length;

		let monthlyBackers = json.filter(function(entry) {
			return isMonthlyBacker(entry);
		}).length;

		// if(process.env.ELEVENTY_PRODUCTION) {
		// 	console.log( "Final supporters list:" );
		// 	for(let supporter of json) {
		// 		console.log( ` * ${supporter.name} (${supporter.role} ${supporter.tier} ${supporter.isActive})` );
		// 	}
		// }

		return {
			supporters: json,
			backers: backers,
			monthlyBackers: monthlyBackers
		};
	} catch(e) {
		if(process.env.ELEVENTY_PRODUCTION) {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log( "Failed, returning 0 opencollective backers.", e );
		return {
			supporters: [],
			backers: 0,
			monthlyBackers: 0
		};
	}
};
