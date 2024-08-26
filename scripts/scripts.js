import loadNextBatch from './frontend/loadNextBatch';

const contentElement = document.querySelector('.content');
const batchSize = 10;
let currentBatch = 0;
const filmCards = contentElement.querySelectorAll('.film-card');

// Load batches until all film cards are loaded
async function loadAllBatches() {
  while (currentBatch * batchSize < filmCards.length) {
    await loadNextBatch();
  }
}

// Start loading batches
loadAllBatches();