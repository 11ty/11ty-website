const puppeteer = require("puppeteer");
const sharp = require("sharp");
const fastglob = require("fast-glob");

async function pause(time) {
  let p = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

  await p;
}

async function screenshot(url, fileSlug) {
	const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setJavaScriptEnabled(false);
	await page.goto(url, {
    waitUntil: ["load", "networkidle0"]
  });
  await pause(1000);

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
	let sites = await fastglob("./_data/sites/*.json", {
		caseSensitiveMatch: false
	});

	let i = 0;
	for(let site of sites) {
		i++;
		let siteData = require(site);
		if(siteData.url && !siteData.disabled) {
			let filename = site.split("/").pop().replace(/\.json/, "");
			console.log( `${i} of ${sites.length}`, "Fetching", siteData.url, "to", filename );
			try {
				await screenshot(siteData.url, filename);
			} catch(e) {
				console.log( ">>> Error:", e );
			}
		} else {
			console.log( `${i} of ${sites.length}`, "Skipping", siteData.url );
		}
	}
})();
