module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");

	return {
		templateFormats: ["html", "njk", "md"]
	};
};