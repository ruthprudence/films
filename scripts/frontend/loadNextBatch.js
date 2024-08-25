import handleButtonClick from './handleButtonClick.js';
import getMoviePoster from './getMoviePoster.js';

const contentElement = document.querySelector('.content');
const batchSize = 10;
let currentBatch = 0;
let films = []; // your films array

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const buttons = document.querySelectorAll("nav button");
    buttons.forEach(button => button.addEventListener("click", () => handleButtonClick(button.textContent)));

    const loadNextBatch = async () => {
      const batch = films.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize);
      await Promise.all(batch.map(async (film) => {
        const posterUrl = await getMoviePoster(film.title, film.year);
        const filmCard = contentElement.querySelector(`.film-card[data-title="${film.title}"][data-year="${film.year}"]`);
        if (filmCard) {
          filmCard.querySelector('img').src = posterUrl;
        } else {
          const filmCardHtml = `
            <div class="film-card" data-title="${film.title}" data-year="${film.year}">
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
          contentElement.insertAdjacentHTML('beforeend', filmCardHtml);
        }
      }));
      currentBatch++;
    };

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const contentHeight = contentElement.offsetHeight;
      if (scrollPosition >= contentHeight * 0.8) {
        loadNextBatch();
      }
    });

    // Initialize the first batch
    loadNextBatch();
  } catch (error) {
    console.error('Error:', error);
  }
});