t path = require("path");

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fastglob = require("fast-glob");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

module.exports = { schemaLint };

async function schemaLint(dir = "", ext = "*.json", schema = {}) {
	const validate = ajv.compile(schema);

	const validFilesGlob = path.join(dir, ext);
	// Find ALL files in the specified directory that do _NOT_ match the expected extension.
	const invalidFiles = await fastglob([
		path.join(dir, "*"),
		`!${validFilesGlob}`
	]);
	const validFiles = await fastglob(validFilesGlob, {
		absolute: true,
		objectMode: true
	});

	const errors = [];

	for (const invalidFile of invalidFiles) {
		errors.push({
			file: invalidFile,
			errors: [
				{
					message: `Unexpected file type: "${path.extname(
						invalidFile
					)}". Expected "${ext}"`
				}
			]
		});
	}
	for (const file of validFiles) {
		const absPath = file.path;
		const relPath = path.join(dir, file.name);
		const contents = require(absPath);
		await validate(contents).catch(err => {
			const data = { file: relPath, errors: err.errors, contents };
			errors.push(data);
		});
	}

	if (errors.length) {
		const err = new Error(`Schema check failed for ${validFilesGlob}`);
		err.errors = errors;
		return Promise.reject(err);
	}
	return;
}

/// SCHEMAS

const uriOrEmptyString = {
	type: "string",
	anyOf: [{ format: "uri" }, { maxLength: 0 }]
};

module.exports.communitySchema = {
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
};

module.exports.demosSchema = {
	$async: true,
	type: "object",
	properties: {
		// Required properties.
		// TODO: This is generating the following warning:
		//   strict mode: "items" is 1-tuple, but minItems or maxItems/additionalItems are not specified or different at path "#/properties/category"
		category: {
			type: "array",
			minItems: 1,
			items: [{ type: "string", enum: ["serverless"] }],
			uniqueItems: true
		},
		name: { type: "string" },
		url: { type: "string", format: "uri" },
		// Optional properties.
		description: { type: "string" },
		twitter: { type: "string", minLength: 1 },
		source_url: { type: "string", format: "uri", minLength: 1 },
		// TODO: This is generating the following warning:
		//   strict mode: "items" is 1-tuple, but minItems or maxItems/additionalItems are not specified or different at path "#/properties/authoredBy"
		authoredBy: { type: "array", minItems: 1, items: [{ type: "string" }] }
	},
	required: ["category", "name", "url"],
	additionalProperties: false
};

module.exports.pluginsSchema = {
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

module.exports.sitesSchema = {
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

module.exports.startersSchema = {
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
