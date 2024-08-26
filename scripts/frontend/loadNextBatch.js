import handleButtonClick from './handleButtonClick.js';
import getMoviePoster from './getMoviePoster.js';
import loadNextBatch from '../backend/loadNextBatch.js';

const contentElement = document.querySelector('.content');
const batchSize = 10;
let currentBatch = 0;
let films = []; // your films array

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const buttons = document.querySelectorAll("nav button");
    buttons.forEach(button => button.addEventListener("click", () => handleButtonClick(button.textContent)));

    

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const contentHeight = contentElement.offsetHeight;
      if (scrollPosition >= contentHeight * 0.8) {
        loadNextBatch();
      }
    });

    // Initialize the first batch
    loadNextBatch();
  } catch (error) {
    console.error('Error:', error);
  }
});