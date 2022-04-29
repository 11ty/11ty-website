const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = eleventyConfig => {
	eleventyConfig.addFilter("jsmin", function(code) {
		if(process.env.NODE_ENV === "production") {
			let minified = Terser.minify(code);
			if( minified.error ) {
				console.log("Terser error: ", minified.error);
				return code;
			}

			return minified.code;
		}

		return code;
	});

	eleventyConfig.addFilter("cssmin", function(code) {
		if(process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
};
