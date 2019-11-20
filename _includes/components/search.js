class Search {
	constructor() {
		this.dataCache = null;
	}

	async fetchData() {
		let url = "/js/search.json";
		let opts = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};

		let searchData = await fetch(url, opts)
			.then(res => res.json())
			.catch(function(error) {
				console.error(error);
			});

		this.dataCache = searchData;
	}

	async getData() {
		if(!this.dataCache) {
			await this.fetchData();
		}

		return this.dataCache;
	}

	clearResults() {
		this.searchResultsCount.innerHTML = "Results";
		this.searchResultsList.innerHTML = "";
	}

	addResult({ page, matches }) {
		let maxMatchPreview = 5;
		let indexTolerance = 30;

		let matchCount = matches.length;
		let listItem = document.createElement("li");
		//<code>${page.url}</code>
		listItem.innerHTML = `<a href="${page.url}">${page.title ? `<strong>${page.title}</strong>` : page.url}</a>
${matchCount > 1 ? ` (${matchCount} matches)` : ""}
${matchCount ? `<p class="search-results-item-matches truncate-overflow" style="--truncate-lh: 1.8em; --truncate-lines: 3">` : ""}
${matches.slice(0, maxMatchPreview).map(match => {
	let beforeText = match.haystack.substring(Math.max(0, match.indeces.start - indexTolerance), match.indeces.start);
	let text = match.haystack.substring(match.indeces.start, match.indeces.end);
	let afterText = match.haystack.substring(match.indeces.end, Math.min(match.indeces.end + indexTolerance, match.haystack.length));
	// console.log( match, Math.max(0, match.indeces.start - indexTolerance), Math.min(match.indeces.end + indexTolerance, match.haystack.length) );
	// console.log( match.needle );
	// console.log( "before", beforeText );
	// console.log( "text", text );
	// console.log( "after", afterText );
	return `<code>${beforeText}<strong>${text}</strong>${afterText}</code>`;
}).join("\n")}
${matchCount ? "</p>" : ""}
`;

		this.searchResultsList.append(listItem);
	}

	getMatches(haystack, needle) {
		let split = haystack.toLowerCase().split(needle.toLowerCase());
		let matches = [];
		let index = split[0].length;
		for(let j = 1, k = split.length; j<k; j++) {
			matches.push({
				needle: needle,
				haystack: haystack,
				indeces: {
					start: index,
					end: index + needle.length
				}
			});
			index += split[j].length + needle.length;
		}
		return matches;
	}

	async onInput(value) {
		let data = await this.getData();

		window.clearTimeout(this.onInputTimeout);
		this.onInputTimeout = window.setTimeout(() => {
			this.clearResults();
			this.searchResults.classList.remove("hide");

			let found = 0;
			let results = [];
			if(value.length > 1) {
				for(let page of data.pages) {
					// todo locale compare
					let matches = this.getMatches(page.title, value).concat(this.getMatches(page.text, value));
					if(matches.length > 0) {
						found++;

						results.push({
							page: page,
							matches: matches
						});
					}
				}

				results.sort((a, b) => b.matches.length - a.matches.length);

				for(let result of results) {
					this.addResult( result, value );
				}
				if(results.length) {
					this.searchResultsCount.innerHTML = `${results.length} Result${results.length != 1 ? "s" : ""}`;
				}

				this.searchResultsList.classList[found > 0 ? "remove" : "add"]("search-results-notfound");
				if(found === 0) {
					this.searchResultsList.innerHTML = "<li>No Matches Found.</li>";
				}
			}
		}, 100);
	}

	hydrate() {
		if("eleventySupporter" in window && window.eleventySupporter.check()) {
		} else {
			return;
		}

		let form = document.getElementById("eleventy-search");
		if(form) {
			form.addEventListener("submit", function(event) {
				event.preventDefault();
			}, false);
		}

		let text = document.getElementById("search-term");
		if(text) {
			text.value = "";

			text.addEventListener("input", async (event) => {
				let value = event.target.value;
				await this.onInput(value);
			}, false);
		}

		let results = document.getElementById("search-results");
		if(results) {
			this.searchResults = results;
		}

		let resultsList = document.getElementById("search-results-list");
		if(resultsList) {
			this.searchResultsList = resultsList;
		}

		let resultsCount = document.getElementById("search-results-count");
		if(resultsCount) {
			this.searchResultsCount = resultsCount;
		}
	}
}

let search = new Search();
search.hydrate();
