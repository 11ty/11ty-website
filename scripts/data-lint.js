const inspect = require("util").inspect;
const { join, resolve } = require("path");

const {
	communitySchema,
	demosSchema,
	pluginsSchema,
	sitesSchema,
	startersSchema
} = require("./schemas");

const { schemaLint } = require("./data-lint-lib");

const dataDir = resolve(join(__dirname, "..", "src", "_data"));
let errors = [];

main();

async function main() {
	await Promise.all([
		dataLint(join(dataDir, "community"), "*.js", communitySchema),
		dataLint(join(dataDir, "demos"), "*.js", demosSchema),
		dataLint(join(dataDir, "plugins"), "*.json", pluginsSchema),
		dataLint(join(dataDir, "sites"), "*.json", sitesSchema),
		dataLint(join(dataDir, "starters"), "*.json", startersSchema)
	]);

	if (errors.length) {
		console.error(inspect(errors, { depth: 4 }));
		process.exitCode = 1;
	}

	console.info("All data files are clean!");
	process.exitCode = 0;
}

/**
 * Glorified wrapper for `schemaLint` which aggregates error messages.
 *
 * @param {string} dir Directory of files to lint.
 * @param {string} ext Expected file extension of files in specified directory.
 * @param {*} schema Ajv schema definition to validate files against.
 */
async function dataLint(dir = "", ext = "", schema = {}) {
	try {
		await schemaLint(dir, ext, schema);
	} catch (err) {
		errors = errors.concat(err.errors);
	}
}
