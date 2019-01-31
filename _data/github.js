const fetch = require("node-fetch");
const flatcache = require("flat-cache");
const path = require("path");

function getCacheKey() {
	let date = new Date();
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
}

module.exports = async function() {
	let cache = flatcache.load("github-stargazers", path.resolve("./_datacache"));
	let key = getCacheKey();
	let cachedData = cache.getKey(key);
	if(!cachedData) {
		console.log( "Fetching new github stargazers count…" );
		// https://developer.github.com/v3/repos/#get
		let newData = await fetch("https://api.github.com/repos/11ty/eleventy")
			.then(res => res.json())
			.then(json => {
				return {
					stargazers: json.stargazers_count
				};
			});

		cache.setKey(key, newData);
		cache.save();
		return newData;
	}

	return cachedData;
};

/* {
	"id": 112150776,
	"node_id": "MDEwOlJlcG9zaXRvcnkxMTIxNTA3NzY=",
	"name": "eleventy",
	"full_name": "11ty/eleventy",
	"private": false,
	"owner": {
		"login": "11ty",
		"id": 35147177,
		"node_id": "MDEyOk9yZ2FuaXphdGlvbjM1MTQ3MTc3",
		"avatar_url": "https://avatars1.githubusercontent.com/u/35147177?v=4",
		"gravatar_id": "",
		"url": "https://api.github.com/users/11ty",
		"html_url": "https://github.com/11ty",
		"followers_url": "https://api.github.com/users/11ty/followers",
		"following_url": "https://api.github.com/users/11ty/following{/other_user}",
		"gists_url": "https://api.github.com/users/11ty/gists{/gist_id}",
		"starred_url": "https://api.github.com/users/11ty/starred{/owner}{/repo}",
		"subscriptions_url": "https://api.github.com/users/11ty/subscriptions",
		"organizations_url": "https://api.github.com/users/11ty/orgs",
		"repos_url": "https://api.github.com/users/11ty/repos",
		"events_url": "https://api.github.com/users/11ty/events{/privacy}",
		"received_events_url": "https://api.github.com/users/11ty/received_events",
		"type": "Organization",
		"site_admin": false
	},
	"html_url": "https://github.com/11ty/eleventy",
	"description": "A simpler static site generator. An alternative to Jekyll. Transforms a directory of templates (of varying types) into HTML.",
	"fork": false,
	"url": "https://api.github.com/repos/11ty/eleventy",
	"forks_url": "https://api.github.com/repos/11ty/eleventy/forks",
	"keys_url": "https://api.github.com/repos/11ty/eleventy/keys{/key_id}",
	"collaborators_url": "https://api.github.com/repos/11ty/eleventy/collaborators{/collaborator}",
	"teams_url": "https://api.github.com/repos/11ty/eleventy/teams",
	"hooks_url": "https://api.github.com/repos/11ty/eleventy/hooks",
	"issue_events_url": "https://api.github.com/repos/11ty/eleventy/issues/events{/number}",
	"events_url": "https://api.github.com/repos/11ty/eleventy/events",
	"assignees_url": "https://api.github.com/repos/11ty/eleventy/assignees{/user}",
	"branches_url": "https://api.github.com/repos/11ty/eleventy/branches{/branch}",
	"tags_url": "https://api.github.com/repos/11ty/eleventy/tags",
	"blobs_url": "https://api.github.com/repos/11ty/eleventy/git/blobs{/sha}",
	"git_tags_url": "https://api.github.com/repos/11ty/eleventy/git/tags{/sha}",
	"git_refs_url": "https://api.github.com/repos/11ty/eleventy/git/refs{/sha}",
	"trees_url": "https://api.github.com/repos/11ty/eleventy/git/trees{/sha}",
	"statuses_url": "https://api.github.com/repos/11ty/eleventy/statuses/{sha}",
	"languages_url": "https://api.github.com/repos/11ty/eleventy/languages",
	"stargazers_url": "https://api.github.com/repos/11ty/eleventy/stargazers",
	"contributors_url": "https://api.github.com/repos/11ty/eleventy/contributors",
	"subscribers_url": "https://api.github.com/repos/11ty/eleventy/subscribers",
	"subscription_url": "https://api.github.com/repos/11ty/eleventy/subscription",
	"commits_url": "https://api.github.com/repos/11ty/eleventy/commits{/sha}",
	"git_commits_url": "https://api.github.com/repos/11ty/eleventy/git/commits{/sha}",
	"comments_url": "https://api.github.com/repos/11ty/eleventy/comments{/number}",
	"issue_comment_url": "https://api.github.com/repos/11ty/eleventy/issues/comments{/number}",
	"contents_url": "https://api.github.com/repos/11ty/eleventy/contents/{+path}",
	"compare_url": "https://api.github.com/repos/11ty/eleventy/compare/{base}...{head}",
	"merges_url": "https://api.github.com/repos/11ty/eleventy/merges",
	"archive_url": "https://api.github.com/repos/11ty/eleventy/{archive_format}{/ref}",
	"downloads_url": "https://api.github.com/repos/11ty/eleventy/downloads",
	"issues_url": "https://api.github.com/repos/11ty/eleventy/issues{/number}",
	"pulls_url": "https://api.github.com/repos/11ty/eleventy/pulls{/number}",
	"milestones_url": "https://api.github.com/repos/11ty/eleventy/milestones{/number}",
	"notifications_url": "https://api.github.com/repos/11ty/eleventy/notifications{?since,all,participating}",
	"labels_url": "https://api.github.com/repos/11ty/eleventy/labels{/name}",
	"releases_url": "https://api.github.com/repos/11ty/eleventy/releases{/id}",
	"deployments_url": "https://api.github.com/repos/11ty/eleventy/deployments",
	"created_at": "2017-11-27T05:19:00Z",
	"updated_at": "2019-01-30T20:10:01Z",
	"pushed_at": "2019-01-21T13:43:13Z",
	"git_url": "git://github.com/11ty/eleventy.git",
	"ssh_url": "git@github.com:11ty/eleventy.git",
	"clone_url": "https://github.com/11ty/eleventy.git",
	"svn_url": "https://github.com/11ty/eleventy",
	"homepage": "http://11ty.io/",
	"size": 920,
	"stargazers_count": 1514,
	"watchers_count": 1514,
	"language": "JavaScript",
	"has_issues": true,
	"has_projects": false,
	"has_downloads": true,
	"has_wiki": false,
	"has_pages": false,
	"forks_count": 49,
	"mirror_url": null,
	"archived": false,
	"open_issues_count": 35,
	"license": {
		"key": "mit",
		"name": "MIT License",
		"spdx_id": "MIT",
		"url": "https://api.github.com/licenses/mit",
		"node_id": "MDc6TGljZW5zZTEz"
	},
	"forks": 49,
	"open_issues": 35,
	"watchers": 1514,
	"default_branch": "master",
	"organization": {
		"login": "11ty",
		"id": 35147177,
		"node_id": "MDEyOk9yZ2FuaXphdGlvbjM1MTQ3MTc3",
		"avatar_url": "https://avatars1.githubusercontent.com/u/35147177?v=4",
		"gravatar_id": "",
		"url": "https://api.github.com/users/11ty",
		"html_url": "https://github.com/11ty",
		"followers_url": "https://api.github.com/users/11ty/followers",
		"following_url": "https://api.github.com/users/11ty/following{/other_user}",
		"gists_url": "https://api.github.com/users/11ty/gists{/gist_id}",
		"starred_url": "https://api.github.com/users/11ty/starred{/owner}{/repo}",
		"subscriptions_url": "https://api.github.com/users/11ty/subscriptions",
		"organizations_url": "https://api.github.com/users/11ty/orgs",
		"repos_url": "https://api.github.com/users/11ty/repos",
		"events_url": "https://api.github.com/users/11ty/events{/privacy}",
		"received_events_url": "https://api.github.com/users/11ty/received_events",
		"type": "Organization",
		"site_admin": false
	},
	"network_count": 49,
	"subscribers_count": 34
} */
