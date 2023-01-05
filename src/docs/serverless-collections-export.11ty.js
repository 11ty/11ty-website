exports.data = function() {
  return {
    permalink: "./netlify/functions/serverless/_generated-serverless-collections.json",
		eleventyExcludeFromCollections: true,
    permalinkBypassOutputDir: true,
    layout: false,
  };
};

exports.render = function({collections}) {
  let entries = [];
  for(let entry of collections.sidebarNav) {
    entries.push({
      data: {
        page: entry.data.page,
        eleventyNavigation: entry.data.eleventyNavigation,
      }
    });
  }

  return JSON.stringify({
    sidebarNav: entries
  }, null, 2);
};
