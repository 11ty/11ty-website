// https://opencollective.com/11ty/members/all.json
import EleventyFetch from "@11ty/eleventy-fetch";
import githubSponsors from "./githubSponsors.js";

const CUMULATIVE_MINIMIUM = {
	INDIVIDUAL: 55, // minimum total amount to show inactive logo
	DEFAULT_AVATAR: 200, // minimum amount for default avatar (previously never shown)
	ORGANIZATION: 999999, // minimum total amount to show inactive logo
};

const EXCLUDED_WEB_HOSTNAMES = [
	"example.com",
	"x.com",
	"twitter.com",
];

const EXCLUDED_OPENCOLLECTIVE_USERNAME_SLUGS = [
	"zach-leatherman", // me
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
	"sidesmedia", // selling social media
	"best-casinos-australia-bca", // gambling
	"buy-tiktok-likes", // selling social media
];

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
	return (order.frequency === "MONTHLY" || order.frequency === "YEARLY") && order.status === "ACTIVE";
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
		hasDefaultAvatar: false,
		showOnFacepile: false,
	};

	return Object.values(uniqueContributors);
}

function isAllowedUrl(websiteUrl) {
	if(!websiteUrl) {
		return false;
	}

	try {
		let u = new URL(websiteUrl);
		return EXCLUDED_WEB_HOSTNAMES.includes(u.hostname) === false;
	} catch(e) {
		return false;
	}
}

export default async function () {
	try {
		// let url = `https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&status=ACTIVE`;
		let url = `https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000`;
		let json = await EleventyFetch(url, {
			type: "json",
			duration: "30m",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
		});

		if(json.nodes.length > 980) {
			console.warn( json.nodes.length, "OpenCollective supporter results (careful when this hits the API max limit of 1000)" );
		}

		let orders = json.nodes
			.map((order) => {
				order.name = order.fromAccount.name;
				order.accountType = order.fromAccount.type;
				order.slug = order.fromAccount.slug;
				order.image = order.fromAccount.imageUrl;

				if(isAllowedUrl(order.fromAccount.website)) {
					order.website = order.fromAccount.website;
				}

				order.profile = `https://opencollective.com/${order.slug}`;
				order.totalAmountDonated = Number(order.totalDonations.value);
				order.isMonthly = isMonthlyOrYearlyOrder(order);
				order.hasDefaultAvatar =
					order.image ===
					`https://images.opencollective.com/${order.slug}/avatar.png`;

				order.showOnFacepile = order.status === "ACTIVE" ||
					order.accountType === "INDIVIDUAL" && order.totalAmountDonated > CUMULATIVE_MINIMIUM.INDIVIDUAL ||
					order.accountType === "ORGANIZATION" && order.totalAmountDonated > CUMULATIVE_MINIMIUM.ORGANIZATION;

				// Active orders usually *must* have an avatar (or a website)
				if(order.hasDefaultAvatar && !order.website && order.accountType === "INDIVIDUAL") {
					order.showOnFacepile = order.totalAmountDonated > CUMULATIVE_MINIMIUM.DEFAULT_AVATAR;
				}

				if(order.slug.startsWith("guest-")) {
					order.showOnFacepile = false;
				}

				return order;
			});

		// lol hardcoded
		orders.push({
			name: "Zach Leatherman",
			slug: "zach-leatherman",
			accountType: "INDIVIDUAL",
			github: "zachleat",
			image:
				"https://images.opencollective.com/zachleat/70606f4/avatar/256.png",
			website: "https://www.zachleat.com/",
			profile: "https://opencollective.com/zachleat",
			totalAmountDonated: 0,
			isMonthly: true,
			hasDefaultAvatar: false,
			showOnFacepile: false,
		});

		let onetimeDonations = getAmortizedOneTimeDonations(orders);
		let githubSponsorsAmount = await githubSponsors();
		orders = getUniqueContributors(orders, githubSponsorsAmount);

		orders.sort(function (a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		let backersCount = orders.length - 1; // subtract one for hardcoded me

		// Filter banned slugs (spam, donation terms violations)
		orders = orders.filter(order => EXCLUDED_OPENCOLLECTIVE_USERNAME_SLUGS.includes(order.slug) === false);

		return {
			supporters: orders,
			backersCount,
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
		};
	}
}
