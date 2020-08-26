const fetch = require("node-fetch");
const slugify = require("slugify");
const avatarmap = require("./utils/avatarmap.json");

exports.handler = async (event, context, callback) => {
  let query = `
query eleventyBackers {
  collective(slug: "11ty") {
    members(limit: 9999) {
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

  if(!process.env.OPENCOLLECT_API_KEY) {
    return callback(null, {
      statusCode: 500,
      body: `{ "error": "Missing OpenCollective API KEY" }`
    });
  } else {
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
      return callback(null, {
        statusCode: 500,
        body: `{ "error": "${jsonError}" }`
      });
    }

    const {user} = context.clientContext;
    if(user) {
      if(user.email) {
        console.log( `Log in from ${user.email}` );
        for(let supporter of result.data.collective.members.nodes) {
          if(supporter.account.email === user.email) {
            let slug = slugify(supporter.account.name).toLowerCase();
            console.log( `Match found for ${supporter.account.email}!` );
            return callback(null, {
              statusCode: 200,
              body: `{
  "name": "${supporter.account.name}",
  "slug": "${slug}",
  "avatar": "${avatarmap[slug]}"
}`
            });
          }
        }
      }

      return callback(null, {
        statusCode: 404,
        body: `{
          "error": "User not found."
}`
      });
    } else {
      return callback(null, {
        statusCode: 401,
        body: `{"error": "You must be signed in to call this function"}`
      });
    }
  }
};