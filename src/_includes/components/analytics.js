// home-made analytics 😅
if(location.hostname !== "localhost") {
	navigator.sendBeacon("https://subtle-yeot-bd8178.netlify.app/", JSON.stringify({
		path: location.pathname
	}));
}
