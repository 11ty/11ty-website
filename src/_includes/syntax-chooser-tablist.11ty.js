exports.render = async function({id, valid, additions, label}) {
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
		hbs: "Handlebars",
	});

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

	let content;
	// Fancy: only use the Edge plugin on NETLIFY or when using Netlify CLI
	if(process.env.NETLIFY || process.env.NETLIFY_DEV) {
		content = await this.edge(liquidTemplate, "liquid");
	} else {
		// Fallback to edge-less tabs on Eleventy Dev Server
		content = await this.renderTemplate(liquidTemplate, "liquid");
	}

	let form = await this.renderFile("./src/_includes/syntax-chooser-form.njk");
	return `<div class="tmplsyntax">
	${content}
	<details-utils close-esc close-click-outside>
		<details class="tmplsyntax-default">
			<summary>Always prefer…</summary>
			${form}
		</details>
	</details>
</div>`;
};
