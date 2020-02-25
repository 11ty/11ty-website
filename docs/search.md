---
searchTitle: Search The Eleventy Documentation
putTheJsInTheHead: true
---
# Search the Eleventy Documentation

<form action="https://duckduckgo.com/" method="get" class="search" id="eleventy-search">
	<div class="search-lo lo">
		<div class="lo-c lo-maxgrow">
			<label for="search-term" class="sr-only">Search Terms</label>
			<input type="search" name="q" id="search-term" value="site:www.11ty.dev " class="search-txt" autocomplete="off">
		</div>
		<div class="lo-c">
			<button type="submit" class="search-btn btn-form">Search</button>
		</div>
	</div>
	<p>Search provided by <span data-investors-avatar="prepend"><span data-investors-toggle="you—thank you for supporting Eleventy!"></span></span><span class="investors-noauth"><a href="https://duckduckgo.com/">Duck Duck Go</a>.</span></p>
	<p class="investors-noauth">As a special thank you, <a href="/docs/account/">Eleventy Contributor Accounts</a> are provided access to an enhanced on-site documentation search. If you would like access to this feature too, <a href="https://opencollective.com/11ty">donate to Eleventy on Open Collective!</a></p>
	<p class="investors-noauth">Already a contributor? <a href="/docs/account/">Log in!</a></p>
</form>
<div id="search-results" class="hide">
	<h2 id="search-results-count" aria-live="polite">Results</h2>
	<ol id="search-results-list"></ol>
</div>