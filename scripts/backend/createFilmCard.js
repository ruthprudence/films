/**
 * Creates HTML for a film card.
 * @param {object} film - The film object to create HTML for.
 * @returns {string} HTML for the film card.
 */
export default function createFilmCard(film) {
  return `
    <div class="film-card" onclick="this.classList.toggle('show-back')">
      <div class="film-card-inner">
        <div class="film-card-front">
          <img src="" alt="${film.title}" width="180" height="280">
        </div>
        <div class="film-card-back">
          <h3 class="card-title">${film.title}</h3>
          <p class="release-year">(${film.released})</p>
          <p class="seen">Seen</p>
          <p class="date-watched">${film.dateWatched}</p>
          <p class="opninion">${film.opinion}</p>
        </div>
      </div>
    </div>
  `;
}