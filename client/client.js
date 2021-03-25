var request = require("request-promise");

const serverUrl = "http://localhost:4000";
const fields = ["strength", "skill", "size", "popularity"]

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

(async() => {
	// Check server status
	let serverStatus = await request({ uri: serverUrl + "/ping", json: true });
	if (serverStatus === undefined || serverStatus.status != "OK") {
		return console.error("Game server returned an invalid status: " + serverStatus)
	}

	try {
		// Register a new player
		let playerUsername = "player" + randomInt(25);
		let player = { username: playerUsername, email: playerUsername + "@gmail.com", "birthdate": "1999-02-13"};
		let registration = await request({uri: serverUrl + "/register", method: "POST", json: true, body: player});
		let playerID = registration.playerID;
		console.log("Registered player. PlayerID=" + playerID);

		// Check out profile
		let playerInfo = await request({uri: serverUrl + "/profile", method: "GET", json: true, headers: { playerID: playerID }});
		console.log("Player profile: username=" + playerInfo.email + " / email=" + playerInfo.email + " / birthdate=" + playerInfo.birthdate);

		// Let's play!
		console.log("");
		console.log("Let's start playing!");
		for (let i = 0; i < 5; i++) {
			let nextCard = await request({uri: serverUrl + "/next-card", json: true, headers: { playerID: playerID }});
			console.log("Next card is " + nextCard.name);
			console.log("  Strength: " + nextCard.strength);
			console.log("  Skill: " + nextCard.skill);
			console.log("  Size: " + nextCard.size);
			console.log("  Popularity: " + nextCard.popularity);

			let battleField = fields[randomInt(4)];
			console.log("Battling on field: " + battleField);
			let battle = await request({uri: serverUrl + "/battle", method: "POST", json: true, body: { field: battleField} , headers: { playerID: playerID }});
			console.log("Battle outcome: " + battle.outcome + " (" + nextCard[battleField] + " vs. " + battle.opponentCard[battleField] + ")");

			let cards = await request({uri: serverUrl + "/cards", json: true, headers: { playerID: playerID }});
			console.log("We now have " + cards.length + " cards.");
			console.log("");
		}

		// Let's buy a card!
		console.log("Buying a new card...");
		let newCard = await request({uri: serverUrl + "/buy-card", json: true, headers: { playerID: playerID }});
		console.log("We got " + newCard.name);
		console.log("  Strength: " + newCard.strength);
		console.log("  Skill: " + newCard.skill);
		console.log("  Size: " + newCard.size);
		console.log("  Popularity: " + newCard.popularity);

		let cards = await request({uri: serverUrl + "/cards", json: true, headers: { playerID: playerID }});
		console.log("We now have " + cards.length + " cards.");
	} catch (error) {
		if (error.statusCode == 400) {
			return console.error("ERROR: " + error.error.message);
		} else {
			return console.error("ERROR: Game server returned error code " + error.statusCode);
		}
	}
})();

