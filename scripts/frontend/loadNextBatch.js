const contentElement = document.querySelector('.content');
const batchSize = 10;
let currentBatch = 0;
let films = [...]; // your films array

// Function to load the next batch of posters
const loadNextBatch = async () => {
  const batch = films.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize);
  await Promise.all(batch.map(async (film) => {
    const posterUrl = await getMoviePoster(film.title, film.year);
    const filmCard = contentElement.querySelector(`.film-card[data-title="${film.title}"][data-year="${film.year}"]`);
    if (filmCard) {
      filmCard.querySelector('img').src = posterUrl;
    }
  }));
  currentBatch++;
};

// Event listener to detect when the user scrolls to the bottom of the page
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const contentHeight = contentElement.offsetHeight;
  if (scrollPosition >= contentHeight * 0.8) {
    loadNextBatch();
  }
});

// Initialize the first batch
loadNextBatch();