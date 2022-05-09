// Import des déclarations de classes
import { Photographer } from "../models/photographer.js";
import { Media } from "../models/media.js";
import { Likes } from "../models/likes.js";
import { Lightbox } from "../models/lightbox.js";

// Import des fonctions externes
import { getPhotographers } from "../utils/APIfetch.js";
import { displayModal } from "../utils/contactForm.js";
import { sortbyOption, readSelectedOption } from "../utils/sort.js";

/**
 * Sélectionne le photographe visé par l'Id fourni
 *
 * @param {*} photographList Table des photographes
 * @param {*} Id Id du photographe
 * @returns
 */
function selectPhotograph(photographList, Id) {
	return photographList.find((photograph) => photograph.id === Id);
}

/**
 * Affichage du header de la page photographe
 * avec le photographe désigné par le paramètre id reçu
 *
 * @param {*} photograph
 */
function displayPhotographHeader(photograph) {
	// création d'une instance de Photographer et appel de userData
	const photographHeader = document.querySelector(".photograph-header");
	const photographModel = new Photographer(photograph);
	photographHeader.innerHTML = photographModel.userData;

	// Appel de userName pour initialiser le nom du photographe dans la modale
	const photographName = document.querySelector(".modal_name");
	photographName.innerHTML += `<br>${photographModel.userName}`;

	// mise à jour du title avec le nom du photographe
	document.title += photographModel.userTitle;
}

/**
 * Affichage de la galerie du photographe désigné par le paramètre id reçu
 *
 * @param {*} media
 * @param {*} photograph
 */
function displayPhotographGallery(media, photograph) {
	const photographGallery = document.querySelector(".photograph-gallery");

	// fonction interne effectuant la mise à jour de la galerie présentée en fonction de l'option sélectionnée
	function updateGallery(media) {
		photographGallery.innerHTML = "";
		media = sortbyOption(media, readSelectedOption());

		media.forEach((mediaItem) => {
			// si l'id est celui du photographe, on traite
			if (photograph.id === mediaItem.photographerId) {
				const mediaModel = new Media(mediaItem);

				// récupérer le nom du photographe pour renseigner le répertoire des images
				mediaModel.mediaDirectory = photographName;

				// afficher la photo ou la video
				photographGallery.innerHTML += mediaModel.userGalleryCard;
			}
		});
	}

	// fonction interne réinitialisant le total des likes sur le panneau de bas de page
	function updateTotalLikes() {
		const photographPricePanel = document.querySelector(".photograph-price-panel");
		const photographModel = new Photographer(photograph);

		photographPricePanel.innerHTML = photographModel.userPanelPrice;
	}

	// Récupération du nom du photograhe pour connaître le répertoire des medias
	let photographName = photograph.name;
	photographName = photographName.split(" ")[0];

	updateGallery(media);

	// Maintenant que la gallery est affichée, on met à jour la panel price avec les likes
	updateTotalLikes();

	// On initialise la lightbox et les likes
	Lightbox.init();
	Likes.init();

	// On active le listener sur le formulaire de contact
	const contactButton = document.getElementById("contact_button");
	contactButton.addEventListener("click", (e) => {
		e.preventDefault();
		displayModal();
	});

	// On active le listener sur le tri des options,
	const selectButton = document.getElementById("photograph-gallery-select");
	selectButton.addEventListener("change", (e) => {
		e.preventDefault();
		// Mise à jour de la galerie et update du totalLikes
		updateGallery(media);
		updateTotalLikes();

		// Re initialisation de la lightbox et des likes
		Lightbox.init();
		Likes.init();
	});
}

/**
 * Initialisation de la page photographe
 */
async function init() {
	// Récupération de l'id x et de la liste des photographes via l'API
	const identifier = parseInt(location.search.substring(1).split("&")[0].split("=")[1]);
	const { photographers, media } = await getPhotographers();

	// Sélection du photographe pour affichage header et galerie
	const selectedPhotograph = selectPhotograph(photographers, identifier);

	displayPhotographHeader(selectedPhotograph);
	displayPhotographGallery(media, selectedPhotograph);
}

init();
