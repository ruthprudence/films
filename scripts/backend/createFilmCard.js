import getMoviePoster from "./getMoviePoster.js";/**
 * Creates HTML for a film card.
 * @param {object} film - The film object to create HTML for.
 * @returns {string} HTML for the film card.
 */
const createFilmCard = async (film) => {
  try {
    const posterUrl = await getMoviePoster(film.title, film.year);
    const filmCardHTML = `
      <div class="film-card" onclick="this.classList.toggle('show-back')">
        <div class="film-card-inner">
          <div class="film-card-front">
            <img src="${posterUrl}" alt="${film.title}" width="180" height="280">
          </div>
          <div class="film-card-back">
            <h3 class="card-title">${film.title}</h3>
            <p class="release-year">(${film.year})</p>
            <p class="seen">Seen</p>
            <p class="date-watched">${film.dateWatched}</p>
            <p class="opinion">${film.opinion}</p>
          </div>
        </div>
      </div>
    `;
    return filmCardHTML;
  } catch (error) {
    console.error(error);
  }
};

export default createFilmCard;