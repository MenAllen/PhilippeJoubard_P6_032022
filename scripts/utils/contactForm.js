// Traitement de l'ouverture et la fermeture de la modale et Controles du focus dans la modale:
// le focus ne doit pas quitter la modale avec le TAB

// Définir tous les éléments de la modale focusables
const focusableElements = 'button, img, input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector("#contact_modal"); // select the modal by it's id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
const submitButton = document.getElementById("submit_button");

// Fermeture de la modale en replaçant le focus au bouton de départ
export function closeModal() {

	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";

	// repositionnement de aria-hidden
	const main = document.querySelector("main");

	// démasquage du scroll du body
	const body = document.querySelector("body");
	body.classList.remove("noscroll");

	modal.setAttribute("aria-hidden", true);
	main.setAttribute("aria-hidden", false);

	const button = document.getElementById("contact_button");
	button.focus();
}

// Ouverture de la modale
export function displayModal() {

	// Reset du formulaire pour vider les données éventuelles
	const form = document.getElementById("formulaire");
	form.reset();

	// Reset des messages d'erreur du formulaire
	const formdatas = document.querySelectorAll(".formData");
	formdatas.forEach((formdata) => formdata.setAttribute("data-error-visible", false));

	// Affichage de la modale et positionnement de aria-hidden
	const modal = document.getElementById("contact_modal");
	const main = document.querySelector("main");

	modal.style.display = "block";
	modal.setAttribute("aria-hidden", false);
	main.setAttribute("aria-hidden", true);

	// Passage du focus au premier élément de la modale
	firstFocusableElement.focus();

	// masquage du scroll du body
	const body = document.querySelector("body");
	body.classList.add("noscroll");
}

document.addEventListener("keydown", function (e) {
	let isTabPressed = e.key === "Tab" || e.keyCode === 9;

	if (e.key === "Escape") {
		// Si Escape on ferme la modale
		closeModal();
		return;
	}

	if (!isTabPressed) {
		// Si pas Tab et pas Escape, on sort
		return;
	}

	if (e.shiftKey) {
		// Si shift key pressé pour la combinaison shift + tab
		if (document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus(); // on met le focus sur le dernier element focusable
			e.preventDefault();
		}
	} else {
		// Sinon
		if (document.activeElement === lastFocusableElement) {
			// Si on arrive au dernier element focusable, alors on remet le focus sur le premier
			firstFocusableElement.focus();
			e.preventDefault();
		}
	}
});


// Soumission du formulaire sur click bouton Envoyer et Affichage des données dans la console avant fermeture modale

submitButton.addEventListener("click", (event) => {
	event.preventDefault(event);

	const prenom = document.getElementById("first");
	const nom = document.getElementById("last");
	const email = document.getElementById("email");
	const message = document.getElementById("message");

	if (prenom.validity.valid && nom.validity.valid && email.validity.valid && message.validity.valid) {
		console.log(`Message de ${prenom.value} ${nom.value} (${email.value}) :`);
		console.log(`${message.value}`);

		closeModal();
	} else {
		if (prenom.validity.valid) {
			prenom.parentElement.setAttribute("data-error-visible", "false");
			prenom.parentElement.setAttribute("aria-invalid", "false");
		} else {
			prenom.parentElement.setAttribute("data-error-visible", "true");
			prenom.parentElement.setAttribute("aria-invalid", "true");
		}

		if (nom.validity.valid) {
			nom.parentElement.setAttribute("data-error-visible", "false");
			prenom.parentElement.setAttribute("aria-invalid", "false");
		} else {
			nom.parentElement.setAttribute("data-error-visible", "true");
			prenom.parentElement.setAttribute("aria-invalid", "true");
		}

		if (email.validity.valid) {
			email.parentElement.setAttribute("data-error-visible", "false");
			prenom.parentElement.setAttribute("aria-invalid", "false");
		} else {
			email.parentElement.setAttribute("data-error-visible", "true");
			prenom.parentElement.setAttribute("aria-invalid", "true");
		}

		if (message.validity.valid) {
			message.parentElement.setAttribute("data-error-visible", "false");
			prenom.parentElement.setAttribute("aria-invalid", "false");
		} else {
			message.parentElement.setAttribute("data-error-visible", "true");
			prenom.parentElement.setAttribute("aria-invalid", "true");
		}
	}
});
