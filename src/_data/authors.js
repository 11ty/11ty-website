const fastglob = require("fast-glob");
const getAuthors = require("../../config/getAuthorsFromSites");

module.exports = async () => {
  let sites = await fastglob("./src/_data/builtwith/*.json", {
    caseSensitiveMatch: false
  });

  let authors = {};
  for(let site of sites) {
    let filename = site.split("/").pop();
    let siteData = require(`./builtwith/${filename}`);

    siteData.fileSlug = filename.replace(/\.json/, "");

    let names = getAuthors([siteData]);
    for(let name of names) {
      let key = name.toLowerCase();
      if(!authors[key]) {
        authors[key] = {
          name: name,
          sites: []
        };
      }
      authors[key].sites.push(siteData);
    }
  }

  // Add BUSINESS info
  for(let key in authors) {
    for(let site of authors[key].sites) {
      if(site.business_url) {
        authors[key].business_url = site.business_url;
        authors[key].business_name = site.business_name;
      }
    }
  }

  return authors;
};
