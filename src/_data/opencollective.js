// https://opencollective.com/11ty/members/all.json
import EleventyFetch from "@11ty/eleventy-fetch";
import githubSponsors from "./githubSponsors.js";

function getAmortizedOneTimeDonations(orders) {
	let total = 0;
	let count = 0;
	let monthsBuckets = Array(12);

	for (let order of orders) {
		if(order.frequency === "ONETIME" && order.fromAccount.slug !== "github-sponsors") {
			let monthsAgo = (Date.now() - Date.parse(order.createdAt)) / (1000*60*60*24*365 / 12);
			if(monthsAgo < 12) {
				let index = Math.floor(monthsAgo);
				if(!monthsBuckets[index]) {
					monthsBuckets[index] = 0;
				}
				monthsBuckets[index] += order.amount.value;

				total += order.amount.value;
				count++;
			}
		}
	}

	return {
		total,
		count,
		months: monthsBuckets,
	};
}

function isMonthlyOrYearlyOrder(order) {
	return (
		(order.frequency === "MONTHLY" || order.frequency === "YEARLY") &&
		order.status === "ACTIVE"
	);
}

function getUniqueContributors(orders, githubSponsorsAmount) {
	let uniqueContributors = {};
	for (let order of orders) {
		if (uniqueContributors[order.slug]) {
			// if order already exists, overwrite only if existing entry is not an active monthly contribution
			if (isMonthlyOrYearlyOrder(uniqueContributors[order.slug])) {
				if(isMonthlyOrYearlyOrder(order)) {
					if(order.amount.value > uniqueContributors[order.slug].amount.value) {
						uniqueContributors[order.slug] = order;
						// console.log( "Multiple active Open Collective contributions tiers for (picked largest):", order.slug );
					}
				}
			} else {
				uniqueContributors[order.slug] = order;
			}
		} else {
			uniqueContributors[order.slug] = order;
		}
	}

	// Better estimate here: https://github.com/sponsors/11ty/dashboard
	// Inject manually to workaround the retroactive non-recurring payments from GitHub Sponsors
	uniqueContributors["github-sponsors"] = {
		amount: { value: githubSponsorsAmount },
		frequency: 'MONTHLY',
		status: 'ACTIVE',
		name: 'GitHub Sponsors Aggregate (Estimate)',
		slug: 'github-sponsors',
		github: null,
		image: 'https://images.opencollective.com/github-sponsors/dc0ae97/logo.png',
		website: 'https://github.com/sponsors/',
		profile: 'https://opencollective.com/github-sponsors',
		totalAmountDonated: githubSponsorsAmount,
		isMonthly: true,
		hasDefaultAvatar: false
	};

	return Object.values(uniqueContributors);
}

export default async function () {
	try {
		let url = `https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&status=ACTIVE`;
		let json = await EleventyFetch(url, {
			type: "json",
			duration: "30m",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
		});

		let orders = json.nodes
			.filter(order => {
				return order.status !== "CANCELLED";
			})
			.map((order) => {
				order.name = order.fromAccount.name;
				order.slug = order.fromAccount.slug;
				order.image = order.fromAccount.imageUrl;
				order.website = order.fromAccount.website;
				order.profile = `https://opencollective.com/${order.slug}`;
				order.totalAmountDonated = order.totalDonations.value;
				order.isMonthly = isMonthlyOrYearlyOrder(order);
				order.hasDefaultAvatar =
					order.image ===
					`https://images.opencollective.com/${order.slug}/avatar.png`;

				return order;
			});

		// lol hardcoded
		orders.push({
			name: "Zach Leatherman",
			slug: "zach-leatherman",
			github: "zachleat",
			image:
				"https://images.opencollective.com/zachleat/70606f4/avatar/256.png",
			website: "https://www.zachleat.com/",
			profile: "https://opencollective.com/zachleat",
			totalAmountDonated: 0,
			isMonthly: true,
			hasDefaultAvatar: false,
		});

		let onetimeDonations = getAmortizedOneTimeDonations(orders);
		let githubSponsorsAmount = await githubSponsors();
		orders = getUniqueContributors(orders, githubSponsorsAmount);

		orders.sort(function (a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		let backers = orders.length;

		return {
			supporters: orders,
			backers,
			onetimeDonations,
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.error("Failed, returning 0 opencollective backers.", e);

		return {
			supporters: [],
			onetimeDonations: {
				count: 0,
				total: 0,
			},
			backers: 0,
		};
	}
}
