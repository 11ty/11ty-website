if( "fonts" in document ) {
	document.fonts.load("1em BenchNine").then(function() {
		document.documentElement.classList.add("benchnine");
	});
}