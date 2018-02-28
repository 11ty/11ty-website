module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("css/fonts");

	return {
		templateFormats: ["html", "njk", "md", "png"]
	};
};