const getOpenCollectiveData = require("./opencollective.js");

module.exports = async function() {
	const opencollective = await getOpenCollectiveData();

	let backers = opencollective.supporters.filter(supporter => {
		return supporter.frequency === 'MONTHLY' && supporter.status === 'ACTIVE';
	});

	let count = 0;
	let sorted = [];
	let buckets = {};
	let monthlyDonations = 0;
	for(let backer of backers) {
		sorted.push(backer.amount.value);
		monthlyDonations += backer.amount.value;
		count++;

		if(!buckets[backer.amount.value]) {
			buckets[backer.amount.value] = 0;
		}
		buckets[backer.amount.value]++;
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
