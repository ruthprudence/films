import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbApiUrl = 'https://api.themoviedb.org/3';

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(express.json());

app.post('/get-image-sources', async (req, res) => {
  try {
    const batch = req.body.batch;
    const imageSources = [];

    for (const film of batch) {
      const title = film.title;
      const year = film.year;
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
        imageSources.push(posterUrl);
      } else {
        imageSources.push('');
      }
    }

    res.json(imageSources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching image sources' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});