module.exports = {
	$async: true,
	type: "object",
	properties: {
		// Required properties.
		category: {
			type: "array",
			minItems: 1,
			items: { type: "string", enum: ["serverless"] },
			uniqueItems: true
		},
		name: { type: "string" },
		url: { type: "string", format: "uri" },
		// Optional properties.
		description: { type: "string" },
		twitter: { type: "string", minLength: 1 },
		source_url: { type: "string", format: "uri", minLength: 1 },
		authoredBy: { type: "array", minItems: 1, items: { type: "string" } }
	},
	required: ["category", "name", "url"],
	additionalProperties: false
};
