const slugify = require("slugify");

exports.handler = async (event, context) => {
  const supporters = require("./node-supporters.json");
  let isBacker = false;
  let name = "";

  const {identity, user} = context.clientContext;
  let email = user.email;

  if(email) {
    for(let supporter of supporters.data.collective.members.nodes) {
      if(supporter.account.email === email) {
        isBacker = true;
        name = supporter.account.name;
      }
    }
  }

  return {
    statusCode: 200,
    body: `{
  "is-backer": ${isBacker},
  "name": "${name}",
  "slug": "${slugify(name).toLowerCase()}"
}`
  };
};