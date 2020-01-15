const supporters = require("./supporters.json");

let backers = supporters.filter(supporter => {
	return supporter.role === "BACKER" && supporter.tier && supporter.isActive;
});

let monthlyDonations = 0;
for(let backer of backers) {
	monthlyDonations += backer.lastTransactionAmount;
}

module.exports = monthlyDonations;