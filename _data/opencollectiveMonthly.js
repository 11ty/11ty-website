const getOpenCollectiveData = require("./opencollective.js");

module.exports = async function() {
	const opencollective = await getOpenCollectiveData();

	let backers = opencollective.supporters.filter(supporter => {
		return supporter.role === "BACKER" && supporter.tier && supporter.isActive;
	});

	let monthlyDonations = 0;
	for(let backer of backers) {
		monthlyDonations += backer.lastTransactionAmount;
	}

	return {
		contributorCount: backers.length,
		recurringAmount: monthlyDonations
	};
}