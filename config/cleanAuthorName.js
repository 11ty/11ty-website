module.exports = function cleanAuthorName(name) {
  name = name || "";

	if(name.startsWith("@")) {
		return name.substr(1);
	}
	return name;
};
