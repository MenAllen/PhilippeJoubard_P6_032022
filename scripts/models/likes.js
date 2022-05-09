/**
 * Initialisation des écouteurs sur les coeurs des images et videos
 * La fonction va sur clic incrémenter ou décrémenter les 'likes'
 * du média concerné (image ou video), tout en mettant à jour le total
 * @Property {*}
 */

export class Likes {
	static init() {
		const likesIcon = document.querySelectorAll(".likesSection button");
		let totalLikes = document.getElementById("totalLikes");

		/**
		 * Fonction interne de Mise à jour des likes
		 * @param {*} link lien vers élément icône coeur
		 * @param {*} totalLikes nombre total de likes
		 */
		function updateLikes(link, totalLikes) {
			if (link.classList[0] === "likeIcon") {
				link.classList.remove("likeIcon");
				--link.parentElement.childNodes[1].innerHTML;
				--totalLikes.innerHTML;
				link.setAttribute("aria-label", "J'aime pas");
			} else {
				link.classList.add("likeIcon");
				++link.parentElement.childNodes[1].innerHTML;
				++totalLikes.innerHTML;
				link.setAttribute("aria-label", "J'aime");
			}
		}

		// listener sur clic du coeur pour ajouter un j'aime ou un j'aime pas
		likesIcon.forEach((link) =>
			link.addEventListener("click", (e) => {
				e.preventDefault();
				updateLikes(link, totalLikes);
			})
		);
	}
}