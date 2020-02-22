const semver = require("semver");
const versions = require("../_data/versions");

module.exports = eleventyConfig => {
	eleventyConfig.addShortcode("addedin", function(version, tag, extraClass) {
		const newestPublishedVersion = versions.filter(v => v.tag !== "LATEST").shift();

		if( typeof version !== "string" ) {
			tag = version.tag;
			version = version.version;
		}
		let versionPrefix = "";
		let hasBeenReleased = true;
		if(("" + version).match(/^[0-9]/)) {
			versionPrefix = "v";
			hasBeenReleased = semver.lte(version, semver.coerce(newestPublishedVersion.tag))
		}

		tag = tag || "span";

		return `<${tag} class="minilink minilink-addedin${extraClass ? ` ${extraClass}`: ""}">${hasBeenReleased ? "New in" : "Coming soon in"} ${versionPrefix}${version}</${tag}>`;
	});
}