require('dotenv').config();

const fs = require("fs-extra");
const fetch = require("node-fetch");
// const query = `
// query eleventyMembers {
//   collective(slug: "11ty") {
//     members {
//       nodes {
//         account {
//           id
//           name
//           twitterHandle
//           githubHandle
//           imageUrl
//           memberOf {
//             nodes {
//               account {
//                 slug
//               }
//               totalDonations {
//                 value
//               }
//             }
//           }
//           ... on Individual {
//             email
//           }
//         }
//       }
//     }
//   }
// }
// `;
const query = `
query eleventyMembers {
  collective(slug: "11ty") {
    members {
      nodes {
        account {
          name
          twitterHandle
          githubHandle
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

    let result = await fetch(url, opts)
      .then(res => res.json())
      .catch(function(error) {
        console.error( error );
      });

    //   "data": {
    // "collective": {
    //   "members": {
    //     "nodes": [
    let emailsOnly = new Set();
    let members = result.data.collective.members.nodes;
    for(let member of members) {
      if(member.account.email) {
        // TODO check node-supporters/invite.csv for duplicates
        emailsOnly.add(member.account.email);
      }
    }


    await fs.writeFile("./node-supporters.json", JSON.stringify(result, null, 2));
    console.log( "Wrote node-supporters.json." );

    await fs.writeFile("./node-supporters.csv", Array.from(emailsOnly).join("\n"));
    console.log( "Wrote node-supporters.csv." );
  }
})();