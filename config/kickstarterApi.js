import puppeteer from "puppeteer";
import { AssetCache } from "@11ty/eleventy-fetch";

/**
 * Fetches backer count and funded amount from a Kickstarter campaign.
 *
 * Uses AssetCache from @11ty/eleventy-fetch to avoid launching Puppeteer
 * on every build. Puppeteer is only invoked when the cache is stale.
 *
 * The ?format=json response has three keys: running_board, content, card.
 * Funding stats are embedded as data attributes on the .project-card element
 * inside the `card` HTML string.
 *
 * @param {string} campaignUrl - Full Kickstarter campaign URL
 * @param {object} [options]
 * @param {string} [options.duration="1h"] - eleventy-fetch cache duration
 * @returns {Promise<{ backers: number, pledged: number, currency: string, goal: number, percentFunded: number }>}
 */
export async function fetchKickstarterStats(campaignUrl, options = {}) {
  const { duration = "1h" } = options;

  const url = new URL(campaignUrl);
  url.searchParams.set("format", "json");
  const jsonUrl = url.toString();

  const cache = new AssetCache(jsonUrl);

  if (await cache.isCacheValid(duration)) {
    console.log(`[kickstarter] Cache hit, skipping Puppeteer.`);
    return cache.getCachedValue();
  }

  console.log(`[kickstarter] Cache stale or empty, launching Puppeteer.`);
  const stats = await fetchWithPuppeteer(jsonUrl, campaignUrl);

  await cache.save(stats, "json");
  return stats;
}

async function fetchWithPuppeteer(jsonUrl, campaignUrl) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    const response = await page.goto(jsonUrl, { waitUntil: "networkidle2" });

    if (!response.ok()) {
      throw new Error(
        `Kickstarter returned HTTP ${response.status()} for ${jsonUrl}`
      );
    }

    const raw = await page.evaluate(() => document.body.innerText);
    const data = JSON.parse(raw);

    if (!data?.card) {
      throw new Error(
        `Kickstarter response did not include a card key. ` +
          `Check that the campaign URL is correct: ${campaignUrl}`
      );
    }

    const backers = parseInt(
      data.card.match(/data-project_backers_count="(\d+)"/)?.[1] ?? 0,
      10
    );
    const pledged = parseFloat(
      data.card.match(/data-project_pledged="([\d.]+)"/)?.[1] ?? 0
    );
    const percentFunded = parseFloat(
      data.card.match(/data-project_percent_raised="([\d.]+)"/)?.[1] ?? 0
    );

    const goal =
      percentFunded > 0 ? Math.round((pledged / percentFunded) * 100) : 0;

    return {
      backers,
      pledged,
      currency: "USD",
      goal,
      percentFunded: Math.round(percentFunded),
    };
  } finally {
    await browser.close();
  }
}
