import loadNextBatch from "./backend/loadNextBatch.js";
import handleButtonClick from './frontend/handleButtonClick.js';



const buttons = document.querySelectorAll("nav button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.textContent);
  });
});

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

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('nav');
  navBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      handleButtonClick(event.target.textContent);
    }
  });
});

// Start loading batches
// loadAllBatches();