// https://opencollective.com/11ty/members/all.json
const EleventyFetch = require("@11ty/eleventy-fetch");
const FilteredProfiles = [
	"bca-account1", // website is buycheapaccounts.com
	"baocasino", // gambling
	"woorke", // sells social media accounts
	"suominettikasinot24", // gambling
	"masonslots", //gambling
	"trust-my-paper", // selling term papers
	"kiirlaenud", // some quick loans site
	"kajino-bitcoin", //bitcoin
	"seo25-com", // selling website traffic
	"relief-factor", // profile link was some weird PDF
	"targetedwebtraffic", // selling website traffic
];

function isMonthlyOrYearlyOrder(order) {
	return (order.frequency === 'MONTHLY' || order.frequency === 'YEARLY') && order.status === 'ACTIVE';
}

function getUniqueContributors(orders) {
	let uniqueContributors = {};
	for(let order of orders) {
		if(uniqueContributors[order.slug]) {
			// if order already exists, overwrite only if existing is not an active monthly contribution
			if(!isMonthlyOrYearlyOrder(uniqueContributors[order.slug])) {
				uniqueContributors[order.slug] = order;
			}
		} else {
			uniqueContributors[order.slug] = order;
		}
	}
	return Object.values(uniqueContributors);
}

module.exports = async function() {
	try {
		let url = `https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&status=paid,active`;
		let json = await EleventyFetch(url, {
			type: "json",
			duration: process.env.ELEVENTY_SERVERLESS ? "*" : (process.env.ELEVENTY_AVATARS ? "0s" : "1d"),
			directory: process.env.ELEVENTY_SERVERLESS ? "cache/" : ".cache/eleventy-fetch/",
		});

		let orders = json.nodes.map(order => {
			order.name = order.fromAccount.name;
			order.slug = order.fromAccount.slug;
			order.twitter = order.fromAccount.twitterHandle;
			order.image = order.fromAccount.imageUrl;
			order.website = order.fromAccount.website;
			order.profile = `https://opencollective.com/${order.slug}`;
			order.totalAmountDonated = order.totalDonations.value;
			order.isMonthly = isMonthlyOrYearlyOrder(order);
			order.hasDefaultAvatar = order.image === `https://images.opencollective.com/${order.slug}/avatar.png`;
			return order;
		}).filter(order => {
			return FilteredProfiles.indexOf(order.slug) === -1;
		});

		// lol hardcoded
		orders.push({
			name: "Zach Leatherman",
			slug: "zach-leatherman",
			twitter: "zachleat",
			github: "zachleat",
			image: "https://images.opencollective.com/zachleat/70606f4/avatar/256.png",
			website: "https://www.zachleat.com/",
			profile: "https://opencollective.com/zachleat",
			totalAmountDonated: 0,
			isMonthly: true,
			hasDefaultAvatar: false,
		});

		orders = getUniqueContributors(orders);

		orders.sort(function(a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		let backers = orders.length;

		let monthlyBackers = orders.filter(function(order) {
			return isMonthlyOrYearlyOrder(order);
		}).length;

		return {
			supporters: orders,
			backers: backers,
			monthlyBackers: monthlyBackers
		};
	} catch(e) {
		if(process.env.NODE_ENV === "production") {
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
