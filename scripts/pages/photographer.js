// Sélectionne le photographe visé par l'Id fourni
function selectPhotograph(photographList, Id) {

  return photographList.find((photograph) => photograph.id == Id);
}

// Affichage des infos sur le photographe désigné par le paramètre id reçu
function displayPhotographData(photograph) {

  const photographSection = document.querySelector(".photograph-header");
	photographSection.innerHTML = "";

	const photographModel = new Photographer(photograph);
  photographSection.innerHTML += photographModel.userData;

  console.log(photograph.name);
}

async function init() {

  // Récupération de l'id x et de la liste des photographes via l'API
  const identifier = location.search.substring(1).split("&")[0].split("=")[1];
  const { photographers } = await getPhotographers();

  // Sélection du photographe pour affichage
  displayPhotographData(selectPhotograph(photographers, identifier));
}

init();