const search = new URLSearchParams(location.search),
	error_holder = document.querySelector("#error"),
	errors = {
		"400": {
			name: "Bad Request",
			desc: "It seems you were missing a query in the URL"
		},
		"404": {
			name: "Not Found",
			desc: "The user request does not exist, or has never made a post."
		},
		"503": {
			name: "Service Unavailable",
			desc: "ScratchDB is down, try again later"
		}
	}

function create_error(code) {
	let error = errors[code],
		error_html = `<h1>Error ${code}: ${error.name}</h1><p>${error.desc}</p>`;
	error_holder.classList.remove("no-error");
	error_holder.innerHTML = error_html;
}

if (search.has("error")) {
	let error = search.get("error").toString();
	create_error(error);
}