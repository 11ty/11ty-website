const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");

function markdownItSlugify(s) {
	return slugify(removeExtraText(s), { lower: true, remove: /[\=\":’'`,]/g });
}

function removeExtraText(s) {
	let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "");
	newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, "");
	newStr = newStr.replace(/⚠️/g, "");
	newStr = newStr.replace(/[?!]/g, "");
	newStr = newStr.replace(/<[^>]*>/g, "");
	return newStr;
}

module.exports = function(eleventyConfig) {

	let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.disable('code') // disable indent -> code block
	.use(markdownItAnchor, {
		slugify: markdownItSlugify,
		level: [1,2,3,4],
		permalink: markdownItAnchor.permalink.linkInsideHeader({
			symbol: `
				<span class="sr-only">Jump to heading</span>
				<span aria-hidden="true">#</span>
			`,
			class: "direct-link",
			placement: 'after'
		})
	})
	.use(markdownItToc, {
		includeLevel: [2, 3],
		slugify: markdownItSlugify,
		format: function(heading) {
			return removeExtraText(heading);
		},
		transformLink: function(link) {
			// remove backticks from markdown code
			return link.replace(/\%60/g, "");
		}
	});

	// opt out of linkification for .io TLD, e.g. 11ty.io
	mdIt.linkify.tlds('.io', false);

	eleventyConfig.setLibrary("md", mdIt);

	eleventyConfig.addPairedShortcode("markdown", function(content) {
		return mdIt.renderInline(content);
	});
	eleventyConfig.addFilter("markdown", function(content) {
		return mdIt.renderInline(content);
	});

	eleventyConfig.addPairedShortcode("callout", function(content, level = "", format = "html", cls = "") {
		if( format === "md" ) {
			content = mdIt.renderInline(content);
		} else if( format === "md-block" ) {
			content = mdIt.render(content);
		}
		return `<div class="elv-callout${level ? ` elv-callout-${level}` : ""}${cls ? ` ${cls}`: ""}">${content}</div>`;
	});
};
