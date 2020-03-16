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
  if(!process.env.OPENCOLLECT_API_KEY) {
    console.log( "Missing OPENCOLLECT_API_KEY. Do you have a .env file?" );
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

    let result = await fetch(url, opts)
      .then(res => res.json())
      .catch(function(error) {
        console.error( error );
      });

    let alreadySentFile = await fs.readFile("./node-supporters/invited.csv", "utf-8");
    let alreadySentEmails = alreadySentFile.split("\n").map(entry => entry.trim());
    let emailsOnly = new Set();
    let members = result.data.collective.members.nodes;
    for(let member of members) {
      if(member.account.email && alreadySentEmails.indexOf(member.account.email) === -1) {
        emailsOnly.add(member.account.email);
      }
    }

    await fs.writeFile("./node-supporters/node-supporters.json", JSON.stringify(result, null, 2));
    console.log( "Wrote node-supporters.json." );

    let newEmails = Array.from(emailsOnly);
    await fs.writeFile("./node-supporters/need-to-invite.csv", newEmails.join("\n"));
    console.log( "Wrote need-to-invite.csv." );
    console.log( `${newEmails.length} ${newEmails.length != 1 ? "entries" : "entry"}.` );
  }
})();