module.exports = function getAuthors(sites, callback) {
	let names = new Set();
	for(let key in sites) {
		let site = sites[key];
		let authorsNames = site.authoredBy && site.authoredBy.length ? site.authoredBy : site.twitter;
		if(authorsNames && !site.disabled) {
			if(!Array.isArray(authorsNames)) {
				authorsNames = [authorsNames];
			}
			for(let name of authorsNames) {
				names.add(name);
				if(callback && typeof callback === "function") {
					callback(name);
				}
			}
		}
	}
	return Array.from(names);
}