
// BREEDS


var breeds;
var alldogs;
fetch("https://dog.ceo/api/breeds/list/all", {
})
	.then(res => res.json())
	.then(data => {
		breeds = Object.keys(data.message);
		alldogs = data.message;
		console.log(alldogs);
		
	})
setTimeout(() => {
	for (var i = 0; i < breeds.length; i++) {
		var newp = document.createElement("p");
		newp.innerHTML = breeds[i];
		document.querySelector("#breedList").append(newp);
	}
}, 500);


document.querySelector("#find").addEventListener("click", event => {
	event.preventDefault();
	var dog = document.querySelector("#dog").value.toLowerCase().split(" ");
	var success = 0;
	for (var i = 0; i < breeds.length; i++) {
		if (dog[0] == breeds[i]) {
			success = 1;
		}
	}

	var subBreeds = [];
	if (success == 1) {
		if (alldogs[dog[0]].length > 0 & dog.length > 1) {
			var success = 0;
			for (var i = 0; i < alldogs[dog[0]].length; i++) {
				if (dog[1] == alldogs[dog[0]][i]) {
					success = 1;

				}
			}

			if (success == 1) {
				fetch("https://dog.ceo/api/breed/" + dog[0] + "/" + dog[1] + "/images/random", {
				})
					.then(res => res.json())
					.then(data => {
						document.querySelector("#image").src = data.message;
					})
				document.querySelector("#msg").innerHTML = "";
			} else {
				document.querySelector("#msg").innerHTML = "";
				document.querySelector("#msg").innerHTML = "These are viable sub-breeds for " + dog[0] + " breed: ";
				fetch("https://dog.ceo/api/breed/"+ dog[0] +"/list", {
				})
					.then(res => res.json())
					.then(data => {
						for (var i = 0; i < data.message.length; i++) {
							var newp = document.createElement("li");
							newp.innerHTML = data.message[i];
							document.querySelector("#msg").append(newp);
						}
					})

			}
		} else if (alldogs[dog[0]].length > 0 & dog.length == 1) {
			fetch("https://dog.ceo/api/breed/" + dog[0] + "/images/random", {
			})
				.then(res => res.json())
				.then(data => {
					document.querySelector("#image").src = data.message;
				})
			document.querySelector("#msg").innerHTML = "";
			document.querySelector("#msg").innerHTML = "These are viable sub-breeds for " + dog[0] + " breed: ";
			fetch("https://dog.ceo/api/breed/"+ dog[0] +"/list", {
			})
				.then(res => res.json())
				.then(data => {
					for (var i = 0; i < data.message.length; i++) {
						var newp = document.createElement("li");
						newp.innerHTML = data.message[i];
						document.querySelector("#msg").append(newp);
					}
				})


		} else {
			document.querySelector("#msg").innerHTML = "";	
			fetch("https://dog.ceo/api/breed/" + dog[0] + "/images/random", {
			})
				.then(res => res.json())
				.then(data => {
					document.querySelector("#image").src = data.message;
				})
		}
	} else {
		alert("Wrong dog breed");
	}

});
