import Fetch from "@11ty/eleventy-fetch";

// _data/campaign.js — drop this in your Eleventy _data/ folder
// Eleventy will call this at build time and expose the result as {{ campaign }}

export default async function () {
  const url = "https://11ty.github.io/kickstarter-api/build-awesome-pro.json";
  return Fetch(url, {
		type: "json",
		duration: "30m",
	});
}
