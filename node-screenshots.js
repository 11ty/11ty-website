const puppeteer = require("puppeteer");
const slugify = require("slugify");
const sharp = require("sharp");
const fastestSites = require("./_data/fastestSites.json");

async function screenshot(url, fileSlug) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.setViewport({
		width: 1024,
		height: 768,
		deviceScaleFactor: 1,
	});

	let fullFilename = `./img/sites/${fileSlug}_full.jpg`;
	let filename = `./img/sites/${fileSlug}.jpg`;
	await page.screenshot({
		path: fullFilename,
		type: "jpeg",
		quality: 80
	});
	await sharp(fullFilename).resize(405).toFile(filename);
	await browser.close();
}

(async () => {
	for(let site of fastestSites) {
		if(site.rank <= 11 || site.accessibilityRank <= 11) {
			console.log( "Fetching", site.url );
			let slug = site.url.replace(/https?\:\//, "");
			let filename = slugify(slug, { lower: true, remove: /[:\/]/g });
			await screenshot(site.url, filename);
		}
	}
})();