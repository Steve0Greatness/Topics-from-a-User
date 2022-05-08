/*
Used on app.html
*/

const search = new URLSearchParams(location.search);
document.main = document.querySelector("main");
if (!search.has("user")) location.assign("/?error=400");
const user = search.get("user");

let title = `Finding ${user}'s Topics`;
if (user[user.length - 1] == "s") {
	title = `Finding ${user}' Topics`;
}
document.title = title;

fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${user}`)
	.then(res => {
		if (res.status == 404) location.assign("/?error=404"); // making sure the user exists/has forum posts
		if (res.status == 500) location.assign("/?error=503"); // making sure ScratchDB is actually up
		return res.json();
	})
	.then(res => {
		
	})