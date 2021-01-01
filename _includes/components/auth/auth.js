class EleventySupporter {
  constructor() {
    this.className = "is-eleventy-supporter";
    this.docEl = document.documentElement;
  }

  check() {
    var auth = new GoTrue({
      APIUrl: "https://www.11ty.dev/.netlify/identity",
      setCookie: true
    });

    var user = auth.currentUser();
    return !!user;
  }

  checkOpenCollectiveAuth() {
    return this.check() && "eleventySupporterUser" in window.localStorage;
  }

  async getAuthHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (netlifyIdentity.currentUser()) {
      return netlifyIdentity.currentUser().jwt().then((token) => {
        return { ...headers, Authorization: `Bearer ${token}` };
      })
    }
    return Promise.resolve(headers);
  }

  async getCurrentUser(success, failure) {
    // return success({name: "Zach Leatherman", slug: "zach-leatherman"});

    let headers = await this.getAuthHeaders();
    let response = await fetch("/.netlify/functions/user", {
      method: "POST",
      headers
    });

    if (response.ok) {
      response.json().then(success);
    } else {
      response.text().then(failure);
    }
  }

  _setupCurrentUser(user) {
    // console.log( "current user", user );
    this.addAvatars(user);
    this.setActiveSlugElements(user.slug);
    this.setContentElements(true);
  }

  setupCurrentUser(success) {
    let currentUser = window.localStorage.eleventySupporterUser;
    if(currentUser) {
      currentUser = JSON.parse(currentUser);
      this._setupCurrentUser(currentUser);
      success(currentUser);
    } else if("netlifyIdentity" in window) {
      // this should only run on the login page.
      this.getCurrentUser(user => {
        this._setupCurrentUser(user);
        success(user);
        window.localStorage.eleventySupporterUser = JSON.stringify(user);
      }, function(err) {
        delete window.localStorage.eleventySupporterUser;
        throw err;
      });
    }
  }

  setContentElements(isAuth) {
    let els = Array.from(document.querySelectorAll("[data-investors-toggle]"));
    for(let el of els) {
      if(isAuth) {
        let loggedInText = el.getAttribute("data-investors-toggle");
        el.setAttribute("data-investors-toggle-out", el.innerHTML);
        // el.classList.remove("investors-noauth");
        // el.classList.add("investors-auth");
        el.innerHTML = loggedInText;
      } else {
        let loggedOutText = el.getAttribute("data-investors-toggle-out");
        // el.classList.add("investors-noauth");
        // el.classList.remove("investors-auth");
        el.innerHTML = loggedOutText;
      }
    }
  }

  getSlugElements(slug) {
    return Array.from(document.querySelectorAll(`[data-supporters-slug${slug ? `="${slug}"` : ""}]`));
  }

  setActiveSlugElements(slug) {
    let els = this.getSlugElements(slug);
    for(let el of els) {
      el.classList.add("supporters-active");
    }
  }

  removeActiveSlugElements() {
    let els = this.getSlugElements();
    for(let el of els) {
      el.classList.remove("supporters-active");
    }
  }

  addAvatars(user) {
    let avatar = document.createElement("img");
    avatar.classList.add("supporters-avatar", "avatar");
    avatar.setAttribute("src", `/img/avatars/opencollective/${user.slug}.jpg`);
    avatar.setAttribute("alt", `${user.name}’s Avatar`);
    avatar.setAttribute("onerror", "this.remove()");

    let anchors = Array.from(document.querySelectorAll("[data-investors-avatar]"));
    for(let anchor of anchors) {
      if(anchor.getAttribute("data-investors-avatar") === "prepend") {
        anchor.prepend(avatar.cloneNode());
      } else {
        anchor.append(avatar.cloneNode());
      }
    }
  }

  removeAvatars() {
    let avatars = document.querySelectorAll(".supporters-avatar");
    for(let avatar of avatars) {
      avatar.remove();
    }
  }

  login() {
    if(this.check()) {
      this.setupCurrentUser(() => {
        this.docEl.classList.add(this.className);
      });
    }
  }

  logout() {
    this.docEl.classList.remove(this.className);
    delete window.localStorage.eleventySupporterUser;
    this.removeAvatars();
    this.removeActiveSlugElements();
    this.setContentElements(false);
  };
}

var eleventySupporter = new EleventySupporter();
eleventySupporter.login();
window.eleventySupporter = eleventySupporter;

window.addEventListener("load", function() {
  // important to wait for the other script to load before we fire these
  // console.log( "netlifyIdentity" in window );
  if("netlifyIdentity" in window) {
    // window.netlifyIdentity.on('init', user => {
    //   console.log('init', user);
    // });
    window.netlifyIdentity.on("login", user => {
      console.log( "login, Netlify Identity login complete" );
      eleventySupporter.login();
    });
    window.netlifyIdentity.on("logout", () => {
      console.log( "logout, Netlify Identity login complete" );
      eleventySupporter.logout();
    });
    window.netlifyIdentity.on("error", err => {
      console.error("Netlify Identity Error", err);
    });
    // window.netlifyIdentity.on('open', () => console.log('Widget opened'));
    // window.netlifyIdentity.on('close', () => console.log('Widget closed'));
  }
}, false);
