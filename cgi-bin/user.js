// TODO
// avatars are keyed by lowercase slugs of names

const fetch = require("node-fetch");
const slugify = require("slugify");

exports.handler = async (event, context) => {
  let query = `
query eleventyBackers {
  collective(slug: "11ty") {
    members {
      nodes {
        account {
          name
          ... on Individual {
            email
          }
        }
      }
    }
  }
}
`;

  let name = "";

  if(process.env.OPENCOLLECT_API_KEY) {
    let url = "https://api.opencollective.com/graphql/v2";
    let opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.OPENCOLLECT_API_KEY
      },
      body: JSON.stringify({ query })
    };

    let jsonError;
    let result = await fetch(url, opts)
      .then(res => res.json())
      .catch(function(error) {
        jsonError = error;
      });

    if(jsonError) {
      return {
        statusCode: 500,
        body: `{ "error": "${jsonError}" }`
      };
    }

    const {identity, user} = context.clientContext;
    let name = "";
    let email = user.email;

    if(email) {
      for(let supporter of result.data.collective.members.nodes) {
        if(supporter.account.email === email) {
          name = supporter.account.name;
        }
      }
    }
  }

  return {
    statusCode: 200,
    body: `{
  "name": "${name}",
  "slug": "${slugify(name).toLowerCase()}"
}`
  };
};