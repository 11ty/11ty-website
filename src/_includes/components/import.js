if( "forEach" in NodeList.prototype ) {
	function importContent(el) {
		if (!("fetch" in window) || "connection" in navigator && navigator.connection.saveData === true) {
			return;
		}

		let targetUrl = el.getAttribute("data-import");
		fetch(targetUrl).then(function (response) {
			return response.text();
		}).then(function (text) {
			el.innerHTML = text;
			el.removeAttribute("data-import");
			el.setAttribute("data-import-complete", "");
		}).catch((err) => {
			console.log('Import failed', err);
		});
	}

	if(typeof IntersectionObserver !== "undefined") {
		var observer = new IntersectionObserver(function(changes) {
			changes.forEach(function(change) {
				if(change.isIntersecting) {
					importContent(change.target);
					observer.unobserve(change.target);
				}
			});
		});
	}

	document.querySelectorAll("[data-import]").forEach(function(element) {
		if(typeof IntersectionObserver !== "undefined") {
			observer.observe(element);
		} else {
			importContent(element);
		}
	});
}
