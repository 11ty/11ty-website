exports.data = function() {
  return {
    permalink: "./netlify/functions/cloud/_data/cachedNavigation.json",
    permalinkBypassOutputDir: true,
    layout: false,
  };
};

exports.render = function(data) {
  let ret = [];
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
      ret.push(o);
    }
  }

  return JSON.stringify(ret, null, 2);
};
