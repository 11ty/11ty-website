module.exports = function getAuthors(sites, callback) {
	let names = new Set();
	for(let key in sites) {
		let site = sites[key];
		if(site.disabled) {
			continue;
		}

		let authorsNames = new Set();
		if(site.opened_by) {
			authorsNames.add(site.opened_by);
		}

		if(Array.isArray(site.authors)) {
			for(let name of site.authors) {
				if(name) {
					authorsNames.add(name);
				}
			}
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
	return Array.from(names);
}
