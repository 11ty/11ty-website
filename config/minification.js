const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = eleventyConfig => {
	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
		if( process.env.NODE_ENV === "production" && outputPath && outputPath.endsWith(".html") ) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}

		return content;
	});

	eleventyConfig.addNunjucksAsyncFilter("jsmin", function(code, callback) {
		if(process.env.NODE_ENV === "production") {
			Terser.minify(code).then(minified => {
				callback(null, minified.code);
			}, e => {
				console.log("Terser error: ", e);
				callback(null, code);
			});
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
