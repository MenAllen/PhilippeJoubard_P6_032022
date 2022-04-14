// Sélectionne le photographe visé par l'Id fourni
function selectPhotograph(photographList, Id) {
  return photographList.find((photograph) => photograph.id == Id);
}



// Affichage du header du photographe désigné par le paramètre id reçu
function displayPhotographHeader(photograph) {


  // création d'une instance de Photographer et appel de userData
  const photographHeader = document.querySelector(".photograph-header");
  const photographModel = new Photographer(photograph);
  photographHeader.innerHTML = photographModel.userData;

  // Appel de userName pour initialiser le nom du photographe dans la modale
  const photographName = document.querySelector(".modal_name");
  photographName.innerHTML += photographModel.userName;

  // mise à jour du title avec le nom du photographe
  document.title += photographModel.userTitle;
}



// Affichage de la galerie du photographe désigné par le paramètre id reçu
function displayPhotographGallery(media, photograph) {

  const photographGallery = document.querySelector(".photograph-gallery");

  // récupérer le nom du photograhe pour cconnaître le répertoire des medias
  let photographName = photograph.name;
  photographName = photographName.split(" ")[0];

  media.forEach((mediaItem) => {

    // si l'id est celui du photographe, on traite
    if (photograph.id == mediaItem.photographerId) {

		  const mediaModel = new Media(mediaItem);

      // récupérer le nom du photographe pour renseigner le répertoire des images
      mediaModel.mediaDirectory = photographName;

      // afficher la photo ou la video
		  photographGallery.innerHTML += mediaModel.userGalleryCard;
    }
  });

  // Maintenant que la gallery est affichée, on met à jour la panel price avec les likes
  const photographPricePanel = document.querySelector(".photograph-price-panel");
  const photographModel = new Photographer(photograph);

  photographPricePanel.innerHTML = photographModel.userPanelPrice;

}


async function init() {

  console.log("photographer init");
  
  // Récupération de l'id x et de la liste des photographes via l'API
  const identifier = location.search.substring(1).split("&")[0].split("=")[1];
  const { photographers, media } = await getPhotographers();

  // Sélection du photographe pour affichage header et galerie
  const selectedPhotograph = selectPhotograph(photographers, identifier);
  
  displayPhotographHeader(selectedPhotograph);
  displayPhotographGallery(media, selectedPhotograph);

}

init();