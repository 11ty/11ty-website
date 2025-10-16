import esbuild from "esbuild";

export async function bundle(entryFile, outputFile, options = {}, esbuildOptions = {}) {
	if(!entryFile || !outputFile) {
		throw new Error("Missing input or output file arguments");
	}

	let { external, banner } = Object.assign({
		external: [],
		banner: `/* via ${entryFile} */`,
	}, options);

	return esbuild.build(Object.assign({
		entryPoints: [entryFile],
		bundle: true,
		platform: "browser",
		format: "esm",

		treeShaking: true,
		minify: true,
		keepNames: false,

		external,
		plugins: [],
		banner: {
			js: banner,
		},
		// metafile: true,
		outfile: outputFile,
	}, esbuildOptions));
}
