class Photographer {
  constructor(data) {
    this._name = data.name
    this._id = data.id
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
    this._picture = data.portrait
  }

  get location()  {
    return `${this._city}, ${this._country}`
  }

  get picture() {
    return `../assets/photographers/${this._picture}`
  }

  get userTitle() {
    return ` - ${this._name}`;
  }

  get userName() {
    return ` ${this._name}`
  }

  get computeTotalLikes() {
    let sumLikes = 0;
    const likes = document.querySelectorAll(".likesNumber");
    likes.forEach( (like) => {sumLikes += Number(like.textContent)});

    return sumLikes;
  }

  // Affiche une "carte de presentation" d'un photographe dans la page d'accueil
  get userCardDOM() {
    return `
      <a href="./photographer.html?id=${this._id}" class="photographers_focus" aria-label="présentation du photographe ${this._name}">
        <article role="document">
          <img role="img" src="assets/photographers/${this._picture}" alt="le photographe ${this._name}"></img>
          <h2>${this._name}</h2>
          <p class="location">${this.location}</p>
          <p class="tagline">${this._tagline}</p>
          <p class="price">${this._price}€/jour</p>
        </article>
      </a>
       `
  }

  // Rappel des informations sur le photographe dans la page photographe
  get userData() {
    return `
      <div class="profile">
        <h2>${this._name}</h2>
        <p class="location">${this.location}</p>
        <p class="tagline">${this._tagline}</p>
      </div>
      <div class="contact">
        <button id="contact_button" class="contact_button" onclick="displayModal()" aria-label="contacter le photographe ${this._name}">Contactez-moi</button>
      </div>
      <img role="img" src="assets/photographers/${this._picture}" alt="le photographe ${this._name}"></img>
     `
  }

  // Affichage des likes et du taux journalier en bas de page photographe 
  get userPanelPrice() {
    return `
      <div aria-label="Total likes est ${this.computeTotalLikes}, taux journalier est ${this._price}">
        <p id="totalLikes">${this.computeTotalLikes}</p>
        <i class="fa fa-heart heart-"btn" aria-hidden="true"></i>
      </div>
      <p>${this._price} €/jour</p>
    `
  }

}