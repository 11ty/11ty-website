import { createToc } from "../../config/toc.js";

let data = {
	layout: "layouts/docs.njk",
	headerTitle: "Eleventy Documentation",
	feedTitle: "Eleventy Documentation",
	feedUrl: "/docs/feed.xml",
	eleventyComputed: {
		tocData: (data) => {
			const toc = createToc(data.page.rawInput, {});
			return toc;
		},
	},
};

if (process.env.NODE_ENV === "production") {
	data.date = "git Last Modified";
}

export default data;
