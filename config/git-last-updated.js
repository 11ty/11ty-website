const spawn = require("cross-spawn");

/* Thank you to Vuepress!
 * https://github.com/vuejs/vuepress/blob/89440ce552675859189ed4ab254ce19c4bba5447/packages/%40vuepress/plugin-last-updated/index.js
 * MIT licensed: https://github.com/vuejs/vuepress/blob/89440ce552675859189ed4ab254ce19c4bba5447/LICENSE
 */
function getGitLastUpdatedTimeStamp (filePath) {
  let lastUpdated
  try {
    lastUpdated = parseInt(spawn.sync(
      'git',
      ['log', '-1', '--format=%at', filePath],
    ).stdout.toString('utf-8')) * 1000;
  } catch (e) { /* do not handle for now */ }
  return lastUpdated
}

// return a Date
module.exports = function(inputPath) {
	let timestamp = getGitLastUpdatedTimeStamp(inputPath);
	return new Date(timestamp);
};

// Shortcode
// eleventyConfig.addFilter("gitLastUpdated", function(inputPath) {
// 	if(!inputPath) {
// 		inputPath = this.page.inputPath;
// 	}

// 	let timestamp = getGitLastUpdatedTimeStamp(inputPath);
// 	return new Date(timestamp);
// });
