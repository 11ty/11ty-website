const getOpenCollectiveData = require("./opencollective.js");

module.exports = async function() {
	const opencollective = await getOpenCollectiveData();

	let backers = opencollective.supporters.filter(supporter => {
		return supporter.role === "BACKER" && supporter.tier && supporter.isActive;
	});

	let count = 0;
	let sorted = [];
	let buckets = {};
	let monthlyDonations = 0;
	for(let backer of backers) {
	// hardcoded incorrect API for https://opencollective.com/piccalilli_ silver sponsor still active
		if(backer.profile === "https://opencollective.com/piccalilli_" && backer.lastTransactionAmount === 100) {
			continue;
		}

		sorted.push(backer.lastTransactionAmount);
		monthlyDonations += backer.lastTransactionAmount;
		count++;

		if(!buckets[backer.lastTransactionAmount]) {
			buckets[backer.lastTransactionAmount] = 0;
		}
		buckets[backer.lastTransactionAmount]++;
	}

	sorted.sort((a, b) => a - b);

	return {
		contributorCount: count,
		recurringAmount: monthlyDonations,
		stats: {
			median: sorted[Math.floor(sorted.length / 2)],
			mean: monthlyDonations / count,
		},
		list: sorted,
		buckets: buckets,
	};
}