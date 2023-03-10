const { RetrieveGlobals } = require("node-retrieve-globals");

module.exports = function(eleventyConfig) {
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      "javascript": function(frontMatterCode) {
        let vm = new RetrieveGlobals(frontMatterCode);

        // Do you want to pass in your own data here?
        let data = {};
				let ret = vm.getGlobalContextSync(data, {
          reuseGlobal: true,
          dynamicImport: true,
        });
        return ret;
      }
    }
  });
};
