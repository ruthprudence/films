// import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbApiUrl = 'https://api.themoviedb.org/3';

const getMoviePoster = async (title, year) => {
  try {
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
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export default getMoviePoster;