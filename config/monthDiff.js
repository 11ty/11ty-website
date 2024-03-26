import { DateTime } from "luxon";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("monthDiff", (dateStr) => {
		let d = DateTime.fromSQL(dateStr);
		let duration = d.diffNow("months").toObject();
		let months = Math.round(Math.abs(duration.months));

		if (months > 1) {
			return `for ${months} consecutive months`;
		}
		return "";
	});
}
