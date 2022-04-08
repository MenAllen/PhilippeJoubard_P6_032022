function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;

    // récupère lélément article avec les données name, city, tagline & price
    function getUserCardDOM() {
        return `
        <a href="#" class="photographer_focus" aria-label="présentation du photographe ${name}">
          <article>
            <img src="../assets/photographers/${picture}" alt="le photographe ${name}"></img>
            <h2>${name}</h2>
            <p class="location">${location}</p>
            <p class="tagline">${tagline}</p>
            <p class="price">${price}€/jour</p>
          </article>
        </a>
         `
/* 
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pCity = document.createElement( 'p' );
        pCity.textContent = city;
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + " €/j";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        console.log(article);
        return (article);*/
    }

    return { name, picture, location, price, tagline, id, getUserCardDOM }

}