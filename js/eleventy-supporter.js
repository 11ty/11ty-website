function EleventySupporter() {
	this.className = "is-eleventy-supporter";
	this.docEl = document.documentElement;
};
EleventySupporter.prototype.init = function() {
	if(!this.docEl.classList.contains("eleventySupportersLogin") && !("netlifyIdentity" in window)) {
		this.login();
	}
};
EleventySupporter.prototype.check = function() {
	var auth = new GoTrue({
	  APIUrl: "https://www.11ty.io/.netlify/identity",
	  setCookie: true
	});

	var user = auth.currentUser();
	this.getCurrentUser();
	return !!user;
};
EleventySupporter.prototype.getCurrentUser = function() {
	function generateHeaders() {
	  const headers = { "Content-Type": "application/json" };
	  if (netlifyIdentity.currentUser()) {
	    return netlifyIdentity.currentUser().jwt().then((token) => {
	      return { ...headers, Authorization: `Bearer ${token}` };
	    })
	  }
	  return Promise.resolve(headers);
	}

	generateHeaders().then((headers) => {
    fetch('/.netlify/cgi-bin/user', {
      method: "POST",
      headers
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {throw(err)});
      }
      console.log( response );
    });
  });
};
EleventySupporter.prototype.login = function() {
	if(this.check()) {
		this.docEl.classList.add(this.className);
	}
};
EleventySupporter.prototype.logout = function() {
	this.docEl.classList.remove(this.className);
};

var elvSupporter = new EleventySupporter();
elvSupporter.init();

if("netlifyIdentity" in window) {
	netlifyIdentity.on('init', user => {
		console.log('init', user);
	});
	netlifyIdentity.on('login', user => {
		console.log('login', user);
		elvSupporter.login();
	});
	netlifyIdentity.on('logout', () => {
		console.log('Logged out');
		elvSupporter.logout();
	});
	netlifyIdentity.on('error', err => {
		console.error('Error', err);
	});
	// netlifyIdentity.on('open', () => console.log('Widget opened'));
	// netlifyIdentity.on('close', () => console.log('Widget closed'));
}