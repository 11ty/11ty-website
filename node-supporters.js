require('dotenv').config();

const Cache = require("@11ty/eleventy-cache-assets");
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

// TODO I think there is bug with Organizations, e.g. Entle Web Solutions
const query = `
query eleventyMembers {
  collective(slug: "11ty") {
    members(limit: 999) {
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

async function getOpenCollectiveList() {
  let url = `https://opencollective.com/11ty/members/all.json`;
  let json = await Cache(url, {
    duration: "0s",
    type: "json"
  });

  return json;
}

async function findMissingUsers(names) {
  let json = await getOpenCollectiveList();
  let fullList = new Set();
  for(let member of json) {
    fullList.add(member.name);
  }

  // Set difference
  let missing = new Set([...fullList].filter(name => !names.has(name)));
  for(let member of json) {
    if(missing.has(member.name)) {
      console.log( "MISSING:", member.name, member.email );
    }
  }
  console.log( `${missing.size} missing names from GraphQL data source.` );
}

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
      if(!member.account.email) {
        console.log( "Falsy email for", member );
      } else if(member.account.email && alreadySentEmails.indexOf(member.account.email) === -1) {
        console.log( "New supporter:", member );
        emailsOnly.add(member.account.email);
      } else {
        console.log( "Already invited", member.account.email );
      }
    }

    await fs.writeFile("./node-supporters/node-supporters.json", JSON.stringify(result, null, 2));
    console.log( "Wrote node-supporters.json." );

    let newEmails = Array.from(emailsOnly);
    await fs.writeFile("./node-supporters/need-to-invite.csv", newEmails.join("\n"));
    console.log( "Wrote need-to-invite.csv." );
    console.log( `${newEmails.length} ${newEmails.length != 1 ? "entries" : "entry"}.` );

    // Find missing
    let memberNames = new Set();
    for(let member of members) {
      memberNames.add(member.account.name);
    }
    await findMissingUsers(memberNames);
  }
})();
