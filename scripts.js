import handleButtonClick from './scripts/frontend/handleButtonClick.js';
import getMoviePoster from './scripts/backend/getMoviePoster.js';
// import getFilms from './getFilms.js'; // assuming you have a function to fetch films data

let films = [];
let currentBatch = 0;
const batchSize = 10;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const buttons = document.querySelectorAll("nav button");
    buttons.forEach(button => button.addEventListener("click", () => handleButtonClick(button.textContent)));

    const contentElement = document.querySelector('.content');

    const loadNextBatch = async () => {
      try {
        if (films.length === 0) {
          films = await getFilms(); // fetch films data if it's not already loaded
        }

        const batch = films.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize);
        await Promise.all(batch.map(async (film) => {
          const posterUrl = await getMoviePoster(film.title, film.year);
          const filmCard = contentElement.querySelector(`.film-card[data-title="${film.title}"][data-year="${film.year}"]`);
          if (filmCard) {
            filmCard.querySelector('img').src = posterUrl;
          } else {
            // create a new film card element if it doesn't exist
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
      } catch (error) {
        console.error('Error loading next batch:', error);
      }
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