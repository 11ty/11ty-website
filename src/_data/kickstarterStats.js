import { fetchKickstarterStats } from "../../config/kickstarterApi.js";

// _data/campaign.js — drop this in your Eleventy _data/ folder
// Eleventy will call this at build time and expose the result as {{ campaign }}

export default async function () {
  const url = "https://www.kickstarter.com/projects/font-awesome/build-awesome-pro";
  return fetchKickstarterStats(url);
}
