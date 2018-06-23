if( "fonts" in document ) {
	if( sessionStorage.benchnineLoaded ) {
		document.documentElement.classList.add("benchnine");
	} else {
		document.fonts.load("1em BenchNine").then(function() {
			sessionStorage.benchnineLoaded = true;
			document.documentElement.classList.add("benchnine");
		});
	}
}