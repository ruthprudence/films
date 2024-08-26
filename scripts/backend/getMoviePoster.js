// getMoviePoster.js;
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env'});

const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbApiUrl = 'https://api.themoviedb.org/3';

const getMoviePoster = async (title, year) => {
  try {
    axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'YOUR_API_KEY',
          query: 'The Witch',
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    const response = await axios.get(`${tmdbApiUrl}/search/movie`, {
      params: {
        api_key: tmdbApiKey,
        query: `${title} (${year})`,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      const posterPath = results[0].poster_path;
      const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
      return posterUrl;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
  }
};

export default getMoviePoster;