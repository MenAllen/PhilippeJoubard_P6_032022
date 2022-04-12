// Sélectionne le photographe visé par l'Id fourni
function selectPhotograph(photographList, Id) {

  return photographList.find((photograph) => photograph.id == Id);
}

// Affichage du header du photographe désigné par le paramètre id reçu
function displayPhotographHeader(photograph) {

  const photographHeader = document.querySelector(".photograph-header");
	photographHeader.innerHTML = "";

	const photographModel = new Photographer(photograph);
  photographHeader.innerHTML += photographModel.userData;

  document.title += photographModel.userTitle;
}

// Affichage de la galerie du photographe désigné par le paramètre id reçu
function displayPhotographGallery(media, photograph) {

  const photographGallery = document.querySelector(".photograph-gallery");

  // récupérer le nom du photograhe
  let photographName = photograph.name;
  photographName = photographName.split(" ")[0];

  media.forEach((mediaItem) => {

    // si l'id est celui du photographe, on traite
    if (photograph.id == mediaItem.photographerId) {

		  const photographModel = new Media(mediaItem);

      // récupérer le nom du photographe pour renseigner le répertoire des images
      photographModel.mediaDirectory = photographName;

      // afficher la photo
		  photographGallery.innerHTML += photographModel.userGalleryCard;
    }
  });

}


async function init() {

  // Récupération de l'id x et de la liste des photographes via l'API
  const identifier = location.search.substring(1).split("&")[0].split("=")[1];
  const { photographers, media } = await getPhotographers();

  // Sélection du photographe pour affichage header et galerie
  const selectedPhotograph = selectPhotograph(photographers, identifier);
  
  displayPhotographHeader(selectedPhotograph);
  displayPhotographGallery(media, selectedPhotograph);

}

init();