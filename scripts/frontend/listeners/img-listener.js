import getImageSources from '../../backend/getImageSources.js';

const contentElement = document.querySelector('.content');
const filmCards = contentElement.querySelectorAll('.film-card');
const batchSize = 10;
let currentBatch = 0;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('DOMContentLoaded event triggered');

    const buttons = document.querySelectorAll("nav button");
    console.log('Buttons:', buttons);

    buttons.forEach(button => button.addEventListener("click", () => {
      console.log('Button clicked:', button.textContent);
      // Add logic to handle button click
    }));

    const loadNextBatch = async () => {
      console.log('Loading next batch...');

      const batch = Array.from(filmCards).slice(currentBatch * batchSize, (currentBatch + 1) * batchSize);
      console.log('Batch:', batch);

      const batchedFilms = batch.map((filmCard) => {
        return {
          title: filmCard.dataset.title,
          year: filmCard.dataset.year,
        };
      });

      const imageSources = await getImageSources(batchedFilms);
      batch.forEach((filmCard, index) => {
        filmCard.querySelector('img').src = imageSources[index];
      });

      currentBatch++;
      console.log('Current batch:', currentBatch);
    };

    window.addEventListener('scroll', () => {
      console.log('Scroll event triggered');

      const scrollPosition = window.scrollY + window.innerHeight;
      const contentHeight = contentElement.offsetHeight;
      console.log('Scroll position:', scrollPosition, 'Content height:', contentHeight);

      if (scrollPosition >= contentHeight * 0.8) {
        console.log('Loading next batch due to scroll');
        loadNextBatch();
      }
    });

    // Initialize the first batch
    console.log('Initializing first batch');
    loadNextBatch();
  } catch (error) {
    console.error('Error:', error);
  }
});