function select(selector) {
  return document.querySelector(selector);
}

function setFocus(event) {
  event.preventDefault();
  const href = this.getAttribute("href");
  if (href === "#nav") {
    const navList = select(".elv-toc details");
    if (!navList.open) {
      navList.open = true;
    } 
    select(".elv-toc a:first-child").focus();
  }
  if (href === "#content") {
    const focusableInMain = `
      a[href]:not([disabled]):not(.elv-toc a):not(.elv-toc + h1 .direct-link):not(.breadcrumb a),
      button:not([disabled]),
      textarea:not([disabled]),
      input:not([disabled]),
      select:not([disabled])
    `;
    const main = select("main");
    main.querySelector(focusableInMain).focus();
  }
}

function setKeyFocus(event) {
  if (event.key === "Enter") {
    setFocus.call(this, event);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const links = select(".elv-header-skip-content");
  Array.from(links.children).forEach(function(element) {
    element.addEventListener("click", setFocus);
    element.addEventListener("keydown", setKeyFocus);
  });
});
