import createFilmCard from "./createFilmCard.js";
/**
 * Creates full HTML content including the film cards.
 * @param {object[]} films - The array of film objects to create HTML for.
 * @returns {string} Complete HTML content.
 */
// import films from './films.js';

const createHTML = () => {
  const filmCards = films.map((film) => {
    return `
      <div class="film-card" data-title="${film.title}" data-year="${film.year}">
        <div class="film-card-inner">
          <div class="film-card-front">
            <img src="" alt="${film.title}" width="180" height="280">
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
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Film Library</title>
      <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <script src="https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js"></script>
    
    <body>
      <header>
        <nav>
          <button>I loved it!</button>
          <button>I really liked it!</button>
          <button>I liked it!</button>
          <button>It was okay</button>
          <button>I didn't like it!</button>
          <button>All</button>
        </nav>
      </header>
    
      <main class="content">
        ${filmCards}
      </main>
    
      <script type="module" defer src="scripts.js"></script>
    </body>
    </html>
  `;
};

export default createHTML;