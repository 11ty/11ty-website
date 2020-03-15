const puppeteer = require("puppeteer");
const slugify = require('slugify');
const fastestSites = require("./_data/fastestSites.json");

async function screenshot(url, filename) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.setViewport({
		width: 1024,
		height: 768,
		deviceScaleFactor: 2,
	});
	await page.screenshot({path: filename});
	await browser.close();
}

(async () => {
	for(let site of fastestSites) {
		if(site.rank <= 11) {
			console.log( "Fetching", site.url );
			let slug = site.url.replace(/https?\:\//, "");
			let filename = slugify(slug, { lower: true, remove: /[:\/]/g });
			await screenshot(site.url, `./img/sites/${filename}.png`);
		}
	}
})();