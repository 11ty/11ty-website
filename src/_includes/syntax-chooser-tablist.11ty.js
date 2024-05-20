async function render({ id, valid, additions, subtractions, only, label }) {
	let syntaxes = {};

	let extraSyntaxes = {
		html: "HTML",
		md: "Markdown",
		webc: "WebC",
		jscjs: "CommonJS",
		jsesm: "ESM",
		any: "Any",
	};

	let syntaxMap = {
		liquid: "Liquid",
		njk: "Nunjucks",
		js: "11ty.js",
		hbs: "Handlebars",
	};

	// Extras go first
	let syntaxAddArray = (additions || "").split(",").filter((entry) => !!entry);
	for (let syn of syntaxAddArray) {
		if (extraSyntaxes[syn]) {
			syntaxes[syn] = extraSyntaxes[syn];
		}
	}

	if (only) {
		for (let syn of (only || "").split(",")) {
			syntaxes[syn] = extraSyntaxes[syn] || syntaxMap[syn];
		}
	} else {
		Object.assign(syntaxes, syntaxMap);
	}

	for (let syn of (subtractions || "").split(",")) {
		if (syn) {
			delete syntaxes[syn];
		}
	}

	let str = [];
	let validArray = (valid || "").split(",").filter((entry) => !!entry);

	// e.g. Liquid has no tab content but was first in the tab list
	// If a user comes without a preference, don’t show liquid by default
	let defaultOnNoPreference = ` or syntax == "" or syntax == undefined`;

	for (let syn in syntaxes) {
		let isPreferenceSelectable =
			validArray.length === 0 || validArray.includes(syn);

		str.push(
			`<a href="#${id}-${syn}" role="tab" data-tabs-persist="templatelang:${syn}"{% if syntax == "${syn}"${
				isPreferenceSelectable ? defaultOnNoPreference : ""
			} %} aria-selected="true"{% endif %}>${syntaxes[syn]}</a>`
		);

		// only the first one should default
		if (isPreferenceSelectable) {
			defaultOnNoPreference = "";
		}
	}

	let liquidTemplate = `
{% assign syntax = false %}
<div role="tablist" aria-label="Template Language Chooser">
	${label || "View this example in"}:
	${str.join("\n")}
</div>`;

	return await this.renderTemplate(liquidTemplate, "liquid");
}

export { render };
