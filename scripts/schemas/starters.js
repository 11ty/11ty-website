module.exports = {
	$async: true,
	type: "object",
	properties: {
		// Required properties.
		description: { type: "string" },
		name: { type: "string" },
		url: { type: "string", format: "uri" },
		// Optional properties.
		author: { type: "string" },
		demo: { type: "string", format: "uri" },
		excludedFromLeaderboards: { type: "boolean" },
		npmStartScript: { type: "string", minLength: 1 },
		official: { type: "boolean" },
		order: { type: "integer" },
		source_url: { type: "string", format: "uri" }
	},
	required: ["description", "name", "url"],
	additionalProperties: false
};
