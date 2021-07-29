const path = require("path");

const Ajv = require("ajv").default;
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
		throw err;
	}
}
