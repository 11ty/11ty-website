let data = {
	layout: "layouts/docs.njk",
	date: "git Last Modified",
};
// Use this if the git thing is too slow
// if(process.env.NODE_ENV === "production") {
// 	data.date = "git Last Modified";
// }

module.exports = data;
