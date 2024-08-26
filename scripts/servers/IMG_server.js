import express from 'express';
import axios from 'axios';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env'});

const tmdbApiKey = process.env.TMDB_API_KEY;

const app = express();

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

app.post('/get-movie-poster', async (req, res) => {
    try {
      const data = req.body;
      const posterUrls = [];
  
      if (Array.isArray(data)) {
        for (const film of data) {
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
            posterUrls.push(posterUrl);
          } else {
            posterUrls.push('');
          }
        }
      } else {
        const title = data.title;
        const year = data.year;
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
          posterUrls.push(posterUrl);
        } else {
          posterUrls.push('');
        }
      }
  
      if (posterUrls.length === 1) {
        res.json(posterUrls[0]);
      } else {
        res.json(posterUrls);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching movie posters' });
    }
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});