let data = {
	layout: "layouts/docs.njk",
	feedTitle: "Eleventy Documentation",
	feedUrl: "/docs/feed.xml",
};

if(process.env.NODE_ENV === "production") {
	data.date = "git Last Modified";
}

module.exports = data;
