// Classe MediaPhoto pour afficher un gallery card avec photo
class MediaPhoto {
  constructor(data) {
    this._title = data.title
    this._picture = data.image
    this._likes = data.likes
    this._id = data.id
    this._price = data.price;
    this._directory = "";
  }

  get picture() {
    return `../assets/photographers/${this._picture}`
  }

  /**
   * @param {any} name
   */
  set mediaDirectory(name) {
    if ( name.split("-") !== name ) {
      name = name.split("-").join(" ")
    }
    this._directory = `../assets/photographers/${name}`
  }

  get userGalleryCard() {
    return `
      <figure class="mediacard">
        <a href="#" tabindex="-1">
          <img src="${this._directory}/${this._picture}" class="media_focus" tabindex="0" alt="La photo ${this._title}"/>
        </a>
        <figcaption>
          <p>${this._title}</p>
          <div>
            <p class="likesNumber">${this._likes}</p>
            <i class="fa fa-heart heart-btn" aria-hidden="true"></i>
          </div>
        </figcaption>
      </figure>
    `
  }

}

// Classe MediaMovie pour afficher un gallery card avec video
class MediaMovie {
  constructor(data) {
    this._title = data.title
    this._movie = data.video
    this._likes = data.likes
    this._id = data.id
    this._directory = "";
  }

  /**
   * @param {any} name
   */
  set mediaDirectory(name) {
    if ( name.split("-") !== name ) {
      name = name.split("-").join(" ")
    }
    this._directory = `../assets/photographers/${name}`
  }

  get userGalleryCard() {
    return `
      <figure class="mediacard">
        <a href="#" tabindex="-1">
          <video src="${this._directory}/${this._movie}" class="media_focus" tabindex="0" type="video/mp4" controls alt="La vidéo ${this._title}"/>
        </a>
        <figcaption>
          <p>${this._title}</p>
          <div>
            <p class="likesNumber">${this._likes}</p>
            <i class="fa fa-heart heart-btn" aria-hidden="true"></i>
          </div>
        </figcaption>
      </figure>
       `
  }
}

// On sélectionne la classe en fonction du type de média
class Media {
  constructor(data) {
      // S'il s'agit d'une photo, alors on instancie une classe avec photo
      if (data.image) {
          return new MediaPhoto(data)
      // Sinon on instancie une classe avec video
      } else if (data.video) {
          return new MediaMovie(data)
      // Sinon, bonne pratique, on throw une erreur
      } else {
          throw 'Unknown type format'
      }
  }
}
