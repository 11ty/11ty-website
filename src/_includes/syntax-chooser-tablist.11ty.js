exports.render = async function({id, valid, additions, subtractions, label}) {
	let syntaxes = {};

	let extraSyntaxes = {
		md: "Markdown"
	};

	// Extras go first
	let syntaxAddArray = (additions || "").split(",").filter(entry => !!entry);
	for(let syn of syntaxAddArray) {
		if(extraSyntaxes[syn]) {
			syntaxes[syn] = extraSyntaxes[syn];
		}
	}

	Object.assign(syntaxes, {
		liquid: "Liquid",
		njk: "Nunjucks",
		js: "11ty.js",
		webc: "WebC",
		hbs: "Handlebars",
	});

	for(let syn of (subtractions || "").split(",")) {
		if(syn) {
			delete syntaxes[syn];
		}
	}

	let str = [];
	let validArray = (valid || "").split(",").filter(entry => !!entry);

	// e.g. Liquid has no tab content but was first in the tab list
	// If a user comes without a preference, don’t show liquid by default
	let defaultOnNoPreference = ` or syntax == "" or syntax == undefined`;

	for(let syn in syntaxes) {
		let isPreferenceSelectable = validArray.length === 0 || validArray.includes(syn);

		str.push(`<a href="#${id}-${syn}" role="tab"{% if syntax == "${syn}"${isPreferenceSelectable ? defaultOnNoPreference : ""} %} aria-selected="true"{% endif %}>${syntaxes[syn]}</a>`);

		// only the first one should default
		if(isPreferenceSelectable) {
			defaultOnNoPreference = "";
		}
	}

	let liquidTemplate = `
{% assign syntax = eleventy.edge.cookies.syntax %}
<div role="tablist" aria-label="Template Language Chooser">
	${label || "View this example in"}:
	${str.join("\n")}
</div>`;

	// Fancy: only use the Edge plugin on NETLIFY or when using Netlify CLI
	if(false && (process.env.NETLIFY || process.env.NETLIFY_DEV)) {
		return `<div class="tmplsyntax">
	${await this.edge(liquidTemplate, "liquid")}
	<details-utils close-esc close-click-outside>
	<details class="tmplsyntax-default">
		<summary>Always prefer…</summary>
		<div class="tmplsyntax-dropdown">${await this.renderFile("./src/_includes/syntax-chooser-form.njk")}</div>
	</details>
</details-utils></div>`;
	} else {
		// Fallback to edge-less tabs on Eleventy Dev Server
		return await this.renderTemplate(liquidTemplate, "liquid");
	}
};
