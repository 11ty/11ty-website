const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = eleventyConfig => {
	eleventyConfig.addNunjucksAsyncFilter("jsmin", async function(code, callback) {
		if(process.env.NODE_ENV === "production") {
			try {
				let result = await Terser.minify(code);
				callback(null, result.code);
			} catch(e) {
				console.log("Terser error: ", minified.error);
			}
		}

		callback(null, code);
	});

	eleventyConfig.addFilter("cssmin", function(code) {
		if(process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
};
