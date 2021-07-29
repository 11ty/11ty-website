const uriOrEmptyString = {
	type: "string",
	anyOf: [{ format: "uri" }, { maxLength: 0 }]
};

module.exports = {
	$async: true,
	type: "object",
	properties: {
		// Required properties.
		// Optional properties.
		authoredBy: { type: "array", minItems: 0 },
		business: {
			type: "object",
			properties: {
				cta: { type: "string", format: "uri", minLength: 1 },
				name: { type: "string", minLength: 1 }
			},
			required: ["cta"],
			additionalProperties: false
		},
		description: { type: "string", minLength: 1 },
		demo: { type: "string", format: "uri", minLength: 1 },
		disabled: { type: "boolean" },
		excludedFromLeaderboards: { type: "boolean" },
		featured: { type: "boolean" },
		hideOnHomepage: { type: "boolean" },
		launch_post: { type: "string", format: "uri", minLength: 1 },
		name: { type: "string", minLength: 1 },
		source_url: uriOrEmptyString,
		superfeatured: { type: "boolean" },
		twitter: { type: "string", minLength: 0 },
		url: { type: "string", format: "uri", minLength: 1 }
	},
	required: ["name"],
	additionalProperties: false
};


