module.exports = function cleanAuthorName(name = "") {
	if(name.startsWith("@")) {
		return name.substr(1);
	}
	return name;
};