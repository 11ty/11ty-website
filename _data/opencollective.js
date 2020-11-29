// https://opencollective.com/11ty/members/all.json
const Cache = require("@11ty/eleventy-cache-assets");
const FilteredProfiles = [
	"bca-account1", // website is buycheapaccounts.com
	"baocasino", // gambling
	"woorke", // sells social media accounts
	"suominettikasinot24", // gambling
	"masonslots", //gambling
	"trust-my-paper", // selling term papers
	"kiirlaenud", // some quick loans site
]

// TODO account for yearly
function isMonthlyOrder(order) {
	return order.frequency === 'MONTHLY' && order.status === 'ACTIVE';
}

function getUniqueContributors(orders) {
	let uniqueContributors = {};
	for(let order of orders) {
    if(uniqueContributors[order.slug]) {
      // if order already exists, overwrite only if existing is not an active monthly contribution
      if(!isMonthlyOrder(uniqueContributors[order.slug])) {
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

		let orders = json.nodes.map(order => {
			order.name = order.fromAccount.name;
			order.slug = order.fromAccount.slug;
			order.image = order.fromAccount.imageUrl;
			order.website = order.fromAccount.website;
      order.profile = `https://opencollective.com/${order.slug}`;
      order.totalAmountDonated = order.totalDonations.value;
      order.isMonthly = isMonthlyOrder(order);
			return order;
		}).filter(order => {
			return FilteredProfiles.indexOf(order.slug) === -1;
		});
		orders = getUniqueContributors(orders);

		orders.sort(function(a, b) {
      // Sort by total amount donated (desc)
			return b.totalDonations.value - a.totalDonations.value;
		});

		let backers = orders.length;

		let monthlyBackers = orders.filter(function(order) {
			return isMonthlyOrder(order);
		}).length;

		// if(process.env.ELEVENTY_PRODUCTION) {
		// 	console.log( "Final supporters list:" );
		// 	for(let supporter of json) {
		// 		console.log( ` * ${supporter.name} (${supporter.role} ${supporter.tier} ${supporter.isActive})` );
		// 	}
		// }

		return {
			supporters: orders,
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
