module.exports = {
	$async: true,
	type: "object",
	properties: {
		// Required properties.
		description: { type: "string" },
		npm: { type: "string" },
		// Optional properties.
		author: { type: "string" },
		deprecated: { type: "string" }
	},
	required: ["description", "npm"],
	additionalProperties: false
};
