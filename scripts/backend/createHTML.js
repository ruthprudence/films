import createFilmCard from "./createFilmCard.js";
/**
 * Creates full HTML content including the film cards.
 * @param {object[]} films - The array of film objects to create HTML for.
 * @returns {string} Complete HTML content.
 */
export default async function createHTML(films) {
  const chunkSize = 10; // Process 10 films at a time
  const filmCards = [];

  for (let i = 0; i < films.length; i += chunkSize) {
    const chunk = films.slice(i, i + chunkSize);
    const chunkFilmCards = await Promise.all(chunk.map(createFilmCard));
    filmCards.push(...chunkFilmCards);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before processing the next chunk
  }

  const filmCardsHTML = filmCards.join('');
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
        ${filmCardsHTML}
      </main>
    
      <script type="module" defer src="scripts.js"></script>
    </body>
    </html>
  `;
}