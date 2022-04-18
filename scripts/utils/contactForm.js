// Traitement de l'ouverture et la fermeture de la modale et Controles du focus dans la modale:
// le focus ne doit pas quitter la modale avec le TAB

// Définir tous les éléments de la modale focusables
const  focusableElements = 'button, img, input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('#contact_modal'); // select the modal by it's id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
const submitButton = document.getElementById("contact_button");

document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (e.key === 'Escape') { // Si Escape on ferme la modale
    closeModal();
    return;
  }

  if (!isTabPressed) { // Si pas Tab et pas Escape, on sort
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }

});

// Ouverture de la modale
function displayModal() {

    // Reset du formulaire pour vider les données éventuelles
    const form = document.getElementById("formulaire");
    form.reset();

    // Affichage de la modale
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    // Passage du focus au premier élément de la modale
    firstFocusableElement.focus();
}

// Fermeture de la modale en replaçant le focus au bouton de départ
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    const button = document.getElementById("contact_button");
    button.focus();   
}

// Soumission du formulaire sur click bouton Envoyer et Affichage des données dans la console avant fermeture modale
/*function sendFormulaire() {
    const prenom = document.getElementById("first");
    const nom = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    console.log(`Message de ${prenom.value} ${nom.value} (${email.value}) :`);
    console.log(`${message.value}`);

    closeModal();
}*/


submitButton.addEventListener('click', (event) => {

    event.preventDefault(event);

    const prenom = document.getElementById("first");
    const nom = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

 /*   if (!prenom.validity.valueMissing &&
            !nom.validity.valueMissing &&
                !email.validity.valueMissing) */
     console.log(prenom.validity.valid);           
                
      if (prenom.validity.valid &&
            nom.validity.valid &&
              email.validity.valid &&
                message.validity.valid ) {

        console.log(`Message de ${prenom.value} ${nom.value} (${email.value}) :`);
        console.log(`${message.value}`);

        closeModal();

    } else {

      if (prenom.validity.valid) {
        prenom.parentElement.setAttribute("data-error-visible", "false");
      } else {
        prenom.parentElement.setAttribute("data-error-visible", "true");
      }

      if (nom.validity.valid) {
        nom.parentElement.setAttribute("data-error-visible", "false");
      } else {
        nom.parentElement.setAttribute("data-error-visible", "true");
      }

      if (email.validity.valid) {
        email.parentElement.setAttribute("data-error-visible", "false");
      } else {
        email.parentElement.setAttribute("data-error-visible", "true");
      }

      if (message.validity.valid) {
        message.parentElement.setAttribute("data-error-visible", "false");
      } else {
        message.parentElement.setAttribute("data-error-visible", "true");
      }

    }

});



