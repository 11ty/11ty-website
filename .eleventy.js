module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");

	eleventyConfig.addFilter("version", function(pkgVersion) {
		if(pkgVersion.indexOf("file:") === 0) {
			return "(local)";
		}
		if(pkgVersion.indexOf("^") === 0) {
			return pkgVersion.substr(1);
		}
		return pkgVersion;
	});

	return {
		templateFormats: ["html", "njk", "md"]
	};
};