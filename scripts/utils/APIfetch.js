/**
 * getPhotographers récupère les données du fichier photographsers.json par un fetch
 *
 * @returns
 */
export function getPhotographers() {
	return fetch("./data/photographers.json")
		.then((response) => response.json())
		.catch((err) => {
			throw `la requete API fetch a échoué: ${err}`;
		});
}
