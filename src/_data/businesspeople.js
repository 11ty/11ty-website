const getAuthors = require("./authors");

module.exports = async () => {
  let authors = await getAuthors();
  let businessAuthors = Object.values(authors).filter(author => {
    return author.sites.filter(site => {
      return Object.keys(site).indexOf("business_url") > -1
    }).length > 0;
  });

  return businessAuthors;
};
