module.exports = function getAuthors(sites) {
	let names = new Set();
	for(let key in sites) {
		let site = sites[key];
		if(site.disabled) {
			continue;
		}

		if(site.opened_by) {
			names.add(site.opened_by);
		}

		if(Array.isArray(site.authors)) {
			for(let name of site.authors) {
				if(name) {
					names.add(name);
				}
			}
		}
	}

	return Array.from(names);
}
