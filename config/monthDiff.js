const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter("monthDiff", (dateStr) => {
		let d = DateTime.fromSQL(dateStr);
		let duration = d.diffNow("months").toObject();
		let months = Math.round(Math.abs(duration.months));

		if(months > 0) {
			return `for ${months} ${months > 1 ? "consecutive " : ""}month${months != 1 ? "s" : ""}`;
		}
		return "";
	});
}