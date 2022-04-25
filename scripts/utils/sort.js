/**
   * 
   * @returns [string] option choisie
   */
 function readSelectedOption() {
  const select = document.querySelector("select");
  return select.options[select.selectedIndex].value;
}

/**
* tri l'objet en fonction de l'option passée
* @param [string] option value 
*/
function sortbyOption(mediaItems, param) {
  switch(param) {
    case 'Popularité':
      return mediaItems.sort((a, b) => { return b.likes - a.likes });
    case 'Date':
      return mediaItems.sort((a, b) => { return new Date(b.date) - new Date(a.date) });
    case 'Titre': 
      return mediaItems.sort((a, b) => { return a.title.localeCompare(b.title) });
    default:
      console.log("error");
  }
}