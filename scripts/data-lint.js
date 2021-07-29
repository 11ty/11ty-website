const inspect = require("util").inspect;

const lib = require("./data-lint-lib");

let errors = [];

main();

async function main() {
	const {
		communitySchema,
		demosSchema,
		pluginsSchema,
		sitesSchema,
		startersSchema
	} = lib;

	await Promise.all([
		dataLint("../src/_data/community/", "*.js", communitySchema),
		dataLint("../src/_data/demos/", "*.js", demosSchema),
		dataLint("../src/_data/plugins/", "*.json", pluginsSchema),
		dataLint("../src/_data/sites/", "*.json", sitesSchema),
		dataLint("../src/_data/starters/", "*.json", startersSchema)
	]);

	if (errors.length) {
		console.error(inspect(errors, { depth: 4 }));
		process.exitCode = 1;
	}
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
		await lib.schemaLint(dir, ext, schema);
	} catch (err) {
		errors = errors.concat(err.errors);
	}
}
