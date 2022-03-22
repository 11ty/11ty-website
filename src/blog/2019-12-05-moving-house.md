---
newstitle: Eleventy Docs Moved from 11ty.io to 11ty.dev
eleventyNavigation:
  parent: Blog
  key: Docs Moved to 11ty.dev
---
The Eleventy project is deprecating the 11ty.io domain and moving to 11ty.dev. 11ty.dev now has feature parity and the 11ty.io DNS will begin redirecting to 11ty.dev as soon as your DNS updates.

A couple of wrinkles here:
* We switched DNS providers to enable proper forwarding behavior here (including all prior versions of docs on subdomains). This may result in some temporary downtime for 11ty.io URLs, but they will begin forwarding correctly in a matter of time. Sorry for this!
* Eleventy Contributor Accounts need to be migrated to 11ty.dev. This means you’ll need to set a new password for your account. Check your email for new invite links.

This was no small thing! (But it wasn’t too terrible either). We migrated:

* All [versioned documentation subdomains (×15)](/docs/versions/) (e.g. the [Eleventy v0.5.3 documentation](https://v0-5-3.11ty.dev/docs/))
* Netlify custom features (Analytics) and for Contributor Accounts: Identity and Serverless Functions for auth.
* Web Hooks to run the docs build every day to update avatars and footer stats.
* GitHub repo renamed to a more generic [`11ty/11ty-website`](https://github.com/11ty/11ty-website/) (GitHub handles the redirects here)

## Why?

This has been on the agenda for about six months. [{% communityavatar "TatianaMac" %}Tatiana Mac](https://twitter.com/TatianaTMac/) said it better:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">ICYMI: .io domains benefit the British government and not the Chagossian and Ilois people that they should, whom the Brits expelled from their island home.<br><br>So, migrating off of .io domains is one way to exhibit solidarity. <br><br>Read more: <a href="https://gigaom.com/2014/06/30/the-dark-side-of-io-how-the-u-k-is-making-web-domain-profits-from-a-shady-cold-war-land-deal/">https://gigaom.com/2014/06/30/the-dark-side-of-io-how-the-u-k-is-making-web-domain-profits-from-a-shady-cold-war-land-deal/</a> <a href="https://twitter.com/eleven_ty/status/1202457672756404224">twitter.com/eleven_ty/status/…4224</a></p>&mdash; Tatiana Mac (@TatianaTMac) <a href="https://twitter.com/TatianaTMac/status/1202467104722571264?ref_src=twsrc%5Etfw">December 5, 2019</a></blockquote>

Some [good discussion on Tatiana’s tweet about this](https://twitter.com/TatianaTMac/status/1202467104) as well.

## Cool URIs Don’t Change

A number of you lovely people 🧐 have pointed out that our documentation prominently links to the classic W3C slogan “[Cool URIs don’t change](/docs/permalinks/#cool-uris-dont-change).” While it may be tempting to latch onto the dictionary definition of _change_, the spirit of this idea still holds true! Published URLs are a maintenance task and our prior URLs are still being actively maintained with redirects.

## A small step in the right direction

This may be a purely symbolic gesture for now as we do plan to keep the `.io` redirects in place for awhile. But having our canonical domain off of the `.io` TLD is an important gesture to make and creates space to retire `.io` completely at some point in the future. Appreciate your patience with this transition.