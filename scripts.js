import handleButtonClick from './scripts/frontend/handleButtonClick.js';

let films = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const buttons = document.querySelectorAll("nav button");
    buttons.forEach(button => button.addEventListener("click", () => handleButtonClick(button.textContent)));
  } catch (error) {
    console.error('Error:', error);
  }
});