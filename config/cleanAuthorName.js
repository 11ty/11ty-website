// Strip out leading @ from usernames
export default function cleanAuthorName(name) {
	name = name || "";

	if (name.startsWith("@")) {
		return name.substr(1);
	}
	return name;
}
