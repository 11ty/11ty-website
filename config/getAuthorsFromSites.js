module.exports = function getAuthors(sites, callback) {
	let names = new Set();
	for(let key in sites) {
		let site = sites[key];
		if(!site.disabled) {
			let authorsNames = [];
			if(site.twitter) {
				authorsNames.push(site.twitter);
			}
			if(Array.isArray(site.authoredBy)) {
				for(let name of site.authoredBy) {
					if(name) {
						authorsNames.push(name);
					}
				}
			} else if(site.authoredBy) {
				authorsNames.push(site.authoredBy);
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