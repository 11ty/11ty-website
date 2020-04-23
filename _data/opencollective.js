// https://opencollective.com/11ty/members/all.json
const fs = require("fs-extra");
const Cache = require("@11ty/eleventy-cache-assets");

function isMonthlyBacker(backer) {
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

		json = getUniqueNonMonthlyEntries(json);

		json.sort(function(a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		// is monthly backer or has no other monthly backer profile
		let allBackers = json.filter(() => true);
		json = json.filter(backer => isMonthlyBacker(backer) || !hasMonthlyBackerProfile(allBackers, backer));

		await fs.writeFile("./_data/supporters.json", JSON.stringify(json, null, 2));

		let backers = json.filter(function(entry) {
			return entry.role.toLowerCase() === "backer";
		}).length;

		return {
			backers: backers
		};
	} catch(e) {
		console.log( "Failed, returning 0 opencollective backers.", e );
		return {
			backers: 0
		};

	}
};
