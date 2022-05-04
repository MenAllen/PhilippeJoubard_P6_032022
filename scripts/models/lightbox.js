/**
 * @Property {HTMLElement} element
 * @Property (string[]) images - tableau des images ou videos de la lightbox
 * @Property (string) url - image ou video actuellement affichée
 * @Property {HTMLElement} firstFocusableElement
 * @Property {HTMLElement} lastFocusableElement
 */

export class Lightbox {
	static init() {
		const gallerySection = document.querySelector(".photograph-gallery");
		const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]'));
		const images = links.map((link) => link.getAttribute("src"));

		// listener sur clic image ou video pour lancer la lightbox
		links.forEach((link) =>
			link.addEventListener("click", (e) => {
				e.preventDefault();
				new Lightbox(e.currentTarget.getAttribute("src"), images, link);
			})
		);

		// listener sur touche enter pour lancer la lightbox
		links.forEach((link) =>
			link.addEventListener("keyup", (e) => {
				e.preventDefault();
				if (e.key === "Enter") {
					new Lightbox(e.currentTarget.getAttribute("src"), images, link);
				}
				return;
			})
		);
	}

	/**
	 *
	 * @param {*} url de l'image ou la video
	 * @param {*} images les images ou video pour la lightbox
	 */
	constructor(url, images, link) {
		this.element = this.buildDOM();
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.images = images;
		this.loadImage(url);
		this.link = link;
		document.body.appendChild(this.element);
		this.initFocus();
		this.ariaHide(false);

		document.addEventListener("keydown", this.onKeyDown);
		document.addEventListener("keyup", this.onKeyUp);
	}

	/**
	 * @param {*} url de l'image ou la video
	 * @param {*} alt titre de l'image ou la video
	 * @returns {HTMLElement} element à afficher
	 */
	buildDOM() {
		const dom = document.createElement("div");
		dom.classList.add("lightbox");
		dom.setAttribute("tabindex", "0");

		dom.innerHTML = `
        <button class="lightbox_close" aria-label="fermer le carroussel" ></button>
        <button class="lightbox_next" aria-label="image suivante" ></button>
        <button class="lightbox_previous" aria-label="image précédente" ></button>
        <div class="lightbox_container" role="document"></div>`;

		dom.querySelector(".lightbox_close").addEventListener("click", this.close.bind(this));
		dom.querySelector(".lightbox_next").addEventListener("click", this.next.bind(this));
		dom.querySelector(".lightbox_previous").addEventListener("click", this.prev.bind(this));

		return dom;
	}

	/**
	 * Charger une nouvelle image ou video dans la lightbox
	 * @param {*} url
	 */
	loadImage(url) {
		this.url = url;
		const container = this.element.querySelector(".lightbox_container");
		container.innerHTML = "";
		const legend = document.createElement("p");
		legend.innerHTML = url.split("/")[url.split("/").length - 1].split(".")[0].replaceAll("_", " ");

		if (url.endsWith(".jpg")) {
			// image
			const image = new Image();
			container.appendChild(image);
			image.src = url;
			image.setAttribute("alt", legend.innerHTML);
			image.setAttribute("aria-label", legend.innerHTML);
		} else if (url.endsWith(".mp4")) {
			//video
			const video = document.createElement("video");
			container.appendChild(video);
			video.setAttribute("controls", "");
			video.setAttribute("autoplay", "");
			video.src = url;
			video.setAttribute("aria-label", legend.innerHTML);
		}

		// Element legende sous image ou video
		container.appendChild(legend);
		legend.setAttribute("tabindex", "0");
		this.firstFocusableElement = legend;
	}

	/**
	 *  Initialisation du premier et dernier element focusable
	 *  pour naviguer en boucle
	 */
	initFocus() {
		const focusableElements = document.querySelectorAll(".lightbox button");

		this.thirdFocusableElement = focusableElements[0];
		this.secondFocusableElement = focusableElements[1];
		this.lastFocusableElement = focusableElements[2];

		this.firstFocusableElement.focus();
	}

	/**
	 * accessibilité: gestion des aria-hidden
	 * @param {*} hideLightbox
	 */
	ariaHide(hideLightbox) {
		const main = document.querySelector("main");
		const lightbox = document.querySelector(".lightbox");

		if (hideLightbox) {
			main.setAttribute("aria-hidden", false);
			lightbox.setAttribute("aria-hidden", true);
		} else {
			main.setAttribute("aria-hidden", true);
			lightbox.setAttribute("aria-hidden", false);
		}
	}

	/**
	 * Ferme la lightbox avec effet
	 * @param {MouseEvent | KeyboardEvent} e
	 */
	close(e) {
		e.preventDefault();
		document.removeEventListener("keydown", this.onKeyDown);
		document.removeEventListener("keyup", this.onKeyUp);
		this.ariaHide(true);
		this.element.classList.add("fadeout");
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element), 500;
		});
		this.link.focus();
	}

	/**
	 * Passer à l'image suivante de la galerie avec le focus
	 * @param {MouseEvent | KeyboardEvent} e
	 */
	next(e) {
		e.preventDefault();
		let i = this.images.findIndex((image) => image === this.url);
		if (i === this.images.length - 1) {
			i = -1;
		}
		this.loadImage(this.images[i + 1]);
		this.firstFocusableElement.focus();
	}

	/**
	 * Passer à l'image précédente de la galerie avec le focus
	 * @param {MouseEvent | KeyboardEvent} e
	 */
	prev(e) {
		e.preventDefault();
		let i = this.images.findIndex((image) => image === this.url);
		if (i === 0) {
			i = this.images.length;
		}
		this.loadImage(this.images[i - 1]);
		this.firstFocusableElement.focus();
	}

	/**
	 * Gérer le focus tournant sur les 3 boutons avec Tab et Shiftkey
	 * Sortir du light box si 'Escape' au clavier
	 * Passer à image ou video suivante ou précédente si 'ArrowRight' ou 'ArrowLeft'
	 * @param {Keyboard event} e
	 */
	onKeyDown(e) {
		e.preventDefault();
		let isTabPressed = e.key === "Tab";

		if (isTabPressed) {
			if (e.shiftKey) {
				// Si shift key pressé pour la combinaison shift + tab
				if (document.activeElement === this.firstFocusableElement) {
					this.lastFocusableElement.focus(); // on met le focus sur le dernier element focusable
				} else if (document.activeElement === this.lastFocusableElement) {
					this.thirdFocusableElement.focus();
				} else if (document.activeElement === this.secondFocusableElement) {
					this.firstFocusableElement.focus();
				} else if (document.activeElement === this.thirdFocusableElement) {
					this.secondFocusableElement.focus();
				}
			} else {
				// Sinon TabPressed seul
				if (document.activeElement === this.lastFocusableElement) {
					// Si on arrive au dernier element focusable, alors on remet le focus sur le premier
					this.firstFocusableElement.focus();
				} else if (document.activeElement === this.firstFocusableElement) {
					this.secondFocusableElement.focus();
				} else if (document.activeElement === this.secondFocusableElement) {
					this.thirdFocusableElement.focus();
				} else if (document.activeElement === this.thirdFocusableElement) {
					this.lastFocusableElement.focus();
				}
			}
		}
	}

/**
	 * Sortir du light box si 'Escape' ou 'Enter' sur closeButton au clavier
	 * Passer à image ou video suivante ou précédente si 'ArrowRight' ou 'ArrowLeft'
	 * @param {Keyboard event} e
	 */
 onKeyUp(e) {
		e.preventDefault();

		switch (e.key) {
			case "Escape":
				this.close(e);
//				this.close.bind(this);
				break;
			case "ArrowRight":
				this.next(e);
				break;
			case "ArrowLeft":
				this.prev(e);
				break;
			case "Enter":
				if (document.activeElement === this.thirdFocusableElement) {
					this.close(e);
				} else if (document.activeElement === this.secondFocusableElement) {
					this.next(e);
				} else if (document.activeElement === this.lastFocusableElement) {
					this.prev(e);
				}
				break;
			default:
		}
	}

}
