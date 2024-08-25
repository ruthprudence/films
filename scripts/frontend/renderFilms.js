import createFilmCard from "../backend/createFilmCard.js";
// Render the film cards in the HTML
const renderFilms = (films) => {
  const contentElement = document.querySelector('.content');
  contentElement.innerHTML = '';  // Clear existing content

  if (Array.isArray(films)) {
    films.forEach(film => {
      const filmCardHTML = createFilmCard(film);
      contentElement.insertAdjacentHTML('beforeend', filmCardHTML);
    });
  } else {
    console.error('Error: films is not an array');
  }
};

export default renderFilms;