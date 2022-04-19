/**
 * @Property {HTMLElement} element
 * @Property (string[]) images - tableau des images ou videos de la lightbox
 * @Property (string) url - image ou video actuellement affichée
 */

class Lightbox {

  static init() {
    const gallerySection = document.querySelector(".photograph-gallery");
    const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]'));
    const images = links.map(link => link.getAttribute('src'));
    links.forEach(link => link.addEventListener('click', e => {
      e.preventDefault();
      new Lightbox(e.currentTarget.getAttribute('src'), e.currentTarget.getAttribute('alt'), images)
    }))
  }

  /**
   * 
   * @param {*} url de l'image ou la video
   * @param {*} alt titre de l'image ou la video
   * @param {*} images les images ou video pour la lightbox
   */  
  constructor(url, alt, images) {

    this.element = this.buildDOM();
    this.onKeyUp = this.onKeyUp.bind(this);
    this.images = images;
    this.loadImage(url);
    document.body.appendChild(this.element);
    document.addEventListener('keyup', this.onKeyUp)
  }

  /**
   * 
   * @param {*} url de l'image ou la video
   * @param {*} alt titre de l'image ou la video
   * @returns {HTMLElement} element à afficher
   */
  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");

    dom.innerHTML = `
        <button class="lightbox_close" aria-label="fermer le carroussel"></button>
        <button class="lightbox_next" aria-label="image suivante"></button>
        <button class="lightbox_previous" aria-label="image précédente"></button>
        <div class="lightbox_container"></div>`;

    dom.querySelector(".lightbox_close").addEventListener('click', this.close.bind(this));
    dom.querySelector(".lightbox_next").addEventListener('click', this.next.bind(this));
    dom.querySelector(".lightbox_previous").addEventListener('click', this.prev.bind(this));

    return dom;
  }

  /**
   * Charger une nouvelle image dans la lightbox
   * @param {*} url 
   */
  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox_container");
    container.innerHTML = "";
    const legend = document.createElement('p');
    legend.innerHTML = url.split("/")[url.split('/').length-1].split('.')[0].replace('_', ' ');
    container.appendChild(image);
    container.appendChild(legend);
    this.url = url;
    image.src = url;
  }

  /**
   * Ferme la lightbox avec effet
   * @param {MouseEvent | KeyboardEvent} e 
   */
  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeout')
    window.setTimeout(()=> {this.element.parentElement.removeChild(this.element), 500})
    document.removeEventListener('keyup', this.onKeyUp)
  }

  /**
   * Passer à l'image suivante de la galerie
   * @param {MouseEvent | KeyboardEvent} e 
   */
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex( image => image === this.url);
    if (i === this.images.length - 1) { 
      i = -1
    }
    this.loadImage(this.images[i+1]);
  }

  /**
   * Passer à l'image précédente de la galerie
   * @param {MouseEvent | KeyboardEvent} e 
   */
   prev(e) {
    e.preventDefault();
    let i = this.images.findIndex( image => image === this.url)
    if (i === 0) { 
      i = this.images.length;
    }
    this.loadImage(this.images[i-1]);
  }

  /**
   * Sortir du light box si escape au clavier
   * @param {Keyboard event} e 
   */
  onKeyUp(e) {
    if (e.key == 'Escape') {
      this.close(e)
    }
  }
}