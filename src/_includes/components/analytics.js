// home-made analytics 😅
if(location.hostname === "www.11ty.dev") {
	navigator.sendBeacon("https://subtle-yeot-bd8178.netlify.app/", JSON.stringify({
		path: location.pathname
	}));
}
