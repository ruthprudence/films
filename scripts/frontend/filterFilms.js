import renderFilms from "./renderFilms.js";
// Filter films by opinion
const filterFilms = (films, opinion = "") => {
  let filteredFilms = [];
  if (opinion && opinion !== "All") {
    filteredFilms = films.filter(film => film.opinion === opinion);
  } else {
    filteredFilms = [...films]; // Return a copy of the original array
  }
  renderFilms(filteredFilms);
}

export default filterFilms;