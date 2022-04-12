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
    console.log(this._directory);
  }

  get userGalleryCard() {
    return `
      <a href="#" class="photographer_focus" aria-label="présentation des photos">
        <figure>
          <img src="${this._directory}/${this._picture}" alt="le photographe"></img>
          <figcaption>
            <p>${this._title}</p>
            <div>
              <p>${this._likes}</p>
              <i class="fa fa-heart heart-"btn" aria-hidden="true"></i>
            </div>
          </figcaption>
        </figure>
      </a>
       `
  }

  get userPanelPrice() {
    return `
      <div>
        <p>${this._likes}</p>
        <i class="fa fa-heart heart-"btn" aria-hidden="true"></i>
      </div>
      <p>${this._price} €/jour</p>
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
      <a href="#" class="photographer_focus" aria-label="présentation des photos">
        <figure>
          <video src="${this._directory}/${this._movie}" type="video/mp4" controls alt="la video"></video>
          <figcaption>
            <p>${this._title}</p>
            <div>
              <p>${this._likes}</p>
              <i class="fa fa-heart heart-"btn" aria-hidden="true"></i>
           </div>
          </figcaption>
        </figure>
      </a>
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
