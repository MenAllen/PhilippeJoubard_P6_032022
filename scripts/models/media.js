// Classe MediaPhoto pour afficher un gallery card avec photo
class MediaPhoto {
	constructor(data) {
		this._title = data.title;
		this._picture = data.image;
		this._likes = data.likes;
		this._id = data.id;
		this._price = data.price;
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
        <img src="${this._directory}/${this._picture}" class="media_focus" tabindex="0" alt="${this._title}"/>
        <figcaption>
          <p>${this._title}</p>
          <div class="likesSection">
            <p class="likesNumber">${this._likes}</p>
            <i tabindex="0" class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </figcaption>
      </figure>
    `;
	}
}

// Classe MediaMovie pour afficher un gallery card avec video
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
        <video tabindex="0" src="${this._directory}/${this._movie}" aria-label="${this._title}" class="media_focus" alt="${this._title}">
        </video>
        <figcaption>
          <p>${this._title}</p>
          <div class="likesSection">
            <p class="likesNumber">${this._likes}</p>
            <i tabindex="0" class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </figcaption>
      </figure>
       `;
	}
}

// On sélectionne la classe en fonction du type de média
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
