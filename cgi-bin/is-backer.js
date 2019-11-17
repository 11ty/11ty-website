const fetch = require("node-fetch");

function hashCode(str) {
  return str.split("").reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

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

  let isBacker = false;
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

    let email = event.queryStringParameters.q;

    if(email) {
      for(let supporter of result.data.collective.members.nodes) {
        let emailCompare = supporter.account.email;
        if(email.indexOf("@") === -1) {
          emailCompare = hashCode(emailCompare);
        }

        if(emailCompare === email) {
          isBacker = true;
          name = supporter.account.name;
        }
      }
    }
  }

  return {
    statusCode: 200,
    body: `{ "is-backer": ${isBacker}, "name": "${name}" }`
  };
};
