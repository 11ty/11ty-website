// Thanks Jake! https://mastodon.social/@jaffathecake/115111397224018340
// see copy-button-id-assignment.css
document.addEventListener("animationstart", (event) => {
    if (event.animationName !== "check-id-assignment") {
			return;
		}

		let [id] = (event.target.getAttribute("from") || "").split("[");
		let pre = event.target.closest(".syntax-highlight")?.querySelector("pre");
		if(pre && !pre.hasAttribute("id")) {
			pre.setAttribute("id", id);
		}
  },
  { capture: true },
);
