// Function to update button styles based on selection
const updateButtonStyles = (selectedOpinions) => {
  const buttons = document.querySelectorAll("nav button");

  buttons.forEach((button) => {
    if (selectedOpinions.includes(button.textContent) || button.textContent === "All" && selectedOpinions.length === 0) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

export default updateButtonStyles;