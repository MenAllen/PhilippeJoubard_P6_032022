// Import des déclarations de classes et fonctions externes
import { Photographer } from "../models/photographer.js";
import { getPhotographers } from "../utils/APIfetch.js";

/**
 * Affichage des photographes sur page d'accueil
 * @param {*} photographers tableau des photographes issus du json 
 */
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographersSection.innerHTML = "";

	photographers.forEach((photographer) => {
		const photographerModel = new Photographer(photographer);
		photographersSection.innerHTML += photographerModel.userCardDOM;
	});
}

/**
 * Initialisation de la page d'accueil
 */
async function init() {
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
