import createFilmCard from './scripts/backend/createFilmCard.js';
import renderFilms from './scripts/frontend/renderFilms.js';
import filterFilms from './scripts/frontend/filterFilms.js';
import handleButtonClick from './scripts/frontend/handleButtonClick.js';
import updateButtonStyles from './scripts/frontend/updateButtonStyles.js';

let films = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const buttons = document.querySelectorAll("nav button");
    buttons.forEach(button => button.addEventListener("click", () => handleButtonClick(button.textContent)));
  } catch (error) {
    console.error('Error:', error);
  }
});