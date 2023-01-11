const semver = require("semver");
const versions = require("../src/_data/versions");

const MINIMUM_VERSION_SHOWN = "0.11.0";

function hasPreRelease(version) {
	return version.includes("-");
}

module.exports = eleventyConfig => {
	eleventyConfig.addShortcode("addedin", function(version, tag, extraClass) {
		const newestPublishedVersion = versions.filter(v => v.tag !== "LATEST").shift();

		if( typeof version !== "string" ) {
			tag = version.tag;
			version = version.version;
		}

		let versionText = version;
		let beforeText = "Added in ";

		if(("" + version).match(/^[0-9]/)) {
			versionText = `v${versionText}`;

			// only works for versions starting with a number (plugins don’t do this)
			// is the latest version less than or equal to the version being passed in here?
			if(!semver.lte(version, semver.coerce(newestPublishedVersion.tag))) {
				beforeText = "Coming soon in ";
			} else if(hasPreRelease(version) && !hasPreRelease(newestPublishedVersion.tag)) {
				// Strip -canary.1 or -beta.1
				versionText = versionText.split("-")[0];
			}

			if(semver.lt(version, MINIMUM_VERSION_SHOWN)) {
				return "";
			}
		}

		tag = tag || "span";

		return `<${tag} class="minilink minilink-addedin${extraClass ? ` ${extraClass}`: ""}">${beforeText}${versionText}</${tag}>`;
	});
}
