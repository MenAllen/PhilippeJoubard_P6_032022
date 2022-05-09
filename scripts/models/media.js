/**
 * Déclarations de classes
 *
 * 	Media
 * 		@param élément media image et photo
 *
 * 	MediaPhoto
 * 		@param élément media avec image
 * 	MediaMovie
 * 		@param élément média avec vidéo
 *
 */

/**
 * Classe MediaPhoto pour afficher un gallery card avec photo
 *
 * @Property (string) title - titre de la photo
 * @Property (string) picture - image actuellement affichée
 * @Property (number) likes - nombre de likes
 * @property (number) id - id de la photo
 * @Property (string) directory - répertoire de la photo
 */

class MediaPhoto {
	constructor(data) {
		this._title = data.title;
		this._picture = data.image;
		this._likes = data.likes;
		this._id = data.id;
		this._directory = "";
	}

	get picture() {
		return `../assets/photographers/${this._picture}`;
	}

	/**
	 * @param {any} name
	 */
	set mediaDirectory(name) {
		if (name.split("-") !== name) {
			name = name.split("-").join(" ");
		}
		this._directory = `assets/photographers/${name}`;
	}

	get userGalleryCard() {
		return `
      <figure class="mediacard" aria-label="${this._title}">
        <img role="link" class="media_focus media_zoom" tabindex="0" src="${this._directory}/${this._picture}" tabindex="0" alt="${this._title} closeup view"/>
        <figcaption>
          <h3>${this._title}</h3>
          <div class="likesSection">
            <p class="likesNumber">${this._likes}</p>
            <button tabindex="0" aria-label="likes"><i class="fa fa-heart"></i></button>
          </div>
        </figcaption>
      </figure>`;
	}
}

/**
 * Classe MediaMovie pour afficher un gallery card avec video
 *
 * @Property (string) title - titre de la photo
 * @Property (string) movie - video actuellement affichée
 * @Property (number) likes - nombre de likes
 * @property (number) id - id de la photo
 * @Property (string) directory - répertoire de la photo
 */

class MediaMovie {
	constructor(data) {
		this._title = data.title;
		this._movie = data.video;
		this._likes = data.likes;
		this._id = data.id;
		this._directory = "";
	}

	/**
	 * @param {any} name
	 */
	set mediaDirectory(name) {
		if (name.split("-") !== name) {
			name = name.split("-").join(" ");
		}
		this._directory = `assets/photographers/${name}`;
	}

	get userGalleryCard() {
		return `
      <figure class="mediacard" aria-label="${this._title}">
				<video role="link" class="media_focus media_zoom" tabindex="0" src="${this._directory}/${this._movie}" aria-label="${this._title} closeup view" >
      	</video>
        <figcaption>
          <h3>${this._title}</h3>
          <div class="likesSection">
            <p class="likesNumber">${this._likes}</p>
            <button tabindex="0" aria-label="likes"><i class="fa fa-heart"></i></button>
          </div>
        </figcaption>
      </figure>
       `;
	}
}

/**
 * Classe Media pour appeler une classe photo ou video
 *
 * @Param () média item extrait du json
 */
export class Media {
	constructor(data) {
		// S'il s'agit d'une photo, alors on instancie une classe avec photo
		if (data.image) {
			return new MediaPhoto(data);
			// Sinon on instancie une classe avec video
		} else if (data.video) {
			return new MediaMovie(data);
			// Sinon, bonne pratique, on throw une erreur
		} else {
			throw "Unknown type format";
		}
	}
}
