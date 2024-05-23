// https://opencollective.com/11ty/members/all.json
import EleventyFetch from "@11ty/eleventy-fetch";

const FilteredProfiles = [
	"bca-account1", // website is buycheapaccounts.com
	"baocasino", // gambling
	"woorke", // sells social media accounts
	"suominettikasinot24", // gambling
	"masonslots", //gambling
	"trust-my-paper", // selling term papers
	"kiirlaenud", // some quick loans site
	"kajino-bitcoin", // crypto
	"seo25-com", // selling website traffic
	"relief-factor", // profile link was some weird PDF
	"targetedwebtraffic", // selling website traffic
	"forexbrokerz", // crypto
	"viewality-media", // broken site on wix?
	"aviator-game1", // gambling
	"igrovye-avtomaty", // gambling
];

function isMonthlyOrYearlyOrder(order) {
	return (
		(order.frequency === "MONTHLY" || order.frequency === "YEARLY") &&
		order.status === "ACTIVE"
	);
}

function getUniqueContributors(orders) {
	let GITHUB_SPONSORS_MONTHS = 3;

	let uniqueContributors = {};
	for (let order of orders) {
		if(order.slug === "github-sponsors") {
			// within the last 30 days
			if((Date.now() - Date.parse(order.createdAt)) < 1000*60*60*24*30*GITHUB_SPONSORS_MONTHS) {
				if(!uniqueContributors[order.slug]) {
					uniqueContributors[order.slug] = Object.assign({}, order, {
						frequency: "MONTHLY",
						status: "ACTIVE",
						isMonthly: true,
					});
					uniqueContributors[order.slug].fromAccount.name = "GitHub Sponsors Aggregate (Estimate)"
				} else {
					uniqueContributors[order.slug].amount.value += order.amount.value;
				}
			}
		} else if (uniqueContributors[order.slug]) {
			// if order already exists, overwrite only if existing is not an active monthly contribution
			if (!isMonthlyOrYearlyOrder(uniqueContributors[order.slug])) {
				uniqueContributors[order.slug] = order;
			}
		} else {
			uniqueContributors[order.slug] = order;
		}
	}

	// last 90 days, divided by 3 to estimate monthly
	if(uniqueContributors["github-sponsors"]?.amount?.value) {
		uniqueContributors["github-sponsors"].amount.value /= GITHUB_SPONSORS_MONTHS;

		// Better estimate here: https://github.com/sponsors/11ty/dashboard
		// Hardcoded, to workaround the retroactive non-recurring payments from GitHub Sponsors
		uniqueContributors["github-sponsors"].amount.value = 66;

		// console.log( "[11ty/$] GitHub Sponsors monthly recurring:", uniqueContributors["github-sponsors"].amount.value );
	}

	return Object.values(uniqueContributors);
}

export default async function () {
	try {
		let url = `https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&status=paid,active`;
		let json = await EleventyFetch(url, {
			type: "json",
			duration: "1h",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
		});

		let orders = json.nodes
			.map((order) => {
				order.name = order.fromAccount.name;
				order.slug = order.fromAccount.slug;
				order.twitter = order.fromAccount.twitterHandle;
				order.image = order.fromAccount.imageUrl;
				order.website = order.fromAccount.website;
				order.profile = `https://opencollective.com/${order.slug}`;
				order.totalAmountDonated = order.totalDonations.value;
				order.isMonthly = isMonthlyOrYearlyOrder(order);
				order.hasDefaultAvatar =
					order.image ===
					`https://images.opencollective.com/${order.slug}/avatar.png`;
				return order;
			})
			.filter((order) => {
				return FilteredProfiles.indexOf(order.slug) === -1;
			});

		// lol hardcoded
		orders.push({
			name: "Zach Leatherman",
			slug: "zach-leatherman",
			twitter: "zachleat",
			github: "zachleat",
			image:
				"https://images.opencollective.com/zachleat/70606f4/avatar/256.png",
			website: "https://www.zachleat.com/",
			profile: "https://opencollective.com/zachleat",
			totalAmountDonated: 0,
			isMonthly: true,
			hasDefaultAvatar: false,
		});

		// Temporary hardcoded
		orders.push({
			name: "CloudCannon",
			slug: "cloudcannon1",
			twitter: "CloudCannon",
			github: "CloudCannon",
			image: "https://logo.clearbit.com/cloudcannon.com",
			website: "https://cloudcannon.com/",
			profile: "https://opencollective.com/cloudcannon1",
			isMonthly: true,
		});

		orders = getUniqueContributors(orders);

		orders.sort(function (a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		let backers = orders.length;

		let monthlyBackers = orders.filter(function (order) {
			return isMonthlyOrYearlyOrder(order);
		}).length;

		return {
			supporters: orders,
			backers: backers,
			monthlyBackers: monthlyBackers,
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.error("Failed, returning 0 opencollective backers.", e);

		return {
			supporters: [],
			backers: 0,
			monthlyBackers: 0,
		};
	}
}
