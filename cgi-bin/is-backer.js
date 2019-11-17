exports.handler = async (event, context) => {
  const query = `
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
    const url = "https://api.opencollective.com/graphql/v2";
    const opts = {
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

    let email = event.queryStringParameters.email;

    for(let supporter of result.data.collective.members.nodes) {
      if(supporter.account.email === email) {
        isBacker = true;
        name = supporter.account.name;
      }
    }
  }

  return {
    statusCode: 200,
    body: `{ "is-backer": ${isBacker}, "name": "${name}" }`
  };
};
