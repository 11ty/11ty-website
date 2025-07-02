/*
	 * JavaScript Pretty Date
	 * Copyright (c) 2011 John Resig (ejohn.org)
	 * Licensed under the MIT and GPL licenses.
	 *
	 * Floor for minutes/hours, Round for days, Ceil for weeks
	 */
	export default function(dateStr) {
		let diff = (Date.now() - Date.parse(dateStr)) / 1000;
		let day_diff = Math.round(diff / 86400);

		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 ) {
			return;
		}

		let result = day_diff == 0 && (
				diff < 60 && "now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "1 day ago" || // Yesterday
			day_diff < 7 && day_diff + " days ago" ||
			day_diff <= 11 && "1 week ago" ||
			day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";

		return result;
	};
