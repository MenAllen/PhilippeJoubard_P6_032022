/**
 * Initialisation des écouteurs sur les coeurs des images et videos
 * La fonction va sur clic incrémenter ou décrémenter les 'likes'
 * du média concerné (image ou video), tout en mettant à jour le total
 * @Property {*}
 */

class Likes {

  static init() {
    const likesIcon = document.querySelectorAll(".likesSection i");
    let totalLikes = document.getElementById("totalLikes");

    // listener sur clic du coeur pour ajouter un j'aime ou un j'aime pas
    likesIcon.forEach(link => link.addEventListener('click', e => {

      e.preventDefault();
 
      if (link.classList[2] === "likeIcon") {
        link.classList.remove("likeIcon");
        --link.parentElement.childNodes[1].innerHTML;
        --totalLikes.innerHTML;
      } else {
        link.classList.add("likeIcon")
        ++link.parentElement.childNodes[1].innerHTML;
        ++totalLikes.innerHTML;
      }
    }));

  }
}