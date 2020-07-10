const fs = require("fs-extra");

class SiteHistory {
	constructor(url) {
		this.url = url;

		this.ranks = {
			perf: {},
			a11y: {},
			combinedSum: {},
			combined: {}
		}
	}

	_addRank(weekNumber, rank, type) {
		this.ranks[type][weekNumber] = rank;
	}

	addPerformanceRank(weekNumber, rank) {
		this._addRank(weekNumber, rank, "perf");
	}

	addAccessibilityRank(weekNumber, rank) {
		this._addRank(weekNumber, rank, "a11y");
	}

	addCombinedRankSum(weekNumber, rank) {
		this._addRank(weekNumber, rank, "combinedSum");
	}

	addCombinedRank(weekNumber, rank) {
		this._addRank(weekNumber, rank, "combined");
	}

	getCombinedRankSumForWeek(weekNumber) { // 0-indexed
		return this.ranks.combinedSum[weekNumber] || NaN;
	}

	toTop11HistoryJSON(weekNumber) {
		return {
			url: this.url,
			combinedRank: this.ranks.combined[weekNumber],
			perfRank: this.ranks.perf[weekNumber],
			a11yRank: this.ranks.a11y[weekNumber] || NaN,
		};
	}

	fillArray(size, entries) {
		let values = Object.values(entries);
		let arr = new Array(size - values.length);
		return [...arr, ...values];
	}

	toJSON(maximumWeekNumber) {
		return {
			url: this.url,
			combinedRank: this.fillArray(maximumWeekNumber, this.ranks.combined),
			perfRank: this.fillArray(maximumWeekNumber, this.ranks.perf),
			a11yRank: this.fillArray(maximumWeekNumber, this.ranks.a11y),
		};
	}
}

class RankHistory {
	constructor() {
		this.sites = {};
	}

	getSite(url) {
		return this.sites[url];
	}

	addSite(siteHistory) {
		this.sites[siteHistory.url] = siteHistory;
	}

	getAllTop11s(maximumWeekNumber) {
		let allSites = new Set();
		for(let weekNumber = 0; weekNumber < maximumWeekNumber; weekNumber++) {
			let top11 = this.getTop11(weekNumber);
			for(let topEntry of top11) {
				allSites.add(this.getSite(topEntry.url));
			}
		}
		return Array.from(allSites).map(entry => entry.toJSON(maximumWeekNumber)).sort((a, b) => {
			let aUrl = a.url.replace(/https?\:\/\/(www\.)?/, "");
			let bUrl = b.url.replace(/https?\:\/\/(www\.)?/, "");
			if(aUrl < bUrl) {
				return -1;
			} else if(bUrl < aUrl) {
				return 1;
			}
			return 0;
		});
	}

	getTop11(weekNumber) {
		let sites = [];
		for(let url in this.sites) {
			sites.push(this.sites[url]);
		}

		return sites.sort((a, b) => {
			let aRank = a.getCombinedRankSumForWeek(weekNumber) || 99999;
			let bRank = b.getCombinedRankSumForWeek(weekNumber) || 99999;
			if(isNaN(aRank) && isNaN(bRank)) {
				return 0;
			}
			if(isNaN(aRank)) {
				return -1;
			}
			if(isNaN(bRank)) {
				return 1;
			}
			return aRank - bRank;
		}).map((entry, index) => {
			if(!isNaN(entry.getCombinedRankSumForWeek(weekNumber))) {
				entry.addCombinedRank(weekNumber, index + 1);
			}

			return entry.toTop11HistoryJSON(weekNumber);
		}).slice(0, 11);
	}
}

let minimumWeekNumber = 6;
let maximumWeekNumber = 11;
let rank = new RankHistory();

for(let weekNumber = minimumWeekNumber; weekNumber < maximumWeekNumber; weekNumber++) {
	let week = require(`./fastestSites-week${weekNumber + 1}.json`);

	for(let site of week) {
		let url = site.finalUrl;
		if(!url) {
			// console.log( "Could not find url for", site );
			continue;
		}

		let siteHistory = rank.getSite(url);
		if(!siteHistory) {
			siteHistory = new SiteHistory(url);
			rank.addSite(siteHistory);
		}

		let perfRank = parseInt(site.performanceRank || site.rank, 10);
		let a11yRank = parseInt(site.accessibilityRank, 10) || NaN;
		if(weekNumber === 2) {
			// a11y leaderboard wasn’t launched yet and had bad data for this week
			a11yRank = NaN;
		}

		siteHistory.addPerformanceRank(weekNumber, perfRank)
		siteHistory.addAccessibilityRank(weekNumber, a11yRank);
		siteHistory.addCombinedRankSum(weekNumber, perfRank + (isNaN(a11yRank) ? 0 : a11yRank));

		// console.log( weekNumber, siteHistory );
	}
}

(async function() {
	let top11History = { weeks: [] };
	for(let weekNumber = minimumWeekNumber; weekNumber < maximumWeekNumber; weekNumber++) {
		let top11 = rank.getTop11(weekNumber);
		top11History.weeks[weekNumber] = top11;
	}
	await fs.writeFile("../../_data/top11History.json", JSON.stringify(top11History, null, 2));

	let allTop11s = rank.getAllTop11s(maximumWeekNumber);
	await fs.writeFile("../../_data/allTopSites.json", JSON.stringify(allTop11s, null, 2));
})();

