import createFilmCard from './createFilmCard.js';
import { getPosterFromCache, addPosterToCache } from './posterCache.js';

const renderFilms = async (films) => {
  const contentElement = document.querySelector('.content');
  contentElement.innerHTML = ''; // Clear existing content

  const chunkSize = 10; // Load in chunks of 10
  for (let i = 0; i < films.length; i += chunkSize) {
    const chunk = films.slice(i, i + chunkSize);
    await Promise.all(chunk.map(async (film) => {
      const posterUrl = getPosterFromCache(film.title);
      if (!posterUrl) {
        const newPosterUrl = await createFilmCard(film);
        addPosterToCache(film.title, newPosterUrl);
      }
      const filmCardHTML = `
        <div class="film-card" onclick="this.classList.toggle('show-back')">
          <div class="film-card-inner">
            <div class="film-card-front">
              <img src="${posterUrl || newPosterUrl}" alt="${film.title}" width="180" height="280">
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
      contentElement.insertAdjacentHTML('beforeend', filmCardHTML);
    }));
  }
};

export default renderFilms;