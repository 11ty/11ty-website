const fastglob = require("fast-glob");
const getAuthors = require("../../config/getAuthorsFromSites");

module.exports = async () => {
	let sites = await fastglob("./src/_data/builtwith/*.json", {
		caseSensitiveMatch: false
	});

	let authors = {};
	for(let site of sites) {
		let filename = site.split("/").pop();
		let siteData = require(`./builtwith/${filename}`);

		siteData.fileSlug = filename.replace(/\.json/, "");

		let names = getAuthors([siteData]);
		for(let name of names) {
			let key = name.toLowerCase();
			if(!authors[key]) {
				authors[key] = {
					name: name,
					sites: []
				};
			}
			authors[key].sites.push(siteData);

			if(siteData.opened_by === name) {
				// Add BUSINESS info
				if(siteData.business_url) {
					authors[key].business_url = siteData.business_url;
					authors[key].business_name = siteData.business_name;
				}

				// Add opencollective username
				if(siteData.opencollective && !authors[key].opencollective) {
					authors[key].opencollective = siteData.opencollective;
				}
			}
		}
	}

	return authors;
};
