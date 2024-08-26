import handleButtonClick from '../handleButtonClick.js';

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('nav');
  navBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      handleButtonClick(event.target.textContent);
    }
  });
});