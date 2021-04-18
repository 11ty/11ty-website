if( "querySelector" in document ) {
	var details = document.querySelector("details");
	if( details ) {
		var forceOpen = window.getComputedStyle(details).getPropertyValue("--details-force-closed");

		function forceState(isOpen) {
			if( isOpen ) {
				details.setAttribute("open", "open");
			} else {
				details.removeAttribute("open");
			}
		}

		if(forceOpen && "matchMedia" in window) {
			var mm1 = window.matchMedia(forceOpen);
			forceState(!mm1.matches);
			mm1.addListener(function(e) {
				forceState(!e.matches);
			});
		}
	}
}
