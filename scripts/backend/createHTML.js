/**
 * Creates full HTML content including the film cards.
 * @param {object[]} films - The array of film objects to create HTML for.
 * @returns {string} Complete HTML content.
 */
const createHTML = (films) => {
  const filmCards = films.map((film) => {
    const hasImage = film.imgSrc !== '';
    return `
      <div class="film-card" data-title="${film.title}" data-year="${film.released}" onclick="this.classList.toggle('show-back')">
        <div class="film-card-inner">
          <div class="film-card-front">
            <span>${film.title}</span>
          </div>
          <div class="film-card-back">
            <h3 class="card-title"><a href="https://en.wikipedia.org/wiki/${film.wikipediaLink}">${film.title}</a></h3>
            <p class="release-year">(${film.released})</p>
            <p class="date-watched">Seen: ${film.dateWatched}</p>
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
    
    <body>
    <script src="https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js"></script>
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
          
           <script type="module" defer src="scripts/scripts.js"></script>
    </body>
    </html>
  `;
};

export default createHTML;