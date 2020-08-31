const cleanName = require("./cleanAuthorName");

module.exports = function getAuthors(sites, callback) {
	let names = new Set();
	for(let key in sites) {
		let site = sites[key];
		if(!site.disabled) {
			let authorsNames = new Set();
			if(site.twitter) {
				authorsNames.add(cleanName(site.twitter));
			}
			if(Array.isArray(site.authoredBy)) {
				for(let name of site.authoredBy) {
					if(name) {
						authorsNames.add(cleanName(name));
					}
				}
			} else if(site.authoredBy) {
				authorsNames.add(cleanName(site.authoredBy));
			}

			for(let name of authorsNames) {
				if(name) {
					names.add(name);
					if(callback && typeof callback === "function") {
						callback(name, site);
					}
				}
			}
		}
	}
	return Array.from(names);
}