import createFilmCard from "./createFilmCard.js";
/**
 * Creates full HTML content including the film cards.
 * @param {object[]} films - The array of film objects to create HTML for.
 * @returns {string} Complete HTML content.
 */
export default function createHTML(films) {
    const filmCards = films.map(createFilmCard).join('');
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
  }