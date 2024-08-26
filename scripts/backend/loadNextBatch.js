import getMoviePoster from './getMoviePoster.js';

const contentElement = document.querySelector('.content');
const batchSize = 10;
let currentBatch = 0;
let films = []; // your films array
let filmCards = contentElement.querySelectorAll('.film-card');

const loadNextBatch = async () => {
  const batch = films.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize);
  await Promise.all(batch.map(async (film, index) => {
    const posterUrl = await getMoviePoster(film.title, film.year);
    const filmCard = filmCards[currentBatch * batchSize + index];
    if (filmCard) {
      const imgElement = filmCard.querySelector('img');
      if (posterUrl) {
        imgElement.src = posterUrl;
        console.log(`Loaded image for ${film.title}`);
      } else {
        imgElement.classList.add('no-image');
        console.log(`No image found for ${film.title}`);
      }
    }
  }));
  currentBatch++;
  if (currentBatch * batchSize < films.length) {
    loadNextBatch();
  }
};

export default loadNextBatch;