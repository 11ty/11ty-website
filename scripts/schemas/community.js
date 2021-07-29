module.exports = {
	$async: true,
	type: "object",
	properties: {
		// Required properties.
		author: { type: "string" },
		key: {
			type: "string",
			enum: [
				"collections",
				"data-cascade",
				"data",
				"getting-started",
				"image",
				"javascript",
				"plugins",
				"tutorial-blog",
				"tutorial-intro",
				"tutorial-simplewebsite"
			]
		},
		title: { type: "string" },
		url: { type: "string", format: "uri" }
	},
	required: ["author", "key", "title", "url"],
	additionalProperties: false
}
