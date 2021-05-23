exports.data = function() {
  return {
    permalink: "./_generated-serverless-collections.json",
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
