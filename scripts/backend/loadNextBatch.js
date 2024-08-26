import getMoviePoster from './getMoviePoster.js';

const loadAllBatches = async () => {
  while (currentBatch * batchSize < films.length) {
    await loadNextBatch();
    currentBatch++;
  }
};

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
};

export default loadNextBatch;