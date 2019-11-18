require('dotenv').config();

const fs = require("fs-extra");
const fetch = require("node-fetch");
const slugify = require("slugify");
const query = `
query eleventyMembers {
  collective(slug: "11ty") {
    members {
      nodes {
        account {
          id
          name
          twitterHandle
          githubHandle
          imageUrl
          memberOf {
            nodes {
              account {
                slug
              }
              totalDonations {
                value
              }
            }
          }
          ... on Individual {
            email
          }
        }
      }
    }
  }
}
`;

(async function() {
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
        console.error( error );
      });

    await fs.writeFile("./node-supporters.json", JSON.stringify(result, null, 2));
  }
})();
