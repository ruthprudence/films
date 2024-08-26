// getMoviePoster.js;
const getMoviePoster = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/get-movie-posters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const posterUrls = await response.json();
      return posterUrls;
    } catch (error) {
      console.error(error);
    }
  };
  
  export default getMoviePoster;