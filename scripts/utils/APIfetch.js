// Fetch récupère les données du fichier photographsers.json
function getPhotographers() {
	return fetch("../data/photographers.json")
		.then(response => response.json())
		.catch(err => { throw (`la requete API fetch a échoué: ${err}`); });
}