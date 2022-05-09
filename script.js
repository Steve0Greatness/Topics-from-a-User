const search = new URLSearchParams(location.search),
	topics = document.querySelector("#topics");
if (!search.has("user")) location.assign("/?error=400");
const user = search.get("user");

let title = `Finding ${user}'s Topics`;
if (user[user.length - 1] == "s")
	title = `Finding ${user}' Topics`;
document.title = title;

console.log("starting")
fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${user}`)
	.then(res => {
		if (res.status == 404) location.assign("/?error=404"); // making sure the user exists/has forum posts
		if (res.status == 500) location.assign("/?error=503"); // making sure ScratchDB is actually up
		return res.json();
	})
	.then(res => {
		var topics_ids = [];
		console.log("Obtaining user post count")
		console.log(Math.ceil(res.counts.total.count / 49))
		for (let i = 0; i < Math.ceil(res.counts.total.count / 49); i++) {
			console.log(`on page ${i.toString()}`)
			fetch(`https://scratchdb.lefty.one/v3/forum/user/posts/${user}/${i.toString()}`)
				.then(res => res.json())
				.then(res => {
					for (let post of res) {
						fetch(`https://scratchdb.lefty.one/v3/forum/topic/posts/${post.topic.id}/0?o=oldest`)
							.then(res => res.json())
							.then(res => {
								if (res[0].username == user && !topics_ids.includes(res[0].topic.id)) {
									topics_ids.push(res[0].topic.id);
									topics.innerHTML += `<div class="topic"><a href="//scratch.mit.edu/discuss/topic/${res[0].topic.id}">${res[0].topic.title}</a> in ${res[0].topic.category}</div>`;
								}
							});
					}
				})
		}
	})