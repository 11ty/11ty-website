"use strict";
const fastglob = require("fast-glob");
const getAuthors = require("../config/getAuthorsFromSites");

module.exports = async () => {
  let sites = await fastglob("./_data/sites/*.json", {
    caseSensitiveMatch: false
  });

  let authors = {};
  for(let site of sites) {
    let filename = site.split("/").pop();
    let siteData = require(`./sites/${filename}`);

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

  return authors;
};
