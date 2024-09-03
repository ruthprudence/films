import updateButtonStyles from "./updateButtonStyles.js";

// Function to handle button clicks and update selection
// handleButtonClick.js
const opinionMap = {
  "I loved it!": 5,
  "I really liked it!": 4,
  "I liked it!": 3,
  "It was okay": 2,
  "I didn't like it!": 1
};

let selectedOpinions = [];

const handleButtonClick = (opinion) => {
  if (opinion === "All") {
    selectedOpinions = []; // Clear selection when "All" is clicked
  } else {
    selectedOpinions = [opinion]; // Update selection with clicked button's text content
  }

  const filmCards = document.querySelectorAll(".film-card");

  filmCards.forEach((filmCard) => {
    const filmOpinion = filmCard.querySelector(".film-card-back .opinion").textContent;

    if (selectedOpinions.includes(filmOpinion) || selectedOpinions.length === 0) {
      filmCard.classList.remove("hidden");
    } else {
      filmCard.classList.add("hidden");
    }
  });

  updateButtonStyles(selectedOpinions); // Update button styles
}

export default handleButtonClick;