exports.data = function() {
  return {
    permalink: "./netlify/functions/serverless/_generated-serverless-collections.json",
		eleventyExcludeFromCollections: true,
    permalinkBypassOutputDir: true,
    layout: false,
  };
};

exports.render = function(data) {
  let entries = [];
  for(let entry of data.collections.sidebarNav) {
    if(entry.data && entry.data.eleventyNavigation) {
      let o = {
        data: {
          page: {
            url: entry.data.page.url,
          },
          eleventyNavigation: entry.data.eleventyNavigation,
        }
      };
      entries.push(o);
    }
  }

  return JSON.stringify({
    sidebarNav: entries
  }, null, 2);
};
