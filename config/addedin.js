const semver = require("semver");
const versions = require("../src/_data/versions");

const MINIMUM_VERSION_SHOWN = "0.11.0";

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
			// only works for versions starting with a number (plugins don’t do this)
			// is the latest version less than or equal to the version being passed in here?
			hasBeenReleased = semver.lte(version, semver.coerce(newestPublishedVersion.tag));

			if(semver.lt(version, MINIMUM_VERSION_SHOWN)) {
				return "";
			}
		}

		tag = tag || "span";

		return `<${tag} class="minilink minilink-addedin${extraClass ? ` ${extraClass}`: ""}">${hasBeenReleased ? "New in" : "Coming soon in"} ${versionPrefix}${version}</${tag}>`;
	});
}
